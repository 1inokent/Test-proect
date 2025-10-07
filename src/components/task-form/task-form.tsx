import React, { JSX, useEffect, useState } from 'react'

import AddTask from '../add-task/add-task-button'

import styles from './task-form.module.scss'
import { Tasks } from '@/types/task-type/task-type'
import TaskList from '../tasks-list/tasks-list'
import FilterTasks from '../filter-tasks/filter-tasks'
import { NAME_IN_STORAGE } from './const'

function TaskForm(): JSX.Element {
  const [taskValue, setTaskValue] = useState('')
  const [tasks, setTasks] = useState<Tasks>(() => {
    const tasksSaved = localStorage.getItem(NAME_IN_STORAGE.TASKS)
    return tasksSaved ? JSON.parse(tasksSaved) : []
  })

  useEffect(() => {
    localStorage.setItem(NAME_IN_STORAGE.TASKS, JSON.stringify(tasks))
  }, [tasks])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value)
  }

  const onAddTask = () => {
    if (taskValue.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: taskValue.trim(),
      completed: false,
    }

    setTasks((prev) => [...prev, newTask])
    setTaskValue('')
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const onEditTask = (id: number, newTaskText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newTaskText } : task
      )
    )
  }

  const onDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className={styles.taskForm}>
      <h1>Список задач</h1>

      <AddTask
        addTaskHandler={onAddTask}
        inputChangeHandler={onInputChange}
        taskValue={taskValue}
      />

      <FilterTasks />

      <TaskList
        deleteTaskHandle={onDeleteTask}
        tasks={tasks}
        toggleTaskHandle={toggleTask}
        editTaskHandler={onEditTask}
      />
    </div>
  )
}

export default TaskForm
