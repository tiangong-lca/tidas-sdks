#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { format } from 'prettier';
import {
  JsonSchemaToZod,
  type JsonSchemaObject,
} from './json-schema-to-zod.js';
import { requireTidasToolsSchemaDir } from './resolve-tidas-tools-path.js';
import { replaceExportedSchema } from './schema-postprocess.js';

// Configuration
const SCHEMAS_DIR = process.env.TIDAS_ZOD_OUTPUT_DIR ?? 'src/schemas';

async function generateZodSchemas(): Promise<void> {
  console.log('🚀 Generating Zod schemas directly from TIDAS JSON Schema...\n');

  const upstreamSchemasDir = requireTidasToolsSchemaDir(
    'Zod generation requires the locked tidas-tools JSON schemas. Set TIDAS_TOOLS_PATH/TIDAS_TOOLS_SCHEMA_DIR, place a sibling ../tidas-tools checkout next to this repo, or run ../../scripts/ci/generate-typescript-sdk.sh.'
  );

  // Ensure schemas directory exists
  if (!fs.existsSync(SCHEMAS_DIR)) {
    fs.mkdirSync(SCHEMAS_DIR, { recursive: true });
  }

  // Clean existing schemas
  console.log('🧹 Cleaning existing schemas...');
  const existingSchemas = fs
    .readdirSync(SCHEMAS_DIR)
    .filter((file) => file.endsWith('.schema.ts'));
  for (const schema of existingSchemas) {
    fs.unlinkSync(path.join(SCHEMAS_DIR, schema));
    console.log(`   🗑️  Removed: ${schema}`);
  }

  const schemaFiles = fs
    .readdirSync(upstreamSchemasDir)
    .filter((file) => file.startsWith('tidas_') && file.endsWith('.json'))
    .sort();

  if (schemaFiles.length === 0) {
    throw new Error(`No TIDAS JSON schemas found in ${upstreamSchemasDir}`);
  }

  console.log(`\n📦 Rendering ${schemaFiles.length} JSON Schema documents...`);
  for (const schemaFile of schemaFiles) {
    console.log(`🔄 Processing ${schemaFile}...`);
    const inputFile = path.join(upstreamSchemasDir, schemaFile);
    const parsedSchema = JSON.parse(
      fs.readFileSync(inputFile, 'utf8')
    ) as JsonSchemaObject;
    const renderer = new JsonSchemaToZod(schemaFile, parsedSchema);
    const { content, exportNames } = renderer.renderModule();
    const outputFile = path.join(
      SCHEMAS_DIR,
      schemaFile.replace(/\.json$/, '.schema.ts')
    );
    const formatted = await format(content, {
      parser: 'typescript',
      singleQuote: true,
    });
    fs.writeFileSync(outputFile, formatted, 'utf8');
    await postProcessZodSchema(outputFile);
    fs.writeFileSync(
      outputFile,
      await format(fs.readFileSync(outputFile, 'utf8'), {
        parser: 'typescript',
        singleQuote: true,
      }),
      'utf8'
    );
    assertGeneratedDomainRefinements(outputFile);
    console.log(
      `   ✅ ${path.basename(outputFile)} generated (${exportNames.length} exports)`
    );
  }

  // Final verification
  console.log('\n✅ Final verification of generated schemas:');
  const successCount = schemaFiles.filter((schemaFile) => {
    const outputFile = path.join(
      SCHEMAS_DIR,
      schemaFile.replace(/\.json$/, '.schema.ts')
    );
    const exists = fs.existsSync(outputFile);
    console.log(`   ${exists ? '✅' : '❌'} ${path.basename(outputFile)}`);
    return exists;
  }).length;

  console.log(
    `\n📊 Generated ${successCount}/${schemaFiles.length} schemas successfully`
  );

  if (successCount !== schemaFiles.length) {
    throw new Error('One or more Zod schema modules were not generated');
  }

  // Generate enhanced index file
  await generateSchemasIndex();

  console.log('\n🎉 Zod schema generation completed successfully!');
}

/**
 * Post-process generated Zod schema to fix constraint placement
 */
