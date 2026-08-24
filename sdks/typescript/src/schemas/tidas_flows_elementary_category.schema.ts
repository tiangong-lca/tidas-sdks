// Generated directly from TIDAS JSON Schema: tidas_flows_elementary_category.json
import { z } from 'zod';
import { jsonSchemaOneOf } from './../core/validation/json-schema';

export const FlowsElementaryCategorySchema: z.ZodType<any> = jsonSchemaOneOf(
  [
    z.object({
      '@level': z.literal('0').optional(),
      '@catId': z.literal('1').optional(),
      '#text': z.literal('Emissions').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('1.1').optional(),
      '#text': z.literal('Emissions to water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.1.1').optional(),
      '#text': z.literal('Emissions to fresh water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.1.2').optional(),
      '#text': z.literal('Emissions to sea water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.1.3').optional(),
      '#text': z.literal('Emissions to water, unspecified').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.1.4').optional(),
      '#text': z
        .literal('Emissions to water, unspecified (long-term)')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('1.2').optional(),
      '#text': z.literal('Emissions to soil').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.2.1').optional(),
      '#text': z.literal('Emissions to agricultural soil').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.2.2').optional(),
      '#text': z.literal('Emissions to non-agricultural soil').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.2.3').optional(),
      '#text': z.literal('Emissions to soil, unspecified').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.2.4').optional(),
      '#text': z
        .literal('Emissions to soil, unspecified (long-term)')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('1.3').optional(),
      '#text': z.literal('Emissions to air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.1').optional(),
      '#text': z.literal('Emissions to urban air close to ground').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.2').optional(),
      '#text': z
        .literal('Emissions to non-urban air or from high stacks')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.3').optional(),
      '#text': z
        .literal('Emissions to lower stratosphere and upper troposphere')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.4').optional(),
      '#text': z.literal('Emissions to air, unspecified').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.5').optional(),
      '#text': z
        .literal('Emissions to air, unspecified (long-term)')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@catId': z.literal('2').optional(),
      '#text': z.literal('Resources').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('2.1').optional(),
      '#text': z.literal('Resources from ground').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.1').optional(),
      '#text': z
        .literal('Non-renewable material resources from ground')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.2').optional(),
      '#text': z
        .literal('Non-renewable element resources from ground')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.3').optional(),
      '#text': z
        .literal('Non-renewable energy resources from ground')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.4').optional(),
      '#text': z.literal('Renewable element resources from ground').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.5').optional(),
      '#text': z.literal('Renewable energy resources from ground').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.6').optional(),
      '#text': z.literal('Renewable material resources from ground').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.7').optional(),
      '#text': z
        .literal('Renewable resources from ground, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.1.8').optional(),
      '#text': z
        .literal('Non-renewable resources from ground, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('2.2').optional(),
      '#text': z.literal('Resources from water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.1').optional(),
      '#text': z
        .literal('Non-renewable material resources from water')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.2').optional(),
      '#text': z
        .literal('Non-renewable element resources from water')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.3').optional(),
      '#text': z
        .literal('Non-renewable energy resources from water')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.4').optional(),
      '#text': z.literal('Renewable element resources from water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.5').optional(),
      '#text': z.literal('Renewable energy resources from water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.6').optional(),
      '#text': z.literal('Renewable material resources from water').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.7').optional(),
      '#text': z
        .literal('Renewable resources from water, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.2.8').optional(),
      '#text': z
        .literal('Non-renewable resources from water, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('2.3').optional(),
      '#text': z.literal('Resources from air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.1').optional(),
      '#text': z
        .literal('Non-renewable material resources from air')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.2').optional(),
      '#text': z.literal('Non-renewable element resources from air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.3').optional(),
      '#text': z.literal('Non-renewable energy resources from air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.4').optional(),
      '#text': z.literal('Renewable element resources from air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.5').optional(),
      '#text': z.literal('Renewable energy resources from air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.6').optional(),
      '#text': z.literal('Renewable material resources from air').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.7').optional(),
      '#text': z
        .literal('Renewable resources from air, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.3.8').optional(),
      '#text': z
        .literal('Non-renewable resources from air, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('2.4').optional(),
      '#text': z.literal('Resources from biosphere').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.4.1').optional(),
      '#text': z
        .literal('Renewable element resources from biosphere')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.4.2').optional(),
      '#text': z
        .literal('Renewable energy resources from biosphere')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.4.3').optional(),
      '#text': z
        .literal('Renewable material resources from biosphere')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.4.4').optional(),
      '#text': z
        .literal('Renewable genetic resources from biosphere')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('2.4.5').optional(),
      '#text': z
        .literal('Renewable resources from biosphere, unspecified')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@catId': z.literal('3').optional(),
      '#text': z.literal('Land use').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('3.1').optional(),
      '#text': z.literal('Land occupation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('3.2').optional(),
      '#text': z.literal('Land transformation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@catId': z.literal('4').optional(),
      '#text': z.literal('Other elementary flows').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.6').optional(),
      '#text': z.literal('Emissions to air, indoor').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.7').optional(),
      '#text': z.literal('Emissions to urban air low stack').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.8').optional(),
      '#text': z.literal('Emissions to urban air high stack').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.9').optional(),
      '#text': z.literal('Emissions to urban air very high stack').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.10').optional(),
      '#text': z
        .literal('Emissions to non-urban air close to ground')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.11').optional(),
      '#text': z.literal('Emissions to non-urban air low stack').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.12').optional(),
      '#text': z.literal('Emissions to non-urban air high stack').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.3.13').optional(),
      '#text': z
        .literal('Emissions to non-urban air very high stack')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@catId': z.literal('1.4').optional(),
      '#text': z.literal('Emissions to industrial soil').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@catId': z.literal('1.4.1').optional(),
      '#text': z.literal('Other emissions to industrial soil').optional(),
    }) as z.ZodType,
  ] as z.ZodType[],
  {
    property: '@catId',
    values: [
      '1',
      '1.1',
      '1.1.1',
      '1.1.2',
      '1.1.3',
      '1.1.4',
      '1.2',
      '1.2.1',
      '1.2.2',
      '1.2.3',
      '1.2.4',
      '1.3',
      '1.3.1',
      '1.3.2',
      '1.3.3',
      '1.3.4',
      '1.3.5',
      '2',
      '2.1',
      '2.1.1',
      '2.1.2',
      '2.1.3',
      '2.1.4',
      '2.1.5',
      '2.1.6',
      '2.1.7',
      '2.1.8',
      '2.2',
      '2.2.1',
      '2.2.2',
      '2.2.3',
      '2.2.4',
      '2.2.5',
      '2.2.6',
      '2.2.7',
      '2.2.8',
      '2.3',
      '2.3.1',
      '2.3.2',
      '2.3.3',
      '2.3.4',
      '2.3.5',
      '2.3.6',
      '2.3.7',
      '2.3.8',
      '2.4',
      '2.4.1',
      '2.4.2',
      '2.4.3',
      '2.4.4',
      '2.4.5',
      '3',
      '3.1',
      '3.2',
      '4',
      '1.3.6',
      '1.3.7',
      '1.3.8',
      '1.3.9',
      '1.3.10',
      '1.3.11',
      '1.3.12',
      '1.3.13',
      '1.4',
      '1.4.1',
    ],
  },
);
