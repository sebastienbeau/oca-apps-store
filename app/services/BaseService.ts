export class BaseService {
    // List of all available services
    services: ServiceList | null = null
    async init(services: ServiceList) {
        this.services = services
    }
}
