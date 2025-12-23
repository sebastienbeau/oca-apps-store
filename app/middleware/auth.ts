export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useService('auth')
    const localePath = useLocalePath()
    const loginPath = localePath('account/login')
    const user = auth?.getUser()
    if (!user?.login && to.path !== loginPath) {
        return navigateTo(loginPath)
    }
})
