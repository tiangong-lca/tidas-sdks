import path from 'node:path';

export type JsonSchema = boolean | JsonSchemaObject;

export interface JsonSchemaObject {
  $defs?: Record<string, JsonSchema>;
  $ref?: string;
  additionalItems?: boolean | JsonSchema;
  additionalProperties?: boolean | JsonSchema;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  const?: unknown;
  description?: string;
  else?: JsonSchema;
  enum?: unknown[];
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  format?: string;
  if?: JsonSchema;
  items?: JsonSchema | JsonSchema[];
  maxItems?: number;
  maxLength?: number;
  maximum?: number;
  minItems?: number;
  minLength?: number;
  minimum?: number;
  multipleOf?: number;
  not?: JsonSchema;
  oneOf?: JsonSchema[];
  pattern?: string;
  patternProperties?: Record<string, JsonSchema>;
  properties?: Record<string, JsonSchema>;
  propertyNames?: JsonSchema;
  required?: string[];
  then?: JsonSchema;
  type?:
    | 'array'
    | 'boolean'
    | 'integer'
    | 'null'
    | 'number'
    | 'object'
    | 'string'
    | Array<
        | 'array'
        | 'boolean'
        | 'integer'
        | 'null'
        | 'number'
        | 'object'
        | 'string'
      >;
  uniqueItems?: boolean;
}

interface RenderedModule {
  content: string;
  exportNames: string[];
}

interface ExternalImport {
  modulePath: string;
  names: Set<string>;
}

const SCHEMA_EXTENSION = '.json';

/**
 * Render TIDAS JSON Schema documents directly as deterministic Zod modules.
 *
 * This deliberately uses the JSON Schema AST rather than generated TypeScript
 * declarations. It therefore has no dependency on the TypeScript compiler API
 * or on source-code parsing heuristics.
 */
export class JsonSchemaToZod {
  private readonly imports = new Map<string, ExternalImport>();

  constructor(
    private readonly fileName: string,
    private readonly schema: JsonSchemaObject
  ) {}

