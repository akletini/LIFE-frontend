// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      dateFormat: process.env.DE_DATE_FORMAT,
      dateTimeFormat: process.env.DE_DATETIME_FORMAT,
    },
  },
  build: {
    transpile: ["@headlessui/vue", "@headlessui/tailwindcss"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "@nathanchase/nuxt-dayjs-module",
  ],
  app: {
    head: {
      title: "LIFE",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
});
