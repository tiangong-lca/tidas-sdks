import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

interface IssueLike {
  code: string;
  params?: Record<string, unknown>;
  path: PropertyKey[];
}

type ParseResult =
  { success: true } | { error: { issues: IssueLike[] }; success: false };

interface SchemaLike {
  element?: SchemaLike;
  safeParse(value: unknown): ParseResult;
  shape?: Record<string, SchemaLike>;
}

interface SchemaModules {
  dataTypes: Record<string, SchemaLike>;
  flows: Record<string, SchemaLike>;
  processes: Record<string, SchemaLike>;
  sources: Record<string, SchemaLike>;
}

interface ParityCase {
  name: string;
  parse(modules: SchemaModules): ParseResult;
}

interface ParseSignature {
  issues: Array<{
    code: string;
    path: string;
    validationCode?: unknown;
  }>;
  success: boolean;
}

interface FlowFixture {
  flowDataSet: {
    flowInformation: {
      dataSetInformation: {
        'common:synonyms': Array<{ '#text': string }>;
        name: {
          baseName: Array<{ '#text': string }>;
          mixAndLocationTypes?: Array<{
            '#text': string;
            '@xml:lang': string;
          }>;
          treatmentStandardsRoutes?: Array<{
            '#text': string;
            '@xml:lang': string;
          }>;
        };
      };
    };
    modellingAndValidation: {
      LCIMethod: { typeOfDataSet: string };
    };
  };
  [key: string]: unknown;
}

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const DEFAULT_BASELINE_DIR = path.join(PACKAGE_ROOT, 'dist/schemas');
const DEFAULT_CANDIDATE_DIR = path.join(PACKAGE_ROOT, 'src/.zod-candidate');
const GENERATOR_ENTRYPOINT = path.join(
  PACKAGE_ROOT,
  'scripts/generate-zod-schemas.ts'
);
const FLOW_FIXTURE = path.resolve(
  PACKAGE_ROOT,
  '../python/tests/fixtures/flow-validation-parity.json'
);

async function main(): Promise<void> {
  const baselineDir = path.resolve(
    process.env.TIDAS_ZOD_BASELINE_DIR ?? DEFAULT_BASELINE_DIR
  );
  const explicitCandidateDir = process.env.TIDAS_ZOD_CANDIDATE_DIR;
  const candidateDir = path.resolve(
    explicitCandidateDir ?? DEFAULT_CANDIDATE_DIR
  );
  const ownsCandidateDir = explicitCandidateDir === undefined;

  try {
    if (ownsCandidateDir) {
      generateCandidateSchemas(candidateDir);
    }

    requireSchemaDirectory(
      baselineDir,
      'Run the baseline release verification/build before parity verification.'
    );
    requireSchemaDirectory(
      candidateDir,
      'Set TIDAS_ZOD_CANDIDATE_DIR to a generated schema directory or omit it for automatic generation.'
    );

    const [baseline, candidate] = await Promise.all([
      loadSchemaModules(baselineDir, detectSchemaExtension(baselineDir)),
      loadSchemaModules(candidateDir, detectSchemaExtension(candidateDir)),
    ]);

    const failures: Array<{
      baseline: ParseSignature;
      candidate: ParseSignature;
      name: string;
    }> = [];

    for (const parityCase of buildParityCases()) {
      const baselineSignature = signature(parityCase.parse(baseline));
      const candidateSignature = signature(parityCase.parse(candidate));
      try {
        assert.deepStrictEqual(candidateSignature, baselineSignature);
        console.log(`✅ ${parityCase.name}`);
      } catch {
        failures.push({
          baseline: baselineSignature,
          candidate: candidateSignature,
          name: parityCase.name,
        });
        console.error(`❌ ${parityCase.name}`);
      }
    }

    if (failures.length > 0) {
      throw new Error(
        `Generated Zod parity failed:\n${JSON.stringify(failures, null, 2)}`
      );
    }

    console.log('Zod generation parity verified.');
  } finally {
    if (ownsCandidateDir) {
      fs.rmSync(candidateDir, { force: true, recursive: true });
    }
  }
}

