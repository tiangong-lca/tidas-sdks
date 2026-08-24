// Generated directly from TIDAS JSON Schema: tidas_sources_category.json
import { z } from 'zod';
import { jsonSchemaOneOf } from './../core/validation/json-schema';

export const SourceSchema = jsonSchemaOneOf(
  [
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('0').optional(),
      '#text': z.literal('Images').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('1').optional(),
      '#text': z.literal('Data set formats').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('2').optional(),
      '#text': z.literal('Databases').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('3').optional(),
      '#text': z.literal('Compliance systems').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('4').optional(),
      '#text': z.literal('Statistical classifications').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('5').optional(),
      '#text': z.literal('Publications and communications').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('6').optional(),
      '#text': z.literal('Other source types').optional(),
    }) as z.ZodType,
  ] as z.ZodType[],
  { property: '@classId', values: ['0', '1', '2', '3', '4', '5', '6'] },
);
