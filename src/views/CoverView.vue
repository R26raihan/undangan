<template>
  <main class="cover-wrapper">
    <!-- Ambient Sky & Cloud Highlights -->
    <div class="sky-clouds cloud-1"></div>
    <div class="sky-clouds cloud-2"></div>

    <!-- Floating Blue Sakura Petals -->
    <div class="petals-container" aria-hidden="true">
      <span v-for="n in 14" :key="n" :class="`petal petal-${n}`"></span>
    </div>

    <!-- Central Hero Cover Card -->
    <div class="cover-card">
      <!-- Decorative Header -->
      <header class="wedding-header">
        <div class="ornament-top">
          <svg class="floral-svg" viewBox="0 0 140 28" fill="none">
            <path d="M70 4C55 4 45 18 15 18M70 4C85 4 95 18 125 18" stroke="#6a9ce4" stroke-width="1.4" stroke-linecap="round"/>
            <circle cx="70" cy="4" r="3.5" fill="#3185f2"/>
            <circle cx="60" cy="8" r="2" fill="#6a9ce4"/>
            <circle cx="80" cy="8" r="2" fill="#6a9ce4"/>
            <circle cx="50" cy="12" r="1.5" fill="#c4e2f8"/>
            <circle cx="90" cy="12" r="1.5" fill="#c4e2f8"/>
          </svg>
        </div>

        <div class="wedding-monogram">
          <div class="monogram-ring">
            <span class="monogram-text">S &amp; A</span>
          </div>
        </div>

        <p class="subtitle-tag">THE WEDDING INVITATION</p>
      </header>

      <!-- Couple Names -->
      <section class="couple-section">
        <h1 class="bride-groom">
          <span class="name">Susi</span>
          <span class="ampersand">&amp;</span>
          <span class="name">Aris</span>
        </h1>
        <div class="divider-line">
          <span class="diamond"></span>
        </div>
      </section>

      <!-- Guest Personalization Box -->
      <section class="guest-card" aria-label="Informasi Tamu Undangan">
        <p class="guest-salutation">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
        <h2 class="guest-name">{{ guestName }}</h2>
        <p class="guest-note">
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk merayakan momen bahagia kami.
        </p>
      </section>

      <!-- Open Invitation Action -->
      <footer class="action-footer">
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

        <p class="audio-hint">
          <svg class="note-mini-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          Putar lagu otomatis saat dibuka
        </p>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAudio } from '../composables/useAudio'

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
    path: '/invitation',
    query: route.query
  })
}
</script>

<style scoped>
.cover-wrapper {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: linear-gradient(180deg, #c4e2f8 0%, #daf0fe 35%, #edf6fd 70%, #f6faff 100%);
  color: var(--color-text-navy);
  overflow: hidden;
}

/* Sky clouds ambient effect */
.sky-clouds {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.6;
}

.cloud-1 {
  top: -10%;
  left: 10%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0) 70%);
}

.cloud-2 {
  bottom: -5%;
  right: 10%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, var(--color-blue-light) 0%, rgba(196, 226, 248, 0) 70%);
}

/* Floating Blue Sakura Petals */
.petals-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.petal {
  position: absolute;
  background: radial-gradient(ellipse at center, var(--color-blue-soft) 0%, var(--color-blue-light) 60%, rgba(255, 255, 255, 0.4) 100%);
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  opacity: 0.55;
  animation: fallPetal 12s linear infinite;
}