function generateCandidateSchemas(candidateDir: string): void {
  if (candidateDir !== DEFAULT_CANDIDATE_DIR) {
    throw new Error(
      `Refusing to manage an unexpected automatic candidate directory: ${candidateDir}`
    );
  }

  fs.rmSync(candidateDir, { force: true, recursive: true });
  console.log(`Generating parity candidate in ${candidateDir}...`);
  execFileSync(process.execPath, ['--import', 'tsx', GENERATOR_ENTRYPOINT], {
    cwd: PACKAGE_ROOT,
    env: {
      ...process.env,
      TIDAS_ZOD_OUTPUT_DIR: candidateDir,
    },
    stdio: 'inherit',
  });
}

function buildParityCases(): ParityCase[] {
  const validCommonOther = {
    '@xmlns:ext': 'https://example.com/tidas/extensions',
    'ext:note': { '#text': 'Carbon dioxide', '@xml:lang': 'en' },
  };

  return [
    dataTypeCase(
      'CAS accepts a valid check digit',
      'CASNumberSchema',
      '64-17-5'
    ),
    dataTypeCase(
      'CAS rejects an invalid check digit with the same validation code',
      'CASNumberSchema',
      '64-17-6'
    ),
    dataTypeCase('CAS rejects invalid syntax', 'CASNumberSchema', '2023600'),
    dataTypeCase(
      'localized English text accepts Latin script',
      'LocalizedTextItemSchema',
      { '@xml:lang': 'en', '#text': 'English title' }
    ),
    dataTypeCase(
      'localized Chinese text rejects a Latin-only value at the same path',
      'LocalizedTextItemSchema',
      { '@xml:lang': 'zh', '#text': 'English only' }
    ),
    dataTypeCase(
      'localized English text rejects Chinese characters at the same path',
      'LocalizedTextItemSchema',
      { '@xml:lang': 'en', '#text': '中文' }
    ),
    dataTypeCase(
      'localized text rejects a language outside the TIDAS enum',
      'LocalizedTextItemSchema',
      { '@xml:lang': 'en-US', '#text': 'English title' }
    ),
    dataTypeCase(
      'common:other accepts a namespace and extension element',
      'CommonOtherSchema',
      validCommonOther
    ),
    dataTypeCase(
      'common:other rejects a legacy string',
      'CommonOtherSchema',
      'Carbon dioxide'
    ),
    dataTypeCase(
      'common:other rejects namespace-only content at the same path',
      'CommonOtherSchema',
      { '@xmlns:ext': 'https://example.com/tidas/extensions' }
    ),
    flowCase(
      'Flow accepts the existing elementary fixture',
      (payload) => payload
    ),
    flowCase('Flow reports both missing product name qualifiers', (payload) => {
      payload.flowDataSet.modellingAndValidation.LCIMethod.typeOfDataSet =
        'Product flow';
      return payload;
    }),
    flowCase(
      'Flow accepts product name qualifiers when both exist',
      (payload) => {
        payload.flowDataSet.modellingAndValidation.LCIMethod.typeOfDataSet =
          'Product flow';
        const name =
          payload.flowDataSet.flowInformation.dataSetInformation.name;
        name.treatmentStandardsRoutes = [
          { '@xml:lang': 'en', '#text': 'technical grade' },
        ];
        name.mixAndLocationTypes = [{ '@xml:lang': 'en', '#text': 'at plant' }];
        return payload;
      }
    ),
    nestedCase(
      'Process accepts a current location code',
      processLocationSchema,
      'CN'
    ),
    nestedCase(
      'Process preserves a legacy non-empty location string',
      processLocationSchema,
      'Legacy plant area'
    ),
    nestedCase(
      'Process rejects an empty location at the same path',
      processLocationSchema,
      ''
    ),
    nestedCase(
      'Source accepts an external relative file locator',
      sourceDigitalFileSchema,
      { '@uri': '../reports/source file.pdf' }
    ),
    nestedCase(
      'Source accepts a list of external file locators',
      sourceDigitalFileSchema,
      [{ '@uri': 'https://example.com/report.pdf' }]
    ),
    nestedCase(
      'Source rejects a scalar external file locator at the same path',
      sourceDigitalFileSchema,
      '../reports/source.pdf'
    ),
  ];
}

function dataTypeCase(
  name: string,
  exportName: string,
  value: unknown
): ParityCase {
  return {
    name,
    parse: (modules) =>
      requireSchema(modules.dataTypes, exportName).safeParse(value),
  };
}

