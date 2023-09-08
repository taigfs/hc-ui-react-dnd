import { appSchema, tableSchema } from '@nozbe/watermelondb';

const mySchema = appSchema({
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

export { mySchema };