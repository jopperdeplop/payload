import * as migration_20251230_134616_initial from './20251230_134616_initial'
import * as migration_20251230_144925_add_cms_collections from './20251230_144925_add_cms_collections'
import * as migration_20251231_114342_add_posts_and_blocks from './20251231_114342_add_posts_and_blocks'
import * as migration_20251231_115105_add_ai_fields_to_posts from './20251231_115105_add_ai_fields_to_posts'

export const migrations = [
  {
    up: migration_20251230_134616_initial.up,
    down: migration_20251230_134616_initial.down,
    name: '20251230_134616_initial',
  },
  {
    up: migration_20251230_144925_add_cms_collections.up,
    down: migration_20251230_144925_add_cms_collections.down,
    name: '20251230_144925_add_cms_collections',
  },
  {
    up: migration_20251231_114342_add_posts_and_blocks.up,
    down: migration_20251231_114342_add_posts_and_blocks.down,
    name: '20251231_114342_add_posts_and_blocks',
  },
  {
    up: migration_20251231_115105_add_ai_fields_to_posts.up,
    down: migration_20251231_115105_add_ai_fields_to_posts.down,
    name: '20251231_115105_add_ai_fields_to_posts',
  },
]
