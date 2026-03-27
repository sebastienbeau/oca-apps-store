<template>
  <div class="relative pt-14 pb-1 md:pt-32 md:pb-10">
    <div
      class="absolute top-0 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform opacity-5"
      :style="{
        backgroundColor: sponsorship?.color || '#FD9182',
      }"
    />
    <div class="flex justify-between gap-1">
      <div
        class="mb-2 text-3xl font-bold"
        :style="{
          color: sponsorship?.color || '#FD9182',
        }"
      >
        <slot name="title">
          {{ sponsorship.title }}
        </slot>
      </div>
      <div class="hidden md:block">
        <UButton
          href="https://odoo-community.org/get-involved/become-a-sponsor"
          :label="t('sponsors.become', { name: sponsorship?.name })"
          color="neutral"
          variant="solid"
          icon="contribute"
          target="_blank"
        />
      </div>
    </div>
    <slot name="description"> </slot>
  </div>
</template>
<script setup lang="ts">
import type { SponsorLevelsCollectionItem } from '@nuxt/content'

const { t } = useI18n()
const props = defineProps<{
  sponsorship: SponsorLevelsCollectionItem
}>()
</script>
<style scoped>
.background-style::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.platinum-image::before {
  background-color: #fafbfa;
}

.gold-image::before {
  background-color: #fffbf5;
}

.silver-image::before {
  background-color: #fafbfa;
}

.bronze-image::before {
  background-color: #faf7f0;
}
</style>
