import {
  defineCollection,
  defineContentConfig,
  z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    banners: defineCollection({
      type: 'data',
      source: 'banners/*.md',
      // Define custom schema for docs collection
      schema: z.object({
        text: z.string(),
        icon: z.string().optional(),
        link: z.string().optional(),
      }),
    }),
    docs: defineCollection({
      // Specify the type of content in this collection
      type: 'page',
      // Load every file inside the `content` directory
      source: '**',
    }),
  },
})
