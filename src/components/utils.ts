import { FilterType } from '@/types/filter-type/filter-type'
import { Tasks } from '@/types/task-type/task-type'

const filteredTasks: Record<FilterType, (task: Tasks[0]) => boolean> = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
}

export { filteredTasks }
