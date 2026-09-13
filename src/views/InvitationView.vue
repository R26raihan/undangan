<template>
  <main class="invitation-page">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <div class="nav-container">
        <button
          class="nav-btn btn-back"
          @click="goBack"
          aria-label="Kembali ke halaman awal"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span class="btn-text">Sampul</span>
        </button>

        <div class="wedding-brand">
          <span class="brand-title">SUSI &amp; ARIS</span>
          <span class="brand-sub">The Wedding Invitation</span>
        </div>

        <div class="nav-actions">
          <button
            class="nav-btn btn-share"
            @click="copyLink"
            title="Salin Tautan Undangan"
            aria-label="Salin Tautan Undangan"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span class="btn-text">Salin</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Notification Toast -->
    <transition name="toast-fade">
      <div v-if="toastMessage" class="toast-bubble" role="status">
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Invitation Visual Presentation -->
    <section class="canva-stage" aria-label="Desain Undangan Pernikahan">
      <div v-if="isLoading" class="loader-overlay" aria-live="polite">
        <div class="loader-spinner"></div>
        <p class="loader-text">Memuat Undangan Susi &amp; Aris...</p>
      </div>

      <div class="canva-wrapper">
        <iframe
          ref="canvaIframe"
          :src="canvaEmbedUrl"
          loading="lazy"
          allowfullscreen
          allow="fullscreen"
          title="Susi &amp; Aris Wedding Invitation"
          @load="onIframeLoaded"
        ></iframe>
      </div>
    </section>

    <!-- Save The Date & Wedding Gift Section -->
    <GiftAndDateSection @copied="showToast" />

    <!-- RSVP & Buku Tamu & Wedding Wishes -->
    <RsvpSection />

    <!-- Thank You Section -->
    <footer class="thank-you-footer">
      <div class="thank-you-box">
        <h3 class="thank-you-title">Thank You</h3>
        <p class="thank-you-names">Susi &amp; Aris</p>
        <p class="thank-you-note">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>
        <p class="copyright">THE WEDDING OF SUSI &amp; ARIS</p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GiftAndDateSection from '../components/GiftAndDateSection.vue'
import RsvpSection from '../components/RsvpSection.vue'

const router = useRouter()
const route = useRoute()

const canvaEmbedUrl = 'https://www.canva.com/design/DAHVCsgsHkM/Hl20CibB1IyQXbp0ZgOhCg/view?embed'

const isLoading = ref(true)
const toastMessage = ref('')

const onIframeLoaded = () => {
  isLoading.value = false
}

const goBack = () => {
  router.push({
    path: '/',
    query: route.query
  })
}

const copyLink = async () => {
  try {
    const fullUrl = window.location.href
    await navigator.clipboard.writeText(fullUrl)
    showToast('Tautan undangan berhasil disalin!')
  } catch (err) {
    showToast('Gagal menyalin tautan.')
  }
}

const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 2800)
}
</script>

<style scoped>
.invitation-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-page);
  color: var(--color-text-navy);
  padding-bottom: 50px;
}

/* Header */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(106, 156, 228, 0.3);
  box-shadow: 0 2px 10px rgba(49, 133, 242, 0.06);
  padding: 10px 16px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.wedding-brand {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--color-text-navy);
}

.brand-sub {
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid var(--color-blue-soft);
  background: #f0f7fe;
  color: var(--color-text-navy);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: var(--color-blue-primary);
  border-color: var(--color-blue-primary);
  color: #ffffff;
  box-shadow: 0 3px 10px rgba(49, 133, 242, 0.25);
}

.nav-icon {
  width: 15px;
  height: 15px;
}

/* Toast */
.toast-bubble {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border: 1.5px solid var(--color-blue-primary);
  color: var(--color-text-navy);
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(49, 133, 242, 0.2);
  z-index: 99999;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--color-blue-primary);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}

/* Stage */
.canva-stage {
  position: relative;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px 24px;
}

.loader-overlay {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 5;
}

.loader-spinner {
  width: 38px;
  height: 38px;
  border: 3px solid rgba(106, 156, 228, 0.25);
  border-top-color: var(--color-blue-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader-text {
  font-size: 13px;
  color: var(--color-text-muted);
  font-style: italic;
  margin: 0;
}

.canva-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 607.2474%;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(49, 133, 242, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(106, 156, 228, 0.35);
}

.canva-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  margin: 0;
  display: block;
}

/* Thank you footer */
.thank-you-footer {
  padding: 30px 16px 20px;
  text-align: center;
  margin-top: 16px;
}

.thank-you-box {
  max-width: 440px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 28px 20px 20px;
  border: 1px solid rgba(196, 226, 248, 0.7);
  box-shadow: 0 6px 20px rgba(83, 128, 174, 0.08);
}

.thank-you-title {
  font-family: 'Cormorant Garamond', 'Playfair Display', cursive, serif;
  font-size: 42px;
  font-weight: 500;
  font-style: italic;
  color: var(--color-text-navy);
  margin: 0 0 6px;
}

.thank-you-names {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-blue-primary);
  letter-spacing: 2px;
  margin: 0 0 14px;
}

.thank-you-note {
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin: 0 0 18px;
}

.copyright {
  font-size: 10.5px;
  color: #8ea8c7;
  letter-spacing: 1.5px;
  margin: 0;
  font-weight: 600;
}

@media (max-width: 640px) {
  .btn-text {
    display: none;
  }

  .nav-btn {
    padding: 7px 10px;
  }

  .brand-title {
    font-size: 13px;
  }

  .canva-stage {
    padding: 8px 6px 20px;
  }

  .canva-wrapper {
    border-radius: 12px;
  }
}
</style>