async function postProcessZodSchema(schemaFile: string): Promise<void> {
  const content = fs.readFileSync(schemaFile, 'utf8');
  let fixedContent = content;

  // Fix complex union types that exceed TypeScript compiler limits
  // Add explicit type annotation for complex schemas
  if (
    schemaFile.includes('flows_product_category') ||
    schemaFile.includes('flows_elementary_category') ||
    schemaFile.includes('processes_category') ||
    schemaFile.includes('sources_category') ||
    schemaFile.includes('unitgroups_category') ||
    schemaFile.includes('lciamethods_category') ||
    schemaFile.includes('flowproperties_category') ||
    schemaFile.includes('contacts_category') ||
    schemaFile.includes('locations_category')
  ) {
    // Find all schema exports and add explicit type annotation
    fixedContent = fixedContent.replace(
      /export const (\w+Schema) = (z\.union\(\[[\s\S]*?\]\)|z\.literal\([^)]+\)(?:\.optional\(\))?);/g,
      'export const $1: z.ZodType<any> = $2;'
    );
  }

  // For tidas_data_types, apply manual optimizations instead of automatic fixes
  if (schemaFile.includes('tidas_data_types')) {
    console.log('   ℹ️  Applying manual optimizations for tidas_data_types');

    let manualOptimizations = applyLocalizedTextSchemaOverrides(content);
    manualOptimizations = applyCASNumberSchemaOverrides(manualOptimizations);

    manualOptimizations = manualOptimizations.replace(
      /export const StringMultiLangSchema = z\.union\(\[[\s\S]*?\]\);/,
      `const addRequiredMultiLangIssue = (
  value: unknown,
  ctx: z.RefinementCtx
) => {
  if (Array.isArray(value) && value.length === 0) {
    ctx.addIssue({
        code: 'custom',
      message: 'Required',
    });
  }
};

export const StringMultiLangSchema = z.union([
  z.array(LocalizedText500ItemSchema),
  LocalizedText500ItemSchema,
]);

export const RequiredStringMultiLangSchema =
  StringMultiLangSchema.superRefine(addRequiredMultiLangIssue);`
    );

    manualOptimizations = manualOptimizations.replace(
      /export const STMultiLangSchema = z\.union\(\[[\s\S]*?\]\);/,
      `export const STMultiLangSchema = z.union([
  z.array(LocalizedText1000ItemSchema),
  LocalizedText1000ItemSchema,
]);

export const RequiredSTMultiLangSchema =
  STMultiLangSchema.superRefine(addRequiredMultiLangIssue);`
    );

    manualOptimizations = manualOptimizations.replace(
      /export const FTMultiLangSchema = z\.union\(\[[\s\S]*?\]\);/,
      `export const FTMultiLangSchema = z.union([
  z.array(LocalizedTextItemSchema),
  LocalizedTextItemSchema,
]);

export const RequiredFTMultiLangSchema =
  FTMultiLangSchema.superRefine(addRequiredMultiLangIssue);`
    );

    manualOptimizations = applyCommonOtherSchemaOverrides(manualOptimizations);

    if (manualOptimizations !== content) {
      fs.writeFileSync(schemaFile, manualOptimizations, 'utf8');
      console.log(
        '   🔧 Applied manual optimizations to tidas_data_types.schema.ts'
      );
    }

    return; // Skip standard automatic fixes for this file
  }

  // Apply intelligent constraint fixes for all schemas
  // Pattern 1: Fix object-level constraints and move them to #text property
  const newContent1 = fixedContent.replace(
    /('#text':\s*z\.string\(\)),(\s*\}\)\s*\.max\((\d+)\))/g,
    "'#text': z.string().max($3),\n    }))"
  );

  // Pattern 2: Fix array-level constraints and move them to #text property within objects
  const newContent2 = newContent1.replace(
    /('#text':\s*z\.string\(\)),(\s*\}\)\s*\)\s*\.max\((\d+)\))/g,
    "'#text': z.string().max($3),\n    })\n  )"
  );

  // Pattern 3: Fix union-level constraints by identifying and replacing them
  const unionMaxPattern =
    /(\w+Schema = z\.union\(\[[\s\S]*?'#text':\s*z\.string\(\)[\s\S]*?\]\))\.max\((\d+)\);/g;
  const newContent3 = newContent2.replace(
    unionMaxPattern,
    (_, unionPart, maxValue) => {
      const fixedUnion = unionPart.replace(
        /('#text':\s*z\.string\(\))/g,
        `'#text': z.string().max(${maxValue})`
      );
      return `${fixedUnion};`;
    }
  );

  fixedContent = applyRequiredLocalizedTextSchemaOverrides(newContent3);
  if (schemaFile.endsWith('tidas_flows.schema.ts')) {
    fixedContent = applyFlowNameConditionOverride(fixedContent);
  }
  const hasChanges = fixedContent !== content;

  if (hasChanges) {
    fs.writeFileSync(schemaFile, fixedContent, 'utf8');
    console.log(
      `   🔧 Applied constraint fixes to ${path.basename(schemaFile)}`
    );
  }
}

