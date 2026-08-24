import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import type { Schema } from '../../utils/object-utils';
import { extractJson, getModel } from './ai';

describe('OpenAI-compatible copilot helpers', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('extracts fenced and direct JSON without an external parser', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    };

    assert.deepStrictEqual(extractJson('{"name":"steel"}', schema), {
      name: 'steel',
    });
    assert.deepStrictEqual(
      extractJson('```json\n{"name":"steel"}\n```', schema),
      {
        name: 'steel',
      }
    );
  });

  it('posts to an OpenAI-compatible chat completions endpoint', async () => {
    const calls: Array<{ url: string; init: RequestInit }> = [];
    global.fetch = (async (
      url: Parameters<typeof fetch>[0],
      init?: Parameters<typeof fetch>[1]
    ) => {
      calls.push({ url: String(url), init: init as RequestInit });
      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: '{"ok":true}',
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }) as unknown as typeof fetch;

    const model = await getModel({
      apiKey: 'test-key',
      baseURL: 'https://example.test/v1',
      model: 'test-model',
    });
    const result = await model.invoke('hello');

    assert.strictEqual(calls.length, 1);
    assert.strictEqual(
      calls[0].url,
      'https://example.test/v1/chat/completions'
    );
    assert.deepStrictEqual(calls[0].init.headers, {
      Authorization: 'Bearer test-key',
      'Content-Type': 'application/json',
    });
    assert.deepStrictEqual(JSON.parse(calls[0].init.body as string), {
      model: 'test-model',
      messages: [{ role: 'user', content: 'hello' }],
      temperature: 0,
    });
    assert.strictEqual(result.content, '{"ok":true}');
  });
});
