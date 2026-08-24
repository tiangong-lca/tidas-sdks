---
title: tidas-sdk Architecture Notes
docType: guide
scope: repo
status: active
authoritative: false
owner: tidas-sdk
language: en
whenToUse:
  - when you need a compact mental model of the repo before editing package code, generation scripts, or release automation
  - when deciding which package or automation layer owns a behavior change
  - when upstream sync, runtime assets, or release tags are mentioned without exact paths
whenToUpdate:
  - when package topology or generation flow changes
  - when new release automation makes the current map misleading
  - when stable versus generated paths move
checkPaths:
  - docs/agents/repo-architecture.md
  - .docpact/config.yaml
  - scripts/ci/**
  - sdks/typescript/**
  - sdks/python/**
  - .github/workflows/**
  - .githooks/pre-push
  - scripts/docpact
  - scripts/docpact-gate.sh
  - scripts/install-git-hooks.sh
lastReviewedAt: 2026-08-24
lastReviewedCommit: 6b18b475e2aa0ea6100acf2931bcab8c7968391d
lastReviewedNote: "Reviewed for issue #101 after independent review: the architecture now records active Draft-07 helpers, the 0.2 compatibility boundary, and executable consumer/example gates."
related:
  - ../../AGENTS.md
  - ../../.docpact/config.yaml
  - ./repo-validation.md
  - ../upstream-automation.md
---

## Repo Shape

This repo packages two SDK surfaces under one root:

- `sdks/typescript/`
- `sdks/python/`

The root owns generation, verification, tagging, and publish automation.

## Stable Vs Generated Paths

| Path group | Role |
| --- | --- |
| `scripts/ci/**` | stable generation, verify, tag, and publish helpers |
| `docs/release-setup.md` | stable release-environment contract |
| `docs/upstream-automation.md` | stable upstream-sync design contract |
| `sdks/typescript/src/**` | TypeScript package source, including generated types, schemas, and committed runtime assets |
| `sdks/typescript/scripts/**` | TypeScript generation and asset-sync helpers |
| `sdks/python/src/**` | Python SDK source and committed generated models |
| `sdks/python/scripts/**` | Python generation helpers |
| `sdks/python/tests/**` | Python SDK tests |
| `sdks/typescript/dist/**` | generated build output, useful for packaging checks but not the first edit surface |
| `sdks/python/dist/**` | generated build artifacts, useful for packaging checks but not the first edit surface |
| `sdks/python/htmlcov/**` | generated test coverage output, not a durable source path |

## Upstream Flow

The practical executable chain today is:

`tidas-tools -> tidas-sdk`

Important consequences:

- `scripts/ci/tidas-tools-assets.mjs` validates the upstream Rust asset lock and derives schema, methodology, and runtime roots from catalog entries rather than package-layout assumptions
- `scripts/ci/lib/typescript-dependencies.sh` gives clean generation and verification runs the same `npm ci --workspaces=false` dependency graph from the committed TypeScript lockfile
- TypeScript runtime assets mirror the catalog-selected non-export roots and include the exact authoritative `asset-lock.v1.json`
- Python generated models also refresh from `tidas-tools`
- `tidas` remains important for public spec/docs content, but it is not the immediate generation source for current package refreshes

## Package Responsibilities

### TypeScript package

The TypeScript package owns developer-facing APIs plus packaged runtime assets and helpers for the non-export portion of the `tidas-tools` workflow.

It also owns the stable validation contract that downstream apps consume:

- generated schemas can emit custom Zod issues for localized-text checks
- `sdks/typescript/scripts/json-schema-to-zod.ts` renders the locked upstream JSON Schema AST directly, without the TypeScript Compiler API or an intermediate generated interface
- `sdks/typescript/scripts/generate-zod-schemas.ts` applies the small named domain overlays for custom validation codes, recursive `common:other`, CAS checks, required localized text, and the Flow name condition
- `sdks/typescript/src/core/validation/json-schema.ts` supplies browser/Node-compatible oneOf, conditional, dependency, tuple, and deep-unique semantics used by generated modules
- unsupported structural schema shapes fail generation; there is no permissive fallback schema
- `sdks/typescript/scripts/verify-zod-generation-parity.ts` compares a candidate generator against a previously built baseline with stable success and issue code/path signatures
- `sdks/typescript/src/core/config/ValidationConfig.ts` normalizes raw Zod issues into the `validationIssues` payload returned by `validateEnhanced()`
- downstream consumers should rely on normalized issue codes instead of parsing free-form error text when they need stable programmatic behavior

The package toolchain is intentionally single-track: `typescript@7.x` is the
only compiler, Oxlint performs type-aware lint, and Node 24 plus `tsx` executes
the test suites. The published package does not carry compiler, generator,
lint, or test tooling into downstream installations.

The direct renderer intentionally establishes the pre-1.0 `0.2.x`
compatibility boundary. Historical generated Zod schemas under-enforced parts
of the authoritative Draft-07 inputs; downstream `^0.1.x` consumers do not
receive those corrections automatically. Each consumer upgrades deliberately
and runs its own real data cases.

### Python package

The Python package owns generated SDK surfaces and validation helpers that are published separately from standalone `tidas-tools`.
Its generator consumes an explicitly resolved schema directory and preserves the
same type-aware Flow name condition in generated Pydantic models.

## Release Automation

The normal release path is:

1. verify package changes
2. merge to `main`
3. let automation create:
   - `typescript-v<version>`
   - `python-v<version>`
4. let publish workflows ship from the immutable tag after package verification

This release model is part of the repo architecture, not just a release checklist.

## Common Misreads

- `tidas` is not the immediate generation upstream for current SDK refreshes
- standalone conversion and export still belong in `tidas-tools`
- generated build outputs are not the only durable source of truth
- a merged child PR does not finish workspace delivery

## Local Docpact Push Gate

This repository has a versioned local `pre-push` hook under `.githooks/pre-push` that delegates to `scripts/docpact-gate.sh` and then runs both package verification scripts. The gate resolves the CLI through `scripts/docpact`, so local agent shells do not need bare `docpact` on `PATH`. The hook is the local guard for docpact config validation, enforced doc-governance linting, and package tests; the GitHub `CI` workflow is manual-dispatch only.
