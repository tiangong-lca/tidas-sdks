import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import bundledMethodologies from '../data/bundled-methodologies.json';
import {
  compareMethodologyWithSchema,
  validateBundledMethodologies,
} from './methodology-schema-parity';

describe('methodology-schema parity tools', () => {
  it('mirrors the Python methodology/schema comparison rules on synthetic input', () => {
    const methodology = {
      metadata: {
        ignored: true,
      },
      global_rules: {
        ignored: true,
      },
      processDataSet: {
        '<rules>': {
          ignored: true,
        },
        processInformation: {
          dataSetInformation: {
            uuid: {},
            customOnly: {},
          },
        },
        exchanges: {
          exchange: {
            meanAmount: {},
          },
        },
      },
    };

    const schema = {
      type: 'object',
      properties: {
        processDataSet: {
          type: 'object',
          properties: {
            processInformation: {
              type: 'object',
              properties: {
                dataSetInformation: {
                  type: 'object',
                  properties: {
                    'common:UUID': {
                      type: 'string',
                    },
                  },
                },
              },
            },
            exchanges: {
              type: 'object',
              properties: {
                exchange: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      meanAmount: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
            missingTop: {
              type: 'string',
            },
          },
        },
      },
    };

    const result = compareMethodologyWithSchema(methodology, schema);

    assert.deepStrictEqual(result.errors, []);
    for (const expectedWarning of [
      "Field 'processDataSet.processInformation.dataSetInformation.customOnly' in YAML methodology not found in schema",
      "Schema field 'processDataSet.missingTop' not covered in YAML methodology",
    ]) {
      assert.ok(result.warnings.includes(expectedWarning));
    }
    assert.strictEqual(result.warnings.length, 2);
  });

  it('validates the bundled methodologies against bundled runtime schemas', () => {
    const report = validateBundledMethodologies();
    const methodologyKeys = Object.keys(
      bundledMethodologies.methodologies ?? {}
    ).sort();

    assert.strictEqual(report.ok, true);
    assert.strictEqual(report.summary.file_count, methodologyKeys.length);
    assert.strictEqual(report.summary.error_count, 0);
    assert.deepStrictEqual(
      report.files.map((file) => file.methodology_key),
      methodologyKeys
    );
    const firstReport = report.files.find(
      (file) => file.methodology_key === methodologyKeys[0]
    );
    assert.ok(firstReport);
    assert.match(firstReport.methodology_file, /^tidas_.+\.yaml$/);
    assert.match(firstReport.schema_file, /^tidas_.+\.json$/);
    assert.match(firstReport.status, /^(ok|warning)$/);
    assert.deepStrictEqual(firstReport.errors, []);
    assert.ok(Array.isArray(firstReport.warnings));
  });
});
