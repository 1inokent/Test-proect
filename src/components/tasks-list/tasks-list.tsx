import { JSX, useState } from 'react';
import { Tasks } from '@/types/task-type/task-type';

import styles from './task-list.module.scss';

interface TaskListProps {
  tasks: Tasks;
  toggleTaskHandle: (id: number) => void;
  deleteTaskHandle: (id: number) => void;
  editTaskHandler: (id: number, newText: string) => void;
}

function TaskList({
  tasks,
  deleteTaskHandle,
  toggleTaskHandle,
  editTaskHandler,
}: TaskListProps): JSX.Element {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const startEdit = (id: number, currentText: string) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = (id: number) => {
    if (editText.trim() === '') return;
    editTaskHandler(id, editText.trim());
    setEditId(null);
    setEditText('');
  };

  return (
    <div className={styles.taskList}>
      <h3>
        Задачи
        <span className={styles.taskCount}>{tasks.length}</span>
      </h3>

      <ul className={styles.tasksList}>
        {tasks.length === 0 && <p>Нет задач</p>}

        {tasks.map(({ id, text, completed }) => (
          <li
            className={`${styles.taskItem} ${completed ? styles.completed : ''}`}
            key={id}
          >
            {editId === id ? (
              <>
                <input
                  className={styles.taskInput}
                  value={editText}
                  id={id.toString()}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(id)}
                  autoFocus
                />
                <button
                  className={`${styles.iconButton} ${styles.saveButton}`}
                  onClick={() => saveEdit(id)}
                >
                  💾
                </button>
                <button
                  className={`${styles.iconButton} ${styles.cancelButton}`}
                  onClick={() => setEditId(null)}
                >
                  ✖
                </button>
              </>
            ) : (
              <>
                <span className={styles.taskText}>{text}</span>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={id.toString()}
                  onChange={() => toggleTaskHandle(id)}
                  checked={completed}
                />
                <button
                  className={`${styles.iconButton} ${styles.deleteButton}`}
                  onClick={() => deleteTaskHandle(id)}
                >
                  🗑️
                </button>
                <button
                  className={`${styles.iconButton} ${styles.editButton}`}
                  onClick={() => startEdit(id, text)}
                >
                  ✏️
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
