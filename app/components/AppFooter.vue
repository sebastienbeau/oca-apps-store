<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
const { data: content } = await useAsyncData(`content-global`, () => {
  return queryCollection('global').first()
})
const { t } = useI18n()
const { version } = useAppConfig()
const config = useRuntimeConfig()
</script>

<template>
  <UFooter
    :ui="{
      root: 'bg-primary-800 text-white mt-4',
    }"
  >
    <template #top>
      <UContainer>
        <ContentRenderer v-if="content" :value="content.meta" class="text-sm" />
      </UContainer>
    </template>
    <template #bottom>
      <div class="flex items-center justify-center gap-2 text-sm">
        {{ t('footer.copyright') }}
        <USeparator class="h-3" orientation="vertical" />
        {{ t('footer.version', { version }) }}
      </div>
    </template>
  </UFooter>
</template>
