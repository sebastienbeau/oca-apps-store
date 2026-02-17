// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
  ],
  plugins: ['~/plugins/services/index'],
  ssr: false,
  devtools: { enabled: true },
  app: {
    //pageTransition: { name: 'page', mode: 'out-in' },
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      class: 'bg-default',
    },
    head: {
      meta: [{ name: 'theme-color', content: '#20412c' }],
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  spaLoadingTemplate: 'assets/templates/loading.html',
  runtimeConfig: {
    // Serveur-side only configuration
    basicAuth: process.env.NUXT_BASIC_AUTH || '',
    // Client-side and server-side configuration
    public: {
      search: {
        url: process.env.NUXT_PUBLIC_SHOPINVADER_SEARCH_URL || '',
        key: process.env.NUXT_PUBLIC_SHOPINVADER_SEARCH_KEY || '',
        indices: {
          persons: {
            en: process.env
              .NUXT_PUBLIC_SHOPINVADER_SEARCH_INDICES_PERSONS_EN || ''
          },
          sponsors: {
            en: process.env
              .NUXT_PUBLIC_SHOPINVADER_SEARCH_INDICES_SPONSORS_EN || ''
          },
          modules: {
            en: process.env
              .NUXT_PUBLIC_SHOPINVADER_SEARCH_INDICES_MODULES_EN || ''
          },
          categories: {
            en: process.env
              .NUXT_PUBLIC_SHOPINVADER_SEARCH_INDICES_CATEGORIES_EN || ''
          }
        },
      },
    },
  },
  routeRules: {
    '/': {
      ssr: true,
    },
    '/**': {
      ssr: true,
    }
  },
  sourcemap: {
    server: true,
    client: true,
  },
  compatibilityDate: '2025-07-16',
  nitro: {
    prerender: {
      // Pre-render the homepage
      routes: ['/'],
      // Then crawl all the links on the page
      crawlLinks: true,
    },
    storage: {
      db: {
        driver: 'fs',
        base: './.data/db',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en_us',
        name: 'English',
        file: 'en-US.json',
        icon: 'i-circle-flags-lang-en',
      },
    ],
    langDir: 'locales/',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
  },
  pwa: {
    strategies: 'injectManifest',
    srcDir: 'pwa',
    filename: 'sw.ts',
    registerType: 'prompt',
    manifest: {
      name: 'OCA Appstore',
      short_name: 'OCA Appstore',
      description: 'OCA Appstore PWA',
      theme_color: '#20412c',
      start_url: '/',
      display: 'standalone',

      background_color: '#ffffff',
      icons: [
        {
          src: '/logo-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      categories: ['shopping', 'utilities'],
      id: '/',
      display_override: ['window-controls-overlay', 'standalone'],
      launch_handler: {
        client_mode: 'navigate-existing',
      },
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
    },
  },


})