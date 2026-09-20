import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  copyEilcdAssets,
  copyTidasAssets,
  resolveRuntimeAssetDir,
  resolveRuntimeAssetsDir,
} from './runtime-assets';

function makeTempDir(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

describe('runtime asset helpers', () => {
  it('resolves the packaged runtime asset directories', () => {
    const runtimeAssetsDir = resolveRuntimeAssetsDir();
    const eilcdDir = resolveRuntimeAssetDir('eilcd');
    const tidasDir = resolveRuntimeAssetDir('tidas');

    assert.strictEqual(fs.existsSync(runtimeAssetsDir), true);
    assert.strictEqual(fs.existsSync(path.join(eilcdDir, 'schemas')), true);
    assert.strictEqual(fs.existsSync(path.join(tidasDir, 'schemas')), true);
  });

  it('copies eilcd asset contents into the output root', async () => {
    const outputDir = makeTempDir('tidas-sdk-eilcd-assets-');

    await copyEilcdAssets(outputDir);

    assert.strictEqual(fs.existsSync(path.join(outputDir, 'schemas')), true);
    assert.strictEqual(
      fs.existsSync(path.join(outputDir, 'stylesheets')),
      true
    );
    assert.strictEqual(fs.existsSync(path.join(outputDir, 'eilcd')), false);
  });

  it('copies tidas asset contents into the output root', async () => {
    const outputDir = makeTempDir('tidas-sdk-tidas-assets-');

    await copyTidasAssets(outputDir);

    assert.strictEqual(fs.existsSync(path.join(outputDir, 'schemas')), true);
    assert.strictEqual(
      fs.existsSync(path.join(outputDir, 'methodologies')),
      true
    );
    assert.strictEqual(fs.existsSync(path.join(outputDir, 'tidas')), false);
  });

  it('packages the Rust asset lock and the versioned 10-node taxonomy extension', () => {
    const runtimeAssetsDir = resolveRuntimeAssetsDir();
    const lock = JSON.parse(
      fs.readFileSync(path.join(runtimeAssetsDir, 'asset-lock.v1.json'), 'utf8')
    ) as {
      schema_version: string;
      sdk_projection?: {
        schema_version: string;
        excluded_source_paths: string[];
      };
      entries: Array<{
        path: string;
        kind: string;
        sha256: string;
        bytes: number;
      }>;
    };
    const extensionEntry = lock.entries.find(
      (entry) =>
        entry.kind === 'methodology' &&
        path.posix.basename(entry.path) ===
          'elementary_flow_taxonomy_extension.v1.json'
    );
    const extensionPath = path.join(
      runtimeAssetsDir,
      'tidas/methodologies/elementary_flow_taxonomy_extension.v1.json'
    );
    const extensionBytes = fs.readFileSync(extensionPath);
    const extension = JSON.parse(extensionBytes.toString('utf8')) as {
      schema_version: string;
      taxonomy_id: string;
      taxonomy_version: number;
      base_taxonomy: { node_count: number };
      nodes: Array<{ cat_id: string }>;
    };
    const effectiveSchema = JSON.parse(
      fs.readFileSync(
        path.join(
          runtimeAssetsDir,
          'tidas/schemas/tidas_flows_elementary_category.json'
        ),
        'utf8'
      )
    ) as { oneOf: unknown[] };

    assert.strictEqual(lock.schema_version, 'tidas.asset-lock.v1');
    assert.strictEqual(lock.entries.length, 78);
    assert.deepStrictEqual(lock.sdk_projection?.excluded_source_paths, [
      'assets/tidas/methodologies/runtime_rulesets.json',
      'assets/tidas/methodologies/runtime_rulesets.schema.json',
    ]);
    assert.strictEqual(
      lock.entries.some((entry) => entry.path.includes('runtime_rulesets')),
      false
    );
    assert.strictEqual(
      fs.existsSync(
        path.join(runtimeAssetsDir, 'tidas/methodologies/runtime_rulesets.json')
      ),
      false
    );
    assert.notStrictEqual(extensionEntry, undefined);
    assert.strictEqual(extensionBytes.length, extensionEntry?.bytes ?? -1);
    assert.strictEqual(
      createHash('sha256').update(extensionBytes).digest('hex'),
      extensionEntry?.sha256
    );
    assert.deepStrictEqual(
      {
        schema_version: extension.schema_version,
        taxonomy_id: extension.taxonomy_id,
        taxonomy_version: extension.taxonomy_version,
        base_taxonomy: { node_count: extension.base_taxonomy.node_count },
      },
      {
        schema_version: 'tidas.elementary-flow-taxonomy-extension.v1',
        taxonomy_id: 'tidas-ef-extension',
        taxonomy_version: 1,
        base_taxonomy: { node_count: 55 },
      }
    );
    assert.strictEqual(extension.nodes.length, 10);
    assert.strictEqual(effectiveSchema.oneOf.length, 65);
  });
});
