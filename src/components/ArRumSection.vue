<template>
  <section
    class="ar-rum-section"
    aria-label="Ayat Suci QS Ar-Rum 21"
    :style="{ backgroundImage: `url(${imgPaperBg})` }"
  >
    <img
      :src="imgArRumCard"
      alt="QS Ar-Rum Ayat 21"
      class="ar-rum-image"
      loading="lazy"
    />
  </section>
</template>

<script setup lang="ts">
import imgArRumCard from '../assets/ar-rum-card.webp'
import imgPaperBg from '../assets/paper-bg.png'
</script>

<style scoped>
.ar-rum-section {
  width: 100%;
  max-width: 480px;
  margin: 0 auto 28px;
  padding: 24px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 24px;
}

.ar-rum-image {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 14px 30px rgba(83, 128, 174, 0.28));
}
</style>
