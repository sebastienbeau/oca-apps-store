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
    }
  },
  icon: {
    class: 'icon',
    aliases: {
      website: 'i-mdi-web',
      search: 'i-mdi-magnify',
      module: 'i-mdi-package-variant-closed',
      person: 'i-mdi-account-circle',
      sponsor: 'i-mdi-hand-heart',
      category: 'i-mdi-shape-outline',
      grid: 'i-mdi-view-grid',
      list: 'i-mdi-view-list',
    },
  },
})
