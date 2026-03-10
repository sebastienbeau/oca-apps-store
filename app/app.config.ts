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
    },
    icons: {
      module: 'i-mdi-package-variant-closed',
      repository: 'i-mdi-source-repository',
    }
  },
  // icon: {
  //   class: 'icon',
  //   cssLayer: 'base',
  //   mode: 'css', // default <Icon> mode applied
  //   aliases: {
  //     website: 'i-mdi-web',
  //     repository: 'i-mdi-source-repository',
  //     search: 'i-mdi-magnify',
  //     community: 'i-mdi-account-group',
  //     module: 'i-mdi-package-variant-closed',
  //     home: 'i-mdi-home',
  //     person: 'i-mdi-account-circle',
  //     sponsor: 'i-mdi-hand-heart',
  //     category: 'i-mdi-shape-outline',
  //     grid: 'i-mdi-view-grid',
  //     list: 'i-mdi-view-list',
  //   },
  // },
  icon: {
    class: 'icon', // default <Icon> class applied
    mode: 'css', // default <Icon> mode applied
    aliases: {
      'repository': 'ph:squares-four-fill',
      'module': 'ph:package-duotone',
      'sponsor': 'ph:hand-heart-duotone',
      "search": 'ph:magnifying-glass',
      "community": 'ph:users-three',
      "home": 'ph:house',
      "person": 'ph:user',
      "category": 'ph:tag',
      "grid": 'ph:dots-nine',
      "list": 'ph:list-bullets',
      "runboat": 'ph:boat-duotone',
      "github": 'ph:github-logo',

    },
    cssLayer: 'base' // set the css layer to inject to
  }
})
