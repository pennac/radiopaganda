<template>
  <div class="min-h-screen bg-puro-negro text-blanco-optico relative">
    <!-- Splash Screen -->
    <SplashIntro />

    <!-- Overlays: Glitch & Grain -->
    <div class="glitch-lines"></div>
    <div class="heavy-grain"></div>

    <!-- Main Content Slot -->
    <main class="relative z-10 pb-16">
      <slot />
    </main>

    <!-- Cookie Banner -->
    <CookieBanner />

    <!-- Bottom Navigation -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
// Ruido Negro Layout
</script>
