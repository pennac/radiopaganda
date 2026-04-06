<template>
  <div class="h-[100dvh] w-full bg-puro-negro relative overflow-hidden">
    <!-- Header with Back Button -->
    <header class="absolute top-0 left-0 w-full p-4 z-40 bg-gradient-to-b from-black/80 to-transparent flex items-center">
      <button @click="$router.back()" class="flex items-center gap-2 text-blanco-optico hover:text-rojo-sangre transition-colors font-mono uppercase text-xs tracking-widest backdrop-blur-sm px-3 py-2 rounded-full bg-black/30 border border-blanco-optico/10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        VOLVER
      </button>
    </header>

    <div v-if="pending" class="h-full w-full flex flex-col items-center justify-center pointer-events-none">
      <h2 class="text-rojo-sangre font-brutal text-2xl animate-pulse">SINTONIZANDO...</h2>
    </div>

    <div v-else-if="!article" class="h-full w-full flex flex-col items-center justify-center pointer-events-none">
      <h2 class="text-blanco-optico font-brutal text-2xl">SEÑAL PERDIDA</h2>
      <p class="font-mono text-sm text-rojo-sangre mt-2">Error 404: Archivo no encontrado</p>
      <button @click="$router.push('/')" class="mt-8 bg-rojo-sangre text-blanco-optico font-mono text-xs px-6 py-3 uppercase tracking-widest pointer-events-auto">REGRESAR A LA RED</button>
    </div>

    <template v-else>
      <div class="absolute inset-0 z-0">
        <!-- Reusing MobileVideoPlayer, forces auto-play because it's a single page context -->
        <MobileVideoPlayer 
          :src="article.media.video_url_hls" 
          :poster="article.media.thumbnail"
          :is-playing="true"
        />
      </div>

      <!-- Info Overlay -->
      <div class="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-24 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
        <div class="max-w-md pointer-events-auto">
          <span class="inline-block bg-rojo-sangre text-blanco-optico text-[10px] font-mono px-2 py-1 uppercase tracking-widest mb-3">
            {{ article.category }}
          </span>
          <h1 class="text-4xl md:text-5xl font-brutal text-blanco-optico uppercase leading-none drop-shadow-lg mb-4">
            {{ article.content.title }}
          </h1>
          <p class="text-blanco-optico/90 text-sm font-sans mb-4 leading-relaxed whitespace-pre-wrap">
            {{ article.content.body }}
          </p>
          
          <!-- Tags if available in the content model -->
          <div class="flex flex-wrap gap-2 mt-4" v-if="article.content.tags || true">
            <!-- Mock tags as requested by the aesthetic -->
            <span class="text-xs text-rojo-sangre font-mono">#RADIOPAGANDA</span>
            <span class="text-xs text-oxido font-mono">#RUIDONEGRO</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useFetch, useSeoMeta } from '#app';

const route = useRoute();
const slug = route.params.slug as string;

const { data: categoryData, pending, error } = await useFetch<any>('/data/categories/operacion-rebelde.json', {
  key: `article-${slug}`,
  server: true
});

const article = computed(() => {
  if (error.value || !categoryData.value?.articles) return null;
  return categoryData.value.articles.find((a: any) => a.slug === slug) || null;
});

if (article.value) {
  useSeoMeta({
    title: article.value.seo.meta_title,
    description: article.value.seo.meta_description,
    ogTitle: article.value.seo.meta_title,
    ogDescription: article.value.seo.meta_description,
    ogImage: article.value.media.thumbnail
  });
} else {
  useSeoMeta({
    title: 'Señal Perdida | RADIOPAGANDA'
  });
}
</script>
