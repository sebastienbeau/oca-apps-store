<template>
  <UPageHero description="{{ $t('sponsors.page.description') }}" :links="links" :ui="{
  root: 'overflow-hidden',
    header: 'text-left',
    footer: 'text-left',
    links: 'justify-start',
  }">
    <template #title>
      {{ $t('sponsors.page.title') }}
    </template>
    <template #description>
      {{ $t('sponsors.page.description') }}
    </template>
  </UPageHero>

  <template v-for="sponsorship in sponsorships" :key="sponsorship.level">
    <SponsorColorBanner :sponsorship="sponsorship" />
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <sponsorHit v-for="sponsor in sponsors" :key="sponsor.id" :sponsor="sponsor" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { sponsors, sponsorships } from "~/data/sponsors";

const { t } = useI18n()
const localePath = useLocalePath()
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


</script>
