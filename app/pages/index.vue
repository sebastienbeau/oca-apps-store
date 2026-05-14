<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

useSeoMeta(page.value?.seo || {})
</script>

<template>
  <UPage v-if="page">
    <UPageBody>
      <ContentRenderer :value="page" />
    </UPageBody>
  </UPage>
</template>
