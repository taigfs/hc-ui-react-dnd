import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';

const adapter = new SQLiteAdapter({
  dbName: 'myDatabase',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [],
});

export default database;
