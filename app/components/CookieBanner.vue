<template>
  <div 
    v-if="hasConsent === null" 
    class="fixed left-0 w-full bg-gris-industrial border-t border-rojo-sangre p-4 z-[60] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 ease-in-out"
    style="bottom: 88px;"
    :class="isCleanMode ? 'translate-y-64 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'"
  >
    <div class="flex-1 md:pr-4">
      <h3 class="font-brutal text-xl text-blanco-optico mb-1">Petición de Rastreo</h3>
      <p class="font-sans text-xs text-blanco-optico/80 leading-relaxed">
        El Comando Central despliega analíticas para medir el espectro. Tu acción dicta nuestro alcance. Lee nuestra <NuxtLink to="/legal/cookies" class="text-rojo-sangre underline uppercase font-mono">Política de Cookies</NuxtLink>.
      </p>
    </div>
    <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest shrinks-0">
      <button @click="decline" class="px-4 py-2 border border-blanco-optico/20 hover:bg-blanco-optico/10 transition-colors">Rechazar</button>
      <button @click="accept" class="px-4 py-2 bg-rojo-sangre text-blanco-optico hover:bg-rojo-sangre/80 transition-colors">Aceptar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useState } from '#app';

// `null` means un-answered
const hasConsent = useLocalStorage<'accepted' | 'declined' | null>('radiopaganda_cookie_consent', null);
const isCleanMode = useState('isCleanMode', () => false);

const accept = () => {
  hasConsent.value = 'accepted';
  // If we wanted to actually update the GA4 consent dynamically
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
  }
};

const decline = () => {
  hasConsent.value = 'declined';
};
</script>
