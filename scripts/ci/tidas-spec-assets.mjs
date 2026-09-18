#!/usr/bin/env node

/**
 * Verified input and assembly resolver for the standalone public specification.
 *
 * The archive and manifest digests are the identity.  Every operation validates
 * the complete package before a caller-visible directory is replaced, and the
 * checked package inventory is exact (including metadata and symlink checks).
 */

import { createHash } from 'node:crypto';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = 'package';
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_PREFIX = 'assets/tidas/schemas/';
const SCHEMA_ZH_PREFIX = 'assets/tidas/schemas_zh/';
const SCHEMA_LOCK = 'assets/tidas/schema.lock.json';
const METHODOLOGY_PATHS = new Set([
  'assets/tidas/methodologies/tidas_flows.yaml',
  'assets/tidas/methodologies/tidas_processes.yaml',
]);
const PUBLIC_PREFIXES = [SCHEMA_PREFIX, SCHEMA_ZH_PREFIX];

function fail(message) {
  throw new Error(message);
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function canonicalJson(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('cannot canonicalize a non-finite number');
    return JSON.stringify(value);
  }
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(',')}}`;
  }
  fail(`cannot canonicalize value of type ${typeof value}`);
}

function hashCanonicalJson(value) {
  return sha256(Buffer.from(canonicalJson(value)));
}

function readJson(file, label) {
  if (!existsSync(file)) fail(`${label} not found: ${file}`);
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${label} is not valid JSON: ${file}: ${error.message}`);
  }
}

function safeRelative(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value === path.posix.normalize(value) &&
    !value.includes('\\') &&
    !value.startsWith('/') &&
    !value.split('/').some((part) => part === '..' || part === '')
  );
}

export function loadPin(pinPath) {
  const pin = readJson(pinPath, 'spec pin');
  for (const key of ['package', 'version', 'sourceCommit', 'archiveFile', 'archiveSha256', 'manifestFile', 'manifestSha256', 'assetRootInPackage']) {
    if (typeof pin[key] !== 'string' || pin[key].length === 0) fail(`spec pin is missing ${key}`);
  }
  for (const key of ['sourceCommit']) {
    if (!/^[0-9a-f]{40}$/.test(pin[key])) fail(`spec pin ${key} must be a 40-character lowercase commit`);
  }
  for (const key of ['archiveSha256', 'manifestSha256']) {
    if (!/^[0-9a-f]{64}$/.test(pin[key])) fail(`spec pin ${key} must be a 64-character lowercase SHA-256`);
  }
  if (!pin.importedFrom || !/^[0-9a-f]{40}$/.test(pin.importedFrom.commit ?? '')) {
    fail('spec pin importedFrom.commit must be a 40-character lowercase commit');
  }
  if (!safeRelative(pin.assetRootInPackage)) fail('spec pin assetRootInPackage is unsafe');
  if (pin.repositoryAuthoredPaths !== undefined) {
    if (!Array.isArray(pin.repositoryAuthoredPaths)) fail('spec pin repositoryAuthoredPaths must be an array');
    const authored = new Set();
    for (const file of pin.repositoryAuthoredPaths) {
      if (!safeRelative(file) || !file.startsWith(`${pin.assetRootInPackage}/`)) {
        fail(`spec pin repositoryAuthoredPaths contains an unsafe or non-public path: ${file}`);
      }
      if (authored.has(file)) fail(`spec pin repositoryAuthoredPaths contains a duplicate path: ${file}`);
      authored.add(file);
    }
  }
  return pin;
}

