<template>
  <UPageCard  class="" :ui="{
    root: 'mt-2 md:mt-0 ring-0 bg-transparent rounded-0 w-full md:w-1/3 ',
    body: 'sm:p-2 bg-transparent',
    header: 'sm:pt-0 flex flex-col w-full justify-center items-center relative border-0 p-2 sm:px-2 mb-1',
    footer: 'flex justify-center',
    container: 'sm:p-2',
    wrapper: ''
  }">

    <template #header v-if="group.name">
      <div class="">
        <UIcon name="teenyicons:box-outline" class="size-5 text-secondary mr-2" />
      </div>
      <h3 class="text-primary font-bold text-sm"> {{ group.name }}</h3>
    </template>

    <template #body v-if="group.description">
      <div class="  ">
        <div class="space-y-1 text-center text-sm text-gray-500">
          {{ group.description }}
        </div>
      </div>
    </template>
  </UPageCard>
</template>
<script setup lang="ts">
import type { Workgroup } from '~~/models'

const props = defineProps<{
  group: Workgroup
}>()
</script>
