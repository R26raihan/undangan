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

          <a
            :href="canvaDirectUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-btn btn-external"
            title="Buka Langsung di Canva"
            aria-label="Buka Langsung di Canva"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span class="btn-text">Canva</span>
          </a>
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

    <!-- Canva Presentation Viewport -->
    <section class="canva-stage" aria-label="Desain Undangan Canva">
      <!-- Loading skeleton -->
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
          title="Susi &amp; Aris Wedding Invitation Canva Embed"
          @load="onIframeLoaded"
        ></iframe>
      </div>
    </section>

    <!-- Footer Fallback Link -->
    <footer class="bottom-footer">
      <a
        :href="canvaDirectUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="fallback-link"
      >
        <span>Buka presentasi lengkap di Canva</span>
        <svg class="arrow-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
      <p class="copyright">© SUSI &amp; ARIS WEDDING</p>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const canvaEmbedUrl = 'https://www.canva.com/design/DAHVCsgsHkM/Hl20CibB1IyQXbp0ZgOhCg/view?embed'
const canvaDirectUrl = 'https://www.canva.com/design/DAHVCsgsHkM/Hl20CibB1IyQXbp0ZgOhCg/view?utm_content=DAHVCsgsHkM&utm_campaign=designshare&utm_medium=embeds&utm_source=link'

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
  background: #0f172a;
  color: #f8fafc;
}

/* Header */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 190, 117, 0.2);
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
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #f7e7c4;
}

.brand-sub {
  font-size: 10px;
  letter-spacing: 1px;
  color: #94a3b8;
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
  padding: 7px 12px;
  border-radius: 20px;
  border: 1px solid rgba(226, 190, 117, 0.3);
  background: rgba(30, 41, 59, 0.7);
  color: #f1f5f9;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(226, 190, 117, 0.15);
  border-color: rgba(226, 190, 117, 0.6);
  color: #f7e7c4;
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
  background: rgba(22, 30, 44, 0.95);
  border: 1px solid #d4af37;
  color: #fef08a;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #4ade80;
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

/* Canva Stage */
.canva-stage {
  position: relative;
  flex: 1;
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
  border: 3px solid rgba(212, 175, 55, 0.2);
  border-top-color: #d4af37;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader-text {
  font-size: 13px;
  color: #cbd5e1;
  font-style: italic;
  margin: 0;
}

.canva-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  /* Original aspect ratio padding from canva export */
  padding-top: 607.2474%;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  background: #ffffff;
  border: 1px solid rgba(226, 190, 117, 0.2);
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

/* Bottom Footer */
.bottom-footer {
  padding: 24px 16px 40px;
  text-align: center;
  background: #090e17;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.fallback-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 20px;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #f7e7c4;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.fallback-link:hover {
  background: rgba(212, 175, 55, 0.2);
  border-color: rgba(212, 175, 55, 0.6);
  transform: translateY(-1px);
}

.arrow-ext {
  width: 15px;
  height: 15px;
}

.copyright {
  font-size: 11px;
  color: #64748b;
  letter-spacing: 1.5px;
  margin: 16px 0 0;
}

@media (max-width: 640px) {
  .btn-text {
    display: none;
  }

  .nav-btn {
    padding: 7px 9px;
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
