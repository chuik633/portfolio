<template>
  <div class="container1">
    <p class="description">{{ props.description }}</p>
    <transition name="fade" mode="out-in">
      <img
        v-if="!isVideo(currentImageSrc)"
        :key="currentImageSrc"
        :src="currentImageSrc"
        @click="nextImage"
      />
      <video
        v-else
        autoplay
        muted
        loop
        :src="currentImageSrc"
        @click="nextImage"
      />
    </transition>
    <div class="thumbnails" v-if="images.length > 1">
      <div
        class="thumbnail-container"
        v-for="(image, i) of images"
        :idx="i"
        @click="changeMainPreview(i)"
      >
        <img
          class="thumnail"
          v-if="!isVideo(image)"
          :src="props.imageFolder + image"
        />
        <video
          class="thumnail"
          v-if="isVideo(image)"
          mute
          autoplay
          loop
          :src="props.imageFolder + image"
        />
      </div>
    </div>
  </div>
  <h2 v-if="props.processImages">PROCESS IMAGES</h2>
  <Masonry
    v-if="props.processImages"
    :images="props.processImages"
    :imageFolder="props.imageFolder"
  />
  <h2 v-if="logoExplores">LOGO EXPLORES</h2>
  <div class="logo-container">
    <div v-if="logoExplores" v-for="logo in props.logoExplores">
      <video mute autoplay loop :src="logoExploresFolder + logo.src" />
      <p>{{ logo.description }}</p>
    </div>
  </div>
  <h2 v-if="icons">ICONS</h2>
  <div class="icon-container">
    <div v-if="icons" v-for="icon in props.icons">
      <video mute autoplay loop :src="iconsFolder + icon" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { isVideo } from "../../components/helpers";
import Masonry from "../../components/imageLayouts/Masonry.vue";
const props = defineProps({
  mainColor: { type: String, required: true },
  description: { type: String, default: "" },
  images: { type: Array, required: true },

  processImages: { type: Array, required: false },
  logoExplores: { type: Array, required: false },
  icons: { type: Array, required: false },
  imageFolder: { type: String, required: true },
  basic: { type: Boolean, required: false },
});

// ----------image controls----------
const logoExploresFolder = props.imageFolder + "logoExplores/";
const iconsFolder = props.imageFolder + "icons/";
const idx = ref(0);
const currentImageSrc = computed(
  () => `${props.imageFolder}${props.images[idx.value]}`
);
function changeMainPreview(i) {
  idx.value = i;
}
function nextImage() {
  idx.value = (idx.value + 1) % props.images.length;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
h2 {
  margin-top: 50px;
  letter-spacing: 2px;
}

.container1 {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  flex-align: flex-start;
}
img,
video {
  border: 0.1px solid black;
}
.container1 video {
  max-height: 70vh;
  width: fit-content !important;
  max-width: 100%;
}
.thumbnails {
  display: flex;
  gap: 10px;
  align-items: flex-start; /* key to stop stretching */
}

.thumbnail-container {
  display: inline-block;
  border: 1px solid transparent;
  height: auto !important;
}

.thumbnail-container:hover {
  border-color: black;
  background-color: black;
}

.thumbnail {
  display: block;
  max-height: 100px !important;
  width: auto;
  object-fit: contain;
}

.logo-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.logo-container div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.icon-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
.icon-container video {
  width: 100%;
  height: auto;
  object-fit: cover;
  min-width: 100px;
}
</style>
