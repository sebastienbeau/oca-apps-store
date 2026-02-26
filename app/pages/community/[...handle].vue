<template>
  <UBreadcrumb :items="[
    { label: t('nav.community.title'), to: '/community', icon: 'i-ph-cube-duotone' },
    { label: person?.name || '', icon: 'i-ph-cube-duotone' },
  ]" class="mt-8 mb-6" />
  <USeparator />
  <div class="py-8">
    <PersonHeroBanner :person="person" />
  </div>
  <div class="pt-14 pb-1 md:pt-32 md:pb-10 relative">
    <div class="w-screen absolute left-1/2 transform -translate-x-1/2 top-0 h-[120%] -skew-y-3 -z-10 "
      style="background-color: #fffbf5 " />
    <div class="d-block mx-w-sm mx-auto">
      <PersonGroups :person="person" />
    </div>



  </div>

</template>
<script lang="ts" setup>

const person = ref<Person | null>(null)
const urlParams = useRoute().params;
const route = useRoute()

const personService = useService('persons')

const getPersonByUrlKey = async () => {
  const res = await personService.getPersonByUrlKey({}, urlParams.handle?.[0] as string)
  return res
}

const { data } = await useAsyncData<Person>(
  `person-${route.fullPath}`,
  getPersonByUrlKey, {
  watch: [route]
}
)

if (data.value) {
  person.value = data.value
}
person.value = data.value || null;



</script>
<style scoped>
.background-style::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  background-color: #fffbf5;

}
</style>
