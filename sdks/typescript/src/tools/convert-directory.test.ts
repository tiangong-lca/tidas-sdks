import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { convertDirectory } from './convert-directory';

function packageRoot() {
  return path.resolve(__dirname, '../..');
}

function repoRoot() {
  return path.resolve(packageRoot(), '../..');
}

function testDataPath(fileName: string) {
  return path.join(repoRoot(), 'test-data', fileName);
}

function makeTempDir(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

describe('directory conversion tools', () => {
  it('converts JSON files to XML, preserves other files, and copies eilcd assets', async () => {
    const inputDir = makeTempDir('tidas-sdk-convert-input-');
    const outputDir = makeTempDir('tidas-sdk-convert-output-');
    const nestedDir = path.join(inputDir, 'flows');

    fs.mkdirSync(nestedDir, { recursive: true });
    fs.copyFileSync(
      testDataPath('tidas-example-flow.json'),
      path.join(nestedDir, 'example.json')
    );
    fs.writeFileSync(path.join(nestedDir, 'notes.txt'), 'keep me', 'utf8');

    const result = await convertDirectory(inputDir, outputDir, { toXml: true });
    const xmlPath = path.join(outputDir, 'data', 'flows', 'example.xml');
    const copiedPath = path.join(outputDir, 'data', 'flows', 'notes.txt');

    assert.strictEqual(result.convertedCount, 1);
    assert.strictEqual(result.copiedCount, 1);
    assert.strictEqual(fs.existsSync(xmlPath), true);
    assert.ok(fs.readFileSync(xmlPath, 'utf8').includes('<flowDataSet'));
    assert.strictEqual(fs.readFileSync(copiedPath, 'utf8'), 'keep me');
    assert.strictEqual(fs.existsSync(path.join(outputDir, 'schemas')), true);
    assert.strictEqual(
      fs.existsSync(path.join(outputDir, 'stylesheets')),
      true
    );
  });

  it('converts XML files back to JSON and copies tidas assets', async () => {
    const inputDir = makeTempDir('tidas-sdk-convert-roundtrip-input-');
    const xmlOutputDir = makeTempDir('tidas-sdk-convert-roundtrip-xml-');
    const jsonOutputDir = makeTempDir('tidas-sdk-convert-roundtrip-json-');
    const nestedDir = path.join(inputDir, 'flows');

    fs.mkdirSync(nestedDir, { recursive: true });
    fs.copyFileSync(
      testDataPath('tidas-example-flow.json'),
      path.join(nestedDir, 'example.json')
    );

    await convertDirectory(inputDir, xmlOutputDir, { toXml: true });
    const result = await convertDirectory(
      path.join(xmlOutputDir, 'data'),
      jsonOutputDir,
      { toXml: false }
    );
    const jsonPath = path.join(jsonOutputDir, 'data', 'flows', 'example.json');
    const jsonPayload = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as Record<
      string,
      unknown
    >;

    assert.strictEqual(result.convertedCount, 1);
    assert.strictEqual(result.copiedCount, 0);
    assert.notStrictEqual(jsonPayload.flowDataSet, undefined);
    assert.strictEqual(
      fs.existsSync(path.join(jsonOutputDir, 'schemas')),
      true
    );
    assert.strictEqual(
      fs.existsSync(path.join(jsonOutputDir, 'methodologies')),
      true
    );
  });
});
