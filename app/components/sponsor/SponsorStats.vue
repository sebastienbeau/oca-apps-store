<template>
  <div class="flex w-full justify-center md:justify-start gap-6 md:gap-22 ">
    <div v-if="sponsor.membersCount" class="flex md:flex-row flex-col justify-tart items-center gap-2 ">
      <div class="text-secondary-500 flex  items-center gap-1 text-2xl">
       {{sponsor.membersCount}}
      </div>
      <div>
        {{$t('company.stats.members')}}
      </div>
    </div>
    <div v-if="sponsor.contributorsCount" class="flex md:flex-row flex-col justify-start  items-center gap-2">
      <div class="text-secondary-500 flex items-center gap-1 text-2xl">
        {{sponsor.contributorsCount}}
      </div>
      <div>
         {{$t('company.stats.contributors')}}
      </div>
    </div>
    <div v-if="sponsor.modulesCount" class="flex md:flex-row flex-col justify-start  items-center gap-2">
      <div class="text-secondary-500 flex items-center gap-1 text-2xl">
        {{sponsor.modulesCount}}
      </div>
      <div>
        {{$t('company.stats.modules')}}
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
const props = defineProps<{
  sponsor: Sponsor;
 
}>();

const statistics = computed(() => {
  return [
    { label: 'Members', value: props.sponsor.membersCount },
    { label: 'Contributors', value: props.sponsor.contributorsCount },
    { label: 'Modules', value: props.sponsor.modulesCount },
  ]
})

</script>