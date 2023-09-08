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
  ],
});