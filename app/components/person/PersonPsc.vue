<template>
  <UPageCard  class=""  :ui="{
    root: 'ring-0  bg-transparent rounded-sm  h-full ',
    container: 'p-2 sm:p-4 h-full',
    body: 'sm:px-0 sm:py-2 bg-transparent text-start w-full',
    header: 'sm:px-0 mb-2 w-full relative border-0 ',
    footer: 'p-2 sm:px-0 flex justify-start items-start w-full' 
  }">
    <template #header>
      <div class="text-start py-4" >
        <UIcon name="psc" class="mb-0 text-secondary size-7" />
      </div>
     
      <h3 class="text-primary font-bold text-start">{{ psc.name }}</h3>
    </template>
    <template #body>
      <div class="  ">
        <div class="space-y-1 text-sm text-gray-500 align">
        
          {{ psc.description }}
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
import type { PSC } from '~~/models'

const props = defineProps<{
  psc: PSC
}>()

</script>
