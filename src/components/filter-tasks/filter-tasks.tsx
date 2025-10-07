import { FilterType } from '@/types/filter-type/filter-type';
import { FILTERS } from '../const';

import styles from './filter-task.module.scss';

interface FilterTasksProps {
  currentFilter: FilterType;
  filterHandle: (filter: FilterType) => void;
}

function FilterTasks({ currentFilter, filterHandle }: FilterTasksProps) {
  return (
    <div className={styles.filterTasks}>
      <h3>Фильтры</h3>
      <div className={styles.filterButtons}>
        {FILTERS.map(({ name, status }) => (
          <button
            className={`${styles.filterButton} ${status === currentFilter ? styles.active : ''}`}
            key={status}
            onClick={() => filterHandle(status)}
            style={
              status === currentFilter ? { border: '3px solid green' } : {}
            }
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTasks;
