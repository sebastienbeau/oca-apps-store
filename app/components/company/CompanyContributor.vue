<template>
  <div class="p-4 py-10">
    <ProseH2 class="mb-4 text-3xl font-extrabold text-primary lg:text-4xl">
      <span class="pr-1 uppercase">
        {{ company.name }}
      </span>
      <span class="text-secondary">
        {{ t('company.contributors.title') }}
      </span>
    </ProseH2>
    <div
      class="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row"
    >
      <UFormField class="min-w-72">
        <SearchBox
          v-model="searchTerms"
          :placeholder="[t('person.search.placeholder')]"
        />
      </UFormField>
      {{ t('company.contributors.found', { count: contributors?.found }) }}
    </div>
    <div class="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
      <PersonHit
        v-for="person in contributors?.hits"
        :key="person.id"
        :person="person"
      />
    </div>
    <div class="flex justify-center pt-4">
      <UPagination
        v-model:page="page"
        :items-per-page="9"
        :total="contributors?.found || 0"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Company, PersonRole } from '~~/models'
const props = defineProps<{
  company: Company
}>()
const { t } = useI18n()
const searchTerms = ref('')
const page = ref(1)
const personService = useService('persons')
const { data: contributors } = useAsyncData<PersonRole>(
  () => {
    return personService.getPersonsByCompanyId(
      parseInt(props.company.id),
      searchTerms.value,
      page.value
    )
  },
  {
    watch: [searchTerms, page],
    debounce: 300,
  }
)
watch(
  () => searchTerms.value,
  (newSearchTerms) => {
    page.value = 1
  }
)
</script>
