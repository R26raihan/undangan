<template>
  <section class="event-schedule-section" aria-label="Jadwal Acara Pernikahan">
    <div class="cards-container">
      <!-- Card 1: Akad -->
      <div class="event-card">
        <h3 class="card-script-title">Akad</h3>

        <div class="day-label">MINGGU</div>
        <div class="divider-short"></div>

        <div class="date-number">20</div>
        <div class="divider-short"></div>

        <div class="month-year-label">September, 2026</div>
        <div class="divider-wide"></div>

        <a
          :href="locationUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="location-pin-wrap"
          title="Buka Google Maps"
          aria-label="Petunjuk Lokasi di Google Maps"
        >
          <svg class="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M12 21c4-4.5 7-8.5 7-12A7 7 0 0 0 5 9c0 3.5 3 7.5 7 12Z" />
            <circle cx="12" cy="9" r="2.5" stroke-width="1.3" />
          </svg>
        </a>

        <div class="venue-name">Kediaman Mempelai Wanita</div>
        <div class="venue-detail">(Sipayung, Bogor)</div>

        <div class="divider-wide"></div>

        <!-- Spacer to balance height with Card 2 -->
        <div class="card-bottom-spacer" aria-hidden="true"></div>
      </div>

      <!-- Card 2: Resepsi -->
      <div class="event-card">
        <h3 class="card-script-title">Resepsi</h3>

        <div class="day-label">MINGGU</div>
        <div class="divider-short"></div>

        <div class="date-number">20</div>
        <div class="divider-short"></div>

        <div class="month-year-label">September, 2026</div>
        <div class="divider-wide"></div>

        <a
          :href="locationUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="location-pin-wrap"
          title="Buka Google Maps"
          aria-label="Petunjuk Lokasi di Google Maps"
        >
          <svg class="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M12 21c4-4.5 7-8.5 7-12A7 7 0 0 0 5 9c0 3.5 3 7.5 7 12Z" />
            <circle cx="12" cy="9" r="2.5" stroke-width="1.3" />
          </svg>
        </a>

        <div class="venue-name">Kediaman Mempelai Wanita</div>
        <div class="venue-detail">(Sipayung, Bogor)</div>

        <div class="divider-wide"></div>

        <a
          :href="locationUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-location"
          aria-label="Petunjuk Lokasi Resepsi di Google Maps"
        >
          Location
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  locationUrl?: string
}

withDefaults(defineProps<Props>(), {
  locationUrl: 'https://maps.app.goo.gl/HAEAqg9zyXMFJ1Ug6?g_st=ic'
})
</script>

<style scoped>
.event-schedule-section {
  width: 100%;
  max-width: 480px;
  margin: 0 auto 28px;
  padding: 0 14px;
  box-sizing: border-box;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: stretch;
}

.event-card {
  position: relative;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-radius: 36px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 10px 28px rgba(83, 128, 174, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  padding: 34px 10px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #17345c;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(83, 128, 174, 0.18), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* Titles */
.card-script-title {
  font-family: 'Great Vibes', 'Alex Brush', cursive;
  font-size: 38px;
  font-weight: 400;
  color: #17345c;
  margin: 0 0 18px;
  line-height: 1.1;
  letter-spacing: 0.5px;
}

/* Day */
.day-label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #17345c;
  text-transform: uppercase;
  margin-bottom: 7px;
}

/* Dividers */
.divider-short {
  width: 54px;
  height: 1px;
  background: #8daecf;
  margin: 0 auto;
}

/* Big Date Number */
.date-number {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 60px;
  font-weight: 500;
  line-height: 1;
  color: #17345c;
  margin: 5px 0 6px;
}

/* Month & Year */
.month-year-label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 15.5px;
  font-weight: 500;
  color: #17345c;
  margin: 10px 0 16px;
  letter-spacing: 0.3px;
}

.divider-wide {
  width: 86%;
  height: 1px;
  background: #8daecf;
  margin: 0 auto;
}

/* Pin Icon */
.location-pin-wrap {
  margin: 14px 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pin-icon {
  width: 25px;
  height: 25px;
  color: #5380ae;
}

/* Venue */
.venue-name {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.35;
  color: #17345c;
  padding: 0 4px;
  margin-bottom: 2px;
}

.venue-detail {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 11.5px;
  color: #4a6b8f;
  margin-bottom: 14px;
}

/* Bottom Button */
.btn-location {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 82%;
  padding: 8px 18px;
  margin-top: 14px;
  background: #0060ad;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 96, 173, 0.28);
  transition: all 0.2s ease;
}

.btn-location:hover {
  background: #0070c7;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 96, 173, 0.38);
}

.btn-location:active {
  transform: translateY(0);
}

/* Spacer for Card 1 to align with Card 2's button */
.card-bottom-spacer {
  height: 48px;
  width: 100%;
}

@media (max-width: 380px) {
  .event-schedule-section {
    padding: 0 10px;
  }

  .cards-container {
    gap: 8px;
  }

  .event-card {
    border-radius: 28px;
    padding: 26px 6px 20px;
  }

  .card-script-title {
    font-size: 32px;
    margin-bottom: 14px;
  }

  .date-number {
    font-size: 50px;
  }

  .month-year-label {
    font-size: 13.5px;
    margin: 8px 0 12px;
  }

  .venue-name {
    font-size: 12px;
  }

  .venue-detail {
    font-size: 10.5px;
  }

  .btn-location {
    font-size: 11.5px;
    padding: 7px 12px;
    width: 88%;
  }

  .card-bottom-spacer {
    height: 42px;
  }
}
</style>
