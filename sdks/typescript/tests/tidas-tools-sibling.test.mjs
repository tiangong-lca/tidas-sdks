import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  resolveTidasToolsRepoRoot,
  tidasToolsCandidateRoots,
} from '../scripts/resolve-tidas-tools-path.ts';

function writeToolsCheckout(directory) {
  mkdirSync(path.join(directory, 'assets'), { recursive: true });
  const lock = {
    schema_version: 'tidas.asset-lock.v1',
    source_roots: ['assets/tidas'],
    entries: [],
  };
  writeFileSync(
    path.join(directory, 'assets', 'asset-lock.v1.json'),
    JSON.stringify(lock)
  );
}

function withExplicitToolsPath(value, body) {
  const previous = process.env.TIDAS_TOOLS_PATH;
  if (value === undefined) {
    delete process.env.TIDAS_TOOLS_PATH;
  } else {
    process.env.TIDAS_TOOLS_PATH = value;
  }
  try {
    return body();
  } finally {
    if (previous === undefined) {
      delete process.env.TIDAS_TOOLS_PATH;
    } else {
      process.env.TIDAS_TOOLS_PATH = previous;
    }
  }
}

test('candidate roots keep the explicit input first and the canonical layout before the legacy one', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tg-sdk-candidates-'));
  const sdkRoot = path.join(dir, 'tidas-sdks');
  const explicit = path.join(dir, 'explicit');
  try {
    withExplicitToolsPath(explicit, () => {
      assert.deepEqual(tidasToolsCandidateRoots(sdkRoot), [
        explicit,
        path.join(sdkRoot, 'tidas-toolkit'),
        path.join(dir, 'tidas-toolkit'),
        path.join(sdkRoot, 'tidas-tools'),
        path.join(dir, 'tidas-tools'),
      ]);
    });

    withExplicitToolsPath(undefined, () => {
      assert.deepEqual(tidasToolsCandidateRoots(sdkRoot), [
        path.join(sdkRoot, 'tidas-toolkit'),
        path.join(dir, 'tidas-toolkit'),
        path.join(sdkRoot, 'tidas-tools'),
        path.join(dir, 'tidas-tools'),
      ]);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('resolution prefers the canonical sibling checkout and keeps the legacy layout', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tg-sdk-sibling-'));
  const sdkRoot = path.join(dir, 'tidas-sdks');
  const canonical = path.join(dir, 'tidas-toolkit');
  const legacy = path.join(dir, 'tidas-tools');
  try {
    mkdirSync(sdkRoot, { recursive: true });
    writeToolsCheckout(canonical);
    writeToolsCheckout(legacy);

    withExplicitToolsPath(undefined, () => {
      assert.equal(resolveTidasToolsRepoRoot(sdkRoot), canonical);

      rmSync(canonical, { recursive: true, force: true });
      assert.equal(
        resolveTidasToolsRepoRoot(sdkRoot),
        legacy,
        'checkouts that predate the rename still resolve their sibling checkout'
      );
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('an explicit TIDAS_TOOLS_PATH wins over every sibling layout', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tg-sdk-explicit-'));
  const sdkRoot = path.join(dir, 'tidas-sdks');
  const explicit = path.join(dir, 'explicit');
  try {
    mkdirSync(sdkRoot, { recursive: true });
    writeToolsCheckout(path.join(dir, 'tidas-toolkit'));
    writeToolsCheckout(explicit);

    withExplicitToolsPath(explicit, () => {
      assert.equal(resolveTidasToolsRepoRoot(sdkRoot), explicit);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a nested canonical checkout keeps its pre-existing precedence over the sibling one', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tg-sdk-nested-'));
  const sdkRoot = path.join(dir, 'tidas-sdks');
  const nested = path.join(sdkRoot, 'tidas-toolkit');
  try {
    mkdirSync(sdkRoot, { recursive: true });
    writeToolsCheckout(nested);
    writeToolsCheckout(path.join(dir, 'tidas-toolkit'));

    withExplicitToolsPath(undefined, () => {
      assert.equal(resolveTidasToolsRepoRoot(sdkRoot), nested);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('resolution returns null when no candidate is an upstream checkout', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tg-sdk-absent-'));
  const sdkRoot = path.join(dir, 'tidas-sdks');
  try {
    mkdirSync(path.join(dir, 'tidas-toolkit'), { recursive: true });
    mkdirSync(sdkRoot, { recursive: true });

    withExplicitToolsPath(undefined, () => {
      assert.equal(resolveTidasToolsRepoRoot(sdkRoot), null);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
