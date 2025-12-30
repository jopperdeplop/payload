import * as migration_20251230_134616_initial from './20251230_134616_initial'

export const migrations = [
  {
    up: migration_20251230_134616_initial.up,
    down: migration_20251230_134616_initial.down,
    name: '20251230_134616_initial',
  },
]
