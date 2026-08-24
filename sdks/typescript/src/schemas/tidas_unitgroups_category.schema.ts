// Generated directly from TIDAS JSON Schema: tidas_unitgroups_category.json
import { z } from 'zod';

export const UnitGroupSchema: z.ZodType<any> = z.union([
  z.object({
    '@level': z.literal('0').optional(),
    '@classId': z.literal('1').optional(),
    '#text': z.literal('Technical unit groups').optional(),
  }),
  z.object({
    '@level': z.literal('0').optional(),
    '@classId': z.literal('2').optional(),
    '#text': z.literal('Chemical composition unit groups').optional(),
  }),
  z.object({
    '@level': z.literal('0').optional(),
    '@classId': z.literal('3').optional(),
    '#text': z.literal('Economic unit groups').optional(),
  }),
  z.object({
    '@level': z.literal('0').optional(),
    '@classId': z.literal('4').optional(),
    '#text': z.literal('Other unit groups').optional(),
  }),
]);