function assertGeneratedDomainRefinements(schemaFile: string): void {
  const content = fs.readFileSync(schemaFile, 'utf8');
  const expectations = schemaFile.endsWith('tidas_data_types.schema.ts')
    ? [
        'CAS_NUMBER_CHECKSUM_ERROR_CODE',
        'localized_text_zh_must_include_chinese_character',
        'localized_text_en_must_not_contain_chinese_character',
        'export const RequiredStringMultiLangSchema',
        'export const RequiredSTMultiLangSchema',
        'export const RequiredFTMultiLangSchema',
        'commonOtherExtensionElementPattern',
        'z.ZodType<AnyXmlElement>',
      ]
    : schemaFile.endsWith('tidas_flows.schema.ts')
      ? ['FLOW_NAME_CONDITIONAL_FIELDS', '.superRefine((value, ctx) =>']
      : [];

  for (const expectation of expectations) {
    if (!content.includes(expectation)) {
      throw new Error(
        `${path.basename(schemaFile)} lost required domain refinement: ${expectation}`
      );
    }
  }
}

function applyFlowNameConditionOverride(content: string): string {
  if (content.includes('FLOW_NAME_CONDITIONAL_FIELDS')) {
    return content;
  }

  const finalSchemaEnd = '\n});\n';
  if (!content.endsWith(finalSchemaEnd)) {
    throw new Error(
      'Could not attach the Flow name conditional validator to FlowsSchema'
    );
  }
  const schemaStart = content.indexOf('export const FlowsSchema');
  if (schemaStart === -1) {
    throw new Error('Could not find FlowsSchema during Flow post-processing');
  }

  const condition = `
const FLOW_NAME_CONDITIONAL_FIELDS = [
  'treatmentStandardsRoutes',
  'mixAndLocationTypes',
] as const;

`;
  const refinedEnd = `
}).superRefine((value, ctx) => {
  const dataSet = value.flowDataSet;
  if (
    dataSet.modellingAndValidation.LCIMethod.typeOfDataSet ===
    'Elementary flow'
  ) {
    return;
  }

  const name = dataSet.flowInformation.dataSetInformation.name;
  for (const field of FLOW_NAME_CONDITIONAL_FIELDS) {
    if (name[field] === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: [
          'flowDataSet',
          'flowInformation',
          'dataSetInformation',
          'name',
          field,
        ],
        message: 'Required',
      });
    }
  }
});
`;

  return `${content.slice(0, schemaStart)}${condition}${content.slice(
    schemaStart,
    -finalSchemaEnd.length
  )}${refinedEnd}`;
}

