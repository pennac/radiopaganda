<template>
  <div class="h-[100dvh] w-full bg-puro-negro relative overflow-y-scroll pb-24">
    <!-- Header with Back Button (only visible if not from bottom nav directly) -->
    <header class="w-full p-6 pt-10 flexitems-center sticky top-0 z-40 bg-gradient-to-b from-puro-negro to-transparent">
      <h1 v-if="manifesto" class="text-4xl md:text-6xl text-blanco-optico font-brutal uppercase tracking-tighter glitch-text">
        {{ manifesto.title }}
      </h1>
    </header>

    <div v-if="pending" class="h-full flex items-center justify-center pointer-events-none">
      <h2 class="text-rojo-sangre font-brutal text-2xl animate-pulse">SINTONIZANDO...</h2>
    </div>

    <main v-else-if="manifesto" class="px-6 prose prose-invert font-mono text-blanco-optico/90 w-full max-w-2xl mx-auto selection:bg-rojo-sangre selection:text-blanco-optico leading-relaxed">
      <!-- Format the manifesto description nicely -->
      <p class="text-lg md:text-xl relative z-10 border-l-4 border-rojo-sangre pl-4 py-2 bg-gris-industrial/50 my-6 shadow-2xl">
        {{ manifesto.description }}
      </p>

      <div class="flex gap-3 flex-wrap mt-8">
        <span v-for="tag in manifesto.tags" :key="tag" class="text-xs uppercase bg-rojo-sangre/20 text-rojo-sangre px-3 py-1 border border-rojo-sangre/50">
          #{{ tag.replace(' ', '').toUpperCase() }}
        </span>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch, useSeoMeta } from '#app';

const { data: indexData, pending, error } = await useFetch<any>('/data/index.json', {
  key: 'manifesto-data',
  server: true
});

const manifesto = computed(() => {
  if (error.value || !indexData.value?.manifesto) {
    return null;
  }
  return indexData.value.manifesto;
});

if (manifesto.value) {
  useSeoMeta({
    title: manifesto.value.title,
    description: manifesto.value.description,
    ogTitle: manifesto.value.seo_title,
    ogDescription: manifesto.value.description
  });
}
</script>
