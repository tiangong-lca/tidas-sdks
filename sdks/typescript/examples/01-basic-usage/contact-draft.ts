import assert from 'node:assert/strict';
import { createContact } from '@tiangong-lca/tidas-sdk/core';

const contact = createContact();
const contactDataSet = contact.contactDataSet;
const dataSetInformation = contactDataSet.contactInformation.dataSetInformation;
const contactId = dataSetInformation['common:UUID'];

dataSetInformation['common:name'] = [
  {
    '@xml:lang': 'en',
    '#text': 'TianGong LCA test-account data steward',
  },
];
dataSetInformation['common:shortName'] = [
  { '@xml:lang': 'en', '#text': 'Test data steward' },
];
dataSetInformation.classificationInformation['common:classification'] = {
  'common:class': {
    '@level': '0',
    '@classId': '4',
    '#text': 'Persons',
  },
};

contactDataSet.administrativeInformation.dataEntryBy[
  'common:referenceToDataSetFormat'
] = {
  '@type': 'source data set',
  '@refObjectId': '00000000-0000-0000-0000-000000000000',
  '@version': '01.00',
  '@uri': '',
  'common:shortDescription': [{ '@xml:lang': 'en', '#text': 'TIDAS format' }],
};
contactDataSet.administrativeInformation.publicationAndOwnership[
  'common:dataSetVersion'
] = '01.00';
contactDataSet.administrativeInformation.publicationAndOwnership[
  'common:referenceToOwnershipOfDataSet'
] = {
  '@type': 'contact data set',
  '@refObjectId': contactId,
  '@version': '01.00',
  '@uri': '',
  'common:shortDescription': [
    { '@xml:lang': 'en', '#text': 'Test-account draft owner' },
  ],
};

const validation = contact.validate();
assert.equal(
  validation.success,
  true,
  validation.success ? undefined : validation.error.message
);
assert.equal(
  contact.toJSON().contactDataSet.contactInformation.dataSetInformation[
    'common:UUID'
  ],
  contactId
);

console.log(`Validated contact draft ${contactId}.`);
