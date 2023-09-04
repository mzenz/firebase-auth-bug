import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      APP_BASE_URL: process.env.APP_BASE_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    }
  },
  imports: {
    autoImport: false
  },
  alias: {
    lib: resolve(__dirname, 'lib'),
    config: resolve(__dirname, 'config'),
    composables: resolve(__dirname, 'composables'),
    components: resolve(__dirname, 'components'),
    store: resolve(__dirname, 'store'),
  },
})
