import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
