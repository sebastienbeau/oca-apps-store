<template>
  <UCard reverse class="" :ui="{
    root: 'mt-2 md:mt-0 ring-0 border-2 border-primary-100 bg-transparent rounded-0 w-full md:w-2/5 max-w-xs p-2',
    body: 'sm:p-2 bg-transparent',
    header: 'sm:pt-0 relative border-0 p-2 sm:px-2',
    footer: 'flex justify-center'
  }">

    <template #header>
      <UIcon name="teenyicons:box-outline" class="size-5 text-secondary" />
      <h3 class="text-primary font-bold text-sm"> {{ group.name }}</h3>
    </template>

    <template #default>
      <div class="  ">
        <div class="space-y-1 text-sm text-gray-500">
          {{ group.description }}
        </div>
      </div>

    </template>

  </UCard>
</template>
<script setup lang="ts">
import type { Workgroup } from '~/models';

const props = defineProps<{
  group: Workgroup
}>();
</script>
