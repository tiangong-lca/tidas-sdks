import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const resolver = path.join(root, 'scripts/ci/tidas-spec-assets.mjs');
const pinPath = path.join(root, 'scripts/ci/tidas-spec-pin.json');
const archive = process.env.TIDAS_SPEC_TEST_ARCHIVE ?? '/private/tmp/tidas-final-review.J85LdB/release/tiangong-lca-tidas-spec-0.1.0.tgz';

function run(command, args) {
  return execFileSync(process.execPath, [resolver, command, ...args], { encoding: 'utf8' });
}

test('qualified archive verifies and produces the reviewed public subset', () => {
  const destination = mkdtempSync(path.join(os.tmpdir(), 'tidas-spec-test-'));
  const result = JSON.parse(run('verify', [archive, '--pin', pinPath, '--extract-to', path.join(destination, 'verified')]));
  assert.equal(result.manifest.counts.importedAssets, 34);
  assert.equal(result.publicPaths.length, 39);
  assert.deepEqual(result.repositoryAuthoredPaths, [
    'assets/tidas/schema.lock.json',
    'assets/tidas/schemas/tidas_lciamethods.json',
    'assets/tidas/schemas/tidas_processes.json',
    'assets/tidas/schemas_zh/tidas_lciamethods.json',
    'assets/tidas/schemas_zh/tidas_processes.json',
  ]);
  assert.equal(result.manifest.source.commit, JSON.parse(readFileSync(pinPath, 'utf8')).importedFrom.commit);
});

test('repository-authored public paths are explicitly pinned', () => {
  const destination = mkdtempSync(path.join(os.tmpdir(), 'tidas-spec-authored-'));
  const pin = JSON.parse(readFileSync(pinPath, 'utf8'));
  pin.repositoryAuthoredPaths = pin.repositoryAuthoredPaths.slice(1);
  const altered = path.join(destination, 'pin.json');
  writeFileSync(altered, JSON.stringify(pin));
  assert.throws(() => run('verify', [archive, '--pin', altered]), /repository-authored public paths/);
});

test('repository-authored path pin rejects duplicates and unsafe paths', () => {
  const destination = mkdtempSync(path.join(os.tmpdir(), 'tidas-spec-authored-invalid-'));
  const pin = JSON.parse(readFileSync(pinPath, 'utf8'));
  pin.repositoryAuthoredPaths.push(pin.repositoryAuthoredPaths[0]);
  const duplicate = path.join(destination, 'duplicate.json');
  writeFileSync(duplicate, JSON.stringify(pin));
  assert.throws(() => run('verify', [archive, '--pin', duplicate]), /duplicate path/);
  pin.repositoryAuthoredPaths = ['../outside.json'];
  const unsafe = path.join(destination, 'unsafe.json');
  writeFileSync(unsafe, JSON.stringify(pin));
  assert.throws(() => run('verify', [archive, '--pin', unsafe]), /unsafe or non-public path/);
});

test('failed verification preserves an existing destination', () => {
  const destination = mkdtempSync(path.join(os.tmpdir(), 'tidas-spec-preserve-'));
  const target = path.join(destination, 'existing');
  mkdirSync(target);
  writeFileSync(path.join(target, 'sentinel.txt'), 'keep');
  const pin = JSON.parse(readFileSync(pinPath, 'utf8'));
  pin.manifestSha256 = '0'.repeat(64);
  const altered = path.join(destination, 'pin.json');
  writeFileSync(altered, JSON.stringify(pin));
  assert.throws(() => run('verify', [archive, '--pin', altered, '--extract-to', target]));
  assert.equal(readFileSync(path.join(target, 'sentinel.txt'), 'utf8'), 'keep');
});

test('verify-root rejects undeclared files, symlinked metadata, and symlink ancestors', () => {
  const destination = mkdtempSync(path.join(os.tmpdir(), 'tidas-spec-root-'));
  const verified = path.join(destination, 'verified');
  run('verify', [archive, '--pin', pinPath, '--extract-to', verified]);
  writeFileSync(path.join(verified, 'package', 'undeclared.txt'), 'bad');
  assert.throws(() => run('verify-root', [verified, '--pin', pinPath]));
  unlinkSync(path.join(verified, 'package', 'undeclared.txt'));
  const external = path.join(destination, 'external-readme');
  cpSync(path.join(verified, 'package', 'README.md'), external);
  unlinkSync(path.join(verified, 'package', 'README.md'));
  symlinkSync(external, path.join(verified, 'package', 'README.md'));
  assert.throws(() => run('verify-root', [verified, '--pin', pinPath]));
  const realParent = path.join(destination, 'real-parent');
  const linkedParent = path.join(destination, 'linked-parent');
  mkdirSync(realParent);
  symlinkSync(realParent, linkedParent);
  assert.throws(() => run('verify', [archive, '--pin', pinPath, '--extract-to', path.join(linkedParent, 'target')]));
});
