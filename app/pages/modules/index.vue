<template>
  <div>
    <UPageHero description="{{ $t('modules.page.description') }}" :links="links" :ui="{
      root: 'overflow-hidden',
      header: 'text-left',
      footer: 'text-left',
      links: 'justify-start',
    }">
      <template #title>
        {{ t('modules.page.title') }}
        <span class="text-secondary-500"> {{ t('modules.page.title_emphasis') }}</span>
      </template>
      <template #description>
        {{ t('modules.page.description') }}
      </template>
    </UPageHero>
    <UPageGrid>
      <template v-for="module in modules" :key="module.id">
        <module-hit :module="module"></module-hit>
      </template>

    </UPageGrid>
  </div>
</template>
<script setup lang="ts">

import { modules } from "~/data/modules"
const { t } = useI18n()
const links = ref([
  {
    label: t('modules.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('modules.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>