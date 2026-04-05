<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from '#app';
// Global SEO fallback, can be overridden per page
useSeoMeta({
  title: 'RADIOPAGANDA',
  titleTemplate: '%s | Transmisión Clandestina',
  description: 'RADIOPAGANDA es una entidad clandestina. Buscamos voces, no perfección. Transmitimos desde el caos porque el caos es nuestra zona de confort. El control no se negocia, se impone. Únete a la red.',
  ogTitle: 'RADIOPAGANDA',
  ogDescription: 'RADIOPAGANDA es una entidad clandestina. Buscamos voces, no perfección.',
  ogImage: '/pwa-512x512.png',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'es'
  }
})
</script>
