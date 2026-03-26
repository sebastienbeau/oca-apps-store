<template>
  <div v-if="module?.id" class="flex flex-col" :key="module.id">
    <div class="relative py-4 lg:pt-10 lg:pb-32">
      <div
        class="absolute top-0 left-1/2 -z-10 mx-auto h-[120%] w-screen -translate-x-1/2 transform bg-neutral-50/50 content-['']"
      ></div>
      <div class="flex flex-col gap-y-3 lg:flex-row">
        <div class="lg:w-5/8 lg:pr-5">
          <UBreadcrumb :items="breadCrumb" class="mt-8 mb-6" />
          <USeparator />
          <div class="overflow-x-hidden pt-6 lg:max-w-xl xl:max-w-2xl">
            <div
              class="flex gap-4 overflow-hidden max-md:flex-col lg:items-center"
            >
              <ProseH1
                class="mb-2 break-after-auto text-2xl text-primary sm:mb-5 md:text-3xl lg:mt-10 lg:text-5xl xl:text-6xl"
              >
                {{ removeLastWord(module?.name) }}
                <span class="text-secondary-500">
                  {{ getLastWord(module?.name) }}
                </span>
              </ProseH1>
            </div>
            <UBadge
              v-if="module?.repository?.category?.name"
              color="secondary"
              variant="soft"
              size="md"
              :label="module.repository.category.name"
            />
            <MDC v-if="module?.description" :value="module.description" />
            <div v-else class="prose pb-10">{{ module?.summary }}</div>
            <ModuleContext :module="module" />
            <USeparator v-if="module?.description" class="my-6" />
            <UFormField :label="t('modules.versions.available')" size="xl">
              <ModuleSerieList
                v-if="moduleGrouped"
                :module-grouped="moduleGrouped"
                :selected-module="module"
                size="xl"
                @select="onChangeSerie"
              />
            </UFormField>
          </div>
        </div>
        <div class="relative lg:h-64 lg:w-4/8 xl:w-5/12">
          <ModuleDownload
            v-if="moduleGrouped"
            :module-grouped="moduleGrouped"
            :selected-module="module"
            class="mx-auto w-full max-w-2xl translate-y-7"
            @serie-change="onChangeSerie"
          />
        </div>
      </div>
    </div>
    <div
      v-if="
        module?.readmeFragments?.install ||
        module?.readmeFragments?.configure ||
        module?.readmeFragments?.contributors
      "
      class="relative mb-12 pt-12 pb-12 lg:py-16 xl:pt-18 xl:pb-10"
    >
      <div
        class="absolute -top-3 left-1/2 -z-10 h-full w-screen -translate-x-1/2 -skew-y-3 transform bg-secondary-50"
      />
      <div class="flex flex-col gap-2 lg:flex-row">
        <div class="flex flex-col gap-4">
          <div v-if="module?.readmeFragments?.install" class="flex-1 pb-10">
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
            (module?.readmeFragments?.configure ||
              module?.readmeFragments?.install) &&
            module?.readmeFragments?.contributors
          "
          class="my-2 hidden lg:flex"
        >
          <USeparator orientation="vertical" class="mx-10 hidden lg:block" />
        </div>
        <div
          v-if="module?.readmeFragments?.contributors"
          class="min-w-sm lg:p-10"
        >
          <ProseH2 class="my-2 text-2xl text-secondary md:text-3xl">
            {{ t('modules.contributors.title') }}
          </ProseH2>
          <ModuleContributorList :module="module" class="mt-4 lg:mt-7" />
        </div>
      </div>
    </div>

    <ModuleUsage :module="module" />
    <ModuleHistory :module="module" />
    <ModuleRoadMap :module="module" />
    <ModuleMaintainer :module="module" />
    <ModuleBugTracker :module="module" />
    <ModuleDependencies :module="module" />
    <ModuleUsedBy :module="module" />
  </div>
</template>

<script lang="ts" setup>
import type { ModuleGroupedHit, Module } from '~~/models'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const moduleService = useService('modules')
const { data: moduleGrouped, error } =
  await useAsyncData<ModuleGroupedHit | null>(
    `module-${route.params.handle}`,
    () =>
      moduleService.findByURLKey(
        route.params.handle as string,
        route?.query?.version as string | undefined
      ),
    {
      watch: [route.path],
    }
  )

if (moduleGrouped.value == null || error.value) {
  throw createError({
    statusCode: error?.value ? 500 : 404,
    statusMessage: error?.value?.message || t('modules.notFound'),
    fatal: true,
  })
}

let selectedVersion = moduleGrouped.value?.hits?.[0]
if (route?.query?.version) {
  selectedVersion =
    moduleGrouped.value?.hits.find(
      (hit) => hit.version === route.query.version
    ) || selectedVersion
}

const module = ref<Module | null>(selectedVersion)
const image = computed(() => module.value?.iconUrl || '/oca-logo.png')
const breadCrumb = computed(() => {
  const items = [
    { label: t('nav.modules.title'), to: '/modules', icon: 'module' },
  ]
  if (module.value?.repository?.category?.name) {
    items.push({
      icon: 'category',
      label: module.value.repository.category.name,
      to: `/categories/${module.value.repository.category.urlKey}`,
    })
  }
  items.push({
    label: module.value.name,
  })
  return items
})

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
    version: module.value?.version || '',
  })
)

const onChangeSerie = (serie: string) => {
  const found = moduleGrouped.value?.hits.find((hit) => hit.serie === serie)
  if (found) {
    module.value = found
    router.replace({
      query: {
        serie: found.serie,
      },
    })
  }
}
</script>