function archiveEntries(archivePath) {
  let listing;
  let verbose;
  try {
    listing = execFileSync('tar', ['-tzf', archivePath], { encoding: 'utf8' });
    verbose = execFileSync('tar', ['-tvzf', archivePath], { encoding: 'utf8' });
  } catch (error) {
    fail(`spec archive is not a readable gzip/tar file: ${error.message}`);
  }
  const names = listing.split('\n').map((line) => line.trim()).filter(Boolean);
  for (const name of names) {
    const normalized = name.endsWith('/') ? name.slice(0, -1) : name;
    if (!safeRelative(normalized) || (!normalized.startsWith(`${PACKAGE_ROOT}/`) && normalized !== PACKAGE_ROOT)) {
      fail(`spec archive contains an unsafe member: ${name}`);
    }
  }
  for (const line of verbose.split('\n').filter(Boolean)) {
    const kind = line[0];
    if (kind && !'-d'.includes(kind)) fail(`spec archive contains a non-regular member: ${line}`);
  }
  if (!names.includes(PACKAGE_ROOT) && !names.some((name) => name.startsWith(`${PACKAGE_ROOT}/`))) {
    fail('spec archive has no package/ root');
  }
  return names;
}

function walkFiles(root, relative = '') {
  const absolute = path.join(root, ...relative.split('/').filter(Boolean));
  const metadata = lstatSync(absolute);
  if (metadata.isSymbolicLink()) fail(`spec package contains a symbolic link: ${absolute}`);
  if (metadata.isDirectory()) {
    return readdirSync(absolute).sort().flatMap((name) =>
      walkFiles(root, relative ? `${relative}/${name}` : name));
  }
  if (!metadata.isFile()) fail(`spec package contains a non-regular entry: ${absolute}`);
  return [relative];
}

