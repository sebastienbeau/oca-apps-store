<template>
  <UCard
    :ui="{
      root: 'shadow-md ring-0',
      header: 'px-6 sm:px-10',
      body: 'px-6 sm:px-10',
      footer: 'py-4 sm:py-6',
    }"
  >
    <template #header>
      <div class="flex items-center gap-2 py-2 text-info">
        <UIcon name="module" class="size-14 md:size-18" />
        <div>
          <div class="text-xl font-bold md:text-4xl">
            Download
            <span class="text-secondary">it</span>
          </div>
          <div class="flex gap-1">
            <UBadge
              v-if="module?.license"
              @click="() => {}"
              color="neutral"
              variant="outline"
              size="sm"
              class="rounded-full"
            >
              {{ t('modules.license.label') }}: <b>{{ module?.license }}</b>
            </UBadge>
            <UBadge
              v-if="module?.maturity"
              color="neutral"
              variant="outline"
              size="sm"
              class="rounded-full"
            >
              {{ t('modules.maturity.label') }}: <b>{{ module?.maturity }}</b>
            </UBadge>
          </div>
        </div>
      </div>
    </template>
    <ModuleInfo v-if="module" :module="module" />
    <template #footer>
      <div class="flex items-end justify-between gap-4">
        <UFormField
          :label="t('modules.version.label')"
          :help="versions?.length == 1 ? selectedVersion : ''"
        >
          <template v-if="versions && versions?.length > 1">
            <USelect
              v-model="selectedVersion"
              :items="versions"
              :placeholder="t('modules.version.placeholder')"
              class="w-32"
              @change="() => emits('versionChange', selectedVersion!)"
            />
          </template>
        </UFormField>

        <UButton
          color="info"
          :to="module?.website"
          leading-icon="github"
          class="px-10"
          :label="t('modules.github.link')"
        />
      </div>
    </template>
  </UCard>
</template>
<script lang="ts" setup>
import type { ModuleGroupedHit, Module } from '~~/models'

const { t } = useI18n()
const emits = defineEmits<{
  (e: 'versionChange', version: string): void
}>()
const props = defineProps<{
  moduleGrouped: ModuleGroupedHit | null
  selectedModule?: Module | null
}>()
const modules = computed(() => props.moduleGrouped?.hits || [])
const lastVersion = computed(() => modules.value?.[0]?.version || null)
const selectedVersion = ref<string | null>(
  props?.selectedModule?.version || lastVersion.value
)
const module = computed(
  () =>
    modules.value.find(
      ({ version }) => version == props.selectedModule?.version
    ) || null
)

const versions = computed(() => {
  return props.moduleGrouped?.hits
    ?.reduce((acc: string[], hit) => {
      if (hit.version && !acc.includes(hit.version)) {
        acc.push(hit.version)
      }
      return acc
    }, [])
    .sort((a, b) => parseFloat(a) - parseFloat(b))
})

watch(
  () => props.selectedModule,
  () => {
    selectedVersion.value =
      props.selectedModule?.version || modules.value?.[0]?.version
  }
)
</script>
