import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero', // required
  imageURL: 'https://google.com/path/to/image.jpg',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
  ],
}

export const CallToAction: Block = {
  slug: 'cta',
  fields: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
}
