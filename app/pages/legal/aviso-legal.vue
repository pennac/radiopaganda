<template>
  <div class="h-[100dvh] w-full overflow-y-scroll pb-24 pt-10 px-6 prose prose-invert mx-auto font-sans text-blanco-optico/80 selection:bg-rojo-sangre selection:text-blanco-optico">
    <LazySplashIntro v-if="false" /> <!-- Don't show splash intro on legal pages -->
    
    <button @click="$router.back()" class="font-mono text-rojo-sangre uppercase tracking-widest text-xs mb-8 flex items-center gap-2 hover:text-blanco-optico transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      RETORNAR A LA RED
    </button>
    
    <h1 class="font-brutal text-4xl md:text-6xl text-blanco-optico mb-8 uppercase tracking-tighter">Aviso Legal</h1>
    
    <div class="space-y-6">
      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">1. Información General</h2>
        <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que este sitio web (RADIOPAGANDA) es operado por el Comando Central. El acceso a esta transmisión es libre, pero su uso continuado implica la aceptación de las presentes condiciones.</p>
      </section>

      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">2. Propiedad Intelectual</h2>
        <p>Todos los textos, videos, ruidos y manifiestos de RADIOPAGANDA están protegidos bajo estricta licencia. Prohibida la redistribución sin la autorización explícita de los operadores en línea.</p>
      </section>

      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">3. Responsabilidad</h2>
        <p>El Comando Central no se hace responsable por caídas del sistema, distorsión perceptiva o fallos de red derivados de acceder a esta señal en entorno hostil.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#app';

useSeoMeta({
  title: 'Aviso Legal',
  description: 'Aviso Legal y Condiciones de uso de RADIOPAGANDA.',
});
</script>