function applyLocalizedTextSchemaOverrides(content: string): string {
  const languageImport = `import { TIDAS_LANGUAGE_CODES } from './../core/validation/tidas-languages';`;
  const localizedTextPrelude = `const chineseCharacterPattern = /[\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFAFF]/;
const LOCALIZED_TEXT_ZH_MUST_INCLUDE_CHINESE_CHARACTER_CODE =
  'localized_text_zh_must_include_chinese_character';
const LOCALIZED_TEXT_EN_MUST_NOT_CONTAIN_CHINESE_CHARACTER_CODE =
  'localized_text_en_must_not_contain_chinese_character';

export const TidasLanguageCodeSchema = z.enum(TIDAS_LANGUAGE_CODES);

const addLocalizedTextLanguageChecks = (
  value: { '@xml:lang': string; '#text': string },
  ctx: z.RefinementCtx
) => {
  const lang = value['@xml:lang'];
  const text = value['#text'];

  if (lang === 'zh' && !chineseCharacterPattern.test(text)) {
    ctx.addIssue({
      code: 'custom',
      path: ['#text'],
      message:
        "@xml:lang value 'zh' must include at least one Chinese character",
      params: {
        validationCode: LOCALIZED_TEXT_ZH_MUST_INCLUDE_CHINESE_CHARACTER_CODE,
      },
    });
  }

  if (lang === 'en' && chineseCharacterPattern.test(text)) {
    ctx.addIssue({
      code: 'custom',
      path: ['#text'],
      message:
        "@xml:lang value 'en' must not contain Chinese characters",
      params: {
        validationCode: LOCALIZED_TEXT_EN_MUST_NOT_CONTAIN_CHINESE_CHARACTER_CODE,
      },
    });
  }
};

const LocalizedTextItemBaseSchema = z.object({
  '@xml:lang': TidasLanguageCodeSchema,
  '#text': z.string(),
});

export const LocalizedTextItemSchema = LocalizedTextItemBaseSchema.superRefine(
  addLocalizedTextLanguageChecks
);`;

  let updatedContent = content;
  if (!updatedContent.includes("from './../core/validation/tidas-languages'")) {
    updatedContent = updatedContent.replace(
      "import { z } from 'zod';\n",
      `import { z } from 'zod';\n${languageImport}\n`
    );
  }

  updatedContent = replaceExportedSchema(
    updatedContent,
    'LocalizedTextItemSchema',
    localizedTextPrelude
  );

  updatedContent = replaceExportedSchema(
    updatedContent,
    'LocalizedText500ItemSchema',
    `export const LocalizedText500ItemSchema =
  LocalizedTextItemBaseSchema.extend({
    '#text': z.string().max(500),
  }).superRefine(addLocalizedTextLanguageChecks);`
  );

  if (
    updatedContent.includes(
      'export const AnnualSupplyOrProductionVolumeTextItemSchema'
    )
  ) {
    updatedContent = replaceExportedSchema(
      updatedContent,
      'AnnualSupplyOrProductionVolumeTextItemSchema',
      `export const AnnualSupplyOrProductionVolumeTextItemSchema =
  LocalizedTextItemBaseSchema.extend({
    '#text': z
      .string()
      .max(500)
      .regex(/^[+-]?(\\d+(\\.\\d*)?|\\.\\d+)([Ee][+-]?\\d+)?\\s+\\S.*$/),
  }).superRefine(addLocalizedTextLanguageChecks);`
    );
  }

  updatedContent = replaceExportedSchema(
    updatedContent,
    'LocalizedText1000ItemSchema',
    `export const LocalizedText1000ItemSchema =
  LocalizedTextItemBaseSchema.extend({
    '#text': z.string().max(1000),
  }).superRefine(addLocalizedTextLanguageChecks);`
  );

  return updatedContent;
}

function applyCASNumberSchemaOverrides(content: string): string {
  const helperImport = `import {
  CAS_NUMBER_CHECKSUM_ERROR_CODE,
  CAS_NUMBER_PATTERN,
  isValidCASNumber,
} from './../core/validation/cas-number';`;

  let updatedContent = content;
  if (!updatedContent.includes("from './../core/validation/cas-number'")) {
    updatedContent = updatedContent.replace(
      "import { z } from 'zod';\n",
      `import { z } from 'zod';\n${helperImport}\n`
    );
  }

  return replaceExportedSchema(
    updatedContent,
    'CASNumberSchema',
    `export const CASNumberSchema = z
  .string()
  .regex(CAS_NUMBER_PATTERN)
  .superRefine((value, ctx) => {
    if (!CAS_NUMBER_PATTERN.test(value) || isValidCASNumber(value)) {
      return;
    }

    ctx.addIssue({
      code: 'custom',
      message: 'CASNumber check digit is invalid',
      params: {
        validationCode: CAS_NUMBER_CHECKSUM_ERROR_CODE,
      },
    });
  });`
  );
}

