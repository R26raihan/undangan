<template>
  <section class="ar-rum-section" aria-label="Ayat Suci QS Ar-Rum 21">
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
</script>

<style scoped>
.ar-rum-section {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.ar-rum-image {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 14px 30px rgba(83, 128, 174, 0.28));
}
</style>
