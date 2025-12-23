import type { ServiceList } from '~/plugins/services/types/config'

/**
 * Give access to the services
 * @param serviceName string
 */
export const useService = <K extends keyof ServiceList>(
    serviceName: K
): ServiceList[K] => {
    const services: any = useNuxtApp().$services
    if (!services) {
        throw new Error('No services found')
    }
    if (
        !services ||
        !Object.prototype.hasOwnProperty.call(services, serviceName)
    ) {
        throw new Error(`No services found for ${serviceName}`)
    }
    return services[serviceName]
}
