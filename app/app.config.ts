export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
      neutral: 'neutral',
    },
    card: {
      variants: {
        variant: {
          outline: {
            root: 'ring-1',
          },
        },
      },
    },
    breadcrumb: {
      slots: {
        linkLabel: 'text-primary',
        linkLeadingIcon: 'text-primary',
      }
    },
    prose: {
      p: { base: 'prose prose-gray leading-relaxed prose-a:text-primary prose-li:leading-tight prose-li:mt-0 prose-ul:mt-1 prose-ul:mb-4' },
    }
  },
  icon: {
    class: 'icon',
    aliases: {
      website: 'i-mdi-web',
      search: 'i-mdi-magnify',
      community: 'i-mdi-account-group',
      module: 'i-mdi-package-variant-closed',
      home: 'i-mdi-home',
      person: 'i-mdi-account-circle',
      sponsor: 'i-mdi-hand-heart',
      category: 'i-mdi-shape-outline',
      grid: 'i-mdi-view-grid',
      list: 'i-mdi-view-list',
    },
  },
})
