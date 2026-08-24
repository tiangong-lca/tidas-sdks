// Generated directly from TIDAS JSON Schema: tidas_lciamethods_category.json
import { z } from 'zod';
import { jsonSchemaOneOf } from './../core/validation/json-schema';

export const LCIAMethodSchema = jsonSchemaOneOf(
  [
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('1').optional(),
      '#text': z.literal('Damage level LCIA methods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('1.1').optional(),
      '#text': z.literal('Total impact across areas of protection').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('1.2').optional(),
      '#text': z.literal('Human health').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.1').optional(),
      '#text': z.literal('Total human health, combined').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.2').optional(),
      '#text': z.literal('Human health, toxicity').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.3').optional(),
      '#text': z.literal('Human health, climate change').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.4').optional(),
      '#text': z.literal('Human health, ionising radiation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.5').optional(),
      '#text': z.literal('Human health, ozone depletion').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.6').optional(),
      '#text': z.literal('Human health, photooxidant creation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.2.7').optional(),
      '#text': z.literal('Human health, other').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('1.3').optional(),
      '#text': z.literal('Natural environment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.1').optional(),
      '#text': z.literal('Total natural environment, combined').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.2').optional(),
      '#text': z.literal('Natural environment, climate change').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.3').optional(),
      '#text': z.literal('Natural environment, ozone depletion').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.4').optional(),
      '#text': z.literal('Natural environment, land use').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.5').optional(),
      '#text': z
        .literal('Natural environment, freshwater ecotoxicity')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.6').optional(),
      '#text': z
        .literal('Natural environment, seawater ecotoxicity')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.7').optional(),
      '#text': z
        .literal('Natural environment, terrestric ecotoxicity')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.8').optional(),
      '#text': z.literal('Natural environment, acidification').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.9').optional(),
      '#text': z.literal('Natural environment, eutrophication').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.10').optional(),
      '#text': z
        .literal('Natural environment, photooxidant creation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.11').optional(),
      '#text': z.literal('Natural environment, ionising radiation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.3.12').optional(),
      '#text': z.literal('Natural environment, other').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('1.4').optional(),
      '#text': z.literal('Man-made environment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.4.1').optional(),
      '#text': z.literal('Total man-made environment, combined').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.4.2').optional(),
      '#text': z.literal('Man-made environment, acidification').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.4.3').optional(),
      '#text': z.literal('Man-made environment, climate change').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.4.4').optional(),
      '#text': z.literal('Man-made environment, eutrophication').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.4.5').optional(),
      '#text': z.literal('Man-made environment, other').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('1.5').optional(),
      '#text': z.literal('Resource availability').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.1').optional(),
      '#text': z.literal('Total resource depletion, combined').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.2').optional(),
      '#text': z.literal('Resource depletion, minerals and metals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.3').optional(),
      '#text': z
        .literal('Resource depletion, non-renewable energy resourcess')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.4').optional(),
      '#text': z.literal('Resource depletion, land use').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.5').optional(),
      '#text': z
        .literal('Resource depletion, renewable energy resources')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.6').optional(),
      '#text': z
        .literal('Resource depletion, renewable non-energy resources')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('1.5.6').optional(),
      '#text': z.literal('Resource depletion, other').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('2').optional(),
      '#text': z.literal('Midpoint level LCIA methods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.1').optional(),
      '#text': z.literal('Combined methods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.2').optional(),
      '#text': z.literal('Climate change').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.3').optional(),
      '#text': z.literal('Ozone depletion').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.4').optional(),
      '#text': z.literal('Land use').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.5').optional(),
      '#text': z.literal('Ecotoxicity').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.6').optional(),
      '#text': z.literal('Acidification').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.7').optional(),
      '#text': z.literal('Eutrophication').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.8').optional(),
      '#text': z.literal('Photooxidant creation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.9').optional(),
      '#text': z.literal('Nuclear radiation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.10').optional(),
      '#text': z.literal('Human toxicity').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.11').optional(),
      '#text': z.literal('Respiratory effects').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.12').optional(),
      '#text': z.literal('Noise').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.13').optional(),
      '#text': z.literal('Resource depletion').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.14').optional(),
      '#text': z.literal('Other midpoint categories').optional(),
    }) as z.ZodType,
  ] as z.ZodType[],
  {
    property: '#text',
    values: [
      'Damage level LCIA methods',
      'Total impact across areas of protection',
      'Human health',
      'Total human health, combined',
      'Human health, toxicity',
      'Human health, climate change',
      'Human health, ionising radiation',
      'Human health, ozone depletion',
      'Human health, photooxidant creation',
      'Human health, other',
      'Natural environment',
      'Total natural environment, combined',
      'Natural environment, climate change',
      'Natural environment, ozone depletion',
      'Natural environment, land use',
      'Natural environment, freshwater ecotoxicity',
      'Natural environment, seawater ecotoxicity',
      'Natural environment, terrestric ecotoxicity',
      'Natural environment, acidification',
      'Natural environment, eutrophication',
      'Natural environment, photooxidant creation',
      'Natural environment, ionising radiation',
      'Natural environment, other',
      'Man-made environment',
      'Total man-made environment, combined',
      'Man-made environment, acidification',
      'Man-made environment, climate change',
      'Man-made environment, eutrophication',
      'Man-made environment, other',
      'Resource availability',
      'Total resource depletion, combined',
      'Resource depletion, minerals and metals',
      'Resource depletion, non-renewable energy resourcess',
      'Resource depletion, land use',
      'Resource depletion, renewable energy resources',
      'Resource depletion, renewable non-energy resources',
      'Resource depletion, other',
      'Midpoint level LCIA methods',
      'Combined methods',
      'Climate change',
      'Ozone depletion',
      'Land use',
      'Ecotoxicity',
      'Acidification',
      'Eutrophication',
      'Photooxidant creation',
      'Nuclear radiation',
      'Human toxicity',
      'Respiratory effects',
      'Noise',
      'Resource depletion',
      'Other midpoint categories',
    ],
  },
);
