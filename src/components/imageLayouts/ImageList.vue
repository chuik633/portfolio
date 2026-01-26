<template>
  <div class="image-list">
    <template v-for="(file, index) in images" :key="file + index">
      <div :class="['image-frame', { tall: isTall(file) }]">
        <!-- square only if tall -->
        <img
          v-if="!isYouTubeLink(mediaSrc(file)) && !isVideo(mediaSrc(file))"
          :src="mediaSrc(file)"
          :alt="file"
          class="image-item"
          @load="onImgLoad(file, $event)"
        />
        <iframe
          v-else-if="isYouTubeLink(mediaSrc(file))"
          :src="toYouTubeEmbedUrl(mediaSrc(file))"
          :title="file"
          class="image-item embed"
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
          class="image-item"
          muted
          autoplay
          playsinline
          loop
          @loadedmetadata="onVideoMeta(file, $event)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import {
  isVideo,
  isYouTubeLink,
  toYouTubeEmbedUrl,
  resolveMediaUrl,
} from "../helpers";
const props = defineProps({
  images: {
    type: Array,
    required: true, // Array of image file names
  },
  imageFolder: {
    type: String,
    required: true, // Folder path for images, e.g. '/assets/images'
  },
});

const mediaSrc = (file) => resolveMediaUrl(file, props.imageFolder);
const tallMap = ref({});
const isTall = (file) => !!tallMap.value[file];

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
.image-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  gap: 8px;
  min-height: 100px;
  height: 10px;
  align-items: stretch;
  width: 100%;
}
.image-frame {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.image-frame.tall {
  aspect-ratio: 1 / 1;
  background: black;
  overflow: hidden;
}
.image-item {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  border: 0.1px solid black;
}
.embed {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
