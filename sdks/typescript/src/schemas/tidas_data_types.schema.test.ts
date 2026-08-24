import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  AnnualSupplyOrProductionVolumeMultiLangSchema,
  AnnualSupplyOrProductionVolumeTextItemSchema,
  CASNumberSchema,
  CommonOtherSchema,
  TidasLanguageCodeSchema,
  LocalizedTextItemSchema,
} from './tidas_data_types.schema';
import { ValidationUtils } from '../core/config/ValidationConfig';

describe('CASNumberSchema', () => {
  it('accepts CAS numbers with a valid check digit', () => {
    assert.strictEqual(CASNumberSchema.safeParse('64-17-5').success, true);
    assert.strictEqual(CASNumberSchema.safeParse('007732-18-5').success, true);
  });

  it('rejects invalid format and invalid check digits', () => {
    assert.strictEqual(CASNumberSchema.safeParse('2023600').success, false);

    const result = CASNumberSchema.safeParse('64-17-6');

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.strictEqual(
        ValidationUtils.normalizeIssues(result.error.issues)[0]?.code,
        'cas_number_checksum_error'
      );
    }
  });
});

describe('CommonOtherSchema', () => {
  it('accepts namespace declarations plus non-common extension elements', () => {
    const result = CommonOtherSchema.safeParse({
      '@xmlns:ext': 'https://example.com/tidas/extensions',
      'ext:note': {
        '#text': 'Carbon dioxide',
        '@xml:lang': 'en',
      },
    });

    assert.strictEqual(result.success, true);
  });

  it('rejects legacy string common:other values', () => {
    const result = CommonOtherSchema.safeParse('Carbon dioxide');

    assert.strictEqual(result.success, false);
  });

  it('rejects namespace-only and common-prefixed entries', () => {
    assert.strictEqual(
      CommonOtherSchema.safeParse({
        '@xmlns:ext': 'https://example.com/tidas/extensions',
      }).success,
      false
    );

    assert.strictEqual(
      CommonOtherSchema.safeParse({
        'common:note': 'Carbon dioxide',
      }).success,
      false
    );
  });
});

describe('LocalizedTextItemSchema', () => {
  it('accepts TIDAS language enumeration values', () => {
    assert.strictEqual(TidasLanguageCodeSchema.safeParse('en').success, true);
    assert.strictEqual(TidasLanguageCodeSchema.safeParse('de').success, true);
    assert.strictEqual(TidasLanguageCodeSchema.safeParse('zh').success, true);
    assert.strictEqual(
      LocalizedTextItemSchema.safeParse({
        '@xml:lang': 'de',
        '#text': 'Deutscher Titel',
      }).success,
      true
    );
  });

  it('rejects language codes outside the TIDAS enumeration', () => {
    const result = LocalizedTextItemSchema.safeParse({
      '@xml:lang': 'en-US',
      '#text': 'English title',
    });

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.strictEqual(
        ValidationUtils.normalizeIssues(result.error.issues)[0]?.code,
        'localized_text_language_not_in_tidas_enum'
      );
    }
  });

  it('checks scripts only for exact zh and en language codes', () => {
    assert.strictEqual(
      LocalizedTextItemSchema.safeParse({
        '@xml:lang': 'zh',
        '#text': 'English only',
      }).success,
      false
    );
    assert.strictEqual(
      LocalizedTextItemSchema.safeParse({
        '@xml:lang': 'en',
        '#text': '中文',
      }).success,
      false
    );
  });
});

describe('AnnualSupplyOrProductionVolumeMultiLangSchema', () => {
  it('accepts localized annual volume text with numeric prefix and suffix', () => {
    assert.strictEqual(
      AnnualSupplyOrProductionVolumeTextItemSchema.safeParse({
        '@xml:lang': 'en',
        '#text': '12.5 kg reference flow',
      }).success,
      true
    );

    assert.strictEqual(
      AnnualSupplyOrProductionVolumeMultiLangSchema.safeParse([
        {
          '@xml:lang': 'en',
          '#text': '12.5 kg reference flow',
        },
      ]).success,
      true
    );
  });

  it('rejects numeric text without suffix context', () => {
    assert.strictEqual(
      AnnualSupplyOrProductionVolumeTextItemSchema.safeParse({
        '@xml:lang': 'en',
        '#text': '12.5',
      }).success,
      false
    );
  });
});
