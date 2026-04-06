<template>
  <div class="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-[64px] bg-puro-negro relative">
    
    <CategoryFilter class="absolute top-0 w-full" style="position: absolute; z-index: 50;" />

    <div v-if="pending" class="h-full w-full flex items-center justify-center text-rojo-sangre font-mono animate-pulse">
      CARGANDO TRANSMISIÓN...
    </div>
    <div v-else-if="error" class="h-full w-full flex items-center justify-center text-rojo-sangre font-mono">
      ERROR DE CONEXIÓN
    </div>
    <template v-else-if="articles">
      <VideoCardItem 
        v-for="article in articles" 
        :key="article.id" 
        :article="article" 
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch, useSeoMeta } from '#app';

// Robust unique-keyed SSR data fetching using Native Nitro API Bridge
const { data: feedData, pending, error: feedError } = await useFetch<any>('/api/get-category', {
  key: 'home-feed-data',
  query: { slug: 'operacion-rebelde' },
  server: true
});

const { data: indexData, error: indexError } = await useFetch<any>('/api/get-index', {
  key: 'home-index-data',
  server: true
});

// Fallback logic to prevent undefined crashes and infinite suspensions
const articles = computed(() => {
  if (feedError.value || !feedData.value?.articles) return [];
  return feedData.value.articles;
});

const manifesto = computed(() => {
  if (indexError.value || !indexData.value?.manifesto) {
    return { title: 'ERROR', description: 'Señal Perdida', seo_title: 'Error' };
  }
  return indexData.value.manifesto;
});

// Calculate global error state
const error = computed(() => !!feedError.value || !!indexError.value);

if (manifesto.value && manifesto.value.title !== 'ERROR') {
  useSeoMeta({
    title: manifesto.value.title,
    description: manifesto.value.description,
    ogTitle: manifesto.value.seo_title,
    ogDescription: manifesto.value.description,
  });
}
</script>
