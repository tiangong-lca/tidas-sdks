import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import test from 'node:test';

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = dirname(TEST_DIR);
const REPOSITORY_ROOT = dirname(dirname(PACKAGE_ROOT));
const PACKAGE_JSON_PATH = join(PACKAGE_ROOT, 'package.json');
const PACKAGE_JSON = readJson(PACKAGE_JSON_PATH);

const BANNED_LEGACY_TOOLS = [
  'ts-to-zod',
  'typescript-eslint',
  '@typescript-eslint',
  'ts-jest',
  'ts-node',
];

const PUBLISH_FORBIDDEN_TOOLS = new Set([
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint',
  'jest',
  'json-schema-to-typescript',
  'json-schema-to-zod',
  'oxlint',
  'oxlint-tsgolint',
  'prettier',
  'ts-jest',
  'ts-json-schema-generator',
  'ts-node',
  'ts-to-zod',
  'tsx',
  'typescript',
  'typescript-eslint',
  'typescript-json-schema',
]);

test('all first-party manifests declare only direct TypeScript 7.x', () => {
  const manifests = [
    join(REPOSITORY_ROOT, 'package.json'),
    ...findFiles(PACKAGE_ROOT, (path) => basename(path) === 'package.json'),
  ];
  const declarations = [];

  for (const manifestPath of manifests) {
    const manifest = readJson(manifestPath);
    for (const section of [
      'dependencies',
      'devDependencies',
      'optionalDependencies',
      'peerDependencies',
    ]) {
      if (manifest[section]?.typescript !== undefined) {
        declarations.push({
          manifest: displayPath(manifestPath),
          section,
          range: manifest[section].typescript,
        });
      }
    }
  }

  assert.ok(
    declarations.length > 0,
    'a direct TypeScript dependency must be declared'
  );
  assert.deepEqual(
    declarations.filter(({ range }) => !isTypeScript7Range(range)),
    [],
    `direct TypeScript declarations must be 7.x:\n${formatJson(declarations)}`
  );

  const requireFromPackage = createRequire(PACKAGE_JSON_PATH);
  const installedVersion = readJson(
    requireFromPackage.resolve('typescript/package.json')
  ).version;
  assert.equal(
    majorVersion(installedVersion),
    7,
    `the directly installed TypeScript must be 7.x, received ${installedVersion}`
  );
});

test('the complete installed and locked npm trees contain no TypeScript below 7', () => {
  const npmTree = npmList(PACKAGE_ROOT, 'typescript');
  const installed = collectDependencyVersions(npmTree, 'typescript');

  assert.ok(
    installed.length > 0,
    'the installed tree must contain direct TypeScript 7.x'
  );
  assert.deepEqual(
    installed.filter(({ version }) => majorVersion(version) < 7),
    [],
    `npm install tree contains legacy TypeScript:\n${formatJson(installed)}`
  );

  const lockPaths = findFiles(
    PACKAGE_ROOT,
    (path) => basename(path) === 'package-lock.json'
  );
  const locked = lockPaths.flatMap((lockPath) => {
    const lock = readJson(lockPath);
    return Object.entries(lock.packages ?? {})
      .filter(([packagePath]) =>
        /(?:^|\/)node_modules\/typescript$/.test(packagePath)
      )
      .map(([packagePath, metadata]) => ({
        lockfile: displayPath(lockPath),
        packagePath,
        version: metadata.version,
      }));
  });

  assert.ok(locked.length > 0, 'the lockfile must pin direct TypeScript 7.x');
  assert.deepEqual(
    locked.filter(({ version }) => majorVersion(version) < 7),
    [],
    `npm lock tree contains legacy TypeScript:\n${formatJson(locked)}`
  );
});

test('dependency-tree inspection opts out of the parent npm workspace', () => {
  assert.deepEqual(npmListArguments('typescript'), [
    'ls',
    '--workspaces=false',
    'typescript',
    '--all',
    '--json',
  ]);
});

test('package, config, and script surfaces contain no banned legacy tooling', () => {
  const governedFiles = [
    join(REPOSITORY_ROOT, 'package.json'),
    ...findFiles(PACKAGE_ROOT, (path) => {
      const name = basename(path);
      const packageRelativePath = relative(PACKAGE_ROOT, path);
      return (
        name === 'package.json' ||
        name === 'package-lock.json' ||
        /^tsconfig(?:\..+)?\.json$/.test(name) ||
        /(?:^|[.])config[.]/.test(name) ||
        packageRelativePath.startsWith(`scripts${pathSeparator()}`)
      );
    }),
  ];
  const findings = [];

  for (const path of governedFiles) {
    const content = readFileSync(path, 'utf8').toLowerCase();
    for (const bannedTool of BANNED_LEGACY_TOOLS) {
      if (content.includes(bannedTool)) {
        findings.push({ file: displayPath(path), bannedTool });
      }
    }
  }

  assert.deepEqual(
    findings,
    [],
    `legacy tool references remain on governed surfaces:\n${formatJson(findings)}`
  );
});

