import assert from 'node:assert/strict';
import { datasetFromXml, datasetToXml } from '@tiangong-lca/tidas-sdk/xml';

const draft = {
  contactDataSet: {
    '@version': '1.1',
    contactInformation: {
      dataSetInformation: {
        'common:UUID': '00000000-0000-4000-8000-000000000001',
      },
    },
  },
};

const xml = datasetToXml(draft);
const roundTripped = datasetFromXml(xml);

assert.equal(
  (
    roundTripped.contactDataSet as {
      contactInformation: {
        dataSetInformation: { 'common:UUID': string };
      };
    }
  ).contactInformation.dataSetInformation['common:UUID'],
  draft.contactDataSet.contactInformation.dataSetInformation['common:UUID']
);

console.log(
  'Round-tripped a contact draft through the public XML entry point.'
);
