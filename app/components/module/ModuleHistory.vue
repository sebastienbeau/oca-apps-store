<template>
  <div v-if="module?.readmeFragments?.history" class="py-24">
    <ProseH2 class="my-2 text-2xl text-primary md:text-3xl">
      {{ t('modules.history.title') }}
    </ProseH2>
    <slot name="header" />
    <UChangelogVersions
      v-if="versions?.length"
      :ui="{
        root: 'pt-5',
        beam: 'bg-secondary',
        indicator: 'inset-s-16',
      }"
    >
      <UChangelogVersion
        v-for="(version, index) in versions"
        :key="index"
        v-bind="version"
        :ui="{ container: 'mx-0 pl-24', indicator: 'w-16' }"
      >
        <template #description>
          <MDCRenderer
            :body="{ type: 'root', children: version.description }"
            :data="{}"
          />
        </template>
      </UChangelogVersion>
    </UChangelogVersions>
    <MDC
      v-else
      :value="module.readmeFragments.history"
      class="mx-auto flex max-w-5xl flex-col pb-4"
    />
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'
import type { ChangelogVersionProps } from '@nuxt/ui'
const { t } = useI18n()
const props = defineProps<{
  module: Module | null
}>()
const { data: ast } = await useAsyncData('markdown', () =>
  parseMarkdown(props?.module?.readmeFragments?.history || '')
)
const versions = computed(() => {
  return ast.value?.body?.children?.reduce((acc: any[], node: any) => {
    if (node.tag === 'h2') {
      acc.push({
        title: node.children[0].value,
        description: [],
      })
    } else if (acc.length > 0) {
      acc[acc.length - 1].description.push(node)
    }
    return acc
  }, [])
})
</script>
