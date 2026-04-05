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
import { useAsyncData, useSeoMeta } from '#app';
import { useContent } from '~/composables/useContent';

const { fetchArticlesByCategory, fetchManifesto } = useContent();

const [{ data: articles, pending, error }, { data: manifesto }] = await Promise.all([
  useAsyncData('home-feed', () => fetchArticlesByCategory('operacion-rebelde')),
  useAsyncData('home-manifesto', () => fetchManifesto())
]);

if (manifesto.value) {
  useSeoMeta({
    title: manifesto.value.title,
    description: manifesto.value.description,
    ogTitle: manifesto.value.seo_title,
    ogDescription: manifesto.value.description,
  });
}
</script>
