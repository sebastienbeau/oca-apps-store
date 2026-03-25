<template>
  <UCard :ui="ui" :style="style" @click="onClick">
    <template #header>
      <div class="flex flex-col items-start justify-between">
        <div class="flex w-full items-start justify-between gap-4">
          <nuxt-img
            :src="company?.logoUrls?.l"
            alt="Logo"
            class="m-4 ml-0 h-20 w-32 rounded-md object-contain"
          />
          <div>
            <UButton
              v-if="company.website?.url"
              variant="link"
              size="sm"
              :label="company.website?.label || company?.website?.url"
              icon="website"
              :to="company.website.url"
              target="_blank"
            />
          </div>
        </div>
        <div class="flex w-full items-start justify-between gap-1">
          <div class="flex-1 text-lg font-semibold text-primary">
            <nuxt-link :to="`/companies/${company.urlKey}`">
              {{ company.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </template>

    <div class="flex space-x-2">
      <UBadge
        v-for="(loc, i) in company.countries"
        :key="i"
        variant="solid"
        class="rounded-full"
        color="primary"
        size="sm"
      >
        {{ loc.label }}
      </UBadge>
    </div>

    <template #footer>
      <div class="flex justify-between gap-1">
        <div class="grid grid-cols-1 gap-2 xl:grid-cols-2">
          <div class="flex items-start space-x-1 md:space-x-2">
            <UIcon name="members" class="text-primary" />
            <span class="text-sm">
              <span class="text-secondary">{{ company.membersCount }}</span>
              Members
            </span>
          </div>
          <div class="flex items-start space-x-1 md:space-x-2">
            <UIcon name="award" class="text-primary" />
            <span class="text-sm"
              >OCA Collaborator index:
              <span class="text-secondary">{{
                company.collaboratorIndex
              }}</span>
            </span>
          </div>
        </div>
        <SponsorLogo
          v-if="sponsorLevel"
          :sponsor-level="sponsorLevel"
          size="sm"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Company } from '~~/models'
const props = defineProps<{
  company: Company
}>()
const onClick = () => {
  navigateTo(`/companies/${props.company.urlKey}`)
}
const { $sponsor } = useNuxtApp()
const sponsorLevel = $sponsor.getSponsorLevel(props.company)
const ui = computed(() => {
  const baseUi = {
    root: 'cursor-pointer ring ring-default hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col',
    header: 'border-b-0 sm:px-4 pb-0 sm:pb-0 ',
    body: 'pb-2 sm:pb-3 pt-0 sm:pt-1 sm:px-4 border-b-0  flex-1',
  }
  return baseUi
})
</script>
