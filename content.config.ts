import {
  defineCollection,
  defineContentConfig,
  z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    sponsorLevels: defineCollection({
      type: 'data',
      source: 'sponsorLevels/*.md',
      // Define custom schema for docs collection
      schema: z.object({
        level: z.string(),
        name: z.string(),
        title: z.string(),
        color: z.string(),
        image: z.string().optional(),
        description: z.string().optional(),
      }),
      indexes: [
        { columns: ['level'], unique: true },
      ],
    }),
    docs: defineCollection({
      // Specify the type of content in this collection
      type: 'page',
      // Load every file inside the `content` directory
      source: '**',
    }),
  },
})
