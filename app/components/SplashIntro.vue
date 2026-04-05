<template>
  <div v-if="isVisible" class="fixed inset-0 bg-puro-negro z-[100] flex flex-col items-center justify-center pointer-events-none select-none">
    <h1 class="text-blanco-optico font-brutal text-5xl md:text-7xl lg:text-9xl tracking-tighter animate-pulse animate-duration-300">
      RADIOPAGANDA
    </h1>
    <p class="font-mono text-rojo-sangre mt-4 text-sm tracking-widest uppercase">
      Conectando Comando Central...
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(true);
const emit = defineEmits(['close']);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
    emit('close');
  }, 2500);
});
</script>
