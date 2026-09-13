<template>
  <main class="opening-transition">
    <video
      class="transition-video"
      :poster="posterImg"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="goToInvitation"
      @error="goToInvitation"
    >
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <button class="btn-skip" @click="goToInvitation">Lewati</button>
  </main>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import videoSrc from '../assets/opening-transition.mp4'
import posterImg from '../assets/opening-transition-poster.jpg'

const router = useRouter()
const route = useRoute()

let hasNavigated = false

const goToInvitation = () => {
  if (hasNavigated) return
  hasNavigated = true
  router.replace({
    path: '/invitation',
    query: route.query
  })
}
</script>

<style scoped>
.opening-transition {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: #000000;
}

.transition-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-skip {
  position: absolute;
  bottom: 28px;
  right: 20px;
  z-index: 2;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  color: #ffffff;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
</style>
