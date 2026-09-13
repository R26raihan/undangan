<template>
  <aside class="floating-music" aria-label="Pemutar Musik Undangan">
    <button
      class="music-btn"
      :class="{ 'is-playing': isPlaying }"
      @click="toggle"
      :title="isPlaying ? 'Jeda Musik' : 'Putar Musik'"
      :aria-label="isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'"
    >
      <div class="vinyl-disc">
        <div class="vinyl-grooves"></div>
        <div class="vinyl-center">
          <span class="center-dot"></span>
        </div>
      </div>

      <div class="music-icon-wrapper">
        <!-- Equalizer waves if playing, or play icon if paused -->
        <div v-if="isPlaying" class="sound-wave">
          <span class="bar bar-1"></span>
          <span class="bar bar-2"></span>
          <span class="bar bar-3"></span>
          <span class="bar bar-4"></span>
        </div>
        <svg v-else class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6 3 20 12 6 21 6 3"></polygon>
        </svg>
      </div>

      <!-- Floating Notes Animation when playing -->
      <div v-if="isPlaying" class="floating-notes" aria-hidden="true">
        <span class="note note-1">♪</span>
        <span class="note note-2">♫</span>
      </div>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { useAudio } from '../composables/useAudio'

const { isPlaying, toggle } = useAudio()
</script>

<style scoped>
.floating-music {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

.music-btn {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid rgba(212, 175, 55, 0.4);
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 12px rgba(212, 175, 55, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  outline: none;
}

.music-btn:hover {
  transform: scale(1.08);
  border-color: rgba(212, 175, 55, 0.8);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4), 0 0 18px rgba(212, 175, 55, 0.35);
}

.music-btn:active {
  transform: scale(0.96);
}

.vinyl-disc {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #333 0%, #1a1a1a 70%, #111 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: transform 0.5s ease;
}

.is-playing .vinyl-disc {
  animation: spinVinyl 4s linear infinite;
}

.vinyl-grooves {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 0.5);
}

.vinyl-center {
  position: absolute;
  inset: 13px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #997926);
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1a1a1a;
}

.music-icon-wrapper {
  position: relative;
  z-index: 2;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 18px;
  height: 18px;
  color: #fff;
  margin-left: 2px;
}

.sound-wave {
  display: flex;
  align-items: flex-end;
  gap: 2.5px;
  height: 16px;
}

.sound-wave .bar {
  width: 3px;
  background: #ffffff;
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite;
}

.bar-1 { height: 6px; animation-delay: 0.1s; }
.bar-2 { height: 14px; animation-delay: 0.3s; }
.bar-3 { height: 10px; animation-delay: 0.15s; }
.bar-4 { height: 12px; animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% {
    height: 4px;
  }
  50% {
    height: 16px;
  }
}

@keyframes spinVinyl {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.floating-notes {
  position: absolute;
  top: -6px;
  right: -6px;
  pointer-events: none;
}

.note {
  position: absolute;
  color: #d4af37;
  font-size: 14px;
  font-weight: bold;
  opacity: 0;
}

.note-1 {
  animation: floatNote 2.4s ease-in-out infinite;
}

.note-2 {
  animation: floatNote 2.4s ease-in-out infinite;
  animation-delay: 1.2s;
  right: -8px;
}

@keyframes floatNote {
  0% {
    transform: translate(0, 0) scale(0.6);
    opacity: 0;
  }
  30% {
    opacity: 0.9;
  }
  100% {
    transform: translate(14px, -24px) scale(1.1);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .floating-music {
    bottom: 20px;
    right: 18px;
  }

  .music-btn {
    width: 48px;
    height: 48px;
  }
}
</style>
