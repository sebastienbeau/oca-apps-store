<template>
  <div class="pt-14 pb-1 md:pt-32 md:pb-10 relative">
    <div class="w-[100vw + 10rem] absolute -left-1/2 -right-1/2 mx-auto top-0 h-[120%] -z-10 -rotate-3 opacity-5"
      :style="{
        backgroundColor: sponsorship?.color || '#FD9182',
      }" />
    <div class="flex justify-between gap-1">
      <div class="text-3xl font-bold mb-2" :style="{
        color: sponsorship?.color || '#FD9182',
      }">
        <slot name="title">
          {{ sponsorship.title }}
        </slot>
      </div>
      <div class="hidden md:block">
        <UButton :to="sponsorship?.callToActionUrl || '/sponsor#become-a-sponsor'"
          :label="t('sponsors.become', { name: sponsorship?.name })" color="neutral" variant="solid"
          icon="ion:rocket-outline" />
      </div>
    </div>
    <slot name="description">
    </slot>
  </div>
</template>
<script setup lang="ts">
import type { SponsorLevelsCollectionItem } from '@nuxt/content';

const { t } = useI18n()
const props = defineProps<{
  sponsorship: SponsorLevelsCollectionItem
}>()

const links = ref([

  {
    label: 'Become a Sponsor',
    color: 'primary',
    variant: 'solid',
    trailingIcon: 'ion:rocket-outline',
  }
])
const backgroundImg = computed(() => {
  return [
    `${props.sponsorship?.level || "gold"}`,
  ]
})
</script>
<style scoped>
.background-style::before {
  content: "";
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
