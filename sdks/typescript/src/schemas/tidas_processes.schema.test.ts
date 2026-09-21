import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createProcess } from '../core/factories';
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

function processDataSetInformationShape() {
  return (ProcessesSchema as any).shape.processDataSet.shape.processInformation
    .shape.dataSetInformation.shape;
}

const localizedText = { '@xml:lang': 'en', '#text': 'Reviewed documentation' };
const reference = (type: 'contact data set' | 'source data set') => ({
  '@type': type,
  '@refObjectId': type === 'contact data set'
    ? '11111111-1111-1111-1111-111111111111'
    : '22222222-2222-2222-2222-222222222222',
  '@version': '01.00.000',
  '@uri': type === 'contact data set'
    ? '../contacts/11111111-1111-1111-1111-111111111111.xml'
    : '../sources/22222222-2222-2222-2222-222222222222.xml',
  'common:shortDescription': localizedText,
});

function completedProcessReview() {
  return {
    '@type': 'Independent external review',
    'common:scope': {
      '@name': 'Documentation',
      'common:method': { '@name': 'Documentation' },
    },
    'common:reviewDetails': localizedText,
    'common:referenceToNameOfReviewerAndInstitution': reference('contact data set'),
  };
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

  it('keeps the three remaining review evidence fields required', () => {
    const result = processReviewSchema().safeParse({
      '@type': 'Independent external review',
    });

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.deepStrictEqual(
        result.error.issues.map((issue: any) => issue.path.join('.')).sort(),
        [
          'common:referenceToNameOfReviewerAndInstitution',
          'common:reviewDetails',
          'common:scope',
        ]
      );
    }
  });

  it('accepts an omitted or valid report reference and rejects an incomplete one', () => {
    const schema = processReviewSchema();
    const review = completedProcessReview();
    assert.strictEqual(schema.safeParse(review).success, true);
    assert.strictEqual(
      schema.safeParse({
        ...review,
        'common:referenceToCompleteReviewReport': reference('source data set'),
      }).success,
      true
    );
    assert.strictEqual(
      schema.safeParse({
        ...review,
        'common:referenceToCompleteReviewReport': {
          '@refObjectId': '22222222-2222-2222-2222-222222222222',
        },
      }).success,
      false
    );
  });

  it('accepts singleton and ordered non-empty review arrays', () => {
    const schema = processReviewSchema();
    const first = completedProcessReview();
    const second = {
      ...completedProcessReview(),
      '@type': 'Independent internal review',
      'common:reviewDetails': {
        '@xml:lang': 'en',
        '#text': 'Reviewed calculations',
      },
    };

    assert.strictEqual(schema.safeParse(first).success, true);
    const result = schema.safeParse([first, second]);
    assert.strictEqual(result.success, true);
    if (result.success) {
      assert.deepStrictEqual(
        result.data.map((review: any) => review['@type']),
        ['Independent external review', 'Independent internal review']
      );
    }
    assert.strictEqual(schema.safeParse([]).success, false);
  });

  it('reports an invalid second review at index 1', () => {
    const result = processReviewSchema().safeParse([
      completedProcessReview(),
      { '@type': 'Independent external review' },
    ]);

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.deepStrictEqual(
        result.error.issues.map((issue: any) => issue.path.join('.')).sort(),
        [
          '1.common:referenceToNameOfReviewerAndInstitution',
          '1.common:reviewDetails',
          '1.common:scope',
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

describe('process required general comment schema', () => {
  it('rejects an empty required comment and accepts localized text', () => {
    const shape = processDataSetInformationShape();

    assert.strictEqual(
      shape['common:generalComment'].safeParse([]).success,
      false
    );
    assert.strictEqual(
      shape['common:generalComment'].safeParse(localizedText).success,
      true
    );
    assert.strictEqual(
      shape['common:synonyms'].safeParse(undefined).success,
      true
    );
  });

  it('reports a missing comment after Process defaults materialize it as empty', () => {
    const process = createProcess({} as any);
    const result = process.validateEnhanced();

    assert.strictEqual(result.success, false);
    assert.ok(
      result.validationIssues.some(
        (issue) =>
          issue.path.join('.') ===
          'processDataSet.processInformation.dataSetInformation.common:generalComment'
      )
    );
  });
});