function applyCommonOtherSchemaOverrides(content: string): string {
  const anyXmlElementTypeImport = `import { type AnyXmlElement } from './../types/tidas_data_types';`;
  const anyXmlElementSchema = `export const AnyXmlElementSchema: z.ZodType<AnyXmlElement> = z.lazy(() =>
  z.union([
    z.null(),
    z.string(),
    z.number(),
    z.boolean(),
    z.array(AnyXmlElementSchema),
    z.record(z.string(), AnyXmlElementSchema),
  ])
);`;

  const commonOtherSchema = `const commonOtherNamespaceDeclarationPattern =
  /^@xmlns(:[A-Za-z_][A-Za-z0-9_.-]*)?$/;
const commonOtherExtensionElementPattern =
  /^(?!(common|xmlns):)([A-Za-z_][A-Za-z0-9_.-]*:)?[A-Za-z_][A-Za-z0-9_.-]*$/;

export const CommonOtherSchema = z
  .record(z.string(), AnyXmlElementSchema)
  .superRefine((value, ctx) => {
    let hasExtensionElement = false;

    for (const [key, entryValue] of Object.entries(value)) {
      if (commonOtherNamespaceDeclarationPattern.test(key)) {
        if (typeof entryValue !== 'string') {
          ctx.addIssue({
            code: 'custom',
            path: [key],
            message: 'Namespace declarations in common:other must be strings',
          });
        }
        continue;
      }

      if (commonOtherExtensionElementPattern.test(key)) {
        hasExtensionElement = true;
        continue;
      }

      ctx.addIssue({
        code: 'custom',
        path: [key],
        message:
          'common:other entries must be namespace declarations or non-common extension elements',
      });
    }

    if (!hasExtensionElement) {
      ctx.addIssue({
        code: 'custom',
        message:
          'common:other must include at least one non-common extension element',
      });
    }
  });`;

  let updatedContent = content;
  if (!updatedContent.includes("from './../types/tidas_data_types'")) {
    updatedContent = updatedContent.replace(
      "import { z } from 'zod';\n",
      `import { z } from 'zod';\n${anyXmlElementTypeImport}\n`
    );
  }

  updatedContent = replaceExportedSchema(
    updatedContent,
    'AnyXmlElementSchema',
    anyXmlElementSchema
  );
  updatedContent = replaceExportedSchema(
    updatedContent,
    'CommonOtherSchema',
    commonOtherSchema
  );

  return updatedContent;
}

function applyRequiredLocalizedTextSchemaOverrides(content: string): string {
  let updatedContent = content;

  const requiredLocalizedTextSchemaMappings = [
    {
      baseSchemaName: 'StringMultiLangSchema',
      requiredSchemaName: 'RequiredStringMultiLangSchema',
    },
  ];

  for (const {
    baseSchemaName,
    requiredSchemaName,
  } of requiredLocalizedTextSchemaMappings) {
    updatedContent = updatedContent.replace(
      new RegExp(`(:\\s*)${baseSchemaName}(,)`, 'g'),
      `$1${requiredSchemaName}$2`
    );

    updatedContent = syncRequiredLocalizedTextSchemaImport(
      updatedContent,
      baseSchemaName,
      requiredSchemaName
    );
  }

  return updatedContent;
}

function syncRequiredLocalizedTextSchemaImport(
  content: string,
  baseSchemaName: string,
  requiredSchemaName: string
): string {
  const importEndMarker = "} from './tidas_data_types.schema';";
  const importEnd = content.indexOf(importEndMarker);
  const importStart =
    importEnd === -1 ? -1 : content.lastIndexOf('import {', importEnd);
  if (importStart === -1 || importEnd === -1) {
    return content;
  }
  const importBlock = content.slice(
    importStart,
    importEnd + importEndMarker.length
  );
  const importBody = importBlock.slice(
    'import {'.length,
    importBlock.indexOf(importEndMarker)
  );
  const importLines = importBody
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/,$/, ''));

  const contentWithoutImport = content.slice(
    content.indexOf(importBlock) + importBlock.length
  );
  const usesBaseSchema = hasIdentifierReference(
    contentWithoutImport,
    baseSchemaName
  );
  const usesRequiredSchema = hasIdentifierReference(
    contentWithoutImport,
    requiredSchemaName
  );

  if (!usesRequiredSchema) {
    return content;
  }

  if (!importLines.includes(requiredSchemaName)) {
    const baseImportIndex = importLines.indexOf(baseSchemaName);

    if (baseImportIndex >= 0) {
      importLines.splice(baseImportIndex + 1, 0, requiredSchemaName);
    } else {
      importLines.push(requiredSchemaName);
    }
  }

  if (!usesBaseSchema) {
    const baseImportIndex = importLines.indexOf(baseSchemaName);

    if (baseImportIndex >= 0) {
      importLines.splice(baseImportIndex, 1);
    }
  }

  const updatedImportBlock = `import {\n${importLines
    .map((line) => `  ${line},`)
    .join('\n')}\n} from './tidas_data_types.schema';`;

  return content.replace(importBlock, updatedImportBlock);
}

