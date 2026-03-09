<template>
  <div v-if="module" class="flex flex-col ">
    <div class="relative py-4 lg:pt-10 lg:pb-32">
      <div
        class="absolute content-[''] bg-neutral-50/50 h-[120%] w-screen left-1/2 transform -translate-x-1/2 mx-auto top-0 -z-10">
      </div>
      <div class="flex flex-col lg:flex-row gap-y-3">
        <div class="lg:w-5/8 lg:pr-5">
          <UBreadcrumb :items="[
            { label: t('nav.modules.title'), to: '/modules', icon: 'i-ph-cube-duotone' },
            { label: module?.category || '', icon: 'i-ph-cube-duotone' },
            { label: module?.name || '', icon: 'i-ph-cube-duotone' },
          ]" class="mt-8 mb-6" />
          <USeparator />
          <div class="lg:max-w-xl xl:max-w-2xl pt-6">
            <ProseH1 class="text-primary text-2xl md:text-3xl lg:text-5xl xl:text-6xl lg:mt-10 mb-2 sm:mb-5">
              {{ names[0] }}
              <span class="text-secondary-500"> {{ names[1] }}</span>
            </ProseH1>
            <ProseP v-if="module?.description" v-html="module.description" />
          </div>
        </div>
        <div class="lg:w-4/8 xl:w-5/12 relative lg:h-64">
          <ModuleDownload v-if="moduleGrouped" :module-grouped="moduleGrouped" v-motion-slide-visible-top
            @version-change="onChangeVersion" class=" w-full max-w-2xl mx-auto translate-y-7 " />
        </div>
      </div>
    </div>
    <div class="relative pt-12 pb-12 mb-24 lg:py-16 xl:pt-18 xl:pb-10">
      <div
        class="w-screen absolute left-1/2 transform -translate-x-1/2 -top-10 h-[120%] -skew-y-3 -z-10 bg-secondary-50 " />
      <div class="flex flex-col lg:flex-row gap-2">
        <div v-if="module?.readmeFragments?.configure" class="flex-1">
          <ProseH2 class="text-info text-2xl md:text-3xl my-2">
            {{ t('modules.settings.title') }}
          </ProseH2>
          <ProseP v-html="module?.readmeFragments?.configure" class="prose mt-2 lg:mt-6" />
        </div>
        <div v-if="module?.readmeFragments?.configure && module?.contributors?.length" class="hidden lg:flex my-2">
          <USeparator orientation="vertical" class="mx-10 hidden lg:block" />
        </div>
        <div v-if="module?.contributors?.length" class="min-w-sm lg:p-10">
          <ProseH2 class=" text-secondary text-2xl md:text-3xl my-2">
            {{ t('modules.contributors.title') }}
          </ProseH2>
          <ModuleContributorList :module="module" class="mt-4 lg:mt-7" />
        </div>
      </div>
    </div>
    <ModuleUsage :module="module" />
    <ModuleInstall :module="module" />
    <ModuleBugTracker :module="module" />
    <ModuleMaintainer :module="module" />

    <ModuleDependencies :module="module">
      <template #header>
        <ProseH2 class="text-secondary text-2xl md:text-3xl my-2">
          {{ t('modules.dependencies.title') }}
        </ProseH2>
      </template>
    </ModuleDependencies>
    <ModuleUsedBy :module="module">
      <template #header>
        <ProseH2 class="text-primary text-2xl md:text-3xl my-2">
          {{ t('modules.usedBy.title') }}
        </ProseH2>
      </template>
    </ModuleUsedBy>
  </div>
</template>

<script lang="ts" setup>
import { type ModuleGroupedHit } from '~~/models'

const { t } = useI18n()
const route = useRoute()
const moduleService = useService('modules')
const { data: moduleGrouped, error } = await useAsyncData<ModuleGroupedHit | null>(
  `module-${route.params.handle}`,
  () => moduleService.findByURLKey(route.params.handle as string), {
  watch: [route],

})
if (moduleGrouped.value == null) {
  throw createError({ statusCode: 404, statusMessage: t('modules.notFound'), fatal: true })
}
const module = ref(moduleGrouped.value?.hits[0])
const image = computed(() => module.value?.iconUrl || '/oca-logo.png')

useSeoMeta({
  title: module.value?.name || '',
  description: module.value?.summary || '',
  ogTitle: module.value?.name || '',
  ogDescription: module.value?.summary || '',
  ogImage: image.value,
  ogImageAlt: module.value?.name || '',
})

useSchemaOrg(
  defineSoftwareApp({
    name: module.value?.name || '',
    description: module.value?.summary || '',
    image: image.value,
    applicationCategory: 'DeveloperApplication',
    softwareHelp: module.value?.website || '',
    url: module.value?.website || '',
    softwareVersion: module.value?.version || '',
    downloadUrl: module.value?.website || ''
  })
)

const names = computed(() => {
  const names = moduleGrouped.value?.hits[0]?.name.split(' ') || []
  return [names.slice(0, -1).join(' '), names.slice(-1)[0]]
})

const onChangeVersion = (version: string) => {
  const found = moduleGrouped.value?.hits.find(hit => hit.version === version)
  if (found) {
    module.value = found
  }
}

</script>
