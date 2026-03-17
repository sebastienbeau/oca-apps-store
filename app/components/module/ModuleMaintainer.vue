<template>
  <div class="relative mb-24 pt-12 pb-12 lg:py-16 xl:pt-24 xl:pb-16">
    <UPageCTA
      :title="t('modules.maintainer.title')"
      orientation="horizontal"
      :description="t('modules.maintainer.description')"
      :links="[
        {
          label: t('modules.maintainer.learn_more'),
          color: 'primary',
          to: 'https://odoo-community.org/page/Contribute',
          icon: 'contribute',
        },
      ]"
    >
      <template #description>
        {{ t('modules.maintainer.intro') }}
        <p>
          {{ t('modules.maintainer.description') }}
        </p>
      </template>
      <UPageList>
        <UPageCard
          v-for="(user, index) in users"
          :key="index"
          variant="naked"
          :to="user.to"
          :target="user.target"
          class="pb-4"
        >
          <template #body>
            <UUser
              :name="user.name"
              :description="user.description"
              :avatar="user.avatar"
              size="xl"
              class="relative"
            />
          </template>
        </UPageCard>
      </UPageList>
    </UPageCTA>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'
const { t } = useI18n()
const props = defineProps<{
  module: Module | null
}>()

const users = ref([
  {
    name: 'Benjamin Canac',
    description: 'benjamincanac',
    to: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: {
      src: 'https://github.com/benjamincanac.png',
      alt: 'benjamincanac',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Romain Hamel',
    description: 'romhml',
    to: 'https://github.com/romhml',
    target: '_blank',
    avatar: {
      src: 'https://github.com/romhml.png',
      alt: 'romhml',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Sébastien Chopin',
    description: 'atinux',
    to: 'https://github.com/atinux',
    target: '_blank',
    avatar: {
      src: 'https://github.com/atinux.png',
      alt: 'atinux',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Hugo Richard',
    description: 'HugoRCD',
    to: 'https://github.com/HugoRCD',
    target: '_blank',
    avatar: {
      src: 'https://github.com/HugoRCD.png',
      alt: 'HugoRCD',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Sandro Circi',
    description: 'sandros94',
    to: 'https://github.com/sandros94',
    target: '_blank',
    avatar: {
      src: 'https://github.com/sandros94.png',
      alt: 'sandros94',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Daniel Roe',
    description: 'danielroe',
    to: 'https://github.com/danielroe',
    target: '_blank',
    avatar: {
      src: 'https://github.com/danielroe.png',
      alt: 'danielroe',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Jakub Michálek',
    description: 'J-Michalek',
    to: 'https://github.com/J-Michalek',
    target: '_blank',
    avatar: {
      src: 'https://github.com/J-Michalek.png',
      alt: 'J-Michalek',
      loading: 'lazy' as const,
    },
  },
  {
    name: 'Eugen Istoc',
    description: 'genu',
    to: 'https://github.com/genu',
    target: '_blank',
    avatar: {
      src: 'https://github.com/genu.png',
      alt: 'genu',
      loading: 'lazy' as const,
    },
  },
])
</script>
