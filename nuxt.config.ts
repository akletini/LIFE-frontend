// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ['@headlessui/vue', '@headlessui/tailwindcss']
    },
    modules: ['@nuxtjs/tailwindcss'],
    app: {
        head: {
            title: "LIFE",
            link: [
              {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
            ]
        }
    }
})