function hasIdentifierReference(content: string, identifier: string): boolean {
  const escapedIdentifier = identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escapedIdentifier}\\b`).test(content);
}

async function generateSchemasIndex(): Promise<void> {
  console.log('📋 Generating enhanced schemas index file...');

  const indexContent = `/**
 * Automatically generated index file for all Zod schemas
 * Generated directly from the locked TIDAS JSON Schema assets
 */

// Export all schemas

// Re-export commonly used schemas with simpler names
export { ContactsSchema as ContactSchema } from './tidas_contacts.schema';
export { SourcesSchema as SourceSchema } from './tidas_sources.schema';
export { FlowpropertiesSchema as FlowPropertySchema } from './tidas_flowproperties.schema';
export { UnitgroupsSchema as UnitGroupSchema } from './tidas_unitgroups.schema';
export { LciamethodsSchema as LCIAMethodSchema } from './tidas_lciamethods.schema';
export { LifecyclemodelsSchema as LifeCycleModelSchema } from './tidas_lifecyclemodels.schema';
export { FlowsSchema as FlowSchema } from './tidas_flows.schema';
export { ProcessesSchema as ProcessSchema } from './tidas_processes.schema';

// Export category/enum types (if schemas exist)
export { LocationsCategorySchema as LocationCategorySchema } from './tidas_locations_category.schema';
export { ContactSchema as ContactCategorySchema } from './tidas_contacts_category.schema';
export { FlowPropertySchema as FlowPropertyCategorySchema } from './tidas_flowproperties_category.schema';
export { FlowsElementaryCategorySchema as FlowElementaryCategorySchema } from './tidas_flows_elementary_category.schema';
export { FlowsProductCategorySchema as FlowProductCategorySchema } from './tidas_flows_product_category.schema';
export { LCIAMethodSchema as LCIAMethodCategorySchema } from './tidas_lciamethods_category.schema';
export { ProcessesCategorySchema as ProcessCategorySchema } from './tidas_processes_category.schema';
export { SourceSchema as SourceCategorySchema } from './tidas_sources_category.schema';
export { UnitGroupSchema as UnitGroupCategorySchema } from './tidas_unitgroups_category.schema';

// Export validation helper functions
import { z } from 'zod';

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: z.ZodError;
};

/**
 * Validate data against a Zod schema
 */
export function validateWithZod<T>(
  data: unknown,
  schema: z.ZodType<T>
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data
    };
  } else {
    return {
      success: false,
      error: result.error
    };
  }
}

/**
 * Parse and validate JSON data
 */
export function parseWithZod<T>(
  jsonData: string,
  schema: z.ZodType<T>
): ValidationResult<T> {
  try {
    const parsed = JSON.parse(jsonData);
    return validateWithZod(parsed, schema);
  } catch (error) {
    return {
      success: false,
      error: new z.ZodError([{
        code: 'custom',
        message: \`Invalid JSON: \${error instanceof Error ? error.message : 'Unknown error'}\`,
        path: [],
        input: jsonData
      }])
    };
  }
}

/**
 * Batch validate multiple objects
 */
export function validateBatch<T>(
  dataArray: unknown[],
  schema: z.ZodType<T>
): ValidationResult<T>[] {
  return dataArray.map(data => validateWithZod(data, schema));
}

/**
 * Create a validation method for object classes
 */
export function createValidationMethod<T>(schema: z.ZodType<T>) {
  return function validate(this: any): ValidationResult<T> {
    return validateWithZod(this.data || this._data, schema);
  };
}

/**
 * Create a static validation method for object classes
 */
export function createStaticValidationMethod<T>(schema: z.ZodType<T>) {
  return function validateWithSchema(data: unknown): ValidationResult<T> {
    return validateWithZod(data, schema);
  };
}
`;

  const indexFile = path.join(SCHEMAS_DIR, 'index.ts');
  fs.writeFileSync(indexFile, indexContent, 'utf8');
  console.log(`   ✅ Generated: ${indexFile}`);
}

// Run the generator and propagate failures to CI/release verification.
generateZodSchemas().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
