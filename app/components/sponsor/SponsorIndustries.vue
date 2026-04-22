<template>
  <div
    v-if="sponsor?.sponsorship && sponsorLevel.level == '2'"
    class="relative pt-14 pb-1 md:mt-8 md:pt-32 md:pb-24"
  >
    <div
      class="absolute top-0 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform opacity-15"
      :style="{
        backgroundColor: sponsorLevel?.color || '#FD9182',
      }"
    />
    <div v-if="sponsor?.sponsorship?.industries.length > 0">
      <ProseH2 class="py-4 text-2xl font-bold text-secondary">
        {{ $t('sponsors.industry.title') }} {{ sponsor.name }}
      </ProseH2>
      <div class=" ">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          <SponsorIndustryCard
            v-for="industry in sponsor.sponsorship?.industries"
            :key="industry.name"
            :industry="industry"
            :style="{
              backgroundColor: sponsorLevel?.color + '12' || '#FD918220',
            }"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <UEmpty
        :title="t('sponsors.industry.noIndustriesTitle')"
        :description="t('sponsors.industry.noIndustriesDescription')"
        variant="naked"
        :ui="{
          title: 'text-xl',
          root: 'min-h-64',
        }"
      >
        <template #leading>
          <UAvatarGroup size="xl">
            <UAvatar src="/logo-192.png" alt="Oca logo" loading="lazy" />
          </UAvatarGroup>
        </template>
      </UEmpty>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SponsorLevelsCollectionItem } from '@nuxt/content'
import type { Sponsor } from '~~/models'

const { t } = useI18n()
const props = defineProps<{
  sponsor: Sponsor
  sponsorLevel: SponsorLevelsCollectionItem
}>()
</script>
