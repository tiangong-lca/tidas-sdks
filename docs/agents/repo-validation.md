---
title: tidas-sdk Validation Guide
docType: guide
scope: repo
status: active
authoritative: false
owner: tidas-sdk
language: en
whenToUse:
  - when a tidas-sdk change is ready for local validation
  - when deciding the minimum proof required for package, generation, automation, or docs changes
  - when writing PR validation notes for tidas-sdk work
whenToUpdate:
  - when the repo gains new canonical verify wrappers
  - when change categories require different proof
  - when release automation or upstream-resolution behavior changes
checkPaths:
  - docs/agents/repo-validation.md
  - .docpact/config.yaml
  - .nvmrc
  - scripts/ci/**
  - sdks/typescript/**
  - sdks/python/**
  - docs/release-setup.md
  - docs/upstream-automation.md
  - .github/workflows/**
  - .githooks/pre-push
  - scripts/docpact
  - scripts/docpact-gate.sh
  - scripts/install-git-hooks.sh
lastReviewedAt: 2026-09-16
lastReviewedCommit: a4ca62fea35ab7f9eaa0e9789baced36d3d2816d
lastReviewedNote: "Reviewed for SDK #125: the deletion-only OID predicate now uses explicit lowercase ASCII characters without overriding the production locale. Existing shell trace cases plus C/en_US.UTF-8 SHA1/SHA256 cases pass on macOS (43 passing trace cases, no locale skip); source/tag/mixed/unknown input, argument order and failure fallback remain. Runtime, assets, upstream pins, packages and release behavior are unchanged. Full repository gates, independent source review, native CI and root integration remain pending."
related:
  - ../../AGENTS.md
  - ../../.docpact/config.yaml
  - ./repo-architecture.md
  - ../release-setup.md
  - ../upstream-automation.md
---

## Default Baseline

Unless the change is doc-only, the canonical verification scripts are:

```bash
./scripts/ci/verify-typescript-package.sh
./scripts/ci/verify-python-package.sh
```

These scripts are the best repo-wide proof because they mirror CI expectations and current upstream-resolution behavior.

## Validation Matrix

| Change type | Minimum local proof | Additional proof when risk is higher | Notes |
| --- | --- | --- | --- |
| TypeScript package source, examples, or package scripts | `./scripts/ci/verify-typescript-package.sh` | run `pnpm --filter @tiangong-lca/tidas-sdk test:coverage` when testable behavior changes | This covers the frozen pnpm 11.24.0/TS7 install on Node 24.19.0, correctness/suspicious/deprecation lint, both TS7 typechecks, Node tests, maintained examples, generated artifacts, build, and packability. The tarball contract loads every root/subpath through CJS, ESM, and TS7 declarations with `types: []` and `skipLibCheck: false`, then proves the pnpm consumer inherits no compiler tooling. Coverage is explicitly scoped to first-party package source/generation helpers so package-manager runtime code cannot dilute it; ratchets are lines 95%, branches 75%, functions 70%. |
| JSON Schema to Zod generator or domain overlays | `./scripts/ci/verify-typescript-package.sh` | before replacing the baseline build, run `pnpm --filter @tiangong-lca/tidas-sdk verify:schema-generation-parity` and record the exact baseline/candidate source plus intentional differences | The active Draft-07 vocabulary, runtime helper semantics, taxonomy dependencies, review conditions, and exact overlay locations have focused cases. Unknown keywords/formats/locations fail generation. Use explicit baseline/candidate directories when the default artifacts are not appropriate. |
| Python package source, scripts, or tests | `./scripts/ci/verify-python-package.sh` | run one focused pytest or generation step when the change is isolated | Record if the Python package still depends on generated artifacts from a specific upstream commit. |
| shared generation helpers under `scripts/ci/**` | run both verify scripts | run the matching focused automation regression script and `generate-*.sh` path if the task explicitly changes refresh behavior | Generation changes can affect both packages even if only one output changed. |
| release setup, tag, or publish workflows | run both verify scripts and `python3 ./scripts/ci/test-automation-contracts.py` | inspect `.github/workflows/**` and record any tag or environment assumptions checked locally | Tag creation and registry publication are separate from local package verification. Release detection must distinguish an untagged pending version from an already-tagged version. |
| repo contract or governed-doc changes only | `scripts/docpact validate-config --root . --strict` and `scripts/docpact lint --root . --staged --mode enforce` | run one focused route check such as `scripts/docpact route --root . --intent repo-docs --format text` or `upstream-refresh` when the change touches release / automation docs | Refresh review evidence even when prose-only governed docs change. |

## Upstream Resolution Notes

Facts that matter:

- TypeScript and Python generation resolve `tidas-tools` in this order:
  1. `TIDAS_TOOLS_PATH`
  2. sibling `../tidas-toolkit`, then the pre-rename `../tidas-tools`
  3. temporary clone
- every source must be a Git checkout at the exact `TIDAS_TOOLS_SHA`; the default
  pin is immutable and advances in the same generated PR as the package assets;
  dispatch/manual automation must supply a full 40-character SHA
- TypeScript and Python generation resolve `tidas-spec` as one verified release archive. Set `TIDAS_SPEC_ARCHIVE_PATH` for an explicit archive, use the sibling `tidas-spec/release/` archive in `auto` mode, or let the helper download the exact `releaseArchiveUrl` from `scripts/ci/tidas-spec-pin.json`.
- `scripts/ci/tidas-spec-assets.mjs verify` validates the archive SHA-256, manifest SHA-256, complete package inventory, source evidence, and the reviewed 39-file public subset before extraction. `assembly-plan` proves that public paths are disjoint from the remaining `tidas-tools` paths and rejects differing overlap bytes. A `tidas_spec_released` event is first validated by `update-tidas-spec-pin.py`; exact replays are accepted, while stale, malformed, partial, or same-version conflicting events fail closed.
- `scripts/ci/tidas-tools-assets.mjs` validates the Rust
  `assets/asset-lock.v1.json`, all catalog entry hashes/sizes, and the packaged
  TypeScript runtime copy before generation succeeds
- clean TypeScript generation and verification both install dependencies through
  `scripts/ci/lib/typescript-dependencies.sh`, which requires the root
  `pnpm-lock.yaml`, exact `pnpm@11.24.0`, and exact Node `24.19.0` from `.nvmrc`,
  then runs `pnpm install --frozen-lockfile` from the repository root
- pnpm's default one-day release-age gate remains active; the toolchain contract
  permits only exact, versioned exceptions recorded after reviewing a required
  latest-stable release
- `sdks/typescript/tests/toolchain-contract.test.mjs` rejects TypeScript majors
  below 7, legacy Compiler API consumers, removed tsconfig options, missing
  coverage ratchets, unusable tarball exports, and consumers that inherit
  compiler tooling
- generator changes should build the baseline before editing, then run
  `pnpm --filter @tiangong-lca/tidas-sdk verify:schema-generation-parity`; its automatic candidate directory
  is always cleaned and can be replaced by explicit baseline/candidate paths
- if you intentionally validate against a local checkout or archive, record both
  its path and exact commit/archive SHA in the PR note

## Validation Contract Notes

- TypeScript callers should prefer `validateEnhanced()` and consume the returned `validationIssues` array instead of parsing raw Zod error prose when stable UI or API behavior matters.
- Normalized validation issues should preserve `code`, `path`, `severity`, optional `params`, `message`, and `rawCode`.
- Generated localized-text checks must keep attaching `params.validationCode` so the downstream normalized code resolves to stable values such as `localized_text_zh_must_include_chinese_character` and `localized_text_en_must_not_contain_chinese_character`.
- Generated TypeScript and Python Flow validators must prove that an Elementary
  flow accepts `baseName` without synthetic qualifiers and Product, Waste, and
  Other flows reject missing `treatmentStandardsRoutes` or
  `mixAndLocationTypes`.
- Process and LCIA review validators must require scope, details, reviewer, and
  report references whenever `@type` is not `Not reviewed`; taxonomy dependency
  tests must prove both valid and invalid locked classification cases.
- Validation changes that correct historical under-validation require an
  explicit compatibility/version decision. Issue #101 uses `0.2.0`, not a
  patch, so `^0.1.x` consumers opt in deliberately.
- If a change touches `sdks/typescript/scripts/generate-zod-schemas.ts`, `sdks/typescript/src/core/config/ValidationConfig.ts`, or committed schema output under `sdks/typescript/src/schemas/**`, mention in the PR note whether the validation contract changed or remained backward compatible.

## Minimum PR Note Quality

A good PR note for this repo should say:

1. which verify scripts ran
2. whether generation used a local `tidas-tools` checkout or the default resolution path
3. whether tag or publish proof is deferred to GitHub Actions

## Local Docpact Push Gate

Install the versioned local hook once per checkout:

```bash
./scripts/install-git-hooks.sh
```

Except for validated branch-deletion-only pushes, the `pre-push` hook runs `scripts/docpact-gate.sh`, which delegates CLI lookup to `scripts/docpact` and performs strict config validation plus enforced lint before the push leaves the machine. It then runs `./scripts/ci/verify-typescript-package.sh` and `./scripts/ci/verify-python-package.sh` as the local test gate. The wrapper checks `DOCPACT_BIN`, Cargo install locations, Homebrew install locations, and then `PATH`, so local agent shells should not fail only because bare `docpact` is unavailable. The default comparison base is `origin/main`. Override it for unusual stacks with `DOCPACT_BASE_REF=<ref>` or `scripts/docpact-gate.sh --base <ref>`. The gate writes its detailed report to a temporary file so normal pushes do not create `.docpact/runs/` artifacts. The GitHub `CI` workflow is manual-dispatch only.

Upstream Git subprocesses clear inherited repository directory/index bindings but preserve process-scoped account configuration (`GIT_CONFIG_COUNT` / `GIT_CONFIG_PARAMETERS`). The explicit candidate checkout overrides inherited `core.worktree` / `core.bare` settings. Public upstream clones use credential-free canonical HTTPS; automation credentials remain confined to SDK write operations. Wrong SHA or asset locks still fail, and the default pin is unchanged.

TypeScript verification defaults to a temporary clone and retains that exact verified checkout through generation, tests, build and packing. Nested generation uses `verified-path` mode to recheck the same SHA and asset lock without cloning again. The owning process cleans temporary sources on success and failure. Standalone builds retain their existing sibling/offline fallback; canonical verification never falls back to it. The automation regression suite exercises differing sibling contents, the default clone path, strict reuse and cleanup.

`python3 scripts/ci/test-automation-contracts.py` is a lightweight automation gate
that runs before package bootstrap, including in the manual CI workflow. It uses
Python, Git, Bash and the dependency-free Node asset resolver; it must not invoke
pnpm, tsx or installed package tooling. The source-consistency fixture blocks pnpm
and executes the real verification prelude, then checks the pinned content visible
to a child process and cleanup. The full TypeScript package gate separately owns
actual bundler, compiler, package tests and packing proof.

The complete TypeScript verifier invokes generation with the explicit
`--defer-advisory-typecheck` option. This omits only the generator's early,
warning-only typecheck: after source regeneration, drift verification and lint,
the canonical verifier still runs its mandatory package and tools-tsconfig
checks before tests, examples, build and packing. Standalone generation keeps
its advisory check by default. Neither the option nor a cache hit waives source
pin/asset-lock checks, generated-output drift checks or any strict release gate.

The pre-push hook skips source validation only for complete, well-formed wire
input that deletes existing branch refs exclusively. Tag deletions, mixed
updates, empty/manual input, malformed or unsupported records, and classifier
failure all retain ordered Docpact, TypeScript and Python gates. This is not an
environment-selected bypass. `sh scripts/ci/test-pre-push.sh` exercises the real
hook with isolated gate transports; the existing automation suite includes it.
Direct canonical verification and release-time package proof remain unchanged.
