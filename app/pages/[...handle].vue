<script lang="ts" setup>
import type { Module } from '~~/models'
const { t } = useI18n()
const route = useRoute()
const moduleService = useService('modules')

/**
 * This page is a catch-all route for any path that doesn't match existing routes.
 * It tries to find a module with a matching URL key and redirects to it if found.
 * If no module is found, it throws a 404 error.
 *
 * This is useful for handling legacy URLs from the old app store
 */

const { data, error } = await useAsyncData<Module[] | null>(
  `module-${route.params.handle}`,
  () => moduleService.findRedirectByURLKey(route.path),
  {
    watch: [() => route.path],
  }
)

if (data.value?.[0]?.urlKey) {
  // If a module is found, redirect to it with a 301 status code
  navigateTo(`/modules/${data.value[0].urlKey}`, { redirectCode: 301 })
} else {
  // If no module found, we can either show a 404 or a search page with the query
  throw createError({
    statusCode: error?.value ? 500 : 404,
    statusMessage: error?.value?.message || t('modules.notFound'),
    fatal: true,
  })
}
</script>
