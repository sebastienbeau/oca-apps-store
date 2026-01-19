<template>
  <UCard reverse class="" :ui="{
      root: 'ring-0 m-2 bg-transparent rounded-0 max-w-xs p-4',
      body: 'sm:px-0 sm:py-2 bg-transparent',
      header: 'sm:pt-0 mt-4 relative border-0' ,
      footer: 'flex justify-center'
    }">
  
    <template #header>
       <UIcon name="teenyicons:box-outline"  class="size-5 text-secondary" />
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
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});

</script>
