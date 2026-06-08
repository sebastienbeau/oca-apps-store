<template>
  <div>
    <UModal
      v-model:open="openDialog"
      @close:prevent="onAcceptAll"
      :overlay="false"
      :ui="{
        content:
          'bg-linear-to-tl from-secondary-400/10 via-transparent to-primary-400/10 text-sm left-2 bottom-2 top-auto translate-x-0 translate-y-0 max-w-md w-full divide-none',
        body: 'p-4 sm:p-4',
        header: 'p-2 sm:p-3 min-h-auto',
        footer: 'p-2 sm:p-3 justify-end gap-2',
      }"
    >
      <UButton
        variant="link"
        color="neutral"
        size="xs"
        :label="t('cookies_consent.manage_cookies')"
        class="cursor-pointer"
        @click="openCookiePreferences = !openCookiePreferences"
      />
      <template #header>
        <div
          class="flex w-full items-center justify-between gap-1 text-primary-700"
        >
          <UIcon
            name="i-fluent-cookies-48-regular"
            class="mr-2 inline-block size-8"
          />
          <div class="flex-1 font-heading text-xl font-extrabold dark:text-white">
            {{ t('cookies_consent.title') }}
          </div>
          <UButton
            variant="link"
            size="xs"
            label="Continue without accepting"
            @click="onReject"
          />
        </div>
      </template>
      <template #body>
        {{ t('cookies_consent.description') }}
      </template>
      <template #footer>
        <UButton
          variant="outline"
          color="primary"
          @click="onManage"
          size="sm"
          :label="t('cookies_consent.manage_preferences')"
        />
        <UButton
          variant="solid"
          color="primary"
          @click="onAcceptAll"
          size="sm"
          :label="t('cookies_consent.accept_all')"
        />
      </template>
    </UModal>
    <UModal
      v-model:open="openCookiePreferences"
      :overlay="true"
      :ui="{
        footer: 'p-2 sm:p-3 justify-end gap-2',
      }"
    >
      <template #header>
        <div
          class="flex w-full items-center justify-between gap-1 text-primary-700"
        >
          <UIcon
            name="i-fluent-cookies-48-regular"
            class="mr-2 inline-block size-8"
          />
          <div class="flex-1 font-heading text-xl font-extrabold">
            {{ t('cookies_consent.preferences_title') }}
          </div>
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          {{ t('cookies_consent.preferences_description') }}
        </p>
        <UCheckboxGroup v-model="value" value-key="id" :items="items" />
      </template>
      <template #footer>
        <UButton
          variant="solid"
          color="primary"
          @click="onSaveCookiePreferences"
          size="sm"
          :label="t('cookies_consent.save_preferences')"
        />
      </template>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const { t } = useI18n()
const {
  public: { gtm },
} = useRuntimeConfig()

const openDialog = ref(false)
const openCookiePreferences = ref(false)
const value = ref<string[]>(['system'])

const consent = useScriptTriggerConsent()

const isGtmAccepted = computed(() => value.value.includes('gtm'))

const { proxy, load, remove } = useScriptGoogleTagManager({
  id: gtm.id, //
  trigger: consent,
  onBeforeGtmStart: (gtag) => {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    })
  },
})

const handleFinalConsent = () => {
  if (isGtmAccepted.value) {
    proxy.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })

    consent.accept()
    load()
  } else {
    consent.revoke()
    remove()
  }
  saveCookies()
}

const onAcceptAll = () => {
  value.value = items.value.map((i) => i.id)
  handleFinalConsent()
  openDialog.value = false
}

const onReject = () => {
  value.value = ['system']
  handleFinalConsent()
  openDialog.value = false
}

const onSaveCookiePreferences = () => {
  handleFinalConsent()
  openCookiePreferences.value = false
  openDialog.value = false
}

const saveCookies = () => {
  localStorage.setItem('cookie-preferences', JSON.stringify(value.value))
}

const items = computed<CheckboxGroupItem[]>(() => [
  {
    label: t('cookies_consent.necessary_cookies.label'),
    description: t('cookies_consent.necessary_cookies.description'),
    id: 'system',
    disabled: true,
  },
  {
    label: t('cookies_consent.gtm.label'),
    description: t('cookies_consent.gtm.description'),
    id: 'gtm',
  },
])

onMounted(() => {
  const saved = localStorage.getItem('cookie-preferences')
  if (saved) {
    value.value = JSON.parse(saved)
    if (isGtmAccepted.value) {
      consent.accept()
      load()
    }
  } else {
    consent.revoke()
    remove()
    setTimeout(() => {
      openDialog.value = true
    }, 1000)
  }
})
</script>