function assertNoSymlinkAncestors(target) {
  let current = path.resolve(target);
  while (true) {
    const systemAlias = current === os.tmpdir() || current === '/tmp' || current === '/var';
    if (!systemAlias && existsSync(current) && lstatSync(current).isSymbolicLink()) {
      fail(`spec destination has a symbolic-link ancestor: ${current}`);
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
}

function manifestPathSet(manifest) {
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) fail('spec manifest files is empty');
  const expected = new Set();
  for (const file of manifest.files) {
    if (!safeRelative(file.path) || expected.has(file.path)) fail(`invalid or duplicate manifest path: ${file.path}`);
    expected.add(file.path);
    if (!/^[0-9a-f]{64}$/.test(file.sha256)) fail(`invalid digest for ${file.path}`);
  }
  expected.add('spec-manifest.json');
  return expected;
}

function verifyManifest(manifest, { pin, packageRoot }) {
  if (manifest.manifestVersion !== 1) fail('unsupported spec manifest version');
  if (manifest.package?.name !== pin.package || manifest.package?.version !== pin.version || manifest.specVersion !== pin.version) {
    fail('spec manifest package/version does not match the pin');
  }
  if (manifest.source?.commit !== pin.importedFrom.commit) fail('spec manifest imported-from commit does not match the pin');
  if (!manifest.source?.repository?.includes('tidas-toolkit')) fail('spec manifest source repository is not tidas-toolkit');
  const expected = manifestPathSet(manifest);
  const actual = new Set(walkFiles(packageRoot));
  if (actual.size !== expected.size || [...actual].some((file) => !expected.has(file))) {
    const missing = [...expected].filter((file) => !actual.has(file));
    const extra = [...actual].filter((file) => !expected.has(file));
    fail(`spec package inventory mismatch; missing=${missing.join(',')} extra=${extra.join(',')}`);
  }
  for (const file of manifest.files) {
    const bytes = readFileSync(path.join(packageRoot, ...file.path.split('/')));
    if (sha256(bytes) !== file.sha256) fail(`spec manifest digest mismatch: ${file.path}`);
  }
  const manifestBytes = readFileSync(path.join(packageRoot, 'spec-manifest.json'));
  if (sha256(manifestBytes) !== pin.manifestSha256) fail('spec manifest hash does not match the pin');
  const sourceImport = readFileSync(path.join(packageRoot, 'source-import.yaml'), 'utf8');
  const baseline = readJson(path.join(packageRoot, 'reviewed-baseline.json'), 'reviewed baseline');
  if (!sourceImport.includes(pin.importedFrom.commit) || baseline.source?.commit !== pin.importedFrom.commit) {
    fail('candidate source evidence does not bind the imported tools commit');
  }
  const publicPaths = manifest.files
    .map((file) => file.path)
    .filter((file) =>
      file === SCHEMA_LOCK ||
      METHODOLOGY_PATHS.has(file) ||
      file.startsWith(SCHEMA_PREFIX) ||
      file.startsWith(SCHEMA_ZH_PREFIX));
  const imported = manifest.files.filter((file) => file.origin === 'tidas-toolkit').map((file) => file.path);
  const authored = manifest.files.filter((file) => file.origin === 'tidas-spec').map((file) => file.path);
  const expectedAuthored = pin.repositoryAuthoredPaths === undefined ? null : new Set(pin.repositoryAuthoredPaths);
  if (publicPaths.length !== 39 || !publicPaths.includes(SCHEMA_LOCK) || ![...METHODOLOGY_PATHS].every((file) => publicPaths.includes(file))) {
    fail('candidate public subset is not the reviewed 39-file set');
  }
  const actualAuthored = new Set(publicPaths.filter((file) => authored.includes(file)));
  if (expectedAuthored !== null && (actualAuthored.size !== expectedAuthored.size || [...actualAuthored].some((file) => !expectedAuthored.has(file)))) {
    fail(`candidate repository-authored public paths do not match the pin; expected=${[...expectedAuthored].sort().join(',')} actual=${[...actualAuthored].sort().join(',')}`);
  }
  if (imported.filter((file) => publicPaths.includes(file)).length + actualAuthored.size !== publicPaths.length) {
    fail('candidate public subset contains an unsupported asset origin');
  }
  const en = publicPaths.filter((file) => file.startsWith(SCHEMA_PREFIX)).length;
  const zh = publicPaths.filter((file) => file.startsWith(SCHEMA_ZH_PREFIX)).length;
  if (en !== 18 || zh !== 18) fail(`candidate schema counts are ${en}/${zh}, expected 18/18`);
  return { expected, imported, publicPaths, repositoryAuthoredPaths: [...actualAuthored].sort() };
}

function verifyRootInternal(root, pin) {
  const resolved = path.resolve(root);
  const packageRoot = path.join(resolved, PACKAGE_ROOT);
  if (!existsSync(packageRoot) || !lstatSync(packageRoot).isDirectory()) fail(`spec root has no ${PACKAGE_ROOT}/ directory`);
  const manifestPath = path.join(packageRoot, pin.manifestFile);
  const manifestBytes = readFileSync(manifestPath);
  if (sha256(manifestBytes) !== pin.manifestSha256) fail('spec manifest hash does not match the pin');
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  const details = verifyManifest(manifest, { pin, packageRoot });
  return { root: resolved, packageRoot, manifest, manifestPath, ...details };
}

/** Verify an archive, extracting only into an owned staging directory. */
export function verifyArchive({ archivePath, pin, extractTo = null }) {
  if (!existsSync(archivePath) || !lstatSync(archivePath).isFile()) fail(`spec archive not found: ${archivePath}`);
  const bytes = readFileSync(archivePath);
  if (sha256(bytes) !== pin.archiveSha256) fail(`spec archive hash mismatch: expected ${pin.archiveSha256}, found ${sha256(bytes)}`);
  archiveEntries(archivePath);
  const destination = extractTo ? path.resolve(extractTo) : null;
  if (destination) assertNoSymlinkAncestors(destination);
  const parent = extractTo ? path.dirname(path.resolve(extractTo)) : fsTempParent();
  mkdirSync(parent, { recursive: true });
  const staging = mkdtempSync(path.join(parent, '.tidas-spec-verify-'));
  let verified;
  try {
    execFileSync('tar', ['-xzf', archivePath, '--no-same-owner', '--no-same-permissions', '-C', staging], { stdio: 'pipe' });
    verified = verifyRootInternal(staging, pin);
    if (!extractTo) return verified;
    const destination = path.resolve(extractTo);
    const backup = `${destination}.backup-${path.basename(staging)}`;
    if (existsSync(destination)) renameSync(destination, backup);
    try {
      renameSync(staging, destination);
    } catch (error) {
      if (existsSync(backup)) renameSync(backup, destination);
      throw error;
    }
    if (existsSync(backup)) rmSync(backup, { recursive: true, force: true });
    return verifyRootInternal(destination, pin);
  } finally {
    if (existsSync(staging)) rmSync(staging, { recursive: true, force: true });
  }
}

export function verifyRoot({ root, pin }) {
  return verifyRootInternal(root, pin);
}

function fsTempParent() {
  return os.tmpdir();
}

export function assetRoot(root) {
  const verified = verifyRootInternal(root, loadPin(path.join(SCRIPT_DIR, 'tidas-spec-pin.json')));
  return path.join(verified.packageRoot, 'assets/tidas');
}

export function publicAssetPaths(verified) {
  return verified.publicPaths.filter((file) => file.startsWith('assets/tidas/'));
}

export function assemblyPlan({ specRoot, toolsRoot, toolsLockPath }) {
  const pin = loadPin(path.join(SCRIPT_DIR, 'tidas-spec-pin.json'));
  const spec = verifyRootInternal(specRoot, pin);
  const lock = readJson(toolsLockPath ?? path.join(toolsRoot, 'assets/asset-lock.v1.json'), 'tools asset lock');
  const publicPaths = new Set(publicAssetPaths(spec));
  const repositoryAuthoredPaths = new Set(spec.repositoryAuthoredPaths);
  const entries = (lock.entries ?? []).filter((entry) => entry.kind && !publicPaths.has(entry.path));
  const overlap = (lock.entries ?? []).filter((entry) => publicPaths.has(entry.path));
  for (const entry of overlap) {
    if (repositoryAuthoredPaths.has(entry.path)) continue;
    const specBytes = readFileSync(path.join(spec.packageRoot, ...entry.path.split('/')));
    const toolBytes = readFileSync(path.join(toolsRoot, ...entry.path.split('/')));
    if (!Buffer.from(specBytes).equals(toolBytes)) fail(`tools/spec overlap differs: ${entry.path}`);
  }
  return { specRoot: spec.root, packageRoot: spec.packageRoot, publicPaths: [...publicPaths].sort(), toolsEntries: entries, overlapPaths: overlap.map((entry) => entry.path).sort() };
}

function usage() {
  return 'usage: tidas-spec-assets.mjs verify <archive> --pin <pin> [--extract-to <dir>] | verify-root <root> --pin <pin> | asset-root <root> --pin <pin> | assembly-plan <spec-root> <tools-root> [--lock <path>]';
}

function option(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function main() {
  const args = process.argv.slice(2);
  const command = args.shift();
  if (!command) fail(usage());
  const pinPath = option(args, '--pin') ?? path.join(SCRIPT_DIR, 'tidas-spec-pin.json');
  const pin = loadPin(pinPath);
  let result;
  if (command === 'verify') result = verifyArchive({ archivePath: args[0], pin, extractTo: option(args, '--extract-to') });
  else if (command === 'verify-root') result = verifyRoot({ root: args[0], pin });
  else if (command === 'asset-root') result = path.join(verifyRoot({ root: args[0], pin }).packageRoot, 'assets/tidas');
  else if (command === 'assembly-plan') result = assemblyPlan({ specRoot: args[0], toolsRoot: args[1], toolsLockPath: option(args, '--lock') });
  else fail(usage());
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { process.stderr.write(`error: ${error.message}\n`); process.exitCode = 1; }
}
