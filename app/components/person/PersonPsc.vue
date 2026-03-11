<template>
  <UCard
    reverse
    class=""
    :ui="{
      root: 'ring-0 bg-gray-100 shadow-sm rounded-sm p-4 md:w-2/5 h-auto max-h-2/5',
      body: 'sm:px-0 sm:py-2 bg-transparent',
      header: 'sm:p-0 relative border-0 ',
      footer: 'flex justify-center',
    }"
  >
    <template #header>
      <h3 class="text-primary font-bold text-sm">{{ psc.name }}</h3>
    </template>
    <template #default>
      <div class="  ">
        <div class="space-y-1 text-sm text-gray-500">
          {{ psc.description }}
        </div>
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
import type { PSC } from '~~/models'

const props = defineProps<{
  psc: PSC
}>()
</script>
