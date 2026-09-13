<template>
  <main class="cover-wrapper">
    <!-- Ambient Background Effects -->
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>
    <div class="ambient-stars">
      <span v-for="n in 12" :key="n" :class="`star star-${n}`"></span>
    </div>

    <div class="cover-card">
      <!-- Decorative Frame Header -->
      <header class="wedding-header">
        <div class="ornament-top">
          <svg class="floral-svg" viewBox="0 0 120 28" fill="none">
            <path d="M60 4C45 4 35 18 10 18M60 4C75 4 85 18 110 18" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <circle cx="60" cy="4" r="3" fill="currentColor"/>
            <circle cx="50" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="70" cy="8" r="1.5" fill="currentColor"/>
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
          Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk merayakan hari istimewa kami.
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
  // Start music on user interaction
  await play()

  // Navigate to invitation view with preserved query parameters
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
  background: radial-gradient(circle at center, #1c2638 0%, #0d141e 100%);
  color: #f5f5f7;
  overflow: hidden;
}

/* Ambient glow blobs */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.35;
}

.glow-1 {
  top: -10%;
  left: 20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #e2be75 0%, rgba(226, 190, 117, 0) 70%);
}

.glow-2 {
  bottom: -10%;
  right: 15%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #83673b 0%, rgba(131, 103, 59, 0) 70%);
}

/* Subtle twinkling stars */
.ambient-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #f7e7c4;
  border-radius: 50%;
  opacity: 0.4;
  animation: pulseStar 3s ease-in-out infinite;
}

.star-1 { top: 12%; left: 15%; animation-delay: 0.2s; }
.star-2 { top: 25%; left: 80%; animation-delay: 0.8s; }
.star-3 { top: 40%; left: 10%; animation-delay: 1.4s; }
.star-4 { top: 75%; left: 22%; animation-delay: 0.5s; }
.star-5 { top: 85%; left: 78%; animation-delay: 1.1s; }
.star-6 { top: 60%; left: 88%; animation-delay: 1.9s; }
.star-7 { top: 18%; left: 45%; animation-delay: 0.4s; }
.star-8 { top: 88%; left: 50%; animation-delay: 1.7s; }
.star-9 { top: 32%; left: 92%; animation-delay: 2.1s; }
.star-10 { top: 68%; left: 8%; animation-delay: 1.3s; }
.star-11 { top: 5%; left: 70%; animation-delay: 0.9s; }
.star-12 { top: 52%; left: 3%; animation-delay: 2.5s; }

@keyframes pulseStar {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.85; transform: scale(1.4); }
}

/* Central Card */
.cover-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: rgba(22, 30, 44, 0.72);
  border: 1px solid rgba(226, 190, 117, 0.25);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(226, 190, 117, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 44px 32px 38px;
  text-align: center;
  z-index: 10;
  animation: cardFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.floral-svg {
  width: 110px;
  height: 26px;
  color: #e2be75;
  margin: 0 auto 16px;
}

.wedding-monogram {
  margin-bottom: 14px;
}

.monogram-ring {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1.5px solid rgba(226, 190, 117, 0.45);
  background: radial-gradient(circle, rgba(226, 190, 117, 0.12) 0%, transparent 80%);
  box-shadow: 0 0 16px rgba(226, 190, 117, 0.2);
}

.monogram-text {
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-size: 19px;
  font-weight: 500;
  color: #f7e7c4;
  letter-spacing: 2px;
}

.subtitle-tag {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 11.5px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #d1b479;
  margin: 0 0 20px;
  font-weight: 600;
}

/* Couple Typography */
.couple-section {
  margin-bottom: 28px;
}

.bride-groom {
  font-family: 'Cinzel', 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  font-size: 42px;
  font-weight: 400;
  line-height: 1.15;
  margin: 0;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  letter-spacing: 1px;
}

.bride-groom .name {
  background: linear-gradient(135deg, #ffffff 40%, #f1dcab 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bride-groom .ampersand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: 30px;
  color: #e2be75;
  -webkit-text-fill-color: #e2be75;
  margin: 2px 0;
}

.divider-line {
  position: relative;
  width: 140px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(226, 190, 117, 0.6), transparent);
  margin: 18px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.diamond {
  width: 6px;
  height: 6px;
  background: #e2be75;
  transform: rotate(45deg);
}

/* Guest Card */
.guest-card {
  background: rgba(13, 20, 30, 0.65);
  border: 1px solid rgba(226, 190, 117, 0.2);
  border-radius: 18px;
  padding: 20px 20px 18px;
  margin-bottom: 28px;
}

.guest-salutation {
  font-size: 12px;
  color: #a0aec0;
  margin: 0 0 8px;
  letter-spacing: 0.5px;
}

.guest-name {
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  color: #f7e7c4;
  margin: 0 0 10px;
  letter-spacing: 0.5px;
}

.guest-note {
  font-size: 12px;
  line-height: 1.6;
  color: #cbd5e1;
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
  background: linear-gradient(135deg, #d4af37 0%, #b38b25 100%);
  color: #1a1a1a;
  border: none;
  border-radius: 30px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(212, 175, 55, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.btn-open-invitation:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(212, 175, 55, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, #dfbc49 0%, #c1962f 100%);
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
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
  color: #1a1a1a;
}

.btn-label {
  position: relative;
  z-index: 1;
}

.audio-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #94a3b8;
  margin: 0;
}

.note-mini-icon {
  width: 13px;
  height: 13px;
  color: #d4af37;
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
