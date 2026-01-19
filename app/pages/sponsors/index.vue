<template>
  <UPageHero description="{{ $t('sponsors.page.description') }}" :links="links" :ui="{
    root: 'overflow-hidden',
    header: 'text-left',
    footer: 'text-left',
    links: 'justify-start',
  }">
    <template #title>
      {{ t('sponsors.page.title') }}
    </template>
    <template #description>
      {{ t('sponsors.page.description') }}
    </template>
  </UPageHero>
  <template v-for="sponsorship in sponsorShipList" :key="sponsorship.level">
    <SponsorColorBanner :sponsorship="sponsorship" />
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <sponsorHit v-for="sponsor in sponsors[sponsorship.level]" :key="sponsor.id" :sponsor="sponsor" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { sponsorships } from "~/data/sponsors";
import type { Sponsor, SponsorResultGroupedLevels } from "~/models";


const { t } = useI18n()
const perPage = 12
const page = ref(1)
const localePath = useLocalePath()
const sponsorService = useService('sponsors')
const sponsors = ref<{ [level: string]: Sponsor[] }>({})
const totalSponsors = ref(0)
const links = ref([
  {
    label: t('sponsor.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('sponsor.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const getSponsors = async () => {
  const res = await sponsorService.getSponsorsGroupedLevels({}, page.value, perPage)
  return res
}

const { data } = await useAsyncData<SponsorResultGroupedLevels>('sponsors', getSponsors)
if (data.value) {
  sponsors.value = data.value.hits
  totalSponsors.value = data.value.total
}
const sponsorShipList = computed(() => {
  return sponsorships.filter(s => sponsors.value[s.level] && sponsors.value[s.level].length > 0)
})
</script>
