<template>
  <UCard reverse class="" :ui="{
  root: 'ring-0 bg-gradient-to-tl from-primary-100 from-0% via-gray-100 via-25% hover:via-40% transition-all duration-75 to-slate-200 to-100%  rounded-none rounded-bl-2xl rounded-tr-2xl lg:p-4 min-w-1/5',
  body: 'sm:px-0 sm:p-2 sm:py-2 bg-transparent',
    header: 'sm:p-0 relative border-0',
  }">
    <template #header>
      <icon name="ic:sharp-tag" class="inline-block my-2 text-xl align-middle text-gray-400 "></icon>
      <h3 class="text-primary font-bold text-sm">
        {{ industry.name }}
      </h3>
    </template>
    <template #default>
      <div class=" ">
        <div class="space-y-1 text-sm text-gray-500">
          {{ industry.description }}
        </div>
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
  industry: {
    type: Object,
    required: true,
  },
});
</script>