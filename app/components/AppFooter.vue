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
      root: 'bg-primary-800 dark:bg-[#171717] text-white mt-4 ',
    }"
  >
    <template #top>
      <UContainer>
        <ContentRenderer v-if="content" :value="content.meta" class="text-base max-md:text-base dark:border-t dark:border-gray-500 dark:p-8" />
      </UContainer>
    </template>
    <template #bottom>
      <div class="flex flex-col items-center justify-center pb-20">
        <div class="flex items-center justify-center gap-2 text-base max-md:text-base">
          {{ t('footer.copyright') }}
          <USeparator class="h-3" orientation="vertical" />
          {{ t('footer.version', { version }) }}
        </div>
        <AppCookiesConsent />
      </div>
    </template>
  </UFooter>
</template>
