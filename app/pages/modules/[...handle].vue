<template>
  <div v-if="module" class="">
    <div class="relative pt-4 lg:pb-32">
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
            <ProseH1 class="text-primary text-5xl lg:text-6xl lg:mt-10 mb-5">
              {{ names[0] }}
              <span class="text-secondary-500"> {{ names[1] }}</span>
            </ProseH1>
            <div v-if="module?.description" v-html="module.description" class="pt-3" />
          </div>
        </div>
        <div class="lg:w-3/8 relative h-64">
          <ModuleDownload :module="module" v-motion-slide-visible-top
            class="absolute w-full min-h-full max-w-2xl mx-auto -left-1/2 -right-1/2 translate-y-7 " />
        </div>
      </div>
    </div>
    <div class="relative pt-8 pb-18">
      <div
        class="w-screen absolute left-1/2 transform -translate-x-1/2 -top-10 h-[120%] -skew-y-3 -z-10 bg-secondary-50 " />
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3 lg:col-span-2">
          <ProseH2 class="text-info text-3xl">
            {{ t('modules.settings.title') }}
          </ProseH2>
          <div v-if="module?.description" v-html="module.description" class="pt-3" />
        </div>
        <div v-if="module?.contributors?.length">
          <ProseH2 class=" text-secondary text-3xl">
            {{ t('modules.contributors.title') }}
          </ProseH2>
          <ModuleContributorList :module="module" class="mt-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const moduleService = useService('modules')
const { data: module, error } = useAsyncData(
  `module-${route.params.handle}`,
  () => moduleService.findByURLKey(route.params.handle as string), {
  watch: [route],
})
const names = computed(() => {
  const names = module.value?.name.split(' ') || []
  return [names.slice(0, -1).join(' '), names.slice(-1)[0]]
})
</script>
