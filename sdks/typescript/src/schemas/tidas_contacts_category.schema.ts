// Generated directly from TIDAS JSON Schema: tidas_contacts_category.json
import { z } from 'zod';
import { jsonSchemaOneOf } from './../core/validation/json-schema';

export const ContactSchema = jsonSchemaOneOf(
  [
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('1').optional(),
      '#text': z.literal('Group of organisations, project').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('2').optional(),
      '#text': z.literal('Organisations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.1').optional(),
      '#text': z.literal('Private companies').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.2').optional(),
      '#text': z.literal('Governmental organisations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.3').optional(),
      '#text': z.literal('Non-governmental organisations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('2.4').optional(),
      '#text': z.literal('Other organisations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('3').optional(),
      '#text': z.literal('Working groups within organisation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('4').optional(),
      '#text': z.literal('Persons').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('5').optional(),
      '#text': z.literal('Other').optional(),
    }) as z.ZodType,
  ] as z.ZodType[],
  {
    property: '@classId',
    values: ['1', '2', '2.1', '2.2', '2.3', '2.4', '3', '4', '5'],
  },
);
