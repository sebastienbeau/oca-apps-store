<template>
  <UCard reverse class="" :ui="{
      root: 'ring-0 bg-gray-200 rounded-0 p-4 min-w-1/2',
      body: 'sm:px-0 sm:py-2 bg-transparent',
      header: 'sm:p-0 relative border-0 mt-8' ,
      footer: 'flex justify-center'
    }">
    <template #header>
      <h3 class="text-primary font-bold text-sm"> {{ psc.name }}</h3>
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
const props = defineProps({
  psc: {
    type: Object,
    required: true,
  },
});

</script>
