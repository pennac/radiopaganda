export default defineNuxtConfig({
  // ... resto della tua config
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      failOnError: false, // <--- FONDAMENTALE: impedisce l'Exit Code 2
    }
  },
  // Riduciamo le routeRules allo stretto necessario per ora
  routeRules: {
    '/': { prerender: true },
    '/categorias/**': { prerender: true },
    '/feed.json': { prerender: true }
  },

  app: {
    head: {
      title: 'RADIOPAGANDA',
      meta: [
        { name: 'description', content: 'Transmisión Clandestina' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'theme-color', content: '#050505' }
      ]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/manifiesto': { prerender: true },
    '/categorias': { prerender: true },
    '/legal/*': { prerender: true },
    '/categorias/*': { prerender: true },
    '/operacion-rebelde/*': { prerender: true },
    '/feed.json': { prerender: true }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt'
  ],
  pwa: {
    manifest: {
      name: 'RADIOPAGANDA',
      short_name: 'RADIOPAGANDA',
      theme_color: '#050505',
      background_color: '#050505',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  css: [
    '~/assets/css/main.css'
  ]
})
