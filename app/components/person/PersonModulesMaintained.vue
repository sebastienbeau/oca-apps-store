<template>
  <div v-if="modules && modules?.length" class="py-10">
    <slot name="header">
      <ProseH2 class="my-2 text-2xl text-primary md:text-3xl">
        {{ t('person.modulesMaintained.title') }}
      </ProseH2>
    </slot>
    <div
      v-if="modules"
      class="my-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
    >
      <ModuleHit
        v-for="item in modules"
        :key="item.urlKey"
        :module-grouped="item"
        class="m-1"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Person } from '~~/models'

const props = defineProps<{
  person: Person | null
}>()
const { t } = useI18n()
const modulesMaintainedList = computed(() => props.person?.modulesMaintainedIds || [])
const { data: modules } = await useAsyncData(
  'module-maintained-' + (props.person?.id || ''),
  async () => {
    if (!props.person?.modulesMaintainedIds?.length) return null
    const moduleService = useService('modules')
    return await moduleService.getModulesList(props.person)
  },
  {
    server: false,
    watch: [modulesMaintainedList],
  }
)
</script>
