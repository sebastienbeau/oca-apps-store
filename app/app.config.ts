export default defineAppConfig({
    // https://ui.nuxt.com/getting-started/theme#design-system
    ui: {
        colors: {
            primary: 'primary',
            secondary: 'secondary',
            neutral: 'neutral',
        },
    },
    icon: {
        class: 'icon',
        aliases: {
            module: 'i-mdi-package-variant-closed',
            person: 'i-mdi-account-circle',
            sponsor: 'i-mdi-hand-heart',
            category: 'i-mdi-shape-outline',
        },
    },
    search: {
        product: {
            facets: {
                en: [
                    { field: 'variant_attributes.motif', title: 'motif' },
                    { field: 'variant_attributes.taille', title: 'taille' },
                    // { field: 'price.value', title: 'test3' },
                ],
                fr: [
                    { field: 'variant_attributes.motif', title: 'motif' },
                    { field: 'variant_attributes.taille', title: 'taille' },
                    // { field: 'price.value', title: 'test3' },
                ],
            },
            sort: {
                en: [
                    { value: null, label: 'e' },
                    { value: 'name:asc', label: 'test' },
                    { value: 'name:desc', label: 'test' },
                ],
                fr: [
                    { value: null, label: 'f' },
                    { value: 'name:asc', label: 'test' },
                    { value: 'name:desc', label: 'test' },
                ],
            },
        },
    },
})
