<template>
  <div class="carousel-container">
    <div class="slides" :style="slideStyle">
      <template v-for="(file, index) in images" :key="file + index">
        <img
          v-if="!isVideo(file)"
          :src="`${imageFolder}${file}`"
          :alt="file"
          class="slide-image"
        />
        <video
          v-else
          :src="`${imageFolder}${file}`"
          :alt="file"
          class="slide-image"
          muted
          autoplay
          loop
        />
      </template>
    </div>
    <button class="nav prev" @click="prevSlide">‹</button>
    <button class="nav next" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { isVideo } from "../helpers";

const props = defineProps({
  images: { type: Array, required: true }, // e.g. ["img1.gif", "img2.gif"]
  imageFolder: { type: String, required: true }, // e.g. "/assets/about/favorites"
});

const currentIndex = ref(0);

const slideStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  // width: `${props.images.length * 100}%`,
}));

function nextSlide() {
  currentIndex.value =
    currentIndex.value < props.images.length - 1 ? currentIndex.value + 1 : 0;
}

function prevSlide() {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : props.images.length - 1;
}
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  height: 100%;
  min-height: 40vh;
  width: 100%;

  display: block;
}
.slides {
  height: 100%;
  display: flex;
  transition: transform 0.5s ease;
}
.slide-image {
  width: calc(100% - 20px);
  flex-shrink: 0;
  height: calc(100% - 20px);
  object-fit: contain;
  margin: 10px;
}
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
}
.prev {
  left: 1rem;
}
.next {
  right: 1rem;
}
</style>