.petal-1 { width: 14px; height: 18px; left: 8%; animation-duration: 11s; animation-delay: 0s; }
.petal-2 { width: 10px; height: 14px; left: 24%; animation-duration: 14s; animation-delay: 2s; }
.petal-3 { width: 16px; height: 20px; left: 45%; animation-duration: 10s; animation-delay: 4s; }
.petal-4 { width: 12px; height: 15px; left: 68%; animation-duration: 13s; animation-delay: 1.5s; }
.petal-5 { width: 15px; height: 18px; left: 85%; animation-duration: 12s; animation-delay: 3s; }
.petal-6 { width: 11px; height: 13px; left: 16%; animation-duration: 15s; animation-delay: 5s; }
.petal-7 { width: 13px; height: 16px; left: 35%; animation-duration: 11s; animation-delay: 7s; }
.petal-8 { width: 14px; height: 17px; left: 55%; animation-duration: 13s; animation-delay: 6s; }
.petal-9 { width: 10px; height: 12px; left: 75%; animation-duration: 16s; animation-delay: 4.5s; }
.petal-10 { width: 12px; height: 15px; left: 92%; animation-duration: 12s; animation-delay: 8s; }
.petal-11 { width: 15px; height: 19px; left: 3%; animation-duration: 14s; animation-delay: 9s; }
.petal-12 { width: 11px; height: 14px; left: 50%; animation-duration: 10s; animation-delay: 10s; }
.petal-13 { width: 13px; height: 16px; left: 62%; animation-duration: 15s; animation-delay: 3.5s; }
.petal-14 { width: 14px; height: 18px; left: 30%; animation-duration: 12s; animation-delay: 7.5s; }

@keyframes fallPetal {
  0% {
    top: -10%;
    transform: translateX(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  15% {
    opacity: 0.75;
  }
  85% {
    opacity: 0.75;
  }
  100% {
    top: 110%;
    transform: translateX(45px) rotate(360deg) scale(1.1);
    opacity: 0;
  }
}

/* Central Card */
.cover-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.92);
  border: 1.5px solid rgba(106, 156, 228, 0.4);
  box-shadow: 0 20px 50px rgba(49, 133, 242, 0.15), 0 4px 16px rgba(106, 156, 228, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 28px;
  padding: 42px 30px 36px;
  text-align: center;
  z-index: 10;
  animation: cardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.floral-svg {
  width: 120px;
  height: 26px;
  margin: 0 auto 16px;
}

.wedding-monogram {
  margin-bottom: 14px;
}

.monogram-ring {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  border: 1.5px solid #6a9ce4;
  background: radial-gradient(circle, rgba(196, 226, 248, 0.45) 0%, rgba(255, 255, 255, 0.9) 80%);
  box-shadow: 0 4px 16px rgba(49, 133, 242, 0.16);
}

.monogram-text {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 700;
  color: var(--color-text-navy);
  letter-spacing: 2px;
}

.subtitle-tag {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 18px;
  font-weight: 700;
}

/* Couple Typography */
.couple-section {
  margin-bottom: 26px;
}

.bride-groom {
  font-family: var(--font-serif);
  font-size: 42px;
  font-weight: 600;
  line-height: 1.15;
  margin: 0;
  color: var(--color-text-navy);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  letter-spacing: 1px;
}

.bride-groom .name {
  color: var(--color-text-navy);
  letter-spacing: 1px;
}

.bride-groom .ampersand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: 32px;
  color: var(--color-blue-primary);
  margin: 2px 0;
}

.divider-line {
  position: relative;
  width: 140px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #6a9ce4, transparent);
  margin: 18px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.diamond {
  width: 6px;
  height: 6px;
  background: var(--color-blue-primary);
  box-shadow: 0 0 6px rgba(49, 133, 242, 0.4);
  transform: rotate(45deg);
}

/* Guest Card */
.guest-card {
  background: linear-gradient(135deg, #f0f7fe 0%, #e5f1fb 100%);
  border: 1px solid rgba(106, 156, 228, 0.45);
  border-radius: 18px;
  padding: 20px 20px 18px;
  margin-bottom: 26px;
  box-shadow: 0 4px 14px rgba(49, 133, 242, 0.06);
}

.guest-salutation {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0 0 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.guest-name {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-navy);
  margin: 0 0 10px;
  letter-spacing: 0.5px;
}

.guest-note {
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-body);
  margin: 0;
}

/* Action Button */
.action-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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

.audio-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
  font-weight: 500;
}

.note-mini-icon {
  width: 13px;
  height: 13px;
  color: var(--color-blue-primary);
}

@media (max-width: 480px) {
  .cover-card {
    padding: 36px 20px 28px;
    border-radius: 22px;
  }

  .bride-groom {
    font-size: 36px;
  }

  .guest-name {
    font-size: 18px;
  }

  .btn-open-invitation {
    padding: 13px 24px;
    font-size: 14px;
  }
}
</style>
