<template>
  <UPageHero description="{{ $t('community.page.description') }}" :links="links" :ui="{
    header: 'text-left',
    footer: 'text-left',
    links: 'justify-start',
  }">
    <template #title>
      {{ $t('community.page.title') }}
    </template>

    <template #description>
      {{ $t('community.page.description') }}
    </template>
  </UPageHero>

  <div class="container mx-auto p-4">
    <div class="columns-1 md:columns-3 gap-4 space-y-4">
      <template v-for="person in persons" :key="person.id">
        <PersonHit :person="person" />
      </template>
    </div>
  </div>

</template>

<script setup lang="ts">
import { persons } from "~/data/persons";

const { t } = useI18n()
const localePath = useLocalePath()
const links = ref([
  {
    label: t('community.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('community.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>
