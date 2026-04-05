<template>
  <div class="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-[64px] bg-puro-negro relative">
    
    <CategoryFilter class="absolute top-0 w-full" style="position: absolute; z-index: 50;" />

    <div v-if="pending" class="h-full w-full flex items-center justify-center text-rojo-sangre font-mono animate-pulse">
      SINCRONIZANDO {{ slug.toUpperCase() }}...
    </div>

    <template v-else-if="articles && articles.length > 0">
      <VideoCardItem 
        v-for="article in articles" 
        :key="article.id" 
        :article="article" 
      />
    </template>
    
    <div v-else class="h-full w-full flex flex-col items-center justify-center pointer-events-none px-6 text-center">
      <h2 class="text-blanco-optico font-brutal text-2xl uppercase">VACÍO ESTATICO</h2>
      <p class="font-mono text-sm text-rojo-sangre mt-2">No hay transmisiones decodificadas en este protocolo.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData, useSeoMeta } from '#app';
import { useContent } from '~/composables/useContent';

const route = useRoute();
const slug = route.params.slug as string;

const { fetchArticlesByCategory } = useContent();

// Fetch filtered articles
const { data: articles, pending } = await useAsyncData(`category-${slug}`, () => fetchArticlesByCategory(slug));

useSeoMeta({
  title: `Categoría: ${slug} | RADIOPAGANDA`,
  description: `Canal de transmisión: ${slug}`
});
</script>
