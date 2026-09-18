import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

type AssetPin = { path: string; sha256: string };
type PublicRulesPin = {
  schema_version: 'tidas.public-rules-source.v1';
  repository: string;
  commit: string;
  rules_version: string;
  assets: { index: AssetPin; schema: AssetPin };
  status: 'reviewed-candidate' | 'released';
};

const PIN_PATH = path.resolve(
  process.env.TIDAS_PUBLIC_RULES_PIN_PATH ??
    path.resolve(__dirname, '../../../scripts/ci/tidas-public-rules-pin.json')
);
const OUTPUT_DIR = path.resolve(
  process.env.TIDAS_PUBLIC_RULES_OUTPUT_DIR ??
    path.resolve(__dirname, '../src/contracts/public-rules-assets')
);
const DEFAULT_SOURCE_ROOT = path.resolve(__dirname, '../../../../tidas-spec');

function sha256(value: Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function requireDigest(value: string, label: string): void {
  if (!/^[0-9a-f]{64}$/.test(value)) {
    throw new Error(`${label} must be a lowercase SHA-256 digest`);
  }
}

async function main(): Promise<void> {
  const pin = JSON.parse(await readFile(PIN_PATH, 'utf8')) as PublicRulesPin;
  if (pin.schema_version !== 'tidas.public-rules-source.v1') {
    throw new Error(
      `Unsupported public-rules pin: ${String(pin.schema_version)}`
    );
  }
  if (!/^[0-9a-f]{40}$/.test(pin.commit)) {
    throw new Error(
      'Public-rules source commit must be a lowercase 40-character SHA'
    );
  }
  requireDigest(pin.assets.index.sha256, 'Public-rules index digest');
  requireDigest(pin.assets.schema.sha256, 'Public-rules schema digest');

  if (process.argv.includes('--verify-bundled')) {
    const indexBytes = await readFile(
      path.join(OUTPUT_DIR, 'public-rules.v1.json')
    );
    const schemaBytes = await readFile(
      path.join(OUTPUT_DIR, 'public-rules.v1.schema.json')
    );
    const identity = JSON.parse(
      await readFile(
        path.join(OUTPUT_DIR, 'public-rules.source.v1.json'),
        'utf8'
      )
    ) as Record<string, unknown>;
    if (sha256(indexBytes) !== pin.assets.index.sha256) {
      throw new Error(
        'Bundled public-rules index does not match the pinned digest'
      );
    }
    if (sha256(schemaBytes) !== pin.assets.schema.sha256) {
      throw new Error(
        'Bundled public-rules schema does not match the pinned digest'
      );
    }
    for (const [key, expected] of Object.entries({
      schema_version: pin.schema_version,
      repository: pin.repository,
      commit: pin.commit,
      rules_version: pin.rules_version,
      status: pin.status,
      index_sha256: pin.assets.index.sha256,
      schema_sha256: pin.assets.schema.sha256,
    })) {
      if (identity[key] !== expected) {
        throw new Error(`Bundled public-rules identity mismatch for ${key}`);
      }
    }
    console.log(`Verified bundled public rules at exact commit ${pin.commit}`);
    return;
  }

  const sourceRoot = path.resolve(
    process.env.TIDAS_PUBLIC_RULES_SOURCE_ROOT ?? DEFAULT_SOURCE_ROOT
  );
  const sourceHead = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: sourceRoot,
    encoding: 'utf8',
  }).trim();
  if (sourceHead !== pin.commit) {
    throw new Error(
      `Public-rules source checkout is ${sourceHead}; expected exact commit ${pin.commit}`
    );
  }

  const indexBytes = await readFile(
    path.join(sourceRoot, pin.assets.index.path)
  );
  const schemaBytes = await readFile(
    path.join(sourceRoot, pin.assets.schema.path)
  );
  if (sha256(indexBytes) !== pin.assets.index.sha256) {
    throw new Error('Public-rules index does not match the pinned digest');
  }
  if (sha256(schemaBytes) !== pin.assets.schema.sha256) {
    throw new Error('Public-rules schema does not match the pinned digest');
  }

  const index = JSON.parse(indexBytes.toString('utf8')) as {
    schema_version?: unknown;
    rules_version?: unknown;
  };
  if (index.schema_version !== 1 || index.rules_version !== pin.rules_version) {
    throw new Error(
      'Public-rules index version does not match the candidate pin'
    );
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(path.join(OUTPUT_DIR, 'public-rules.v1.json'), indexBytes);
  await writeFile(
    path.join(OUTPUT_DIR, 'public-rules.v1.schema.json'),
    schemaBytes
  );
  await writeFile(
    path.join(OUTPUT_DIR, 'public-rules.source.v1.json'),
    `${JSON.stringify(
      {
        schema_version: pin.schema_version,
        repository: pin.repository,
        commit: pin.commit,
        rules_version: pin.rules_version,
        status: pin.status,
        index_sha256: pin.assets.index.sha256,
        schema_sha256: pin.assets.schema.sha256,
      },
      null,
      2
    )}\n`
  );
  console.log(`Synced public rules from exact tidas-spec commit ${pin.commit}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
