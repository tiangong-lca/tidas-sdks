import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ProcessesSchema } from './tidas_processes.schema';

function exchangeLocationSchema() {
  return (ProcessesSchema as any).shape.processDataSet.shape.exchanges.shape
    .exchange.element.shape.location;
}

function processReviewSchema() {
  return (ProcessesSchema as any).shape.processDataSet.shape
    .modellingAndValidation.shape.validation.shape.review;
}

function processClassificationInformationSchema() {
  return (ProcessesSchema as any).shape.processDataSet.shape.processInformation
    .shape.dataSetInformation.shape.classificationInformation;
}

describe('process exchange location schema', () => {
  it('accepts location category codes and legacy non-empty strings', () => {
    const schema = exchangeLocationSchema();

    assert.strictEqual(schema.safeParse('CN').success, true);
    assert.strictEqual(schema.safeParse('GLO').success, true);
    assert.strictEqual(schema.safeParse('Legacy plant area').success, true);
  });

  it('rejects empty strings and localized text shapes', () => {
    const schema = exchangeLocationSchema();

    assert.strictEqual(schema.safeParse('').success, false);
    assert.strictEqual(
      schema.safeParse({ '@xml:lang': 'en', '#text': 'CN' }).success,
      false
    );
    assert.strictEqual(
      schema.safeParse([{ '@xml:lang': 'en', '#text': 'CN' }]).success,
      false
    );
  });
});

describe('process review conditional schema', () => {
  it('allows Not reviewed without review evidence', () => {
    assert.strictEqual(
      processReviewSchema().safeParse({ '@type': 'Not reviewed' }).success,
      true
    );
  });

  it('requires all four review evidence fields for a completed review', () => {
    const result = processReviewSchema().safeParse({
      '@type': 'Independent external review',
    });

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.deepStrictEqual(
        result.error.issues.map((issue: any) => issue.path.join('.')).sort(),
        [
          'common:referenceToCompleteReviewReport',
          'common:referenceToNameOfReviewerAndInstitution',
          'common:reviewDetails',
          'common:scope',
        ]
      );
    }
  });
});

describe('process classification dependency schema', () => {
  it('validates the whole classification item against the locked taxonomy', () => {
    const classification = (classId: string) => ({
      'common:classification': {
        'common:class': [
          {
            '@level': '0',
            '@classId': classId,
            '#text': 'Agriculture, forestry and fishing',
          },
        ],
      },
    });

    assert.strictEqual(
      processClassificationInformationSchema().safeParse(classification('A'))
        .success,
      true
    );
    const invalid = processClassificationInformationSchema().safeParse(
      classification('not-in-the-locked-taxonomy')
    );
    assert.strictEqual(invalid.success, false);
    if (!invalid.success) {
      assert.deepStrictEqual(invalid.error.issues[0]?.path, [
        'common:classification',
        'common:class',
        0,
      ]);
    }
  });
});
