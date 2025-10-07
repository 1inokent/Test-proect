import { FilterType } from '@/types/filter-type/filter-type'
import { FILTERS } from '../const'

interface FilterTasksProps {
  currentFilter: FilterType
  filterHandle: (filter: FilterType) => void
}

function FilterTasks({ currentFilter, filterHandle }: FilterTasksProps) {
  return (
    <>
      <h3>Фильтры</h3>
      {FILTERS.map(({ name, status }) => (
        <button
          key={status}
          onClick={() => filterHandle(status)}
          style={status === currentFilter ? { border: '3px solid green' } : {}}
        >
          {name}
        </button>
      ))}
    </>
  )
}

export default FilterTasks
