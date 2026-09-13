<template>
  <div class="wedding-gift-wrapper">
    <div class="elegant-card gift-card">
      <div class="gift-icon-box">
        <svg class="gift-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76V14h2V8.76L15.38 12 17 10.83 14.92 8H20v6z"/>
        </svg>
      </div>

      <h3 class="card-script-title">Wedding Gift</h3>
      <p class="gift-tagline">
        We are grateful for your presence and prayers. Any gesture of love you wish to share will be received with heartfelt thanks.
      </p>

      <!-- Bank BRI Card -->
      <button class="bank-card bank-card-bri" @click="copyAccount(accountNumber, 'BRI')">
        <span class="card-glow glow-a" aria-hidden="true"></span>
        <span class="card-glow glow-b" aria-hidden="true"></span>

        <div class="card-top">
          <span class="card-logo-chip">
            <img :src="logoBri" alt="BRI" class="card-logo" />
          </span>
          <span class="card-tag">Rekening Bank</span>
        </div>

        <div class="card-chip-row">
          <span class="card-chip"></span>
          <svg class="card-contactless" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01m-7.08-7.071a10 10 0 0 1 14.142 0M2.929 8.929a15 15 0 0 1 21.213 0" />
          </svg>
        </div>

        <div class="card-number">{{ formattedAccountNumber }}</div>

        <div class="card-footer">
          <div class="card-owner-block">
            <span class="card-footer-label">Pemilik Rekening</span>
            <span class="card-footer-value">A.N Susilawati</span>
          </div>
          <span class="card-copy-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Salin
          </span>
        </div>
      </button>

      <!-- DANA Card -->
      <button class="bank-card bank-card-dana" @click="copyAccount(accountNumber, 'DANA')">
        <span class="card-glow glow-a" aria-hidden="true"></span>
        <span class="card-glow glow-b" aria-hidden="true"></span>

        <div class="card-top">
          <span class="card-logo-chip">
            <img :src="logoDana" alt="DANA" class="card-logo" />
          </span>
          <span class="card-tag">E-Wallet</span>
        </div>

        <div class="card-chip-row">
          <span class="card-chip"></span>
          <svg class="card-contactless" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01m-7.08-7.071a10 10 0 0 1 14.142 0M2.929 8.929a15 15 0 0 1 21.213 0" />
          </svg>
        </div>

        <div class="card-number">{{ formattedAccountNumber }}</div>

        <div class="card-footer">
          <div class="card-owner-block">
            <span class="card-footer-label">Pemilik Akun</span>
            <span class="card-footer-value">A.N Susilawati</span>
          </div>
          <span class="card-copy-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Salin
          </span>
        </div>
      </button>

      <div class="heart-divider bottom-divider">
        <span class="h-line"></span>
        <span class="h-icon">♡</span>
        <span class="h-line"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import logoBri from '../assets/logo-bri.svg'
import logoDana from '../assets/logo-dana.png'

const emit = defineEmits<{
  (e: 'copied', msg: string): void
}>()

const accountNumber = '041501019453500'

const formattedAccountNumber = computed(() => {
  return accountNumber.match(/.{1,4}/g)?.join(' ') || accountNumber
})

const copyAccount = async (number: string, bank: string) => {
  try {
    await navigator.clipboard.writeText(number)
    emit('copied', `Nomor rekening ${bank} (${number}) berhasil disalin!`)
  } catch (err) {
    emit('copied', `Nomor ${bank}: ${number}`)
  }
}
</script>

<style scoped>
.wedding-gift-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 0 auto 28px;
  padding: 0 16px;
}

.elegant-card {
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-radius: 20px;
  padding: 26px 20px 22px;
  box-shadow: 0 6px 20px rgba(83, 128, 174, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.45);
  text-align: center;
}

.card-script-title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  color: #17345c;
  margin: 0 0 6px;
}

.heart-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.h-line {
  width: 40px;
  height: 1px;
  background: #a3c4e4;
}

.h-icon {
  font-size: 13px;
  color: #6a9ce4;
}

.bottom-divider {
  margin-top: 18px;
  margin-bottom: 0;
}

.gift-tagline {
  font-size: 12px;
  line-height: 1.6;
  color: #5380ae;
  margin: 0 0 16px;
}

.gift-icon-box {
  margin-bottom: 10px;
}

.gift-icon {
  width: 36px;
  height: 36px;
  color: #3185f2;
}

.bank-card {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 18px 16px;
  border: none;
  border-radius: 16px;
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 14px;
  box-shadow: 0 10px 28px rgba(15, 28, 63, 0.35);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

.bank-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(15, 28, 63, 0.45);
}

.bank-card:active {
  transform: translateY(0);
}

.bank-card-bri {
  background: linear-gradient(135deg, #0f1c3f 0%, #142b5c 55%, #1a3d7a 100%);
}

.bank-card-dana {
  background: linear-gradient(135deg, #0b1230 0%, #0d2a63 55%, #0d6fdb 100%);
}

.card-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  pointer-events: none;
}

.glow-a {
  top: -40px;
  right: -30px;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.08);
}

.glow-b {
  bottom: -40px;
  left: -30px;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.06);
}

.card-top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-logo-chip {
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  padding: 6px 10px;
}

.card-logo {
  height: 15px;
  width: auto;
  display: block;
}

.card-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.14);
  padding: 4px 10px;
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.85);
}

.card-chip-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.card-chip {
  position: relative;
  width: 38px;
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(135deg, #f5d78e 0%, #e8b64a 50%, #c98f1f 100%);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.card-chip::before {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}

.card-chip::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.25);
}

.card-contactless {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.55);
}

.card-number {
  position: relative;
  z-index: 1;
  font-family: 'Courier New', monospace;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.card-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.card-owner-block {
  display: flex;
  flex-direction: column;
}

.card-footer-label {
  font-size: 8.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 2px;
}

.card-footer-value {
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.card-copy-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.16);
  padding: 6px 12px;
  border-radius: 16px;
  white-space: nowrap;
}

.card-copy-chip svg {
  width: 12px;
  height: 12px;
}
</style>
