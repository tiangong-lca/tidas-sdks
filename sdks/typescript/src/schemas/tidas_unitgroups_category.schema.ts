// Generated directly from TIDAS JSON Schema: tidas_unitgroups_category.json
import { z } from 'zod';
import { jsonSchemaOneOf } from './../core/validation/json-schema';

export const UnitGroupSchema: z.ZodType<any> = jsonSchemaOneOf(
  [
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('1').optional(),
      '#text': z.literal('Technical unit groups').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('2').optional(),
      '#text': z.literal('Chemical composition unit groups').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('3').optional(),
      '#text': z.literal('Economic unit groups').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('4').optional(),
      '#text': z.literal('Other unit groups').optional(),
    }) as z.ZodType,
  ] as z.ZodType[],
  { property: '@classId', values: ['1', '2', '3', '4'] },
);
