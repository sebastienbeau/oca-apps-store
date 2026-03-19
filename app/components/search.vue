<script setup lang="ts">
const input = ref('')

const loading = ref(false)
const hits = ref([])
const companyService = useService('companies')
async function onSubmit() {
  try {
    loading.value = true
    console.log('Submitting search with input:', input.value)
    const res = await companyService.search({
      q: input.value,
      nl_query_debug: true,
      query_by:
        'name,countries.label,sponsorship.description_short,sponsorship.level.name',
      nl_model_id: 'gemini-model',
      nl_query: true,
    })
    hits.value = res.hits || []
  } catch (error) {
    console.error('Error during search:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <UContainer>
        <h1>How can I help you today?</h1>

        <UChatPrompt v-model="input" @submit="onSubmit">
          <UChatPromptSubmit :status="loading ? 'loading' : 'idle'" />
        </UChatPrompt>
      </UContainer>
      <UPageList>
        <UUser
          v-for="hit in hits"
          :key="hit.id"
          :name="hit?.name"
          :description="hit?.sponsorship?.shortDescription"
        />
      </UPageList>
    </template>
  </UDashboardPanel>
</template>
