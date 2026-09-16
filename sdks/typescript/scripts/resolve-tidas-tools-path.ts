import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

function repoRoot() {
  return path.resolve(__dirname, '../../..');
}

/**
 * Ordered upstream checkout candidates.
 *
 * The explicit input wins. The canonical `tidas-toolkit` directory is probed at
 * both the nested and sibling depth before the pre-rename `tidas-tools` names,
 * which stay for checkouts that have not adopted the canonical layout.
 */
export function tidasToolsCandidateRoots(sdkRoot: string = repoRoot()): string[] {
  return [
    process.env.TIDAS_TOOLS_PATH,
    path.join(sdkRoot, 'tidas-toolkit'),
    path.join(path.dirname(sdkRoot), 'tidas-toolkit'),
    path.join(sdkRoot, 'tidas-tools'),
    path.join(path.dirname(sdkRoot), 'tidas-tools'),
  ].filter((value): value is string => Boolean(value));
}

function isToolsRoot(candidate: string) {
  return existsSync(path.join(candidate, 'assets/asset-lock.v1.json'));
}

function runAssetResolver(toolsRepoRoot: string, ...args: string[]) {
  const resolver = path.join(
    resolveSdkRepoRoot(),
    'scripts/ci/tidas-tools-assets.mjs'
  );
  const [command, ...commandArgs] = args;
  return execFileSync(
    process.execPath,
    [resolver, command, toolsRepoRoot, ...commandArgs],
    {
      encoding: 'utf8',
    }
  ).trim();
}

function resolveSdkRepoRoot() {
  return path.resolve(__dirname, '../../..');
}

export function resolveTidasToolsRepoRoot(sdkRoot: string = repoRoot()) {
  for (const candidate of tidasToolsCandidateRoots(sdkRoot)) {
    if (isToolsRoot(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function requireTidasToolsRepoRoot(message?: string) {
  const resolved = resolveTidasToolsRepoRoot();

  if (!resolved) {
    throw new Error(
      message ??
        'Could not resolve the upstream tidas-tools checkout. Set TIDAS_TOOLS_PATH or place a sibling ../tidas-toolkit checkout next to this repository.'
    );
  }

  return resolved;
}

export function resolveTidasToolsSchemaDir() {
  if (process.env.TIDAS_TOOLS_SCHEMA_DIR) {
    return process.env.TIDAS_TOOLS_SCHEMA_DIR;
  }
  const toolsRoot = resolveTidasToolsRepoRoot();
  return toolsRoot
    ? runAssetResolver(toolsRoot, 'path-for-kind', 'json-schema')
    : null;
}

/** The public schema source is resolved from the qualified tidas-spec input. */
export function resolveTidasSpecSchemaDir() {
  return process.env.TIDAS_SPEC_SCHEMA_DIR ?? null;
}

export function requireTidasSpecSchemaDir(message?: string) {
  const resolved = resolveTidasSpecSchemaDir();
  if (!resolved) {
    throw new Error(
      message ??
        'Could not resolve the qualified tidas-spec JSON schemas. Run the canonical generation wrapper or set TIDAS_SPEC_SCHEMA_DIR.'
    );
  }
  return resolved;
}

export function requireTidasToolsSchemaDir(message?: string) {
  const resolved = resolveTidasToolsSchemaDir();
  if (!resolved) {
    throw new Error(
      message ??
        'Could not resolve JSON schemas through the upstream Rust asset lock.'
    );
  }
  return resolved;
}

export function resolveTidasToolsMethodologyDir() {
  const toolsRoot = resolveTidasToolsRepoRoot();
  return toolsRoot
    ? runAssetResolver(toolsRoot, 'path-for-kind', 'methodology')
    : null;
}

export function requireTidasToolsMethodologyDir(message?: string) {
  const resolved = resolveTidasToolsMethodologyDir();
  if (!resolved) {
    throw new Error(
      message ??
        'Could not resolve methodologies through the upstream Rust asset lock.'
    );
  }
  return resolved;
}

export function resolveTidasSpecMethodologyDir() {
  return process.env.TIDAS_SPEC_METHODOLOGY_DIR ?? null;
}

export function requireTidasSpecMethodologyDir(message?: string) {
  const resolved = resolveTidasSpecMethodologyDir();
  if (!resolved) {
    throw new Error(
      message ??
        'Could not resolve the qualified tidas-spec methodologies. Run the canonical generation wrapper or set TIDAS_SPEC_METHODOLOGY_DIR.'
    );
  }
  return resolved;
}

export interface TidasToolsRuntimeRoot {
  name: string;
  sourceRoot: string;
  path: string;
}

export function resolveTidasToolsRuntimeRoots(): TidasToolsRuntimeRoot[] | null {
  const toolsRoot = resolveTidasToolsRepoRoot();
  return toolsRoot
    ? (JSON.parse(
        runAssetResolver(toolsRoot, 'runtime-roots')
      ) as TidasToolsRuntimeRoot[])
    : null;
}

export function requireTidasToolsRuntimeRoots(message?: string) {
  const resolved = resolveTidasToolsRuntimeRoots();
  if (!resolved) {
    throw new Error(
      message ??
        'Could not resolve runtime roots through the upstream Rust asset lock.'
    );
  }
  return resolved;
}

export function requireTidasToolsAssetLockPath(message?: string) {
  const toolsRoot = requireTidasToolsRepoRoot(message);
  return runAssetResolver(toolsRoot, 'lock-path');
}
