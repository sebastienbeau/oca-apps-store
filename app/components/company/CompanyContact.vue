<template>
  <UPageCard v-if="displayCard" class="w-auto">
    <template #body>
      <UPageLinks
        :links="items"
        orientation="vertical"
        :ui="{
          root: 'my-0 py-0',
          link: 'first:pl-0',
          linkLabel: 'font-normal text-primary',
        }"
      />
    </template>
  </UPageCard>
</template>
<script setup lang="ts">
import type { PageLink } from '@nuxt/ui'
import type { Company } from '~~/models'
import type { companyContacts } from '~~/models/Sponsor'
const props = defineProps<{
  contact: companyContacts
  company: Company
}>()
 const displayCard = computed (() => {
  return props.contact?.email || props.contact?.phone || props.contact?.street || props.contact?.street2 || (props.contact?.zip && props.contact?.city)
 })
const items = computed<PageLink[]>(() => {
  const items: PageLink[] = []
  if (props.contact?.email) {
    items.push({
      label: props.contact.email,
      icon: 'email',
      to: `mailto:${props.contact.email}`,
    })
  }
  if (props.contact?.phone) {
    items.push({
      label: props.contact.phone,
      icon: 'phone',
    })
  }
  if (props.contact?.street) {
    items.push({
      label: props.contact.street,
      icon: 'location',
    })
  }
  if (props.contact?.street2) {
    items.push({
      label: props.contact.street2,
       icon: 'location',
    })
  }
  if (props.contact?.zip && props.contact?.city) {
    items.push({
      label:  props.contact.zip + ' ' + props.contact?.city ,
       icon: 'lets-icons:pin-alt',
    })
  }
  
  
  return items
})
</script>
