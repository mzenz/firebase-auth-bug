<template>
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useHead } from 'unhead'
import { useRuntimeConfig } from 'nuxt/app'

const config = useRuntimeConfig()

const title = 'My cool page title'
const siteName = 'My company'
const description = 'Welcome to my home webpage!'
const locale = 'en'
const url = config.public.APP_BASE_URL as string

useHead({
  htmlAttrs: { lang: locale },
  title: title,
  meta: [
    { name: 'description', content: description },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: siteName },
    { property: 'og:description', content: description },
    { property: 'og:image', content: `${config.public.APP_BASE_URL}/banner.jpg` },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' }
  ]
})
</script>
