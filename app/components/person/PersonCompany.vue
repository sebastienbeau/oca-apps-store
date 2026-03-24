<template>
  <UNavigationMenu
    v-if="person.company"
    :ui="ui"
    :items="[
      {
        label: person.company.name,
        to: `/companies/${person.company.urlKey}`,
        icon: 'company',
        click: (event) => {
          event.stopPropagation()
        },
      },
    ]"
  />
</template>
<script setup lang="ts">
import type { icon } from '#build/ui/prose'

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})
const ui = {
  linkLeadingIcon: 'text-primary size-3',
  label: 'text-xs text-muted',
  link: 'px-0 py-1',
}
</script>
