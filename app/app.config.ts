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
      arrowDown: 'i-ph-arrow-down',
      arrowLeft: 'i-ph-arrow-left',
      arrowRight: 'i-ph-arrow-right',
      arrowUp: 'i-ph-arrow-up',
      caution: 'i-ph-warning-circle',
      check: 'i-ph-check',
      chevronDoubleLeft: 'i-ph-caret-double-left',
      chevronDoubleRight: 'i-ph-caret-double-right',
      chevronDown: 'i-ph-caret-down',
      chevronLeft: 'i-ph-caret-left',
      chevronRight: 'i-ph-caret-right',
      chevronUp: 'i-ph-caret-up',
      close: 'i-ph-x',
      copy: 'i-ph-copy',
      copyCheck: 'i-ph-check-circle',
      dark: 'i-ph-moon',
      drag: 'i-ph-dots-six-vertical',
      ellipsis: 'i-ph-dots-three',
      error: 'i-ph-x-circle',
      external: 'i-ph-arrow-up-right',
      eye: 'i-ph-eye',
      eyeOff: 'i-ph-eye-slash',
      file: 'i-ph-file',
      folder: 'i-ph-folder',
      folderOpen: 'i-ph-folder-open',
      hash: 'i-ph-hash',
      info: 'i-ph-info',
      light: 'i-ph-sun',
      loading: 'i-ph-circle-notch',
      menu: 'i-ph-list',
      minus: 'i-ph-minus',
      panelClose: 'i-ph-caret-left',
      panelOpen: 'i-ph-caret-right',
      plus: 'i-ph-plus',
      reload: 'i-ph-arrow-counter-clockwise',
      search: 'i-ph-magnifying-glass',
      stop: 'i-ph-square',
      success: 'i-ph-check-circle',
      system: 'i-ph-monitor',
      tip: 'i-ph-lightbulb',
      upload: 'i-ph-upload',
      warning: 'i-ph-warning'
    }
  },

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
      "company": 'ph:building',
      "external": 'ph:arrow-square-out',
      "location": 'ph:map-pin',
      "phone": 'ph:phone',
      "email": 'ph:envelope',
      "website": 'ph:globe-simple',
      "translation": 'ph:translate',
      "psc": 'ph:shield-check',
      "group": 'ph:users',
      "members": 'ph:users',
      "code": 'ph:code',
      "award": 'ph:trophy',
      "industries": 'ph:factory',
      "back": 'ph:arrow-left'
    },
    cssLayer: 'base' // set the css layer to inject to
  }
})
