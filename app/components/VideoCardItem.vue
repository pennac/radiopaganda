<template>
  <article 
    ref="cardRef"
    class="h-[100dvh] w-full snap-start relative overflow-hidden bg-puro-negro group"
  >
    <MobileVideoPlayer 
      :src="article.media.video_url_hls" 
      :poster="article.media.thumbnail"
      :is-playing="isPlaying"
      class="absolute inset-0 z-0"
    />

    <!-- Feed Overlay Content -->
    <div 
      class="absolute inset-0 z-10 flex flex-col justify-end p-4 pb-40 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ease-in-out"
      :class="isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'"
    >
      <div class="max-w-md">
        <div class="mb-2">
          <span class="bg-oxido text-blanco-optico text-xs font-mono px-2 py-1 uppercase tracking-widest">
            {{ article.category }}
          </span>
        </div>
        <h2 class="text-3xl font-brutal text-blanco-optico uppercase leading-none drop-shadow-md mb-2">
          {{ article.content.title }}
        </h2>
        <p class="text-blanco-optico/90 text-sm font-sans mb-3 line-clamp-2">
          {{ article.content.hook }}
        </p>
        <NuxtLink :to="`/operacion-rebelde/${article.slug}`" class="inline-block bg-rojo-sangre hover:bg-puro-negro border border-rojo-sangre transition-colors text-blanco-optico font-mono text-xs px-4 py-2 uppercase tracking-wide">
          Investigar Info
        </NuxtLink>
      </div>
    </div>

    <!-- SEÑAL PURA IMMERSIVE BUTTON -->
    <button 
      @click="toggleImmersive"
      :class="isCleanMode ? 'text-acido border-acido' : 'text-blanco-optico border-gris-industrial'"
      class="absolute bottom-24 left-4 z-50 p-2 font-mono text-xs bg-puro-negro/50 border transition-colors pointer-events-auto"
    >
      {{ isCleanMode ? '[ VOLVER ]' : '[ SEÑAL PURA ]' }}
    </button>

    <!-- MUTE BUTTON -->
    <button 
      @click="isGlobalMuted = !isGlobalMuted" 
      :class="isCleanMode ? 'opacity-30' : 'opacity-100'"
      class="absolute bottom-24 right-4 z-50 p-2 font-mono text-xs text-blanco-optico bg-puro-negro/50 border border-gris-industrial transition-opacity duration-300 pointer-events-auto"
    >
      {{ isGlobalMuted ? '[ AUDIO OFF ]' : '[ AUDIO ON ]' }}
    </button>

    <!-- Failsafe Tap Overlay -->
    <div 
      v-if="isCleanMode" 
      @click="toggleImmersive" 
      class="absolute inset-0 z-40"
    ></div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import type { Article } from '~/composables/useContent';
import { useState } from '#app';

const props = defineProps<{
  article: Article;
}>();

const isCleanMode = useState('isCleanMode', () => false);
const isGlobalMuted = useState('globalMute', () => true);
const cardRef = ref<HTMLElement | null>(null);
const isPlaying = ref(false);

const toggleImmersive = () => {
  if (!isCleanMode.value) {
    isCleanMode.value = true;
    isGlobalMuted.value = false;
  } else {
    isCleanMode.value = false;
  }
};

useIntersectionObserver(
  cardRef,
  ([entry]) => {
    if(entry) {
      isPlaying.value = entry.isIntersecting;
      if (entry.isIntersecting) {
        isCleanMode.value = false;
      }
    }
  },
  {
    threshold: 0.7,
  }
);
</script>
