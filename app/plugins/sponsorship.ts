import type { Company, Sponsor } from "~~/models"

export default defineNuxtPlugin({
  name: 'sponsorship-plugin',
  enforce: 'pre', // or 'post'
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
    const levels = await queryCollection('sponsorLevels').all()
    levels.sort((a, b) => parseInt(a.level) - parseInt(b.level))
    const getSponsorLevel = (company: Company | Sponsor) => {
      if (!company?.sponsorship) {
        return null
      }
      //return levels

      return levels.find((level) => level.level == company?.sponsorship?.level?.id) || null
    }
    return {
      provide: {
        sponsor: {
          levels,
          getSponsorLevel
        }
      },
    }
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    'app:created'() {
      const nuxtApp = useNuxtApp()
      // do something in the hook
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
})
