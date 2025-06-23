<template>
  <div class="container1">
    <div class="thumbnails" v-if="images.length > 1">
      <div class="thumbnail-container" v-for="(image, i) of images" :idx="i">
        <img
          class="thumnail"
          v-if="!isVideo(image)"
          :src="props.imageFolder + image"
        />
        <video
          class="thumnail"
          v-else
          mute
          autoplay
          loop
          :src="props.imageFolder + image"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { isVideo } from "../../components/helpers";
const props = defineProps({
  mainColor: { type: String, required: true },
  description: { type: String, default: "" },
  images: { type: Array, required: true },
  processImages: { type: Array, required: false },
  imageFolder: { type: String, required: true },
  basic: { type: Boolean, required: false },
});
</script>

<style scoped>
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
  width: fit-content;
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
