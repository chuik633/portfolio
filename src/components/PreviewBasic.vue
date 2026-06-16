<template>
  <div
    class="preview-basic"
    :style="containerStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="
      emit('preview', {
        projectTitle: props.projectTitle,
      })
    "
  >
    <div class="row">
      <div class="project-title">{{ props.projectTitle }}</div>
      <div v-if="date" class="date">{{ props.date }}</div>
    </div>

    <div
      v-if="currentMedia"
      :class="['media-wrapper', { tall: isTall }]"
      :style="imgStyle"
    >
      <img
        v-if="!currentIsYouTube && !isVideo(currentMedia)"
        :src="currentMedia"
        :class="['media-content', { 'inner-border': isTall }]"
        loading="lazy"
        @load="onImgLoad"
        @mouseover="imgHover = true"
        @mouseleave="imgHover = false"
        @click="nextImage"
      />
      <iframe
        v-else-if="currentIsYouTube"
        :class="['media-content', 'media-embed', { 'inner-border': isTall }]"
        :src="youtubeEmbedUrl"
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
        @mouseover="imgHover = true"
        @mouseleave="imgHover = false"
        @click.stop="nextImage"
      ></iframe>
      <video
        v-else
        :class="['media-content', { 'inner-border': isTall }]"
        autoplay
        playsinline
        muted
        loop
        preload="metadata"
        :src="currentMedia"
        @loadedmetadata="onVideoMeta"
        @mouseover="imgHover = true"
        @mouseleave="imgHover = false"
        @click="nextImage"
      />
    </div>

    <!-- <div v-if="description" class="description hide-scrollbar">
      {{ props.description }}
    </div> -->
  </div>
</template>

<script setup>
import {
  isColorDark,
  isVideo,
  isYouTubeLink,
  toYouTubeEmbedUrl,
  resolveMediaUrl,
} from "./helpers";
import { ref, computed, watch } from "vue";
const emit = defineEmits(["preview"]);
const props = defineProps({
  projectTitle: { type: String, required: true },
  projectLink: { type: String, required: false },
  date: { type: String, required: false },
  description: { type: String, required: false },
  mainColor: { type: String, required: true },
  images: { type: Array, default: () => [] },
  videoLink: { type: String, default: undefined },
  imageFolder: {
    type: String,
    default: `${import.meta.env.VITE_CDN_BASE}assets/sketch_images/`,
  },
});

const hover = ref(false);
const imgHover = ref(false);
const isTall = ref(false);

const idx = ref(0);

const mediaItems = computed(() => {
  const items = [];
  if (props.images && props.images.length) {
    items.push(...props.images);
  }
  if (props.videoLink) {
    items.push(props.videoLink);
  }
  return items;
});

const currentMedia = computed(() => {
  if (!mediaItems.value.length) return "";
  const media = mediaItems.value[idx.value % mediaItems.value.length];
  return resolveMediaUrl(media, props.imageFolder);
});

watch(currentMedia, () => {
  isTall.value = false;
});

const currentIsYouTube = computed(() => isYouTubeLink(currentMedia.value));
const youtubeEmbedUrl = computed(() =>
  currentIsYouTube.value ? toYouTubeEmbedUrl(currentMedia.value) : "",
);

function nextImage() {
  if (mediaItems.value.length <= 1) return;
  idx.value = (idx.value + 1) % mediaItems.value.length;
}

function onImgLoad(e) {
  const { naturalWidth: w, naturalHeight: h } = e.target;
  isTall.value = h > w;
}

function onVideoMeta(e) {
  const { videoWidth: w, videoHeight: h } = e.target;
  isTall.value = h > w;
}

const dark = isColorDark(props.mainColor);
const frontColor = dark ? "#FFFFFF" : "#000000";

const containerStyle = computed(() => ({
  backgroundColor: hover.value ? props.mainColor : "inherit",
  color: hover.value ? frontColor : "black",
  cursor: props.projectLink ? "pointer" : "default",
}));

const imgStyle = computed(() =>
  isTall.value
    ? { border: "none" }
    : { border: imgHover.value ? "1px solid black" : ".3px solid black" },
);
</script>

<style scoped>
.preview-basic {
  flex-shrink: 0;
  border: 0.1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;

  width: 100%;
  aspect-ratio: 1 / 1;

  padding: 45px;
  transition: background-color 0.2s ease;
  gap: 20px;
}

.date {
  font-size: 8px;
  font-weight: 100;
  width: fit-content;
}
.description {
  font-size: 8px;
  overflow-y: auto;
  height: 100%;
  min-height: 50px;
  line-height: 130%;
  font-family: "Courier New";
}
.project-title {
  font-size: 13px;
  width: fit-content;
}

.row {
  justify-content: space-between;
  align-items: flex-end;
}
.media-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.media-wrapper.tall {
  aspect-ratio: 1 / 1;
  background: transparent;
  overflow: hidden;
}
.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  background: transparent;
}
.media-content.inner-border {
  border: 1px solid black;
  box-sizing: border-box;
}
.media-embed {
  width: 100%;
  height: 100%;
}
</style>
