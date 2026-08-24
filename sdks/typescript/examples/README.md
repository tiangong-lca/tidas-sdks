# TIDAS SDK Examples

These examples are executable contracts for the current SDK API. They use the
same public package specifiers that consumers use, while `tsconfig.json` maps
those specifiers to this checkout so a release cannot drift from its examples.

Run the complete gate from this directory:

```bash
pnpm check
```

The gate uses TypeScript 7 to type-check every example, verifies all public
entry points, validates a complete contact draft, and round-trips a draft
through the public XML API. Any assertion or import failure exits non-zero.

The maintained cases are intentionally small:

- `01-basic-usage/contact-draft.ts` creates and validates a complete contact
  using the current plain-array multilingual representation.
- `02-xml-roundtrip/xml-roundtrip.ts` exercises the supported XML boundary.
- `test-imports.ts` loads every exported package subpath.

When adding a case, import only from `@tiangong-lca/tidas-sdk` public entry
points and add it to the `check` script so both type-checking and execution are
part of the release gate.
