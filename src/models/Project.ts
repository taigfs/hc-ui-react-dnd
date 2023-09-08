import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Project extends Model {
  static table = 'projects';

  // @ts-ignore
  @field('name') name!: string;
}