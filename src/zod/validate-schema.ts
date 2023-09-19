import { buildZodSchemaFromJSON } from './build-zod-schema-from-json';
import { JsonSchema } from './json-schema.type';

export const validateSchema = (
  schema: string,
  values: string | object,
) => {
  if (!values) {
    return true;
  }

  const zodSchema = buildZodSchemaFromJSON(
    JSON.parse(schema as string) as JsonSchema,
  );
  const parsedValues = typeof values === 'string' ? JSON.parse(values) : values;
  const parsedData = zodSchema.safeParse(parsedValues);
  if (!parsedData.success) {
    throw new Error(`Validation failed: ${(parsedData as any).error}`);
  }

  return true;
};
