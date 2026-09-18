import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import path from 'node:path';
import {
  getAvailableTidasContractKinds,
  getTidasContractPack,
  getTidasMethodologyText,
  getTidasPublicRules,
  getTidasPublicRulesSchema,
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

  it('returns versioned public definitions without product execution policy', () => {
    assert.strictEqual(
      (
        getTidasPublicRulesSchema() as {
          properties?: { schema_version?: { const?: number } };
        }
      ).properties?.schema_version?.const,
      1
    );
    for (const kind of ['process', 'flow'] as const) {
      const selection = getTidasPublicRules(kind);
      assert.strictEqual(selection.status, 'covered');
      assert.strictEqual(selection.dataset_type, kind);
      assert.ok(selection.rules.length > 0);
      assert.strictEqual(
        selection.rules.every((rule) => rule.dataset_type === kind),
        true
      );
      for (const rule of selection.rules) {
        for (const productField of [
          'severity',
          'phase',
          'blocker',
          'waiver',
          'profile',
          'authorization',
        ]) {
          assert.strictEqual(productField in rule, false);
        }
      }
    }
  });

  it('distinguishes a valid uncovered kind from invalid input', () => {
    const uncovered = getTidasPublicRules('source');
    assert.deepStrictEqual(uncovered.rules, []);
    assert.strictEqual(uncovered.status, 'not-covered');
    assert.strictEqual(uncovered.dataset_type, 'source');
    assert.throws(
      () => getTidasPublicRules('unknown-kind'),
      /Unsupported TIDAS contract kind/
    );
  });

  it('binds the public index to the exact reviewed candidate digest', () => {
    const selection = getTidasPublicRules('flow');
    const indexPath = path.join(
      __dirname,
      'public-rules-assets',
      'public-rules.v1.json'
    );
    const digest = createHash('sha256')
      .update(readFileSync(indexPath))
      .digest('hex');
    assert.strictEqual(selection.source.index_sha256, digest);
    assert.match(selection.source.commit, /^[0-9a-f]{40}$/);
    assert.strictEqual(selection.source.status, 'reviewed-candidate');
  });

  it('keeps public rules separate from the legacy mixed ruleset', () => {
    const modern = getTidasContractPack('process', {
      include: ['schema', 'public-rules'],
      includeAiContext: true,
    });
    assert.strictEqual(modern.publicRules?.status, 'covered');
    assert.ok(modern.manifest.publicRules);
    assert.strictEqual(modern.runtimeRuleset, undefined);
    assert.strictEqual(modern.manifest.ruleset, null);
    assert.deepStrictEqual(modern.aiContext?.public_rules, modern.publicRules);

    const legacy = getTidasContractPack('process', { include: ['ruleset'] });
    assert.ok(legacy.runtimeRuleset);
    assert.strictEqual(legacy.publicRules, undefined);
    assert.strictEqual('publicRules' in legacy.manifest, false);
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
