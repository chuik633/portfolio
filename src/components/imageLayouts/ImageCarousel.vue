<template>
  <div class="carousel-container">
    <div class="slides" :style="slideStyle">
      <template v-for="(file, index) in images" :key="file + index">
        <div :class="['slide-frame', { tall: isTall(file) }]">
          <!-- square only if tall -->
          <img
            v-if="!isYouTubeLink(mediaSrc(file)) && !isVideo(mediaSrc(file))"
            :src="mediaSrc(file)"
            :alt="file"
            class="slide-image"
            loading="lazy"
            @load="onImgLoad(file, $event)"
          />
          <iframe
            v-else-if="isYouTubeLink(mediaSrc(file))"
            :src="toYouTubeEmbedUrl(mediaSrc(file))"
            :title="file"
            class="slide-image embed"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            allowfullscreen
            loading="lazy"
          ></iframe>
          <video
            v-else
            :src="mediaSrc(file)"
            :alt="file"
            class="slide-image"
            playsinline
            muted
            loop
            :autoplay="index === currentIndex"
            :preload="index === currentIndex ? 'auto' : 'none'"
            @loadedmetadata="onVideoMeta(file, $event)"
          />
        </div>
      </template>
    </div>
    <button v-if="showNav" class="nav prev" @click="prevSlide">‹</button>
    <button v-if="showNav" class="nav next" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  isVideo,
  isYouTubeLink,
  toYouTubeEmbedUrl,
  resolveMediaUrl,
} from "../helpers";

const props = defineProps({
  images: { type: Array, required: true }, // e.g. ["img1.gif", "img2.gif"]
  imageFolder: { type: String, required: true }, // e.g. "/assets/about/favorites"
});

const currentIndex = ref(0);
const tallMap = ref({});
const showNav = computed(() => props.images.length > 1);

const mediaSrc = (file) => resolveMediaUrl(file, props.imageFolder);

const isTall = (file) => !!tallMap.value[file];

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

function onImgLoad(file, e) {
  const { naturalWidth: w, naturalHeight: h } = e.target;
  tallMap.value = { ...tallMap.value, [file]: h > w };
}

function onVideoMeta(file, e) {
  const { videoWidth: w, videoHeight: h } = e.target;
  tallMap.value = { ...tallMap.value, [file]: h > w };
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
.slide-frame {
  width: calc(100% - 20px);
  flex-shrink: 0;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 20px);
}
.slide-frame.tall {
  background: black;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.slide-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.embed {
  border: 0;
  width: 100%;
  height: 100%;
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
