import type { CollectionConfig } from 'payload'
import { generateContent } from '../hooks/generateContent'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [generateContent],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'autoGenerate',
      type: 'checkbox',
      label: 'Auto-Generate Content with AI',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'aiPrompt',
      type: 'textarea',
      label: 'AI Prompt (Optional - defaults to Title)',
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.autoGenerate),
      },
    },
  ],
}
