import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { datasetFromXml, datasetToXml, parseXml, unparseXml } from './index';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<processDataSet xmlns="http://lca.jrc.it/ILCD/Process"
                xmlns:common="http://lca.jrc.it/ILCD/Common"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                version="1.1"
                locations="../ILCDLocations.xml"
                xsi:schemaLocation="http://lca.jrc.it/ILCD/Process ../../schemas/ILCD_ProcessDataSet.xsd">
  <processInformation>
    <dataSetInformation>
      <common:UUID>123e4567-e89b-12d3-a456-426614174000</common:UUID>
      <name>
        <baseName xml:lang="en">Sample Process</baseName>
      </name>
    </dataSetInformation>
    <quantitativeReference type="Reference flow(s)">
      <referenceToReferenceFlow>1</referenceToReferenceFlow>
      <functionalUnitOrOther xml:lang="en">1 kg of output</functionalUnitOrOther>
    </quantitativeReference>
  </processInformation>
</processDataSet>`;

describe('xml helpers', () => {
  it('parses ILCD XML with attribute and text keys matching TIDAS conventions', () => {
    const parsed = datasetFromXml(SAMPLE_XML);
    const processDataSet = parsed.processDataSet as Record<string, unknown>;
    const processInformation = processDataSet.processInformation as Record<
      string,
      unknown
    >;
    const dataSetInformation = processInformation.dataSetInformation as Record<
      string,
      unknown
    >;
    const name = dataSetInformation.name as Record<string, unknown>;
    const baseName = name.baseName as Record<string, unknown>;
    const quantitativeReference =
      processInformation.quantitativeReference as Record<string, unknown>;
    const functionalUnitOrOther =
      quantitativeReference.functionalUnitOrOther as Record<string, unknown>;

    assert.strictEqual(
      processDataSet['@xmlns'],
      'http://lca.jrc.it/ILCD/Process'
    );
    assert.strictEqual(
      dataSetInformation['common:UUID'],
      '123e4567-e89b-12d3-a456-426614174000'
    );
    assert.strictEqual(baseName['@xml:lang'], 'en');
    assert.strictEqual(baseName['#text'], 'Sample Process');
    assert.strictEqual(quantitativeReference['@type'], 'Reference flow(s)');
    assert.strictEqual(functionalUnitOrOther['#text'], '1 kg of output');
  });

  it('accepts Uint8Array input and returns the same parsed shape', () => {
    const parsed = parseXml(new TextEncoder().encode(SAMPLE_XML)) as Record<
      string,
      unknown
    >;
    assert.notStrictEqual(parsed.processDataSet, undefined);
  });

  it('round-trips a parsed dataset back into XML', () => {
    const parsed = datasetFromXml(SAMPLE_XML);
    const xml = datasetToXml(parsed);

    assert.ok(xml.includes('<processDataSet'));
    assert.ok(xml.includes('xml:lang="en"'));
    assert.ok(
      xml.includes(
        '<common:UUID>123e4567-e89b-12d3-a456-426614174000</common:UUID>'
      )
    );
    assert.ok(
      xml.includes(
        '<functionalUnitOrOther xml:lang="en">1 kg of output</functionalUnitOrOther>'
      )
    );
  });

  it('uses pretty XML output by default', () => {
    const xml = unparseXml({
      root: {
        child: {
          '@xml:lang': 'en',
          '#text': 'hello',
        },
      },
    });

    assert.ok(xml.includes('<?xml version="1.0"'));
    assert.ok(xml.includes('\n'));
    assert.ok(xml.includes('<child xml:lang="en">hello</child>'));
  });

  it('rejects empty dataset payloads for XML output', () => {
    assert.throws(
      () => datasetToXml({}),
      /Expected a non-empty object payload for XML output\./
    );
  });
});
