<template>
  <div class="flex flex-col gap-5 pb-6">
    <div
      v-for="(item, index) in info"
      :key="item.label"
      class="flex gap-2 items-center"
    >
      <UAvatar :icon="item.icon" />
      <div class="flex-1">
        <div class="text-sm font-bold">
          {{ item.label }}
        </div>
        <div class="text-sm">
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            class="text-primary hover:underline flex items-center gap-1"
          >
            {{ item.value }}
            <UIcon name="external" />
          </a>
          <span v-else>
            {{ item.value }}
          </span>
        </div>
      </div>
      <ModuleRunboat v-if="index == 0 && module" :module="module" size="sm" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Module } from '~~/models'

const props = defineProps<{
  module: Module
}>()
const { t } = useI18n()
const info = computed(() => {
  const info = [
    {
      label: t('modules.technical_name'),
      value: props.module?.techname,
      icon: 'module',
    },
  ]
  if (props.module?.repository?.name) {
    info.push({
      label: t('modules.repository.name'),
      value: props.module.repository.name,
      link: props.module.repository.url,
      icon: 'repository',
    })
  }
  if (props.module?.authors && props.module?.authors.length > 0) {
    info.push({
      label: t('modules.author.name'),
      value: props.module?.authors?.join(' | '),
      icon: 'author',
    })
  }
  return info
})
</script>
