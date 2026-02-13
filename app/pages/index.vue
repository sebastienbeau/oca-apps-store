<script setup lang="ts">
const route = useRoute()


const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
</script>

<template>
  <UPage v-if="page">
    <UPageBody>
      <ContentRenderer :value="page" />
    </UPageBody>
  </UPage>
</template>
