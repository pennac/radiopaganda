<template>
  <div class="h-[100dvh] w-full overflow-y-scroll pb-24 pt-10 px-6 prose prose-invert mx-auto font-sans text-blanco-optico/80 selection:bg-rojo-sangre selection:text-blanco-optico">
    <LazySplashIntro v-if="false" /> <!-- Don't show splash intro on legal pages -->
    
    <button @click="$router.back()" class="font-mono text-rojo-sangre uppercase tracking-widest text-xs mb-8 flex items-center gap-2 hover:text-blanco-optico transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      RETORNAR A LA RED
    </button>
    
    <h1 class="font-brutal text-4xl md:text-6xl text-blanco-optico mb-8 uppercase tracking-tighter">Política de Cookies</h1>
    
    <div class="space-y-6">
      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">1. Información sobre Cookies</h2>
        <p>En cumplimiento con lo establecido en el artículo 22.2 de la Ley de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI) y en adecuación con la Directiva Europea 2009/136/CE, el Comando Central informa que utilizamos cookies propias y de terceros.</p>
      </section>

      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">2. Tipos y Finalidad</h2>
        <p>El espectro técnico de RADIOPAGANDA despliega exclusivamente "Cookies Analíticas" mediante Google Analytics 4 bajo Consent Mode v2, destinadas a la medición del comportamiento de los Operadores para adaptar los paquetes de datos y priorizar la transmisión.</p>
      </section>

      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">3. Revocación y Eliminación</h2>
        <p>Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador o dispositivo emisor, desvaneciendo así su rastro de nuestra base operativa.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#app';

useSeoMeta({
  title: 'Política de Cookies',
  description: 'Gestión y política de cookies del sistema RADIOPAGANDA.',
});
</script>
