import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ProcessesSchema } from './tidas_processes.schema';

function exchangeLocationSchema() {
  return (ProcessesSchema as any).shape.processDataSet.shape.exchanges.shape
    .exchange.element.shape.location;
}

describe('process exchange location schema', () => {
  it('accepts location category codes and legacy non-empty strings', () => {
    const schema = exchangeLocationSchema();

    assert.strictEqual(schema.safeParse('CN').success, true);
    assert.strictEqual(schema.safeParse('GLO').success, true);
    assert.strictEqual(schema.safeParse('Legacy plant area').success, true);
  });

  it('rejects empty strings and localized text shapes', () => {
    const schema = exchangeLocationSchema();

    assert.strictEqual(schema.safeParse('').success, false);
    assert.strictEqual(
      schema.safeParse({ '@xml:lang': 'en', '#text': 'CN' }).success,
      false
    );
    assert.strictEqual(
      schema.safeParse([{ '@xml:lang': 'en', '#text': 'CN' }]).success,
      false
    );
  });
});
