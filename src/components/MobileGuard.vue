<template>
  <div class="mobile-guard-root">
    <!-- Desktop Notice Overlay (when opened on desktop and simulation mode not active) -->
    <section v-if="isDesktop && !allowDesktopSimulation" class="desktop-barrier" aria-label="Pemberitahuan Khusus Mobile">
      <div class="ambient-glow glow-blue-light"></div>
      <div class="ambient-glow glow-blue-soft"></div>

      <div class="barrier-card">
        <div class="monogram-badge">
          <span>S &amp; A</span>
        </div>

        <div class="phone-illustration">
          <div class="phone-frame-mock">
            <div class="phone-speaker"></div>
            <div class="phone-screen-inner">
              <svg class="phone-heart-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div class="phone-home-bar"></div>
          </div>
        </div>

        <h1 class="barrier-title">Buka Melalui Smartphone</h1>
        <p class="barrier-subtitle">
          Untuk mendapatkan pengalaman visual &amp; audio terbaik, undangan pernikahan <strong class="couple-highlight">Susi &amp; Aris</strong> dirancang khusus untuk dibuka di layar ponsel (mobile).
        </p>

        <!-- Dynamic QR Code to open on mobile directly -->
        <div class="qr-container">
          <canvas ref="qrCanvas" class="qr-canvas"></canvas>
          <p class="qr-label">
            <svg class="camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            Scan dengan kamera HP Anda untuk membuka
          </p>
        </div>

        <div class="barrier-actions">
          <button class="btn-simulate" @click="allowDesktopSimulation = true">
            <span>Lihat Pratinjau Mobile di Layar Ini</span>
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Main Mobile Container (enforces strict mobile aspect ratio & width) -->
    <div
      class="app-container"
      :class="{
        'is-simulation-mode': isDesktop && allowDesktopSimulation,
        'is-native-mobile': !isDesktop
      }"
    >
      <!-- Simulation bar for desktop inspection -->
      <div v-if="isDesktop && allowDesktopSimulation" class="desktop-mock-bar">
        <div class="mock-device-info">
          <span class="notch-pill"></span>
          <span class="mock-text">Mode Pratinjau Mobile</span>
        </div>
        <button class="btn-reset-mock" @click="allowDesktopSimulation = false" title="Kembali ke layar QR">
          Tutup Pratinjau
        </button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import QRCode from 'qrcode'

const isDesktop = ref(false)
const allowDesktopSimulation = ref(false)
const qrCanvas = ref<HTMLCanvasElement | null>(null)

const evaluateDevice = () => {
  if (typeof window === 'undefined') return
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isWide = window.innerWidth > 768
  isDesktop.value = isWide && !isMobileUA

  if (isDesktop.value && !allowDesktopSimulation.value) {
    nextTick(() => {
      renderQr()
    })
  }
}

const renderQr = async () => {
  if (!qrCanvas.value || typeof window === 'undefined') return
  try {
    const currentUrl = window.location.href
    await QRCode.toCanvas(qrCanvas.value, currentUrl, {
      width: 170,
      margin: 1.5,
      color: {
        dark: '#17345c',
        light: '#ffffff'
      }
    })
  } catch (err) {
    console.error('Failed to generate QR Code:', err)
  }
}

onMounted(() => {
  evaluateDevice()
  window.addEventListener('resize', evaluateDevice)
})

onUnmounted(() => {
  window.removeEventListener('resize', evaluateDevice)
})
</script>

<style scoped>
.mobile-guard-root {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #edf6fd;
}

/* Desktop Barrier Overlay */
.desktop-barrier {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: linear-gradient(180deg, #c4e2f8 0%, #e2f1fc 50%, #edf6fd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
}

.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.5;
}

.glow-blue-light {
  top: 10%;
  left: 20%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #ffffff 0%, transparent 70%);
}

.glow-blue-soft {
  bottom: 10%;
  right: 20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #6a9ce4 0%, transparent 70%);
}

.barrier-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.94);
  border: 1.5px solid rgba(106, 156, 228, 0.45);
  box-shadow: 0 24px 60px rgba(49, 133, 242, 0.16), 0 4px 16px rgba(106, 156, 228, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 40px 32px;
  text-align: center;
  color: #17345c;
  z-index: 10;
  animation: barrierPop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes barrierPop {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.monogram-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1.5px solid #6a9ce4;
  background: rgba(196, 226, 248, 0.45);
  color: #17345c;
  font-family: 'Cinzel', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
  box-shadow: 0 4px 14px rgba(49, 133, 242, 0.12);
}

.phone-illustration {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.phone-frame-mock {
  width: 60px;
  height: 105px;
  border: 2.5px solid #3185f2;
  border-radius: 14px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0 4px 18px rgba(49, 133, 242, 0.25);
  animation: floatPhone 3s ease-in-out infinite;
}

@keyframes floatPhone {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.phone-speaker {
  width: 16px;
  height: 3px;
  background: #6a9ce4;
  border-radius: 2px;
}

.phone-screen-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
}

.phone-heart-icon {
  width: 24px;
  height: 24px;
  color: #3185f2;
  animation: pulseHeart 1.6s ease-in-out infinite;
}

@keyframes pulseHeart {
  0%, 100% { transform: scale(0.9); opacity: 0.85; }
  50% { transform: scale(1.15); opacity: 1; }
}

.phone-home-bar {
  width: 22px;
  height: 3px;
  background: #5380ae;
  border-radius: 2px;
}

.barrier-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #17345c;
  margin: 0 0 12px;
  letter-spacing: 1px;
}

.barrier-subtitle {
  font-size: 13.5px;
  line-height: 1.6;
  color: #2c4970;
  margin: 0 0 24px;
}

.couple-highlight {
  color: #3185f2;
}

.qr-container {
  background: #ffffff;
  border: 1px solid rgba(106, 156, 228, 0.4);
  border-radius: 20px;
  padding: 16px 16px 12px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(49, 133, 242, 0.12);
  margin-bottom: 24px;
}

.qr-canvas {
  width: 170px !important;
  height: 170px !important;
  border-radius: 8px;
}

.qr-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #17345c;
  font-weight: 600;
  margin: 8px 0 0;
}

.camera-icon {
  width: 14px;
  height: 14px;
  color: #3185f2;
}

.barrier-actions {
  display: flex;
  justify-content: center;
}

.btn-simulate {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: #3185f2;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(49, 133, 242, 0.35);
  transition: all 0.2s ease;
}

.btn-simulate:hover {
  background: #2573d8;
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(49, 133, 242, 0.45);
}

.arrow-icon {
  width: 14px;
  height: 14px;
}

/* App Container (Strict Mobile Viewport) */
.app-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  background: #edf6fd;
  box-shadow: 0 0 50px rgba(49, 133, 242, 0.18);
}

/* Desktop Simulation Mode Styling */
.is-simulation-mode {
  margin: 20px auto;
  border-radius: 36px;
  border: 4px solid #6a9ce4;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(49, 133, 242, 0.25);
  min-height: calc(100vh - 40px);
}

.desktop-mock-bar {
  background: #ffffff;
  border-bottom: 1px solid rgba(106, 156, 228, 0.3);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;
  color: #5380ae;
}

.mock-device-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notch-pill {
  width: 32px;
  height: 5px;
  background: #6a9ce4;
  border-radius: 3px;
}

.btn-reset-mock {
  background: #f0f7fe;
  border: 1px solid #6a9ce4;
  color: #17345c;
  font-size: 10.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  cursor: pointer;
}

.btn-reset-mock:hover {
  background: #3185f2;
  border-color: #3185f2;
  color: #ffffff;
}
</style>
