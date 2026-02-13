<template>
  <UCard reverse class="" :ui="{
      root: 'ring-0 mt-6 bg-white shadow-md ',
      default: 'p-4 ',
      background: '',
      body: 'bg-transparent',
      header: { base: 'p-0 relative' },
      footer: 'flex justify-center'
    }">


      <template #default>
        <div class=" p-4 ">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="text-gray-500" />
              <div>
                <p class="text-sm font-medium">27 rue Henri Rolland</p>
                <p class="text-sm text-gray-500">69100 Villeurbanne, France</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-phone" class="text-gray-500" />
              <p class="text-sm">+33 6 00 00 00 00</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-globe" class="text-gray-500" />
              <ULink to="https://akretion.com" target="_blank" class="text-sm text-blue-500 hover:underline">
                akretion.com
              </ULink>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-mail" class="text-gray-500" />
              <ULink to="mailto:contact@akretion.com" class="text-sm text-blue-500 hover:underline">
                contact@akretion.com
              </ULink>
            </div>
          </div>
        </div>

      </template>
      <template #footer>
        <UButton color="primary" variant="solid" class="mt-4 mx-auto px-6" icon="i-lucide-mail" label="Send an email" />
      </template>
    </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

</script>