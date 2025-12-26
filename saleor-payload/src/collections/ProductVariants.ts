import type { CollectionConfig } from 'payload'

export const ProductVariants: CollectionConfig = {
  slug: 'product-variants',
  admin: {
    useAsTitle: 'productName',
    defaultColumns: ['productName', 'variantName', 'sku', 'updatedAt'],
  },
  access: {
    // API Key authentication will handle this
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'variantId',
      type: 'text',
      required: true,
      unique: true, // Crucial for upsert logic
      index: true,
    },
    {
      name: 'variantName',
      type: 'text',
    },
    {
      name: 'productId',
      type: 'text',
      index: true,
    },
    {
      name: 'productName',
      type: 'text',
    },
    {
      name: 'productSlug',
      type: 'text',
    },
    {
      name: 'sku',
      type: 'text',
    },
    {
      name: 'channels',
      type: 'json', // Stores channel-specific availability and pricing
    },
  ],
}
