<template>
  <div 
    class="w-full bg-gris-industrial/90 backdrop-blur-sm border-b border-gris-industrial overflow-x-auto whitespace-nowrap scrollbar-hide py-3 px-4 flex gap-3 z-50 sticky top-0 transition-all duration-300 ease-in-out"
    :class="isCleanMode ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'"
  >
    <NuxtLink 
      to="/" 
      exact-active-class="bg-rojo-sangre text-blanco-optico border-rojo-sangre"
      class="inline-block px-4 py-1.5 rounded-full border border-blanco-optico/20 text-blanco-optico/70 font-mono text-xs uppercase tracking-widest hover:border-rojo-sangre hover:text-rojo-sangre transition-colors min-w-max"
    >
      TODAS
    </NuxtLink>
    
    <NuxtLink 
      v-for="cat in categories" 
      :key="cat.slug"
      :to="`/categorias/${cat.slug}`"
      exact-active-class="bg-rojo-sangre text-blanco-optico border-rojo-sangre"
      class="inline-block px-4 py-1.5 rounded-full border border-blanco-optico/20 text-blanco-optico/70 font-mono text-xs uppercase tracking-widest hover:border-rojo-sangre hover:text-rojo-sangre transition-colors min-w-max"
    >
      {{ cat.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch, useState } from '#app';

const { data: indexData, error } = await useFetch<any>('/data/index.json', {
  key: 'categories-filter',
  server: false
});

const categories = computed(() => {
  if (error.value || !indexData.value?.categories) return [];
  return indexData.value.categories;
});

const isCleanMode = useState('isCleanMode', () => false);
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
