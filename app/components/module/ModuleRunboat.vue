<template>
  <div
    v-if="module && module?.runboatURL"
    class="inline-flex flex-col items-center justify-end"
  >
    <UButton
      variant="solid"
      color="secondary"
      :href="module?.runboatURL"
      :size="size"
      icon="runboat"
      target="_blank"
    >
      <div class="text-nowrap">
        {{ t('modules.runboat.try') }}
        <span class="font-bold"> {{ t('modules.runboat.name') }} ! </span>
      </div>
    </UButton>

    <UButton
      href="https://odoo-community.org/how-to-test-odoo-oca-module"
      target="_blank"
      icon="help"
      variant="link"
      size="xs"
      :label="t('modules.runboat.how_to_test')"
    />
  </div>
</template>
<script setup lang="ts">
import type { Module } from '~~/models'
const props = withDefaults(
  defineProps<{
    module: Module | null
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  }
)
const { t } = useI18n()
</script>
