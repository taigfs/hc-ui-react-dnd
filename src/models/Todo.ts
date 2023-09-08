import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Todo extends Model {
  static table = 'todos';

  // @ts-ignore
  @field('title') title!: string;
  // @ts-ignore
  @field('is_completed') isCompleted!: boolean;
}

export default Todo;