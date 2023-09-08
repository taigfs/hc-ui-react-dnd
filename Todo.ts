import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Todo extends Model {
  static table = 'todos';

  @field('title') title!: string;
  @field('is_completed') isCompleted!: boolean;
}

export default Todo;