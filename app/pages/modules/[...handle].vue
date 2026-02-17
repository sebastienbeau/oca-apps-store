<template>
  <div class="">
    <UBreadcrumb :items="[
      { label: t('nav.modules.title'), to: '/modules', icon: 'i-ph-cube-duotone' },
      { label: module?.category || '', icon: 'i-ph-cube-duotone' },
      { label: module?.name || '', icon: 'i-ph-cube-duotone' },
    ]" class="mt-8 mb-6" />
    <USeparator />
    <UPageHero :title="module?.name" :description="module?.description" :ui="{
      title: 'text-primary ',

    }" orientation="horizontal">
      <UCard :ui="{
        root: 'shadow-2xl'
      }">
        <template #header>
          <div class="flex items-center  gap-3">
            <UIcon name="i-ph-cube-duotone" class="size-20 text-primary-400" />
            <div>
              <div class="text-5xl font-bold">
                Download
                <span class="text-secondary-500">it</span>
              </div>
              <UBadge color="neutral" variant="outline" class="rounded-full" :label="module?.license" />
            </div>
          </div>
        </template>
        <div class="px-10 flex flex-col gap-4">
          <UPageFeature :title="t('modules.technical_name')" :description="module?.technicalName">
            <template #icon>
              <UAvatar icon="i-ph-cube-duotone" />
            </template>
          </UPageFeature>
          <div>
            <UAvatar icon="i-ph-cube-duotone" />

            <span class="">
              {{ t('modules.technical_name') }}
            </span>
            <p class="text-muted text-sm">
              {{ module?.technicalName }}
            </p>
          </div>

        </div>
      </UCard>
    </UPageHero>
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
</script>
