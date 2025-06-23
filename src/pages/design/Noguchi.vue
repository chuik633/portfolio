<template>
  <div class="container1">
    <p class="description">{{ props.description }}</p>
    <img
      v-if="!isVideo(currentImageSrc)"
      :src="currentImageSrc"
      @click="nextImage"
    />
    <video
      autoplay
      muted
      loop
      v-if="isVideo(currentImageSrc)"
      :src="currentImageSrc"
      @click="nextImage"
    />
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
          v-else
          mute
          autoplay
          loop
          :src="props.imageFolder + image"
        />
      </div>
    </div>
  </div>

  <h2>LOGO EXPLORES</h2>
  <div class="logo-container">
    <div v-if="logoExplores" v-for="logo in logoExplores">
      <video mute autoplay loop :src="logoExploresFolder + logo.src" />
      <p>{{ logo.description }}</p>
    </div>
  </div>
  <h2>ICONS</h2>
  <div class="icon-container">
    <div v-if="icons" v-for="icon in icons">
      <video mute autoplay loop :src="iconsFolder + icon" />
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

const logoExploresFolder = props.imageFolder + "logoExplores/";
const iconsFolder = props.imageFolder + "icons/";
const logoExplores = [
  {
    src: "1.mp4",
    description: `I wanted to play with texture and 3d to create text that matched the floating, meditative, and physical/natural aspects of Noguchi's work.`,
  },
  {
    src: "2.mov",
    description: `The way noguchi uses light in both his rock and akari sculptures fascinates me. 
    His sculptures are still, but when they interact with light and different 
    environments, they morph. I wanted to emulate this with text, and was initially 
    inspired by the ribbing of his Akari light scultpures and wondered what it would look like to run your fingers across them. 
    I ended up going with this concept but abstracting it to give more contrast.`,
  },
  {
    src: "3.mov",
    description: `This logo focuses on the different sillhouetes of each sculpture in his museum. It changes as the user clicks to create varying logos. `,
  },
];
const icons = [
  "light2.mp4",
  "longrock.mp4",
  "rocks 2_1.mp4",
  "sculptingworlds.mp4",
  "shopping_1.mp4",
  "search.mp4",
];

// ----------image controls----------
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