  renderModule(): RenderedModule {
    const bodies: string[] = [];
    const exportNames: string[] = [];

    for (const [definitionName, definition] of sortDefinitions(
      this.schema.$defs ?? {},
      this.fileName
    )) {
      const exportName = schemaName(definitionName);
      bodies.push(
        `export const ${exportName} = ${this.renderSchema(
          definition,
          `#/$defs/${definitionName}`
        )};`
      );
      exportNames.push(exportName);
    }

    if (hasRootSchema(this.schema)) {
      const exportName = schemaName(fileBaseName(this.fileName));
      bodies.push(
        `export const ${exportName} = ${this.renderSchema(
          withoutDefinitions(this.schema),
          '#'
        )};`
      );
      exportNames.push(exportName);
    }

    if (bodies.length === 0) {
      throw new Error(
        `${this.fileName}: schema has neither $defs nor a renderable root`
      );
    }

    const importBlocks = ["import { z } from 'zod';"];
    for (const { modulePath, names } of [...this.imports.values()].sort(
      (left, right) => left.modulePath.localeCompare(right.modulePath)
    )) {
      importBlocks.push(
        `import { ${[...names].sort().join(', ')} } from '${modulePath}';`
      );
    }

    return {
      content: `// Generated directly from TIDAS JSON Schema: ${
        this.fileName
      }\n${importBlocks.join('\n')}\n\n${bodies.join('\n\n')}\n`,
      exportNames,
    };
  }

  private renderSchema(schema: JsonSchema, location: string): string {
    if (schema === true) {
      return 'z.unknown()';
    }
    if (schema === false) {
      return 'z.never()';
    }

    if (Object.prototype.hasOwnProperty.call(schema, 'const')) {
      return `z.literal(${renderLiteral(schema.const)})`;
    }

    if (schema.enum) {
      if (schema.enum.length === 0) {
        return 'z.never()';
      }
      return renderUnion(
        schema.enum.map((value) => `z.literal(${renderLiteral(value)})`)
      );
    }

    const fragments: string[] = [];
    if (schema.$ref) {
      fragments.push(this.renderReference(schema.$ref, location));
    }

    const alternatives = schema.anyOf ?? schema.oneOf;
    const base =
      alternatives && schema.properties
        ? null
        : schema.$ref && !hasIndependentRefSiblingConstraints(schema)
          ? null
          : this.renderBaseSchema(schema, location);
    if (base) {
      fragments.push(base);
    }

    if (alternatives) {
      if (alternatives.length === 0) {
        fragments.push('z.never()');
      } else {
        fragments.push(
          renderUnion(
            alternatives.map((entry, index) =>
              this.renderSchema(entry, `${location}/alternative/${index}`)
            )
          )
        );
      }
    }

    if (schema.allOf) {
      for (const [index, entry] of schema.allOf.entries()) {
        if (isConditionalSchema(entry)) {
          // Existing SDK behavior implements the observable conditional rules
          // as named domain refinements after structural generation. Keeping
          // them out of this structural renderer avoids anonymous, duplicated
          // refinements and preserves stable validation codes and paths.
          continue;
        }
        fragments.push(this.renderSchema(entry, `${location}/allOf/${index}`));
      }
    }

    const meaningfulFragments = deduplicate(fragments);
    if (meaningfulFragments.length === 0) {
      if (isExplicitEmptySchema(schema)) {
        return 'z.unknown()';
      }
      throw new Error(
        `${this.fileName}${location}: unsupported JSON Schema shape (${Object.keys(
          schema
        ).join(', ')})`
      );
    }

    return renderIntersection(meaningfulFragments);
  }

  private renderReference(reference: string, location: string): string {
    if (reference.startsWith('#/$defs/')) {
      const definitionName = decodeReferenceSegment(
        reference.slice('#/$defs/'.length)
      );
      if (!definitionName || definitionName.includes('/')) {
        throw new Error(
          `${this.fileName}${location}: unsupported local reference ${reference}`
        );
      }
      return schemaName(definitionName);
    }

    const [rawTarget, fragment] = reference.split('#', 2);
    if (!rawTarget) {
      throw new Error(
        `${this.fileName}${location}: unsupported reference ${reference}`
      );
    }

    const targetFile = path.posix.basename(rawTarget);
    if (!targetFile.endsWith(SCHEMA_EXTENSION)) {
      throw new Error(
        `${this.fileName}${location}: referenced document is not JSON Schema: ${reference}`
      );
    }

    let importedName: string;
    if (fragment) {
      const prefix = '/$defs/';
      if (!fragment.startsWith(prefix)) {
        throw new Error(
          `${this.fileName}${location}: unsupported external fragment ${reference}`
        );
      }
      importedName = schemaName(
        decodeReferenceSegment(fragment.slice(prefix.length))
      );
    } else {
      importedName = schemaName(fileBaseName(targetFile));
    }

    const targetBase = targetFile.slice(0, -SCHEMA_EXTENSION.length);
    const modulePath = `./${targetBase}.schema`;
    const externalImport = this.imports.get(modulePath) ?? {
      modulePath,
      names: new Set<string>(),
    };
    externalImport.names.add(importedName);
    this.imports.set(modulePath, externalImport);

    return importedName;
  }

  private renderBaseSchema(
    schema: JsonSchemaObject,
    location: string
  ): string | null {
    if (Array.isArray(schema.type)) {
      return renderUnion(
        schema.type
          .map((type) =>
            this.renderBaseSchema(
              { ...schema, type },
              `${location}/type/${type}`
            )
          )
          .filter((value): value is string => value !== null)
      );
    }

    const inferredType = schema.type ?? inferTypeFromKeywords(schema);

    switch (inferredType) {
      case 'array':
        return this.renderArray(schema, location);
      case 'boolean':
        return 'z.boolean()';
      case 'integer':
      case 'number':
        return applyNumericConstraints('z.number()', schema);
      case 'null':
        return 'z.null()';
      case 'object':
        return this.renderObject(schema, location);
      case 'string':
        return applyStringConstraints('z.string()', schema);
      case null:
        return null;
      default:
        throw new Error(
          `${this.fileName}${location}: unsupported JSON Schema type ${String(
            inferredType
          )}`
        );
    }
  }

  private renderArray(schema: JsonSchemaObject, location: string): string {
    if (!schema.items) {
      throw new Error(`${this.fileName}${location}: array has no items schema`);
    }

    let rendered: string;
    if (Array.isArray(schema.items)) {
      const itemSchemas = schema.items.map((item, index) =>
        this.renderSchema(item, `${location}/items/${index}`)
      );
      rendered = `z.tuple([${itemSchemas.join(', ')}])`;
    } else {
      rendered = `z.array(${this.renderSchema(
        schema.items,
        `${location}/items`
      )})`;
      if (schema.minItems !== undefined) {
        rendered += `.min(${schema.minItems})`;
      }
      if (schema.maxItems !== undefined) {
        rendered += `.max(${schema.maxItems})`;
      }
    }

    return rendered;
  }

  private renderObject(schema: JsonSchemaObject, location: string): string {
    const properties = schema.properties ?? {};
    const required = new Set(schema.required ?? []);
    const propertyNames = new Set([...Object.keys(properties), ...required]);

    if (propertyNames.size === 0) {
      if (schema.patternProperties) {
        const patternValueSchemas = Object.entries(
          schema.patternProperties
        ).map(([pattern, valueSchema]) =>
          this.renderSchema(
            valueSchema,
            `${location}/patternProperties/${escapeReferenceSegment(pattern)}`
          )
        );
        return `z.record(z.string(), ${renderUnion(patternValueSchemas)})`;
      }
      if (
        schema.additionalProperties &&
        typeof schema.additionalProperties === 'object'
      ) {
        return `z.record(z.string(), ${this.renderSchema(
          schema.additionalProperties,
          `${location}/additionalProperties`
        )})`;
      }
      if (schema.additionalProperties === true) {
        return 'z.record(z.string(), z.unknown())';
      }
      return 'z.object({})';
    }

    const renderedProperties = [...propertyNames].map((propertyName) => {
      const propertySchema = properties[propertyName];
      const rendered = propertySchema
        ? this.renderSchema(
            propertySchema,
            `${location}/properties/${escapeReferenceSegment(propertyName)}`
          )
        : 'z.unknown()';
      return `${renderPropertyName(propertyName)}: ${
        required.has(propertyName) ? rendered : `${rendered}.optional()`
      }`;
    });

    return `z.object({${renderedProperties.join(', ')}})`;
  }
}

function hasRootSchema(schema: JsonSchemaObject): boolean {
  return Object.keys(schema).some(
    (key) => key !== '$schema' && key !== '$defs' && key !== 'description'
  );
}

function withoutDefinitions(schema: JsonSchemaObject): JsonSchemaObject {
  const {
    $defs: _definitions,
    $schema: _dialect,
    ...root
  } = schema as JsonSchemaObject & { $schema?: string };
  return root;
}

function isConditionalSchema(schema: JsonSchema): boolean {
  return typeof schema === 'object' && schema !== null && Boolean(schema.if);
}

function isExplicitEmptySchema(schema: JsonSchemaObject): boolean {
  const ignoredKeys = new Set(['description', 'else', 'if', 'then']);
  return Object.keys(schema).every((key) => ignoredKeys.has(key));
}

function renderUnion(schemas: string[]): string {
  const uniqueSchemas = deduplicate(schemas);
  if (uniqueSchemas.length === 0) {
    return 'z.never()';
  }
  if (uniqueSchemas.length === 1) {
    return uniqueSchemas[0];
  }
  return `z.union([${uniqueSchemas.join(', ')}])`;
}

function renderIntersection(schemas: string[]): string {
  if (schemas.length === 1) {
    return schemas[0];
  }
  return schemas
    .slice(1)
    .reduce(
      (combined, schema) => `z.intersection(${combined}, ${schema})`,
      schemas[0]
    );
}

function applyStringConstraints(
  base: string,
  schema: JsonSchemaObject
): string {
  let rendered = schema.format === 'date-time' ? 'z.iso.datetime()' : base;
  if (schema.minLength !== undefined) {
    rendered += `.min(${schema.minLength})`;
  }
  if (schema.maxLength !== undefined) {
    rendered += `.max(${schema.maxLength})`;
  }
  if (schema.pattern !== undefined) {
    rendered += `.regex(${renderRegExp(schema.pattern)})`;
  }
  return rendered;
}

function inferTypeFromKeywords(
  schema: JsonSchemaObject
): 'array' | 'number' | 'object' | 'string' | null {
  if (schema.properties || schema.required || schema.patternProperties) {
    return 'object';
  }
  if (
    schema.items ||
    schema.minItems !== undefined ||
    schema.maxItems !== undefined ||
    schema.uniqueItems !== undefined
  ) {
    return 'array';
  }
  if (
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined ||
    schema.format === 'date-time'
  ) {
    return 'string';
  }
  if (
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined
  ) {
    return 'number';
  }
  return null;
}

function applyNumericConstraints(
  base: string,
  schema: JsonSchemaObject
): string {
  let rendered = base;
  if (schema.minimum !== undefined) {
    rendered += `.min(${schema.minimum})`;
  }
  if (schema.maximum !== undefined) {
    rendered += `.max(${schema.maximum})`;
  }
  if (schema.exclusiveMinimum !== undefined) {
    rendered += `.gt(${schema.exclusiveMinimum})`;
  }
  if (schema.exclusiveMaximum !== undefined) {
    rendered += `.lt(${schema.exclusiveMaximum})`;
  }
  if (schema.multipleOf !== undefined) {
    rendered += `.multipleOf(${schema.multipleOf})`;
  }
  return rendered;
}

function renderRegExp(pattern: string): string {
  return `/${pattern.replaceAll('/', '\\/')}/`;
}

function renderLiteral(value: unknown): string {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return JSON.stringify(value);
  }
  throw new Error(`Unsupported JSON Schema literal: ${JSON.stringify(value)}`);
}

function fileBaseName(fileName: string): string {
  const withoutExtension = fileName.endsWith(SCHEMA_EXTENSION)
    ? fileName.slice(0, -SCHEMA_EXTENSION.length)
    : fileName;
  return withoutExtension
    .replace(/^tidas_/, '')
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function schemaName(name: string): string {
  return `${name}Schema`;
}

function decodeReferenceSegment(value: string): string {
  return decodeURIComponent(value).replaceAll('~1', '/').replaceAll('~0', '~');
}

function escapeReferenceSegment(value: string): string {
  return value.replaceAll('~', '~0').replaceAll('/', '~1');
}

function renderPropertyName(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

function deduplicate(values: string[]): string[] {
  return [...new Set(values)];
}

function hasIndependentRefSiblingConstraints(
  schema: JsonSchemaObject
): boolean {
  return Boolean(
    schema.properties ||
    schema.required ||
    schema.patternProperties ||
    schema.items ||
    schema.anyOf ||
    schema.oneOf ||
    schema.allOf ||
    schema.minItems !== undefined ||
    schema.maxItems !== undefined ||
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined ||
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined ||
    schema.format === 'date-time'
  );
}

function sortDefinitions(
  definitions: Record<string, JsonSchema>,
  fileName: string
): Array<[string, JsonSchema]> {
  const originalOrder = Object.keys(definitions);
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const result: Array<[string, JsonSchema]> = [];

  const visit = (name: string): void => {
    if (visited.has(name)) {
      return;
    }
    if (visiting.has(name)) {
      throw new Error(
        `${fileName}: circular local $defs reference involving ${name}`
      );
    }

    const definition = definitions[name];
    if (!definition) {
      throw new Error(`${fileName}: missing local $defs target ${name}`);
    }

    visiting.add(name);
    for (const dependency of collectLocalDefinitionReferences(definition)) {
      if (dependency === name) {
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(definitions, dependency)) {
        throw new Error(
          `${fileName}: missing local $defs target ${dependency}`
        );
      }
      visit(dependency);
    }
    visiting.delete(name);
    visited.add(name);
    result.push([name, definition]);
  };

  for (const name of originalOrder) {
    visit(name);
  }
  return result;
}

function collectLocalDefinitionReferences(schema: JsonSchema): Set<string> {
  const references = new Set<string>();

  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      for (const entry of value) {
        visit(entry);
      }
      return;
    }
    if (!value || typeof value !== 'object') {
      return;
    }

    const object = value as Record<string, unknown>;
    if (
      Object.prototype.hasOwnProperty.call(object, 'const') ||
      Object.prototype.hasOwnProperty.call(object, 'enum')
    ) {
      return;
    }
    const reference = object.$ref;
    if (typeof reference === 'string' && reference.startsWith('#/$defs/')) {
      references.add(
        decodeReferenceSegment(reference.slice('#/$defs/'.length))
      );
    }
    for (const [key, entry] of Object.entries(object)) {
      if (key !== '$ref' && key !== 'description') {
        visit(entry);
      }
    }
  };

  visit(schema);
  return references;
}
