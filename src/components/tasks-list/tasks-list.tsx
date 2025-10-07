import { JSX, useState } from 'react'
import { Tasks } from '@/types/task-type/task-type'

interface TaskListProps {
  tasks: Tasks
  toggleTaskHandle: (id: number) => void
  deleteTaskHandle: (id: number) => void
  editTaskHandler: (id: number, newText: string) => void
}

function TaskList({
  tasks,
  deleteTaskHandle,
  toggleTaskHandle,
  editTaskHandler,
}: TaskListProps): JSX.Element {
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const startEdit = (id: number, currentText: string) => {
    setEditId(id)
    setEditText(currentText)
  }

  const saveEdit = (id: number) => {
    if (editText.trim() === '') return
    editTaskHandler(id, editText.trim())
    setEditId(null)
    setEditText('')
  }

  return (
    <>
      <h3>Задачи</h3>
      {tasks.length}
      <ul>
        {tasks.length === 0 && <p>Нет задач</p>}

        {tasks.map(({ id, text, completed }) => (
          <li
            key={id}
            style={completed ? { textDecoration: 'line-through' } : {}}
          >
            {editId === id ? (
              <>
                <input
                  value={editText}
                  id={id.toString()}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(id)}
                  autoFocus
                />
                <button onClick={() => saveEdit(id)}>💾</button>
                <button onClick={() => setEditId(null)}>✖</button>
              </>
            ) : (
              <>
                {text}
                <input
                  type="checkbox"
                  id={id.toString()}
                  onChange={() => toggleTaskHandle(id)}
                  checked={completed}
                />
                <button onClick={() => deleteTaskHandle(id)}>🗑️</button>
                <button onClick={() => startEdit(id, text)}>✏️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TaskList
