<template>
  <div v-if="person">
    <UBreadcrumb :items="breadCrumb" class="mt-8 mb-6" />
    <USeparator />
    <div class="py-8">
      <PersonHeroBanner :person="person" />
    </div>
    <div class="relative pt-14 pb-1 md:pt-22 md:pb-8">
      <div
        class="absolute top-0 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform"
        style="background-color: #fffbf5"
      />
      <div v-if="displayPersonGroups" class="d-block mx-w-sm mx-auto">
        <PersonGroups :person="person" />
      </div>
      <div v-else>
        <UEmpty
          title="This person is not yet part of any group"
          description="Join one  of the OCA working groups and take part of the community"
          variant="naked"
          :actions="[
            {
              label: 'Join one of the working groups',
              icon: 'i-lucide-user-plus',
              color: 'primary',
              to: 'https://odoo-community.org/working-groups',
              target: '_blank',
            },
          ]"
        >
          <template #leading>
            <UAvatarGroup size="xl">
              <UAvatar src="/logo-192.png" alt="Oca logo" loading="lazy" />
            </UAvatarGroup>
          </template>
        </UEmpty>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { t } = useI18n()
import { breadcrumb } from '#build/ui'
import type { Person, Module } from '~/models'

const person = ref<Person | null>(null)
const urlParams = useRoute().params
const route = useRoute()

const personService = useService('persons')
const modulesService = useService('modules')
const breadCrumb = computed(() => {
  const items: any = [
    {
      label: t('nav.community.title'),
      to: '/community',
      icon: 'community',
    },
  ]
  if (person.value?.company) {
    items.push({
      label: person?.value?.company || '',
      to: '/community/companies',
      icon: 'company',
    })
  }
  items.push({ label: person?.value?.name || '', icon: 'person' })
  return items
})
const getPersonByUrlKey = async () => {
  const res = await personService.getPersonByUrlKey(
    {},
    urlParams.handle?.[0] as string
  )
  return res
}

const { data } = await useAsyncData<Person>(
  `person-${route.fullPath}`,
  getPersonByUrlKey,
  {
    watch: [route],
  }
)

if (data.value) {
  person.value = data.value
} else {
  throw createError({
    statusCode: 404,
    statusMessage: t('modules.notFound'),
    fatal: true,
  })
}
person.value = data.value || null

const modules = ref<Module[]>()

// async function getModulesContributionsHits() {
//   const hits: Module[] = await modulesService.getByIds(person.value?.modulesContributionsId || [])
//   return hits
// }

// modules.value = await getModulesContributionsHits()

const displayPersonGroups = computed(() => {
  if (
    person.value.pscList.length > 0 ||
    person.value.workGroupList.length > 0
  ) {
    return true
  } else {
    return false
  }
})
</script>
<style scoped>
.background-style::before {
  content: '';
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
