import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import { Project } from './Project';

const adapter = new SQLiteAdapter({
  dbName: 'myDatabase',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [Project], // Add the new model classes here
});

export default database;
