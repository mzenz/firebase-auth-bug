import { defineNuxtPlugin } from 'nuxt/app'
import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin((nuxtApp) => {
  initializeApp({
    apiKey: nuxtApp.$config.public.FIREBASE_API_KEY as string,
    authDomain: nuxtApp.$config.public.FIREBASE_AUTH_DOMAIN as string,
    projectId: nuxtApp.$config.public.FIREBASE_PROJECT_ID as string,
    appId: nuxtApp.$config.public.FIREBASE_APP_ID as string,
    measurementId: nuxtApp.$config.public.FIREBASE_MEASUREMENT_ID as string
  })
  console.debug('Firebase initialized.')
})
