<template>
  <div v-if="module" class="flex flex-col">
    <div class="relative py-4 lg:pt-10 lg:pb-32">
      <div
        class="absolute top-0 left-1/2 -z-10 mx-auto h-[120%] w-screen -translate-x-1/2 transform bg-neutral-50/50 content-['']"
      ></div>
      <div class="flex flex-col gap-y-3 lg:flex-row">
        <div class="lg:w-5/8 lg:pr-5">
          <UBreadcrumb
            :items="[
              { label: t('nav.modules.title'), to: '/modules', icon: 'module' },
              {
                label: module?.category || '',
                to: `/modules?category=${module?.category}`,
                icon: 'category',
              },
              { label: module?.name || '' },
            ]"
            class="mt-8 mb-6"
          />
          <USeparator />
          <div class="pt-6 lg:max-w-xl xl:max-w-2xl">
            <ProseH1
              class="mb-2 text-2xl text-primary sm:mb-5 md:text-3xl lg:mt-10 lg:text-5xl xl:text-6xl"
            >
              {{ removeLastWord(module?.name) }}
              <span class="text-secondary-500">
                {{ getLastWord(module?.name) }}
              </span>
            </ProseH1>
            <MDC v-if="module?.description" :value="module.description" />
          </div>
        </div>
        <div class="relative lg:h-64 lg:w-4/8 xl:w-5/12">
          <ModuleDownload
            v-if="moduleGrouped"
            v-motion-slide-visible-top
            :module-grouped="moduleGrouped"
            class="mx-auto w-full max-w-2xl translate-y-7"
            @version-change="onChangeVersion"
          />
        </div>
      </div>
    </div>
    <div class="relative mb-24 pt-12 pb-12 lg:py-16 xl:pt-18 xl:pb-10">
      <div
        class="absolute -top-10 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform bg-secondary-50"
      />
      <div class="flex flex-col gap-2 lg:flex-row">
        <div class="flex flex-col gap-4">
          <div v-if="module?.readmeFragments?.install" class="flex-1">
            <ProseH2 class="mt-2 text-2xl text-secondary md:text-3xl">
              {{ t('modules.install.title') }}
            </ProseH2>
            <MDC :value="module.readmeFragments.install" />
          </div>
          <div v-if="module?.readmeFragments?.configure" class="flex-1">
            <ProseH2 class="mt-2 text-2xl text-info md:text-3xl">
              {{ t('modules.settings.title') }}
            </ProseH2>
            <MDC :value="module.readmeFragments.configure" />
          </div>
        </div>
        <div
          v-if="
            module?.readmeFragments?.configure && module?.contributors?.length
          "
          class="my-2 hidden lg:flex"
        >
          <USeparator orientation="vertical" class="mx-10 hidden lg:block" />
        </div>
        <div v-if="module?.contributors?.length" class="min-w-sm lg:p-10">
          <ProseH2 class="my-2 text-2xl text-secondary md:text-3xl">
            {{ t('modules.contributors.title') }}
          </ProseH2>
          <ModuleContributorList :module="module" class="mt-4 lg:mt-7" />
        </div>
      </div>
    </div>

    <ModuleUsage :module="module" />
    <ModuleContext :module="module" />
    <ModuleHistory :module="module" />
    <ModuleRoadMap :module="module" />
    <ModuleBugTracker :module="module" />
    <ModuleMaintainer :module="module" />
    <ModuleDependencies :module="module" />
    <ModuleUsedBy :module="module" />
  </div>
</template>

<script lang="ts" setup>
import { type ModuleGroupedHit } from '~~/models'

const { t } = useI18n()
const route = useRoute()
const moduleService = useService('modules')
const { data: moduleGrouped, error } =
  await useAsyncData<ModuleGroupedHit | null>(
    `module-${route.params.handle}`,
    () => moduleService.findByURLKey(route.params.handle as string),
    {
      watch: [route],
    }
  )

if (moduleGrouped.value == null || error.value) {
  throw createError({
    statusCode: error?.value ? 500 : 404,
    statusMessage: error?.value?.message || t('modules.notFound'),
    fatal: true,
  })
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
    downloadUrl: module.value?.website || '',
  })
)

const onChangeVersion = (version: string) => {
  const found = moduleGrouped.value?.hits.find((hit) => hit.version === version)
  if (found) {
    module.value = found
  }
}
</script>
