# TIDAS TypeScript SDK

TypeScript SDK for the TIDAS (TianGong Life Cycle Assessment data format)
contracts, runtime validation, XML conversion, and package-level parity tools.

Published package: [@tiangong-lca/tidas-sdk](https://www.npmjs.com/package/@tiangong-lca/tidas-sdk).
Read the installed package metadata or npm registry for the current version.

Node.js 24 or newer is required.

## Installation

```bash
npm install @tiangong-lca/tidas-sdk
```

## Public entry points

| Entry point | Purpose |
| --- | --- |
| `@tiangong-lca/tidas-sdk` | Combined public API |
| `@tiangong-lca/tidas-sdk/core` | Entity classes and current factory functions |
| `@tiangong-lca/tidas-sdk/types` | Generated TIDAS TypeScript types |
| `@tiangong-lca/tidas-sdk/schemas` | Generated Zod schemas and validation helpers |
| `@tiangong-lca/tidas-sdk/contracts` | TIDAS context and methodology contracts |
| `@tiangong-lca/tidas-sdk/parity` | Package-directory JSON Schema validation |
| `@tiangong-lca/tidas-sdk/xml` | XML parsing and serialization |
| `@tiangong-lca/tidas-sdk/tools` | Directory conversion and runtime assets |
| `@tiangong-lca/tidas-sdk/utils` | General SDK utilities |

Every entry point is exercised through CJS, ESM, and TypeScript declaration
consumer tests before release.

## Current factory API

The maintained entity factories are:

```typescript
import {
  createContact,
  createFlow,
  createFlowProperty,
  createLCIAMethod,
  createLifeCycleModel,
  createProcess,
  createSource,
  createUnitGroup,
} from '@tiangong-lca/tidas-sdk/core';
```

Each entity also has `FromJSON` and plural `Batch` variants. Multilingual
fields use the standard TIDAS item or item-array representation; the SDK does
not expose `setText`/`getText` methods.

```typescript
import { createContact } from '@tiangong-lca/tidas-sdk/core';

const contact = createContact();
const information =
  contact.contactDataSet.contactInformation.dataSetInformation;

information['common:name'] = [
  { '@xml:lang': 'en', '#text': 'Example data steward' },
];

const result = contact.validate();
if (!result.success) {
  console.error(result.error.issues);
}
```

A complete, valid contact draft is maintained at
[`examples/01-basic-usage/contact-draft.ts`](./examples/01-basic-usage/contact-draft.ts).

## Schema validation

```typescript
import {
  ContactSchema,
  parseWithZod,
  validateWithZod,
} from '@tiangong-lca/tidas-sdk/schemas';

const result = validateWithZod(value, ContactSchema);
const parsed = parseWithZod(jsonText, ContactSchema);
```

Generated schemas come directly from the asset-lock-selected Draft-07 JSON
Schema documents. Named domain overlays preserve CAS checks, multilingual
validation codes, `common:other`, required multilingual values, Flow name
conditions, and review conditions. Generation fails when it encounters a
validation keyword or overlay location that is not explicitly supported.

For stable programmatic error handling, entity callers should prefer
`validateEnhanced()` and consume normalized `validationIssues` rather than
parsing Zod message text.

## Package parity validation

```typescript
import { validatePackageDir } from '@tiangong-lca/tidas-sdk/parity';

const report = validatePackageDir('/path/to/tidas-package');
if (!report.ok) {
  console.error(report.issues);
}
```

## XML and directory conversion

```typescript
import { datasetFromXml, datasetToXml } from '@tiangong-lca/tidas-sdk/xml';
import { convertDirectory } from '@tiangong-lca/tidas-sdk/tools';

const dataset = datasetFromXml(xmlPayload);
const xml = datasetToXml(dataset);

await convertDirectory('./input', './output', { toXml: true });
await convertDirectory('./eilcd-data', './tidas-output', { toXml: false });
```

Database export, ZIP publishing, and S3 workflows remain owned by
[`tidas-tools`](https://github.com/tiangong-lca/tidas-tools).

## Development

```bash
cd sdks/typescript
npm ci --workspaces=false
npm run lint
npm run typecheck
npm test
npm run check:examples
npm run build
```

The package uses a single `typescript@7.x` compiler track. Oxlint performs
type-aware linting, Node 24 runs tests through `tsx`, and the published tarball
does not carry compiler, generator, lint, or test tooling into consumers.

Useful commands:

```bash
npm run generate-types
npm run generate-schemas
npm run verify:schema-generation-parity
npm run test:coverage
npm run format:check
```

For generator parity, build the baseline before editing the generator. The
default baseline is `dist/schemas`; `TIDAS_ZOD_BASELINE_DIR` and
`TIDAS_ZOD_CANDIDATE_DIR` can select explicit artifacts. Automatic candidate
output is always cleaned.

The maintained examples are executable contracts:

- `examples/01-basic-usage/contact-draft.ts`
- `examples/02-xml-roundtrip/xml-roundtrip.ts`
- `examples/test-imports.ts`

Run all of them with `npm --prefix examples run check`.

## Release

The normal release path is documented in [RELEASE.md](./RELEASE.md). Before a
release PR, run the repository wrapper from the repository root:

```bash
./scripts/ci/verify-typescript-package.sh
```

After merge, the exact merged commit is tagged as `typescript-vX.Y.Z` and the
repository-owned Trusted Publishing workflow publishes it.

## Repository documentation

- [Repository contract](../../AGENTS.md)
- [Validation guide](../../docs/agents/repo-validation.md)
- [Release setup](../../docs/release-setup.md)
- [Upstream automation](../../docs/upstream-automation.md)

## License

MIT — see [LICENSE](./LICENSE).
