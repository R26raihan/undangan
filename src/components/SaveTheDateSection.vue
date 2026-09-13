<template>
  <div class="save-date-wrapper">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const googleCalendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Susi+%26+Aris&dates=20260920T010000Z/20260920T080000Z&details=The+Wedding+of+Susi+%26+Aris+Wedding+Invitation&location=Kediaman+Mempelai+Wanita,+Sipayung,+Bogor'

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.save-date-wrapper {
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

.date-tagline {
  font-size: 12px;
  line-height: 1.6;
  color: #5380ae;
  margin: 0 0 16px;
}

/* Calendar */
.calendar-box {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  padding: 14px 10px;
  margin-bottom: 18px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
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
</style>
