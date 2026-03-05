<template>
  <UCard :ui="{
    root: 'shadow-md ring-0',
    header: 'px-6 sm:px-10',
    body: 'px-6 sm:px-10',
    footer: 'py-4 sm:py-6',
  }">
    <template #header>
      <div class="flex items-center text-info gap-2 py-2">
        <UIcon name="i-ph-package-duotone" class="size-14 md:size-18 " />
        <div>
          <div class="text-xl md:text-4xl font-bold">
            Download
            <span class="text-secondary">it</span>
          </div>
          <UBadge color="neutral" variant="outline" size="sm" class="rounded-full" :label="module?.license" />
        </div>
      </div>
    </template>
    <div class=" flex flex-col gap-8 pb-6">
      <UPageFeature :title="t('modules.technical_name')" :description="module?.technicalName">
        <template #leading>
          <UAvatar icon="i-ph-cube-duotone" />
        </template>
      </UPageFeature>
      <UPageFeature :title="t('modules.technical_name')" :description="module?.technicalName">
        <template #leading>
          <UAvatar icon="i-ph-cube-duotone" />
        </template>
      </UPageFeature>
      <UPageFeature :title="t('modules.technical_name')" :description="module?.technicalName">
        <template #leading>
          <UAvatar icon="i-ph-cube-duotone" />
        </template>
      </UPageFeature>
    </div>
    <template #footer>
      <div class="flex justify-between items-end gap-4">
        <UFormField :label="t('modules.version.label')">
          <USelect v-model="selectedVersion" :options="versions" :placeholder="t('modules.version.placeholder')"
            class="w-32" />
        </UFormField>
        <UButton color="info" :to="`/modules${module?.urlKey}/download`" leading-icon="i-ph-github-logo" class="px-10"
          label="Download" />
      </div>
    </template>
  </UCard>
</template>
<script lang="ts" setup>
import { version } from 'os';
import type { Module } from '~~/models';

const { t } = useI18n()
const props = defineProps<{
  module: Module
}>()
const lastVersion = computed(() => props.module?.supportedVersions[props.module.supportedVersions.length - 1] || null)
const selectedVersion = ref<string | null>(lastVersion.value)
const versions = computed(() => props.module?.supportedVersions.map(version => ({
  label: version,
  value: version,
})) || [])
</script>