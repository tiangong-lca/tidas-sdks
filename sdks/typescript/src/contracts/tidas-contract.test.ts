import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getAvailableTidasContractKinds,
  getTidasContractPack,
  getTidasMethodologyText,
  getTidasRuntimeRuleset,
  getTidasSchemaText,
  normalizeTidasContractKind,
} from './tidas-contract';

describe('TIDAS contract helpers', () => {
  it('normalizes singular, plural, and dashed kind aliases', () => {
    assert.strictEqual(normalizeTidasContractKind('processes'), 'process');
    assert.strictEqual(
      normalizeTidasContractKind('life-cycle-model'),
      'lifecyclemodel'
    );
    assert.ok(getAvailableTidasContractKinds().includes('flow'));
  });

  it('returns full schema text for process and flow contracts', () => {
    assert.ok('properties' in JSON.parse(getTidasSchemaText('process')));
    assert.ok('properties' in JSON.parse(getTidasSchemaText('flow')));
  });

  it('returns bundled methodology YAML text where available', () => {
    assert.ok(
      getTidasMethodologyText('process')?.includes(
        'Process Dataset Content Rules'
      )
    );
    assert.ok(
      getTidasMethodologyText('flow')?.includes('Flow Dataset Content Rules')
    );
    assert.strictEqual(getTidasMethodologyText('source'), null);
  });

  it('filters runtime rulesets by canonical kind', () => {
    const processRuleset = getTidasRuntimeRuleset('process') as {
      rules?: Array<{ dataset_type?: string }>;
    };
    assert.ok((processRuleset.rules?.length ?? 0) > 0);
    assert.strictEqual(
      processRuleset.rules?.every((rule) => rule.dataset_type === 'process'),
      true
    );
    assert.strictEqual(getTidasRuntimeRuleset('source'), null);
  });

  it('builds a reproducible AI context pack manifest', () => {
    const pack = getTidasContractPack('process', {
      profile: 'ai-import',
      includeAiContext: true,
    });

    assert.strictEqual(pack.manifest.kind, 'process');
    assert.strictEqual(pack.manifest.profile, 'ai-import');
    assert.match(pack.manifest.schema?.sha256 ?? '', /^[a-f0-9]{64}$/);
    assert.match(pack.manifest.methodology?.sha256 ?? '', /^[a-f0-9]{64}$/);
    assert.match(pack.manifest.ruleset?.sha256 ?? '', /^[a-f0-9]{64}$/);
    assert.ok(pack.aiContext?.instructions.join(' ').includes('Foundry'));
  });
});
