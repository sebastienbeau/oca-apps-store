<template>
  <UPageCard  class="" :ui="{
    root: 'ring-0 hover:shadow-sm bg-transparent rounded-sm md:w-1/4 h-auto ',
    container: 'p-2 sm:p-4',
    body: 'sm:px-0 sm:py-2 bg-transparent text-center w-full',
    header: 'sm:px-2 mb-2 w-full relative border-0 ',
    footer: 'p-2 sm:px-4 flex justify-center items-center w-full' 
  }">
    <template #header>
      <div class="text-center py-4" >
        <UAvatar icon="codicon:github-project" class="mb-0 text-primary bg-primary-100 " size="md" />
      </div>
     
      <h3 class="text-primary font-bold text-center">{{ psc.name }}</h3>
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
      Find out more</UButton>
    </template>
  </UPageCard>
</template>
<script setup lang="ts">
import type { PSC } from '~~/models'

const props = defineProps<{
  psc: PSC
}>()
</script>
