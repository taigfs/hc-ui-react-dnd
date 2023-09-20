export type SchemaAttribute = {
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
  defaultValue?: any;
};