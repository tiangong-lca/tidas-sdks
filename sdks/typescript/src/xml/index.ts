import { parse, unparse, type ParseOptions, type UnparseOptions } from 'xmltodict';

export type XmlParseOptions = ParseOptions;
export type XmlUnparseOptions = UnparseOptions;
export type XmlInput = string | Uint8Array;

export const DEFAULT_XML_PARSE_OPTIONS: Readonly<XmlParseOptions> = Object.freeze({
  attr_prefix: '@',
  cdata_key: '#text',
});

export const DEFAULT_XML_UNPARSE_OPTIONS: Readonly<XmlUnparseOptions> =
  Object.freeze({
    attr_prefix: '@',
    cdata_key: '#text',
    pretty: true,
  });

function normalizeXmlInput(input: XmlInput) {
  return typeof input === 'string' ? input : new TextDecoder().decode(input);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseXml(
  input: XmlInput,
  options: XmlParseOptions = {}
): unknown {
  return parse(normalizeXmlInput(input), {
    ...DEFAULT_XML_PARSE_OPTIONS,
    ...options,
  });
}

export function datasetFromXml(
  input: XmlInput,
  options: XmlParseOptions = {}
): Record<string, unknown> {
  const parsed = parseXml(input, options);
  if (!isRecord(parsed)) {
    throw new TypeError('Expected XML payload to parse into an object root.');
  }
  return parsed;
}

export function unparseXml(
  input: Record<string, unknown>,
  options: XmlUnparseOptions = {}
): string {
  const xml = unparse(input, {
    ...DEFAULT_XML_UNPARSE_OPTIONS,
    ...options,
  });
  if (typeof xml !== 'string') {
    throw new TypeError('Expected xmltodict.unparse() to return a string.');
  }
  return xml;
}

export function datasetToXml(
  dataset: Record<string, unknown>,
  options: XmlUnparseOptions = {}
): string {
  if (!isRecord(dataset) || Object.keys(dataset).length === 0) {
    throw new TypeError('Expected a non-empty object payload for XML output.');
  }
  return unparseXml(dataset, options);
}
