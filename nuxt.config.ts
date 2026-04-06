export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify',
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: [
        '/api/get-index',
        '/api/get-category?slug=operacion-rebelde'
      ]
    }
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
    // '@vite-pwa/nuxt',  // DISABLED FOR DEBUGGING
    '@vueuse/nuxt'
  ],
  /*
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
      // CAMBIA QUESTO:
      navigateFallback: null, // Disabilitalo temporaneamente per evitare il loop dell'errore
      runtimeCaching: [
        {
          urlPattern: '/data/.*',
          handler: 'NetworkFirst', // Cerca sempre i dati aggiornati dal server
        }
      ]
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  */
  css: [
    '~/assets/css/main.css'
  ]
})
