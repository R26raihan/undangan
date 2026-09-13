<template>
  <section class="bride-groom-section" aria-label="Mempelai Pengantin">
    <!-- Header Section -->
    <div class="section-header">
      <h2 class="section-title">BRIDE &amp; GROOM</h2>
    </div>

    <!-- Cards Grid -->
    <div class="cards-container">
      <!-- Groom Card (Aris) -->
      <div class="profile-card">
        <h3 class="card-script-name">Aris</h3>

        <div class="medallion-wrapper">
          <!-- Main Portrait Circle -->
          <div class="medallion-circle">
            <img
              :src="imgGroom"
              alt="Aris Wanda"
              class="portrait-img"
              loading="lazy"
            />
          </div>

          <!-- Floral Garland draped underneath -->
          <img
            :src="imgFlowerGarland"
            alt=""
            class="garland-accent"
            aria-hidden="true"
          />

          <!-- Tulip Bouquet Accent (groom only, top-left) -->
          <img
            :src="imgTulipBouquet"
            alt=""
            class="tulip-accent tulip-top-left"
            aria-hidden="true"
          />
        </div>

        <div class="full-name-block">
          <p class="full-name-line">Aris</p>
          <p class="full-name-line">Wanda</p>
        </div>
      </div>

      <!-- Bride Card (Susi) -->
      <div class="profile-card">
        <h3 class="card-script-name">Susi</h3>

        <div class="medallion-wrapper">
          <!-- Main Portrait Circle -->
          <div class="medallion-circle">
            <img
              :src="imgBride"
              alt="Susilawati"
              class="portrait-img portrait-img-flip"
              loading="lazy"
            />
          </div>

          <!-- Floral Garland draped underneath -->
          <img
            :src="imgFlowerGarland"
            alt=""
            class="garland-accent"
            aria-hidden="true"
          />

          <!-- Tulip Bouquet Accent (bride only, top-right) -->
          <img
            :src="imgTulipBouquetPearl"
            alt=""
            class="tulip-accent tulip-top-right"
            aria-hidden="true"
          />
        </div>

        <div class="full-name-block">
          <p class="full-name-line">Susilawati</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import imgGroom from '../assets/bride-cowok.png'
import imgBride from '../assets/bride-cewek.png'
import imgFlowerGarland from '../assets/flower-garland.webp'
import imgTulipBouquet from '../assets/tulip-bouquet.webp'
import imgTulipBouquetPearl from '../assets/tulip-bouquet-pearl.webp'
</script>

<style scoped>
.bride-groom-section {
  width: 100%;
  max-width: 480px;
  margin: 0 auto 28px;
  padding: 0 14px;
  box-sizing: border-box;
}

.section-header {
  text-align: center;
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: 15.5px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #17345c;
  margin: 0;
  text-transform: uppercase;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: stretch;
}

.profile-card {
  position: relative;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border-radius: 36px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 10px 28px rgba(83, 128, 174, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);
  padding: 26px 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #17345c;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(83, 128, 174, 0.18), 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-script-name {
  font-family: 'Great Vibes', 'Alex Brush', cursive;
  font-size: 38px;
  font-weight: 400;
  color: #17345c;
  margin: 0 0 14px;
  line-height: 1.1;
  letter-spacing: 0.5px;
}

/* Medallion Frame */
.medallion-wrapper {
  position: relative;
  width: 132px;
  height: 132px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.medallion-circle {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #8daecf;
  background: radial-gradient(circle, #eef6fd 0%, #d8e9f8 100%);
  box-shadow: inset 0 0 14px rgba(83, 128, 174, 0.2), 0 4px 14px rgba(83, 128, 174, 0.15);
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* Transform warm sepia to the serene light sky-blue hue of the wedding theme */
  filter: hue-rotate(185deg) saturate(0.85) brightness(1.04);
  transition: transform 0.3s ease;
}

.profile-card:hover .portrait-img {
  transform: scale(1.03);
}

/* Mirror the bride's portrait so she faces toward the groom */
.portrait-img-flip {
  transform: scaleX(-1);
}

.profile-card:hover .portrait-img-flip {
  transform: scaleX(-1) scale(1.03);
}

/* Garland draped underneath the medallion */
.garland-accent {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  filter: drop-shadow(0 3px 6px rgba(83, 128, 174, 0.18));
}

/* Tulip Bouquet Accent (groom card only) */
.tulip-accent {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  filter: drop-shadow(0 3px 6px rgba(83, 128, 174, 0.2));
}

.tulip-top-left {
  top: -14px;
  left: -16px;
  width: 76px;
  height: auto;
  transform: rotate(-8deg);
}

.tulip-top-right {
  top: -14px;
  right: -16px;
  width: 76px;
  height: auto;
  transform: rotate(8deg);
}

/* Full Name */
.full-name-block {
  min-height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.full-name-line {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.15;
  color: #17345c;
  margin: 0;
  letter-spacing: 0.3px;
}

@media (max-width: 380px) {
  .bride-groom-section {
    padding: 0 10px;
  }

  .cards-container {
    gap: 8px;
  }

  .profile-card {
    border-radius: 28px;
    padding: 22px 6px 20px;
  }

  .card-script-name {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .medallion-wrapper {
    width: 112px;
    height: 112px;
    margin-bottom: 12px;
  }

  .garland-accent {
    bottom: -18px;
    width: 100px;
  }

  .tulip-top-left,
  .tulip-top-right {
    width: 60px;
  }

  .full-name-line {
    font-size: 17.5px;
  }
}
</style>
