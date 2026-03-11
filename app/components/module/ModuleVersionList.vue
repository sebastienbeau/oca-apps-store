<template>
  <div v-if="versions.length > 0" class="flex flex-wrap gap-1">
    <UBadge
      v-for="hit in versions"
      :key="hit.version"
      color="info"
      variant="subtle"
      size="sm"
      class="rounded-full"
    >
      {{ hit.version }}
    </UBadge>
  </div>
</template>
<script lang="ts" setup>
import type { ModuleGroupedHit } from '~~/models'

const props = defineProps<{
  moduleGrouped: ModuleGroupedHit
}>()
const versions = computed(() => {
  return (
    props.moduleGrouped.hits?.reduce((acc: { version: string }[], hit) => {
      if (hit.version && !acc.find((v) => v.version === hit.version)) {
        acc.push({ version: hit.version })
      }
      return acc
    }, []) || []
  )
})
</script>
