// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@pinia/nuxt'],
  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME
  },
  css: ['~/assets/css/main.css'],
  colorMode:{
    preference: 'light',
    fallback: 'light'
  }
})