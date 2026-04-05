<template>
  <div 
    class="fixed bottom-0 left-0 w-full z-50 flex flex-col shadow-[0_-5px_20px_rgba(0,0,0,0.8)] pb-[calc(env(safe-area-inset-bottom))] bg-black transition-all duration-300 ease-in-out"
    :class="isCleanMode ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'"
  >
    <!-- Main Icons Navigation -->
    <nav class="w-full h-[60px] bg-puro-negro flex items-center justify-around border-t border-gris-industrial">
      <!-- HOME -->
      <NuxtLink to="/" exact-active-class="text-rojo-sangre" class="flex flex-col items-center justify-center w-20 h-full min-h-[44px] min-w-[44px] touch-manipulation hover:text-rojo-sangre transition-colors duration-200 text-blanco-optico/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="square" stroke-linejoin="miter" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span class="text-[10px] mt-1 font-mono tracking-widest leading-none">SEÑAL</span>
      </NuxtLink>
      
      <!-- CATEGORIAS -->
      <NuxtLink to="/categorias" active-class="text-rojo-sangre" class="flex flex-col items-center justify-center w-20 h-full min-h-[44px] min-w-[44px] touch-manipulation hover:text-rojo-sangre transition-colors duration-200 text-blanco-optico/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="square" stroke-linejoin="miter" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="text-[10px] mt-1 font-mono tracking-widest leading-none">CATEGORÍAS</span>
      </NuxtLink>

      <!-- MANIFIESTO -->
      <NuxtLink to="/manifiesto" active-class="text-rojo-sangre" class="flex flex-col items-center justify-center w-20 h-full min-h-[44px] min-w-[44px] touch-manipulation hover:text-rojo-sangre transition-colors duration-200 text-blanco-optico/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="square" stroke-linejoin="miter" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-[10px] mt-1 font-mono tracking-widest leading-none">COMANDO</span>
      </NuxtLink>
    </nav>
    
    <!-- Legal Text Footer -->
    <div class="w-full bg-black py-[6px] flex items-center justify-center gap-4 text-[9px] font-mono tracking-widest text-blanco-optico/30 border-t border-puro-negro z-50 relative">
      <NuxtLink to="/legal/aviso-legal" class="hover:text-blanco-optico/80 transition-colors">AVISO LEGAL</NuxtLink>
      <span>|</span>
      <NuxtLink to="/legal/privacidad" class="hover:text-blanco-optico/80 transition-colors">PRIVACIDAD</NuxtLink>
      <span>|</span>
      <NuxtLink to="/legal/cookies" class="hover:text-blanco-optico/80 transition-colors">COOKIES</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from '#app';
const isCleanMode = useState('isCleanMode', () => false);
</script>
