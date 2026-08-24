import assert from 'node:assert/strict';
import * as root from '@tiangong-lca/tidas-sdk';
import * as contracts from '@tiangong-lca/tidas-sdk/contracts';
import * as core from '@tiangong-lca/tidas-sdk/core';
import * as parity from '@tiangong-lca/tidas-sdk/parity';
import * as schemas from '@tiangong-lca/tidas-sdk/schemas';
import * as tools from '@tiangong-lca/tidas-sdk/tools';
import * as types from '@tiangong-lca/tidas-sdk/types';
import * as utils from '@tiangong-lca/tidas-sdk/utils';
import * as xml from '@tiangong-lca/tidas-sdk/xml';

const entryPoints = {
  root,
  contracts,
  core,
  parity,
  schemas,
  tools,
  types,
  utils,
  xml,
};

for (const [name, entryPoint] of Object.entries(entryPoints)) {
  assert.equal(typeof entryPoint, 'object', `${name} entry point did not load`);
}

assert.equal(typeof core.createContact, 'function');
assert.equal(typeof schemas.ContactSchema.safeParse, 'function');
assert.equal(typeof xml.datasetFromXml, 'function');

console.log(`Loaded ${Object.keys(entryPoints).length} public entry points.`);
