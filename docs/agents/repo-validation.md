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
lastReviewedAt: 2026-08-24
lastReviewedCommit: 2a288e7bb81852c1d26efa1202c59a207f9a8ed4
lastReviewedNote: "Reviewed for issue #101: validation now proves TS7-only closure, clean packed consumers, direct schema generation, and Node 24 test behavior."
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
| TypeScript package source, examples, or package scripts | `./scripts/ci/verify-typescript-package.sh` | run one focused example or narrow package command when the change is isolated | This verify script covers the frozen TS7 install, Oxlint, both TS7 typechecks, Node tests, generated artifacts, build, and packability. The toolchain contracts also install the tarball into a clean consumer and prove it does not pull in TypeScript. |
| JSON Schema to Zod generator or domain overlays | `./scripts/ci/verify-typescript-package.sh` | before replacing the baseline build, run `npm run verify:schema-generation-parity` and record the exact baseline/candidate source | The parity runner checks stable success plus issue code/path for CAS, localized text, `common:other`, Flow, Process, and Source cases. Use `TIDAS_ZOD_BASELINE_DIR` or `TIDAS_ZOD_CANDIDATE_DIR` when the default prebuilt `dist/schemas` and generated candidate are not appropriate. |
| Python package source, scripts, or tests | `./scripts/ci/verify-python-package.sh` | run one focused pytest or generation step when the change is isolated | Record if the Python package still depends on generated artifacts from a specific upstream commit. |
| shared generation helpers under `scripts/ci/**` | run both verify scripts | run the matching focused automation regression script and `generate-*.sh` path if the task explicitly changes refresh behavior | Generation changes can affect both packages even if only one output changed. |
| release setup, tag, or publish workflows | run both verify scripts and `python3 ./scripts/ci/test-automation-contracts.py` | inspect `.github/workflows/**` and record any tag or environment assumptions checked locally | Tag creation and registry publication are separate from local package verification. Release detection must distinguish an untagged pending version from an already-tagged version. |
| repo contract or governed-doc changes only | `scripts/docpact validate-config --root . --strict` and `scripts/docpact lint --root . --staged --mode enforce` | run one focused route check such as `scripts/docpact route --root . --intent repo-docs --format text` or `upstream-refresh` when the change touches release / automation docs | Refresh review evidence even when prose-only governed docs change. |

## Upstream Resolution Notes

Facts that matter:

- TypeScript and Python generation resolve `tidas-tools` in this order:
  1. `TIDAS_TOOLS_PATH`
  2. sibling `../tidas-tools`
  3. temporary clone
- every source must be a Git checkout at the exact `TIDAS_TOOLS_SHA`; the default
  pin is immutable and advances in the same generated PR as the package assets;
  dispatch/manual automation must supply a full 40-character SHA
- `scripts/ci/tidas-tools-assets.mjs` validates the Rust
  `assets/asset-lock.v1.json`, all catalog entry hashes/sizes, and the packaged
  TypeScript runtime copy before generation succeeds
- clean TypeScript generation and verification both install dependencies through
  `scripts/ci/lib/typescript-dependencies.sh`, which requires the committed
  lockfile and runs `npm ci --workspaces=false`
- `sdks/typescript/tests/toolchain-contract.test.mjs` rejects TypeScript majors
  below 7, legacy Compiler API consumers, removed tsconfig options, and packed
  consumers that inherit compiler tooling
- generator changes should build the baseline before editing, then run
  `npm run verify:schema-generation-parity`; its automatic candidate directory
  is always cleaned and can be replaced by explicit baseline/candidate paths
- if you intentionally validate against a local checkout, record both its path
  and exact commit in the PR note

## Validation Contract Notes

- TypeScript callers should prefer `validateEnhanced()` and consume the returned `validationIssues` array instead of parsing raw Zod error prose when stable UI or API behavior matters.
- Normalized validation issues should preserve `code`, `path`, `severity`, optional `params`, `message`, and `rawCode`.
- Generated localized-text checks must keep attaching `params.validationCode` so the downstream normalized code resolves to stable values such as `localized_text_zh_must_include_chinese_character` and `localized_text_en_must_not_contain_chinese_character`.
- Generated TypeScript and Python Flow validators must prove that an Elementary
  flow accepts `baseName` without synthetic qualifiers and Product, Waste, and
  Other flows reject missing `treatmentStandardsRoutes` or
  `mixAndLocationTypes`.
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

The `pre-push` hook runs `scripts/docpact-gate.sh`, which delegates CLI lookup to `scripts/docpact` and performs strict config validation plus enforced lint before the push leaves the machine. It then runs `./scripts/ci/verify-typescript-package.sh` and `./scripts/ci/verify-python-package.sh` as the local test gate. The wrapper checks `DOCPACT_BIN`, Cargo install locations, Homebrew install locations, and then `PATH`, so local agent shells should not fail only because bare `docpact` is unavailable. The default comparison base is `origin/main`. Override it for unusual stacks with `DOCPACT_BASE_REF=<ref>` or `scripts/docpact-gate.sh --base <ref>`. The gate writes its detailed report to a temporary file so normal pushes do not create `.docpact/runs/` artifacts. The GitHub `CI` workflow is manual-dispatch only.
