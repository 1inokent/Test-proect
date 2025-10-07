import { FilterType } from '@/types/filter-type/filter-type';
import { Task } from '@/types/task-type/task-type';

const filteredTasks: Record<FilterType, (task: Task) => boolean> = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

export { filteredTasks };
