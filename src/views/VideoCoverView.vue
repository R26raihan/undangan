<template>
  <main class="video-cover">
    <video
      class="cover-video"
      :poster="posterImg"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    >
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <div class="video-overlay" aria-hidden="true"></div>

    <div class="cover-content">
      <div class="guest-chip">
        <p class="guest-salutation">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
        <p class="guest-name">{{ guestName }}</p>
      </div>

      <button
        class="btn-open-invitation"
        @click="openInvitation"
        id="btn-buka-undangan"
      >
        <span class="btn-shine"></span>
        <svg class="envelope-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <span class="btn-label">Buka Undangan</span>
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAudio } from '../composables/useAudio'
import videoSrc from '../assets/video-cover.mp4'
import posterImg from '../assets/video-cover-poster.jpg'

const router = useRouter()
const route = useRoute()
const { play } = useAudio()

const guestName = computed(() => {
  const queryVal = route.query.to || route.query.u || route.query.guest || route.query.nama
  if (typeof queryVal === 'string' && queryVal.trim().length > 0) {
    return queryVal.trim()
  }
  return 'Tamu Undangan'
})

const openInvitation = async () => {
  await play()
  router.push({
    path: '/opening',
    query: route.query
  })
}
</script>

<style scoped>
.video-cover {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #000000;
}

.cover-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.6) 100%);
  z-index: 1;
  pointer-events: none;
}

.cover-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 24px 20px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.guest-chip {
  width: 100%;
  max-width: 320px;
  text-align: center;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 18px;
  padding: 14px 18px;
}

.guest-salutation {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 4px;
  font-weight: 500;
  letter-spacing: 0.4px;
}

.guest-name {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.4px;
}

.btn-open-invitation {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 280px;
  padding: 15px 28px;
  background: linear-gradient(135deg, var(--color-blue-primary) 0%, #1e6acc 100%);
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-family: var(--font-sans);
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(49, 133, 242, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.btn-open-invitation:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #3d92fc 0%, #2275dc 100%);
  box-shadow: 0 14px 32px rgba(49, 133, 242, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.btn-open-invitation:active {
  transform: translateY(1px);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transform: skewX(-25deg);
  animation: shineLoop 4s infinite;
}

@keyframes shineLoop {
  0%, 60% { left: -100%; }
  100% { left: 200%; }
}

.envelope-icon {
  width: 18px;
  height: 18px;
  color: #ffffff;
}

.btn-label {
  position: relative;
  z-index: 1;
}
</style>
