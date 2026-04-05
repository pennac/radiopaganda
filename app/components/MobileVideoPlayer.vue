<template>
  <div class="relative w-full h-full bg-black">
    <video
      ref="videoRef"
      class="w-full h-full object-cover"
      playsinline
      loop
      :muted="isGlobalMuted"
      @click="togglePlay"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Hls from 'hls.js';
import { useState } from '#app';

const props = defineProps<{
  src: string;
  poster: string;
  isPlaying: boolean;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const isGlobalMuted = useState('globalMute', () => true);
let hlsInstance: Hls | null = null;

const initHls = () => {
  if (!videoRef.value || !props.src) return;

  if (Hls.isSupported()) {
    hlsInstance = new Hls({ startPosition: -1 });
    hlsInstance.loadSource(props.src);
    hlsInstance.attachMedia(videoRef.value);
    
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      if (props.isPlaying) {
        attemptPlay();
      }
    });
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoRef.value.src = props.src;
    videoRef.value.addEventListener('loadedmetadata', () => {
      if (props.isPlaying) {
        attemptPlay();
      }
    });
  }
};

const attemptPlay = async () => {
  if (videoRef.value) {
    try {
      await videoRef.value.play();
    } catch (e) {
      console.warn("Auto-play prevented", e);
    }
  }
};

const attemptPause = () => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
};

const togglePlay = () => {
  if (videoRef.value) {
    if (videoRef.value.paused) {
      attemptPlay();
    } else {
      attemptPause();
    }
  }
};

watch(() => props.isPlaying, (newVal) => {
  if (newVal) {
    attemptPlay();
  } else {
    attemptPause();
  }
});

watch(isGlobalMuted, (newVal) => {
  if (videoRef.value) {
    videoRef.value.muted = newVal;
    if (!newVal && !videoRef.value.paused) {
      // Just in case unmuting requires play trigger
      attemptPlay();
    }
  }
});

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.poster = props.poster;
  }
  initHls();
});

onBeforeUnmount(() => {
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }
});
</script>