function flowCase(
  name: string,
  mutate: (payload: FlowFixture) => FlowFixture
): ParityCase {
  return {
    name,
    parse: (modules) =>
      requireSchema(modules.flows, 'FlowsSchema').safeParse(
        mutate(loadElementaryFlow())
      ),
  };
}

function nestedCase(
  name: string,
  selectSchema: (modules: SchemaModules) => SchemaLike,
  value: unknown
): ParityCase {
  return {
    name,
    parse: (modules) => selectSchema(modules).safeParse(value),
  };
}

function processLocationSchema(modules: SchemaModules): SchemaLike {
  return requireShape(
    requireElement(
      requireShape(
        requireShape(
          requireShape(
            requireSchema(modules.processes, 'ProcessesSchema'),
            'processDataSet'
          ),
          'exchanges'
        ),
        'exchange'
      )
    ),
    'location'
  );
}

function sourceDigitalFileSchema(modules: SchemaModules): SchemaLike {
  return requireShape(
    requireShape(
      requireShape(
        requireShape(
          requireSchema(modules.sources, 'SourcesSchema'),
          'sourceDataSet'
        ),
        'sourceInformation'
      ),
      'dataSetInformation'
    ),
    'referenceToDigitalFile'
  );
}

function loadElementaryFlow(): FlowFixture {
  const payload = JSON.parse(
    fs.readFileSync(FLOW_FIXTURE, 'utf8')
  ) as FlowFixture;
  payload.flowDataSet.modellingAndValidation.LCIMethod.typeOfDataSet =
    'Elementary flow';
  const information = payload.flowDataSet.flowInformation.dataSetInformation;
  information.name.baseName[0]['#text'] = 'Production from pyrolysis';
  information['common:synonyms'][0]['#text'] = 'tar; syngas; char';
  return payload;
}

async function loadSchemaModules(
  directory: string,
  extension: '.js' | '.ts'
): Promise<SchemaModules> {
  const load = async (baseName: string): Promise<Record<string, SchemaLike>> =>
    (await import(
      pathToFileURL(path.join(directory, `${baseName}${extension}`)).href
    )) as Record<string, SchemaLike>;

  const [dataTypes, flows, processes, sources] = await Promise.all([
    load('tidas_data_types.schema'),
    load('tidas_flows.schema'),
    load('tidas_processes.schema'),
    load('tidas_sources.schema'),
  ]);
  return { dataTypes, flows, processes, sources };
}

function signature(result: ParseResult): ParseSignature {
  if (result.success) {
    return { success: true, issues: [] };
  }

  return {
    success: false,
    issues: result.error.issues.map((issue) => ({
      code: issue.code,
      path: issue.path.map(String).join('.'),
      ...(issue.params?.validationCode === undefined
        ? {}
        : { validationCode: issue.params.validationCode }),
    })),
  };
}

function requireSchema(
  module: Record<string, SchemaLike>,
  exportName: string
): SchemaLike {
  const schema = module[exportName];
  if (!schema?.safeParse) {
    throw new Error(`Missing Zod schema export ${exportName}`);
  }
  return schema;
}

function requireShape(schema: SchemaLike, property: string): SchemaLike {
  const child = schema.shape?.[property];
  if (!child) {
    throw new Error(`Missing Zod object shape property ${property}`);
  }
  return child;
}

function requireElement(schema: SchemaLike): SchemaLike {
  if (!schema.element) {
    throw new Error('Expected a Zod array element schema');
  }
  return schema.element;
}

function detectSchemaExtension(directory: string): '.js' | '.ts' {
  if (fs.existsSync(path.join(directory, 'tidas_data_types.schema.ts'))) {
    return '.ts';
  }
  if (fs.existsSync(path.join(directory, 'tidas_data_types.schema.js'))) {
    return '.js';
  }
  throw new Error(`Could not detect generated schema modules in ${directory}`);
}

function requireSchemaDirectory(directory: string, hint: string): void {
  if (
    !fs.existsSync(path.join(directory, 'tidas_data_types.schema.ts')) &&
    !fs.existsSync(path.join(directory, 'tidas_data_types.schema.js'))
  ) {
    throw new Error(`Missing schema oracle/candidate at ${directory}. ${hint}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
