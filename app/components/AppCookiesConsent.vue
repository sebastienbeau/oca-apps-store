<template>
  <div>
    <UModal 
      v-model:open="openDialog" 
      @close:prevent="onAcceptAll"
      :overlay="false"
      :ui="{
        content: 'bg-linear-to-tl from-secondary-400/10 via-transparent to-primary-400/10 text-sm left-2 bottom-2 top-auto translate-x-0 translate-y-0 max-w-md w-full divide-none',
        body: 'p-4 sm:p-4',
        header: 'p-2 sm:p-3 min-h-auto',
        footer: 'p-2 sm:p-3 justify-end gap-2',
      }"
    >
      <UButton 
        variant="link"
        size="xs"
        label="Gestion des cookies"
        @click="openCookiePreferences=!openCookiePreferences"
      />
      <template #header>
        <div class="flex justify-between items-center w-full gap-1 text-primary-700">
          <UIcon name="i-fluent-cookies-48-regular" class="inline-block mr-2  size-8" />
          <div class="font-heading font-extrabold text-xl flex-1 ">
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
        <div class="flex justify-between items-center w-full gap-1 text-primary-700">
          <UIcon name="i-fluent-cookies-48-regular" class="inline-block mr-2  size-8" />
          <div class="font-heading font-extrabold text-xl flex-1 ">
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
const openDialog = ref(false)
const openCookiePreferences = ref(false)
const value = ref([])
const consent = useScriptTriggerConsent()

const updateGtmConsent = () => {
  proxy.dataLayer.push({
    event: 'consent_granted',
  })
  window.gtag?.('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
  consent.accept()
}
const { proxy } = useScriptGoogleTagManager({
  id: process.env.NUXT_PUBLIC_GTM_ID || '', 
  scriptOptions: {
    trigger: consent,
  },
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
const isGtmAccepted = computed(() => {
  return value.value.includes('gtm')
})
const pageRefresh = () => {
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
const onReject = () => {
  openDialog.value = false
  value.value = ['system']
  pageRefresh()
  
}
const onAcceptAll = () => {
  openDialog.value = false
  value.value = items.value.map(i => i.id)
  if (isGtmAccepted.value) {
    
    updateGtmConsent()
  }
}
const onManage = () => {
  openDialog.value = false
  openCookiePreferences.value = true
}

const items = ref<CheckboxGroupItem[]>([
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
    disabled: false,
    
  },
])

const onSaveCookiePreferences = () => {
  // save preferences on local storage
  openCookiePreferences.value = false
  openDialog.value = false
  if (isGtmAccepted.value) {
    updateGtmConsent()
  }
  saveCookies()
  pageRefresh()
}
const saveCookies = () => {
  if(window && window?.localStorage) {
    window.localStorage.setItem('cookie-preferences', JSON.stringify(value.value))
  }
}
onMounted(() => {
  // get preferences from local storage
  if(window && window?.localStorage) {
    const savedPreferences = window.localStorage.getItem('cookie-preferences')
    if(savedPreferences) {
      value.value = JSON.parse(savedPreferences)
    }
  }
  if(value.value?.length > 1) {
    openDialog.value = false
  }
  if (isGtmAccepted.value) {
    updateGtmConsent()
  }
  if(value.value?.length === 0) {
    openDialog.value = true
    setTimeout(() => {
      value.value = ['system', 'gtm']
      openDialog.value = true
    }, 10000)
  }
})


watch(isGtmAccepted, (newVal, oldVal) => {
  if(newVal && !oldVal) {
    updateGtmConsent()
  }
})
watch(value, (newVal, oldVal) => {
  saveCookies()
})

</script>