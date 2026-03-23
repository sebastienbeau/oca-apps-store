<template>
   <UPageCard  class=""  :ui="{
    root: 'ring-0  bg-transparent rounded-sm  h-auto ',
    container: 'p-2 sm:p-4',
    body: 'sm:px-0 sm:py-2 bg-transparent text-center w-full',
    header: 'sm:px-2 mb-2 w-full relative border-0 ',
    footer: 'p-2 sm:px-4 flex justify-center items-center w-full' 
  }">
    <template #header v-if="group.name">
      <div class="text-center py-4" >
        <UAvatar icon="community" class="mb-0 text-secondary mr-2" size="3xl"/>
      </div>
     
      <h3 class="text-primary font-bold text-center">{{ group.name }}</h3>
    </template>
    <template #body v-if="group.description">
      <div class="  ">
        <div class="space-y-1 text-sm text-gray-500 align">
        
          {{ group.description }}
        </div>
      
      </div>
    </template>
    <template #footer>
      <UButton to="/abc" variant="outline"  color="neutral" 
        
    > 
      {{ $t('generic.findOutMore') }}</UButton>
    </template>
  </UPageCard>
</template>
<script setup lang="ts">
import type { Workgroup } from '~~/models'

const props = defineProps<{
  group: Workgroup
}>()
</script>