test('published dependencies contain no compiler, generator, lint, or test tooling', () => {
  const publishedDependencies = Object.keys(PACKAGE_JSON.dependencies ?? {});
  const forbiddenDependencies = publishedDependencies.filter(
    (dependency) =>
      PUBLISH_FORBIDDEN_TOOLS.has(dependency) ||
      dependency.startsWith('@types/') ||
      dependency.includes('typescript-eslint')
  );

  assert.deepEqual(
    forbiddenDependencies,
    [],
    `move build-only tooling out of published dependencies: ${forbiddenDependencies.join(', ')}`
  );
});

test('all package tsconfigs avoid TypeScript 7 removed module resolution options', () => {
  const configPaths = findFiles(PACKAGE_ROOT, (path) =>
    /^tsconfig(?:\..+)?\.json$/.test(basename(path))
  );
  const findings = [];

  for (const configPath of configPaths) {
    const compilerOptions = readJson(configPath).compilerOptions ?? {};
    const moduleResolution = String(
      compilerOptions.moduleResolution ?? ''
    ).toLowerCase();

    if (moduleResolution === 'node' || moduleResolution === 'node10') {
      findings.push({
        file: displayPath(configPath),
        option: 'moduleResolution',
        value: compilerOptions.moduleResolution,
      });
    }
    if (Object.hasOwn(compilerOptions, 'baseUrl')) {
      findings.push({
        file: displayPath(configPath),
        option: 'baseUrl',
        value: compilerOptions.baseUrl,
      });
    }
  }

  assert.deepEqual(
    findings,
    [],
    `removed tsconfig options remain:\n${formatJson(findings)}`
  );
});

test('the Node coverage command enforces the recorded coverage ratchets', () => {
  const coverageCommand = PACKAGE_JSON.scripts?.['test:coverage'] ?? '';

  assert.match(coverageCommand, /--test-coverage-lines=95(?:\s|$)/);
  assert.match(coverageCommand, /--test-coverage-branches=75(?:\s|$)/);
  assert.match(coverageCommand, /--test-coverage-functions=70(?:\s|$)/);
});

