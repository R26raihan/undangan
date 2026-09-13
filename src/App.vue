<template>
  <div id="wedding-app">
    <router-view v-slot="{ Component, route }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>

    <!-- Global Floating Music Controller -->
    <FloatingMusicPlayer />
  </div>
</template>

<script setup lang="ts">
import FloatingMusicPlayer from './components/FloatingMusicPlayer.vue'
</script>

<style>
#wedding-app {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
}

/* Page Transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
