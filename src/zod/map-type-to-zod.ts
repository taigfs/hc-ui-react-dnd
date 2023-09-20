import { ZodType, z } from 'zod';
import { SchemaAttribute } from './schema-attribute.type';

export const mapTypeToZod = (
  field: SchemaAttribute,
): ZodType<any, any, any> => {
  switch (field.type) {
    case 'string':
      return z.string();
    case 'number':
      return z.number();
    case 'boolean':
      return z.boolean();
    default:
      throw new Error(`Unsupported type: ${field.type}`);
  }
};