test(
  'a built and packed SDK exposes every entry point to clean CJS, ESM, and TS7 consumers without bringing TypeScript',
  { timeout: 120_000 },
  () => {
    const fixtureRoot = mkdtempSync(join(tmpdir(), 'tidas-sdk-pack-contract-'));

    try {
      const packRoot = join(fixtureRoot, 'pack');
      const consumerRoot = join(fixtureRoot, 'consumer');
      mkdirSync(packRoot);
      mkdirSync(consumerRoot);

      // `npm pack` does not run `prepublishOnly`; always prove that the tarball
      // was produced from a fresh build instead of a stale local `dist/` tree.
      execFileSync('npm', ['run', 'build'], commandOptions(PACKAGE_ROOT));
      const packOutput = execFileSync(
        'npm',
        ['pack', '--json', '--pack-destination', packRoot],
        commandOptions(PACKAGE_ROOT)
      );
      const packMetadata = JSON.parse(packOutput);
      assert.equal(
        packMetadata.length,
        1,
        'npm pack must describe one tarball'
      );
      assertPackedExports(packMetadata[0].files ?? []);

      const tarball = readdirSync(packRoot)
        .filter((file) => file.endsWith('.tgz'))
        .map((file) => join(packRoot, file));
      assert.equal(
        tarball.length,
        1,
        `expected one npm tarball, received ${tarball.length}`
      );

      writeFileSync(
        join(consumerRoot, 'package.json'),
        `${JSON.stringify({ name: 'tidas-sdk-pack-consumer', private: true }, null, 2)}\n`,
        { encoding: 'utf8', flag: 'wx' }
      );
      execFileSync(
        'npm',
        [
          'install',
          '--ignore-scripts',
          '--no-audit',
          '--no-fund',
          '--package-lock=false',
          tarball[0],
        ],
        commandOptions(consumerRoot)
      );

      const exportSpecifiers = Object.keys(PACKAGE_JSON.exports).map(
        packageSpecifier
      );
      writeFileSync(
        join(consumerRoot, 'require-check.cjs'),
        `${exportSpecifiers
          .map(
            (specifier) =>
              `assertModule(${JSON.stringify(specifier)}, require(${JSON.stringify(specifier)}));`
          )
          .join(
            '\n'
          )}\n\nfunction assertModule(specifier, value) {\n  if ((typeof value !== 'object' && typeof value !== 'function') || value === null) {\n    throw new TypeError(\`Expected \${specifier} to load as a CommonJS module.\`);\n  }\n}\n`,
        { encoding: 'utf8', flag: 'wx' }
      );
      execFileSync(
        process.execPath,
        [join(consumerRoot, 'require-check.cjs')],
        commandOptions(consumerRoot)
      );

      writeFileSync(
        join(consumerRoot, 'import-check.mjs'),
        `${exportSpecifiers
          .map(
            (specifier, index) =>
              `const module${index} = await import(${JSON.stringify(specifier)});\nassertModule(${JSON.stringify(specifier)}, module${index});`
          )
          .join(
            '\n'
          )}\n\nfunction assertModule(specifier, value) {\n  if (typeof value !== 'object' || value === null) {\n    throw new TypeError(\`Expected \${specifier} to load as an ES module.\`);\n  }\n}\n`,
        { encoding: 'utf8', flag: 'wx' }
      );
      execFileSync(
        process.execPath,
        [join(consumerRoot, 'import-check.mjs')],
        commandOptions(consumerRoot)
      );

      const typecheckSource = `${exportSpecifiers
        .map(
          (specifier, index) =>
            `import * as entry${index} from ${JSON.stringify(specifier)};\nvoid entry${index};`
        )
        .join(
          '\n'
        )}\nimport { ProcessSchema } from '@tiangong-lca/tidas-sdk/schemas';\nimport { z } from 'zod';\ntype ProcessOutput = z.output<typeof ProcessSchema>;\ntype ProcessResults = NonNullable<ProcessOutput['processDataSet']['LCIAResults']>;\ntype LCIAResultOutput = ProcessResults['LCIAResult'];\ntype IsUnknown<T> = unknown extends T ? ([T] extends [unknown] ? true : false) : false;\ntype AssertFalse<T extends false> = T;\ntype LCIAResultMustRemainTyped = AssertFalse<IsUnknown<LCIAResultOutput>>;\nvoid (undefined as unknown as LCIAResultMustRemainTyped);\n`;
      writeFileSync(join(consumerRoot, 'imports.ts'), typecheckSource, {
        encoding: 'utf8',
        flag: 'wx',
      });
      writeFileSync(join(consumerRoot, 'imports.mts'), typecheckSource, {
        encoding: 'utf8',
        flag: 'wx',
      });
      writeFileSync(
        join(consumerRoot, 'tsconfig.json'),
        `${JSON.stringify(
          {
            compilerOptions: {
              target: 'ES2022',
              module: 'Node16',
              moduleResolution: 'Node16',
              strict: true,
              noEmit: true,
              skipLibCheck: false,
              types: [],
            },
            include: ['./imports.ts', './imports.mts'],
          },
          null,
          2
        )}\n`,
        { encoding: 'utf8', flag: 'wx' }
      );
      const requireFromPackage = createRequire(PACKAGE_JSON_PATH);
      const typeScriptPackagePath = requireFromPackage.resolve(
        'typescript/package.json'
      );
      const typeScriptPackage = readJson(typeScriptPackagePath);
      const typeScriptCli = join(
        dirname(typeScriptPackagePath),
        typeScriptPackage.bin.tsc
      );
      const typeScriptVersion = execFileSync(
        process.execPath,
        [typeScriptCli, '--version'],
        commandOptions(consumerRoot)
      ).trim();
      assert.equal(
        majorVersion(typeScriptVersion.replace(/^Version\s+/, '')),
        7,
        `packed consumer contract must use TypeScript 7, received ${typeScriptVersion}`
      );
      execFileSync(
        process.execPath,
        [typeScriptCli, '--project', join(consumerRoot, 'tsconfig.json')],
        commandOptions(consumerRoot)
      );

      const consumerTree = npmList(consumerRoot, 'typescript', {
        allowAbsent: true,
      });
      const installedTypeScript = collectDependencyVersions(
        consumerTree,
        'typescript'
      );
      assert.deepEqual(
        installedTypeScript,
        [],
        `the published SDK pulled compiler tooling into the consumer:\n${formatJson(
          installedTypeScript
        )}`
      );
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  }
);

function assertPackedExports(packedFileMetadata) {
  const packedFiles = new Set(
    packedFileMetadata.map(({ path }) => String(path).replaceAll('\\', '/'))
  );
  const missingConditions = [];
  const missingFiles = [];

  for (const [exportKey, conditions] of Object.entries(PACKAGE_JSON.exports)) {
    for (const condition of ['import', 'require', 'types']) {
      const target = conditions?.[condition];
      if (typeof target !== 'string') {
        missingConditions.push({ export: exportKey, condition });
        continue;
      }

      const packedPath = target.replace(/^\.\//, '').replaceAll('\\', '/');
      if (!packedFiles.has(packedPath)) {
        missingFiles.push({ export: exportKey, condition, path: packedPath });
      }
    }
  }

  assert.deepEqual(
    missingConditions,
    [],
    `every export must declare import, require, and types conditions:\n${formatJson(
      missingConditions
    )}`
  );
  assert.deepEqual(
    missingFiles,
    [],
    `packed tarball is missing exported JS or declaration files:\n${formatJson(
      missingFiles
    )}`
  );
}

function packageSpecifier(exportKey) {
  return exportKey === '.'
    ? PACKAGE_JSON.name
    : `${PACKAGE_JSON.name}${exportKey.slice(1)}`;
}

test('schema generator source invokes neither npx, ts-to-zod, nor Compiler API', () => {
  const generatorPaths = findFiles(PACKAGE_ROOT, (path) => {
    const packageRelativePath = relative(PACKAGE_ROOT, path);
    return (
      packageRelativePath.startsWith(`scripts${pathSeparator()}`) &&
      /(?:generat|schema-to).+\.(?:[cm]?[jt]s)$/.test(basename(path))
    );
  });
  const forbiddenPatterns = [
    { name: 'npx', pattern: /\bnpx\b/ },
    { name: 'ts-to-zod', pattern: /ts-to-zod/i },
    {
      name: 'TypeScript Compiler API import',
      pattern:
        /(?:from\s*['"]typescript['"]|require\(\s*['"]typescript['"]\s*\)|import\(\s*['"]typescript['"]\s*\))/,
    },
  ];
  const findings = [];

  for (const generatorPath of generatorPaths) {
    const content = readFileSync(generatorPath, 'utf8');
    for (const { name, pattern } of forbiddenPatterns) {
      if (pattern.test(content)) {
        findings.push({
          file: displayPath(generatorPath),
          forbiddenPattern: name,
        });
      }
    }
  }

  assert.deepEqual(
    findings,
    [],
    `schema generator still depends on a legacy compiler path:\n${formatJson(findings)}`
  );
});

function commandOptions(cwd) {
  return {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_audit: 'false',
      npm_config_fund: 'false',
      npm_config_update_notifier: 'false',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  };
}

function npmList(cwd, dependency, { allowAbsent = false } = {}) {
  const result = spawnSync(
    'npm',
    ['ls', dependency, '--all', '--json'],
    commandOptions(cwd)
  );

  assert.ifError(result.error);
  const tree = JSON.parse(result.stdout);
  const dependencyIsAbsent =
    collectDependencyVersions(tree, dependency).length === 0;
  const expectedAbsentExit =
    allowAbsent &&
    result.status === 1 &&
    dependencyIsAbsent &&
    (tree.problems?.length ?? 0) === 0;
  assert.ok(
    result.status === 0 || expectedAbsentExit,
    `npm ls failed in ${cwd}:\n${result.stderr || result.stdout}`
  );
  return tree;
}

function collectDependencyVersions(tree, dependencyName, ancestry = []) {
  const matches = [];
  for (const [name, metadata] of Object.entries(tree.dependencies ?? {})) {
    const entry = `${name}@${metadata.version ?? 'unknown'}`;
    const dependencyPath = [...ancestry, entry];
    if (name === dependencyName) {
      matches.push({
        version: metadata.version,
        path: dependencyPath.join(' > '),
      });
    }
    matches.push(
      ...collectDependencyVersions(metadata, dependencyName, dependencyPath)
    );
  }
  return matches;
}

function findFiles(root, predicate) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.name === 'dist' || entry.name === 'node_modules') {
      continue;
    }
    const path = join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFiles(path, predicate));
    } else if (entry.isFile() && predicate(path)) {
      files.push(path);
    }
  }
  return files.sort((left, right) =>
    left < right ? -1 : left > right ? 1 : 0
  );
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function majorVersion(version) {
  const match = String(version ?? '').match(/^(\d+)/);
  return match ? Number(match[1]) : Number.NaN;
}

function isTypeScript7Range(range) {
  return /^(?:[~^])?7(?:\.|$)/.test(String(range).trim());
}

function displayPath(path) {
  return relative(REPOSITORY_ROOT, path) || '.';
}

function pathSeparator() {
  return process.platform === 'win32' ? '\\' : '/';
}

function formatJson(value) {
  return JSON.stringify(value, null, 2);
}
