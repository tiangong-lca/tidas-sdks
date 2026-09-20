import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  requireTidasToolsRuntimeRoots,
  resolveTidasToolsRepoRoot,
} from './resolve-tidas-tools-path.js';

const OUTPUT_DIR = path.join(__dirname, '../src/runtime-assets');
const TOOLS_ASSET_RESOLVER = path.join(
  __dirname,
  '../../../scripts/ci/tidas-tools-assets.mjs'
);

type SdkRuntimeProjection = {
  excluded_source_paths: string[];
  lock_text: string;
};

async function copyAssetDir(
  sourceDir: string,
  outputRoot: string,
  assetName: string
) {
  const targetDir = path.join(outputRoot, assetName);

  await rm(targetDir, { recursive: true, force: true });
  await cp(sourceDir, targetDir, { recursive: true });
}

async function copyMixedTidasAssets(
  toolsDir: string,
  specDir: string,
  outputRoot: string
) {
  const targetDir = path.join(outputRoot, 'tidas');
  await rm(targetDir, { recursive: true, force: true });
  await cp(toolsDir, targetDir, { recursive: true });

  // The public schemas, paired lock, and two public methodology documents are
  // owned by tidas-spec. Remove those paths from the remaining-tools copy before
  // publishing the verified spec bytes, so the final inventory is disjoint.
  await rm(path.join(targetDir, 'schemas'), { recursive: true, force: true });
  await rm(path.join(targetDir, 'schemas_zh'), {
    recursive: true,
    force: true,
  });
  await rm(path.join(targetDir, 'schema.lock.json'), { force: true });
  await rm(path.join(targetDir, 'methodologies', 'tidas_flows.yaml'), {
    force: true,
  });
  await rm(path.join(targetDir, 'methodologies', 'tidas_processes.yaml'), {
    force: true,
  });
  await cp(path.join(specDir, 'schemas'), path.join(targetDir, 'schemas'), {
    recursive: true,
  });
  await cp(
    path.join(specDir, 'schemas_zh'),
    path.join(targetDir, 'schemas_zh'),
    { recursive: true }
  );
  await cp(
    path.join(specDir, 'schema.lock.json'),
    path.join(targetDir, 'schema.lock.json')
  );
  await cp(
    path.join(specDir, 'methodologies', 'tidas_flows.yaml'),
    path.join(targetDir, 'methodologies', 'tidas_flows.yaml')
  );
  await cp(
    path.join(specDir, 'methodologies', 'tidas_processes.yaml'),
    path.join(targetDir, 'methodologies', 'tidas_processes.yaml')
  );
}

async function main() {
  const toolsRoot = resolveTidasToolsRepoRoot();

  if (!toolsRoot) {
    if (
      existsSync(path.join(OUTPUT_DIR, 'tidas')) &&
      existsSync(path.join(OUTPUT_DIR, 'eilcd'))
    ) {
      for (const name of [
        'runtime_rulesets.json',
        'runtime_rulesets.schema.json',
      ]) {
        if (existsSync(path.join(OUTPUT_DIR, 'tidas', 'methodologies', name))) {
          throw new Error(
            `Retired SDK runtime asset remains without a verified tools source: ${name}`
          );
        }
      }
      console.warn(
        'No tidas-tools checkout found. Keeping existing runtime assets under src/runtime-assets.'
      );
      return;
    }

    requireTidasToolsRuntimeRoots(
      'Runtime asset sync requires access to the upstream tidas-tools repository. Set TIDAS_TOOLS_PATH, place a sibling ../tidas-toolkit checkout next to this repo, or run ../../scripts/ci/generate-typescript-sdk.sh.'
    );
    return;
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const specAssetRoot = process.env.TIDAS_SPEC_ASSET_ROOT;
  if (specAssetRoot) {
    if (!toolsRoot) {
      throw new Error(
        'Mixed runtime assembly requires both the verified tidas-spec and tidas-tools inputs.'
      );
    }
    // The Rust lock remains authoritative for the remaining-tools tree; the
    // resolver is also invoked as a preflight to prove the two input manifests
    // agree on any historical overlap before files are copied.
    const resolver = path.join(
      __dirname,
      '../../../scripts/ci/tidas-spec-assets.mjs'
    );
    execFileSync(
      process.execPath,
      [
        resolver,
        'assembly-plan',
        path.resolve(specAssetRoot, '../../..'),
        toolsRoot,
      ],
      { stdio: 'pipe' }
    );
  }

  for (const assetRoot of requireTidasToolsRuntimeRoots()) {
    if (assetRoot.name === 'tidas' && specAssetRoot) {
      await copyMixedTidasAssets(assetRoot.path, specAssetRoot, OUTPUT_DIR);
    } else {
      await copyAssetDir(assetRoot.path, OUTPUT_DIR, assetRoot.name);
    }
    console.log(`Synced runtime assets: ${assetRoot.name}`);
  }
  const projection = JSON.parse(
    execFileSync(
      process.execPath,
      [TOOLS_ASSET_RESOLVER, 'sdk-projection', toolsRoot],
      { encoding: 'utf8' }
    )
  ) as SdkRuntimeProjection;
  for (const sourcePath of projection.excluded_source_paths) {
    if (!sourcePath.startsWith('assets/')) {
      throw new Error(`Invalid retired SDK asset path: ${sourcePath}`);
    }
    await rm(
      path.join(OUTPUT_DIR, ...sourcePath.slice('assets/'.length).split('/')),
      { force: true }
    );
  }
  await writeFile(
    path.join(OUTPUT_DIR, 'asset-lock.v1.json'),
    projection.lock_text
  );
  console.log(
    'Synced SDK runtime projection of the verified Rust asset lock: asset-lock.v1.json'
  );
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
