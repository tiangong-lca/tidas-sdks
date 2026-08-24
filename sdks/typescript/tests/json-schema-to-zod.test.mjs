import assert from 'node:assert/strict';
import test from 'node:test';

import { JsonSchemaToZod } from '../scripts/json-schema-to-zod.ts';

test('orders local definitions by dependency and external imports deterministically', () => {
  const schema = {
    $defs: {
      Root: {
        type: 'object',
        required: ['local', 'zExternal', 'beta', 'alpha'],
        properties: {
          local: { $ref: '#/$defs/Leaf' },
          zExternal: { $ref: './zeta.json#/$defs/Zed' },
          beta: { $ref: './alpha.json#/$defs/Beta' },
          alpha: { $ref: './alpha.json#/$defs/Alpha' },
        },
      },
      Leaf: { type: 'string' },
    },
  };

  const rendered = new JsonSchemaToZod(
    'dependency-fixture.json',
    schema
  ).renderModule();

  assert.deepEqual(rendered.exportNames, ['LeafSchema', 'RootSchema']);
  assert.ok(
    rendered.content.indexOf('export const LeafSchema') <
      rendered.content.indexOf('export const RootSchema'),
    'a local dependency must be declared before the schema that references it'
  );
  assert.deepEqual(
    rendered.content.split('\n').filter((line) => line.startsWith('import ')),
    [
      "import { z } from 'zod';",
      "import { AlphaSchema, BetaSchema } from './alpha.schema';",
      "import { ZedSchema } from './zeta.schema';",
    ]
  );
  assert.match(
    rendered.content,
    /export const RootSchema = z\.object\(\{local: LeafSchema, zExternal: ZedSchema, beta: BetaSchema, alpha: AlphaSchema\}\);/
  );
});

test('renders required and optional fields with structural constraints', () => {
  const schema = {
    type: 'object',
    required: ['name', 'tags', 'count'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 8,
        pattern: '^[a-z]+$',
      },
      note: { type: 'string' },
      tags: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: 3,
      },
      count: {
        type: 'number',
        minimum: 0,
        maximum: 10,
        exclusiveMinimum: -1,
        exclusiveMaximum: 11,
        multipleOf: 2,
      },
    },
  };

  const { content } = new JsonSchemaToZod(
    'constraints.json',
    schema
  ).renderModule();

  assert.match(
    content,
    /name: z\.string\(\)\.min\(2\)\.max\(8\)\.regex\(\/\^\[a-z\]\+\$\/\)/
  );
  assert.match(content, /note: z\.string\(\)\.optional\(\)/);
  assert.match(content, /tags: z\.array\(z\.string\(\)\)\.min\(1\)\.max\(3\)/);
  assert.match(
    content,
    /count: z\.number\(\)\.min\(0\)\.max\(10\)\.gt\(-1\)\.lt\(11\)\.multipleOf\(2\)/
  );
});

test('renders enum, const, anyOf, and allOf without permissive fallbacks', () => {
  const schema = {
    type: 'object',
    required: ['mode', 'fixed', 'choice', 'combined'],
    properties: {
      mode: { enum: ['alpha', 'beta'] },
      fixed: { const: 42 },
      choice: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      combined: {
        allOf: [{ type: 'string', minLength: 1 }, { maxLength: 5 }],
      },
    },
  };

  const { content } = new JsonSchemaToZod(
    'composition.json',
    schema
  ).renderModule();

  assert.match(
    content,
    /mode: z\.union\(\[z\.literal\("alpha"\), z\.literal\("beta"\)\]\)/
  );
  assert.match(content, /fixed: z\.literal\(42\)/);
  assert.match(content, /choice: z\.union\(\[z\.string\(\), z\.number\(\)\]\)/);
  assert.match(
    content,
    /combined: z\.intersection\(z\.string\(\)\.min\(1\), z\.string\(\)\.max\(5\)\)/
  );
  assert.doesNotMatch(content, /z\.unknown\(\)/);
});

test('throws for a not-only schema instead of accepting unknown input', () => {
  assert.throws(
    () =>
      new JsonSchemaToZod('unsupported.json', {
        not: { type: 'string' },
      }).renderModule(),
    /unsupported\.json#: unsupported JSON Schema shape \(not\)/
  );
});

test('renders the same input identically on repeated calls', () => {
  const schema = {
    $defs: {
      Root: {
        type: 'object',
        required: ['local', 'external'],
        properties: {
          local: { $ref: '#/$defs/Leaf' },
          external: { $ref: './shared.json#/$defs/Shared' },
        },
      },
      Leaf: {
        anyOf: [{ const: 'leaf' }, { type: 'number', minimum: 1 }],
      },
    },
  };
  const renderer = new JsonSchemaToZod('determinism.json', schema);

  const first = renderer.renderModule();
  const second = renderer.renderModule();

  assert.deepEqual(second, first);
  assert.deepEqual(
    new JsonSchemaToZod('determinism.json', schema).renderModule(),
    first
  );
});
