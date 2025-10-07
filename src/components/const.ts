const NAME_IN_STORAGE = {
  TASKS: 'tasks',
} as const

const FILTERS = [
  { name: 'Все', status: 'all' },
  { name: 'Выполняется', status: 'active' },
  { name: 'Завершены', status: 'completed' },
] as const

export { NAME_IN_STORAGE, FILTERS }
