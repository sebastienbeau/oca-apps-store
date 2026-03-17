<template>
  <div class="relative py-12 lg:py-16 xl:py-24">
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
      :ui="{
        title: 'text-primary',
        links: 'justify-end',
        target: '_blank',
      }"
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

const users = []
</script>
