<template>
  <UTooltip
    v-if="module && module?.runboatURL"
    :text="t('modules.runboat.tooltip')"
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
        <span class="font-bold">
          {{ t('modules.runboat.name') }}
        </span>
      </div>
    </UButton>
  </UTooltip>
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
