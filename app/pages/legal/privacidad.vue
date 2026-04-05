<template>
  <div class="h-[100dvh] w-full overflow-y-scroll pb-24 pt-10 px-6 prose prose-invert mx-auto font-sans text-blanco-optico/80 selection:bg-rojo-sangre selection:text-blanco-optico">
    <LazySplashIntro v-if="false" /> <!-- Don't show splash intro on legal pages -->
    
    <button @click="$router.back()" class="font-mono text-rojo-sangre uppercase tracking-widest text-xs mb-8 flex items-center gap-2 hover:text-blanco-optico transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      RETORNAR A LA RED
    </button>
    
    <h1 class="font-brutal text-4xl md:text-6xl text-blanco-optico mb-8 uppercase tracking-tighter">Política de Privacidad</h1>
    
    <div class="space-y-6">
      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">1. Recopilación de Datos (RGPD y LOPDGDD)</h2>
        <p>En cumplimiento con la normativa vigente en Protección de Datos de Carácter Personal, le informamos que RADIOPAGANDA gestiona la recopilación mínima de datos de la sesión bajo la modalidad de Consent Mode v2. Si lo rechazas, no dejaremos rastros técnicos en la red.</p>
      </section>

      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">2. Uso de la Información</h2>
        <p>La información recopilada mediante Google Analytics 4 se utiliza exclusivamente con finalidades analíticas para mejorar nuestra transmisión y analizar el comportamiento general de la señal, no elaborando perfiles individualmente identificables.</p>
      </section>

      <section>
        <h2 class="font-mono text-xl text-oxido mb-2 uppercase">3. Derechos del Operador</h2>
        <p>Tienes derecho a desaparecer. El usuario podrá ejercer sus derechos de acceso, rectificación, limitación de tratamiento, supresión, portabilidad u oposición, solicitándolo al Comando Central mediante una interrupción voluntaria de su conexión.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#app';

useSeoMeta({
  title: 'Política de Privacidad',
  description: 'Política de Privacidad y gestión de datos de RADIOPAGANDA.',
});
</script>
