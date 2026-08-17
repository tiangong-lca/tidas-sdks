import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('referenceToDigitalFile schema', () => {
  it('keeps external file locators as strings without URI format validation', () => {
    const schema = JSON.parse(
      readFileSync(
        join(
          __dirname,
          '../runtime-assets/tidas/schemas/tidas_sources.json'
        ),
        'utf8'
      )
    );
    const field =
      schema.properties.sourceDataSet.properties.sourceInformation.properties
        .dataSetInformation.properties.referenceToDigitalFile;
    const objectUri = field.anyOf[0].properties['@uri'];
    const arrayUri = field.anyOf[1].items.properties['@uri'];

    expect(objectUri).toEqual({ type: 'string' });
    expect(arrayUri).toEqual({ type: 'string' });
  });
});
