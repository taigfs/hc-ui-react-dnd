import { z, ZodType, ZodOptional, ZodDefault } from 'zod';
import { JsonSchema } from './json-schema.type';
import { mapTypeToZod } from './map-type-to-zod';

export const buildZodSchemaFromJSON = (jsonSchema: JsonSchema) => {
  const zodSchema: { [key: string]: ZodType<any, any, any> } = {};

  for (const [fieldName, field] of Object.entries(jsonSchema)) {
    let zodField = mapTypeToZod(field);

    if (!field.required) {
      zodField = zodField.optional() as ZodOptional<ZodType<any, any, any>>;
    }

    if (field.defaultValue !== undefined) {
      zodField = zodField.default(field.defaultValue) as ZodDefault<
        ZodType<any, any, any>
      >;
    }

    zodSchema[fieldName] = zodField;
  }

  return z.object(zodSchema);
};
