<template>
  <UCard :ui="{
    root: 'shadow-md ring-0',
    header: 'px-6 sm:px-10',
    body: 'px-6 sm:px-10',
    footer: 'py-4 sm:py-6',
  }">
    <template #header>
      <div class="flex items-center text-info gap-2 py-2">
        <UIcon name="module" class="size-14 md:size-18 " />
        <div>
          <div class="text-xl md:text-4xl font-bold">
            Download
            <span class="text-secondary">it</span>
          </div>
          <div class="flex gap-1">
            <UBadge v-if="module?.license" color="neutral" variant="outline" size="sm" class="rounded-full">
              {{ t('modules.license.label') }}: <b>{{ module?.license }}</b>
            </UBadge>
            <UBadge v-if="module?.maturity" color="neutral" variant="outline" size="sm" class="rounded-full">
              {{ t('modules.maturity.label') }}: <b>{{ module?.maturity }}</b>
            </UBadge>
          </div>
        </div>
      </div>
    </template>
    <ModuleInfo v-if="module" :module="module" />
    <template #footer>
      <div class="flex justify-between items-end gap-4">
        <UFormField :label="t('modules.version.label')">
          <USelect v-model="selectedVersion" :items="versions" :placeholder="t('modules.version.placeholder')"
            class="w-32" :disabled="versions.length == 1" />
        </UFormField>

        <UButton color="info" :to="module?.website" leading-icon="github" class="px-10"
          :label="t('modules.github.link')" />
      </div>
    </template>
  </UCard>
</template>
<script lang="ts" setup>
import type { ModuleGroupedHit } from '~~/models';

const { t } = useI18n()
const emits = defineEmits<{
  (e: 'versionChange', version: string): void
}>()
const props = defineProps<{
  moduleGrouped: ModuleGroupedHit | null
}>()
const modules = computed(() => props.moduleGrouped?.hits || [])
const module = computed(() => modules.value[modules.value.length - 1] || null)

const lastVersion = computed(() => module.value?.version || null)
const selectedVersion = ref<string | null>(lastVersion.value)
const versions = computed(() => modules.value?.map(({ version }) => version) || [])

watch(selectedVersion, (newValue) => {
  if (newValue) {
    emits('versionChange', newValue)
  }
})
</script>