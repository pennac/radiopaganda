<template>
  <div class="min-h-[100dvh] w-full bg-puro-negro pb-24 pt-10 px-6">
    <header class="mb-8 relative z-10">
      <h1 class="text-4xl text-blanco-optico font-brutal uppercase tracking-tighter">Categorías</h1>
      <p class="font-mono text-sm text-rojo-sangre mt-1">Selecciona el protocolo de transmisión</p>
    </header>

    <div v-if="pending" class="flex justify-center text-rojo-sangre font-brutal animate-pulse">
      Cargando...
    </div>

    <div v-else-if="categories" class="flex flex-col gap-4 relative z-10">
      <NuxtLink 
        v-for="cat in categories" 
        :key="cat.id" 
        :to="`/categorias/${cat.id}`"
        class="block p-4 border border-gris-industrial bg-black hover:border-rojo-sangre hover:bg-gris-industrial/40 transition-colors group"
      >
        <h2 class="font-mono text-xl text-blanco-optico group-hover:text-rojo-sangre transition-colors mb-2 uppercase">{{ cat.name }}</h2>
        <p class="font-sans text-sm text-blanco-optico/70 line-clamp-3">{{ cat.description }}</p>
        <div class="mt-4 flex items-center justify-end">
          <span class="text-xs font-mono text-rojo-sangre uppercase tracking-widest bg-rojo-sangre/10 px-2 py-1">INICIAR >></span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch, useSeoMeta } from '#app';

const { data: indexData, pending, error } = await useFetch<any>('/api/get-index', {
  key: 'categories-page',
  server: true
});

const categories = computed(() => {
  if (error.value || !indexData.value?.categories) return [];
  return indexData.value.categories;
});

useSeoMeta({
  title: 'Categorías | RADIOPAGANDA',
  description: 'Explora los distintos protocolos y frecuencias clandestinas disponibles.'
});
</script>
