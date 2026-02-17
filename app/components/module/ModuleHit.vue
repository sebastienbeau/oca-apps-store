<template>


  <NuxtLink :to="module.url_key">

    <UCard class="max-w-sm w-full hover:shadow-lg transition-shadow duration-200">

      <template #header>
        <div class="flex items-center gap-5">
          <img class="max-h-18" src="/img/oca_modules_logo_vertical.png" alt="OCA Logo" />
          <div>
            <h3 class="font-semibold text-gray-900 text-xl">
              {{ module.name }}
              <UBadge color="secondary" variant="soft" class="ml-2 rounded-full">
                {{ module.category }}
              </UBadge>
            </h3>
          </div>
        </div>
      </template>

      <div class="space-y-3">
        <div>
          <UIcon name="qlementine-icons:anchor-top-left-16" class="text-sm mr-4"></UIcon>
          <span class="text-sm text-gray-700"> {{ module.technical_name }}</span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          {{ module.description }}
        </p>

        <div class="flex flex-wrap gap-2">
          <UBadge v-for="version in module.supported_versions" :key="version" color="info" variant="outline" size="sm"
            class="rounded-full">
            {{ version }}
          </UBadge>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center">

            <UAvatarGroup v-for="contributor in module.contributors" size="sm" max="2">
              <ULink :to="contributor.github" target="_blank" class="hover:ring-info transition" raw>
                <UAvatar :src="contributor.avatar" alt="Contributor" />
              </ULink>

            </UAvatarGroup>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
              +{{ module.contributors.length }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon :name="icon" class="text-gray-500 dark:text-gray-400" />
            <NuxtLink :to="module.repository.url" class="">
              <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2 mr-1" width="32"
                height="32" />
            </NuxtLink>
          </div>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
<script setup lang="ts">
const props = defineProps<{
  module: any
}>()


</script>
