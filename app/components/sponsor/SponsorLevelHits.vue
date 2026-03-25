<template>
  <div class="py-4">
    <div v-for="level in levels" :key="level.id" class="mb-16">
      <SponsorColorBanner :sponsorship="level">
        <template #description>
          <ContentRenderer :value="level.meta" class="text-muted" />
        </template>
      </SponsorColorBanner>
      <UPageColumns class="px-0 sm:px-0 md:columns-1 lg:columns-2">
        <SponsorHit
          v-for="sponsor in level.sponsors"
          :key="sponsor.id"
          :sponsor="sponsor"
        />
      </UPageColumns>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Sponsor } from '~~/models'

const props = defineProps<{
  sponsors: Sponsor[]
}>()
const { $sponsor } = useNuxtApp()

const levels = computed(() => {
  return $sponsor?.levels?.reduce((acc: { [key: string]: any }, level: any) => {
    const sponsors =
      props.sponsors?.filter(
        (sponsor) => sponsor.sponsorship?.level?.id == level.level
      ) || []
    if (sponsors?.length > 0) {
      acc.push({
        ...level,
        sponsors,
      })
    }
    return acc
  }, [])
})
</script>
