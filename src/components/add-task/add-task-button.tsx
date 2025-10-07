import type { ChangeEvent } from 'react'

interface AddTaskProps {
  addTaskHandler: () => void
  inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  taskValue: string
}

function AddTask({
  addTaskHandler,
  inputChangeHandler,
  taskValue,
}: AddTaskProps) {
  return (
    <>
      <h3>Добавить задачу</h3>
      <input
        type="text"
        onChange={(e) => inputChangeHandler(e)}
        value={taskValue}
        id="new task"
        placeholder="Новая задача"
      />
      <button onClick={addTaskHandler} disabled={taskValue === ''}>
        Добавить задачу
      </button>
    </>
  )
}

export default AddTask
