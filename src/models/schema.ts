import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'todos',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'is_completed', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'projects', // Add the new table for the Project model
      columns: [
        { name: 'name', type: 'string' },
      ],
    }),
  ],
});