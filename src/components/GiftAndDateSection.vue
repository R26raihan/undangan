<template>
  <div class="gift-date-wrapper">
    <!-- Card 1: Save The Date -->
    <div class="elegant-card date-card">
      <h3 class="card-script-title">Save The Date</h3>
      <div class="heart-divider">
        <span class="h-line"></span>
        <span class="h-icon">♡</span>
        <span class="h-line"></span>
      </div>

      <p class="date-tagline">We're getting married and we'd love for you to be there.</p>

      <div class="calendar-box">
        <div class="cal-header">
          <span class="cal-month">SEPTEMBER</span>
          <span class="cal-year">2026</span>
        </div>

        <div class="cal-grid">
          <span class="day-h">S</span>
          <span class="day-h">M</span>
          <span class="day-h">T</span>
          <span class="day-h">W</span>
          <span class="day-h">T</span>
          <span class="day-h">F</span>
          <span class="day-h">S</span>

          <!-- Week 1 -->
          <span class="day-empty"></span>
          <span class="day-empty"></span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>

          <!-- Week 2 -->
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>

          <!-- Week 3 -->
          <span>13</span>
          <span>14</span>
          <span>15</span>
          <span>16</span>
          <span>17</span>
          <span>18</span>
          <span>19</span>

          <!-- Week 4 with 20 circled -->
          <span class="day-special">
            <span class="heart-circle">20</span>
          </span>
          <span>21</span>
          <span>22</span>
          <span>23</span>
          <span>24</span>
          <span>25</span>
          <span>26</span>

          <!-- Week 5 -->
          <span>27</span>
          <span>28</span>
          <span>29</span>
          <span>30</span>
          <span class="day-empty"></span>
          <span class="day-empty"></span>
          <span class="day-empty"></span>
        </div>

        <div class="target-date-label">20 SEPTEMBER 2026</div>
      </div>

      <!-- Real Countdown -->
      <div class="countdown-timer">
        <div class="cd-item">
          <span class="cd-num">{{ countdown.days }}</span>
          <span class="cd-lbl">HARI</span>
        </div>
        <span class="cd-sep">:</span>
        <div class="cd-item">
          <span class="cd-num">{{ countdown.hours }}</span>
          <span class="cd-lbl">JAM</span>
        </div>
        <span class="cd-sep">:</span>
        <div class="cd-item">
          <span class="cd-num">{{ countdown.minutes }}</span>
          <span class="cd-lbl">MENIT</span>
        </div>
        <span class="cd-sep">:</span>
        <div class="cd-item">
          <span class="cd-num">{{ countdown.seconds }}</span>
          <span class="cd-lbl">DETIK</span>
        </div>
      </div>

      <a
        :href="googleCalendarUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-save-date"
      >
        <svg class="cal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span>Save The Date</span>
      </a>
    </div>

    <!-- Card 2: Wedding Gift -->
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

      <!-- Bank BRI Button -->
      <button class="gift-account-btn btn-bri" @click="copyAccount('041501019453500', 'BRI')">
        <div class="bank-tag bank-tag-logo">
          <img :src="logoBri" alt="BRI" class="bank-logo" />
        </div>
        <div class="acc-info">
          <span class="acc-number">041501019453500</span>
          <span class="acc-owner">A.N Susilawati</span>
        </div>
        <span class="copy-badge">Salin</span>
      </button>

      <!-- DANA Button -->
      <button class="gift-account-btn btn-dana" @click="copyAccount('041501019453500', 'DANA')">
        <div class="bank-tag bank-tag-logo">
          <img :src="logoDana" alt="DANA" class="bank-logo" />
        </div>
        <div class="acc-info">
          <span class="acc-number">041501019453500</span>
          <span class="acc-owner">A.N Susilawati</span>
        </div>
        <span class="copy-badge">Salin</span>
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
import { ref, onMounted, onUnmounted } from 'vue'
import logoBri from '../assets/logo-bri.svg'
import logoDana from '../assets/logo-dana.png'

const emit = defineEmits<{
  (e: 'copied', msg: string): void
}>()

const targetDate = new Date('2026-09-20T08:00:00+07:00').getTime()

const countdown = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

let timerInterval: any = null

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance <= 0) {
    countdown.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
}

const copyAccount = async (number: string, bank: string) => {
  try {
    await navigator.clipboard.writeText(number)
    emit('copied', `Nomor rekening ${bank} (${number}) berhasil disalin!`)
  } catch (err) {
    emit('copied', `Nomor ${bank}: ${number}`)
  }
}

const googleCalendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Susi+%26+Aris&dates=20260920T010000Z/20260920T080000Z&details=The+Wedding+of+Susi+%26+Aris+Wedding+Invitation&location=Indonesia'

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.gift-date-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  font-family: 'Cormorant Garamond', Georgia, serif;
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

.date-tagline,
.gift-tagline {
  font-size: 12px;
  line-height: 1.6;
  color: #5380ae;
  margin: 0 0 16px;
}

/* Calendar */
.calendar-box {
  background: #fbfdff;
  border: 1px solid #e1effa;
  border-radius: 14px;
  padding: 14px 10px;
  margin-bottom: 18px;
}

.cal-header {
  display: flex;
  justify-content: space-between;
  padding: 0 8px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #17345c;
  border-bottom: 1px solid #eef5fc;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  font-size: 11.5px;
  color: #2c4970;
  padding-top: 10px;
}

.day-h {
  font-weight: 700;
  color: #5380ae;
  padding-bottom: 4px;
}

.day-special {
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid #3185f2;
  background: #eef6fd;
  color: #3185f2;
  font-weight: 700;
}

.target-date-label {
  margin-top: 12px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #5380ae;
}

/* Countdown */
.countdown-timer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 18px;
}

.cd-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cd-num {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  color: #17345c;
}

.cd-lbl {
  font-size: 9px;
  letter-spacing: 1px;
  color: #5380ae;
}

.cd-sep {
  font-size: 18px;
  font-weight: 700;
  color: #6a9ce4;
  margin-bottom: 10px;
}

.btn-save-date {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  background: #5380ae;
  color: #ffffff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(83, 128, 174, 0.25);
  transition: all 0.2s ease;
}

.btn-save-date:hover {
  background: #416892;
  transform: translateY(-1px);
}

.cal-icon {
  width: 14px;
  height: 14px;
}

/* Gift Section */
.gift-icon-box {
  margin-bottom: 10px;
}

.gift-icon {
  width: 36px;
  height: 36px;
  color: #3185f2;
}

.gift-account-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(49, 133, 242, 0.2);
}

.btn-bri {
  background: linear-gradient(135deg, #6a9ce4 0%, #3185f2 100%);
}

.btn-dana {
  background: linear-gradient(135deg, #5380ae 0%, #3185f2 100%);
}

.gift-account-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(49, 133, 242, 0.35);
}

.bank-tag {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.bank-tag-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 8px;
  padding: 6px 10px;
}

.bank-logo {
  height: 16px;
  width: auto;
  display: block;
}

.acc-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.acc-number {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
}

.acc-owner {
  font-size: 10.5px;
  opacity: 0.9;
}

.copy-badge {
  background: rgba(255, 255, 255, 0.25);
  padding: 4px 9px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
}
</style>
