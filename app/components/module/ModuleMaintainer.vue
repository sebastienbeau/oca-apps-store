<template>
  <div class="relative py-12 lg:py-16 xl:py-24">
    <UPageCTA
      :title="t('modules.maintainer.title')"
      :orientation="maintainers.length ? 'horizontal' : 'vertical'"
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

        target: '_blank',
      }"
    >
      <template #description>
        {{ t('modules.maintainer.intro') }}
        <p>
          {{ t('modules.maintainer.description') }}
        </p>
      </template>
      <div v-if="maintainers.length" class="flex flex-col gap-2">
        <ProseH3>
          {{ t('modules.maintainer.title') }}
        </ProseH3>
        <UPageList divide>
          <UPageCard
            v-for="(maintainer, index) in maintainers"
            :key="index"
            variant="ghost"
            :to="maintainer.to"
            :target="maintainer.target"
          >
            <template #body>
              <UUser
                :name="maintainer.name"
                :avatar="{
                  name: maintainer.name,
                  src: maintainer?.avatarUrl || '',
                }"
                :description="maintainer.username"
                size="xl"
                class="relative"
                :to="`/${maintainer.urlKey}`"
              />
            </template>
          </UPageCard>
        </UPageList>
      </div>
    </UPageCTA>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'
const { t } = useI18n()
const props = defineProps<{
  module: Module | null
}>()

const maintainers = computed(() => {
  return props.module?.maintainers || []
})
</script>
