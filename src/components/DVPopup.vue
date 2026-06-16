<template>
  <Teleport to="body">
    <div class="popup" :style="{ backgroundColor: props.mainColor }">
      <div class="popup-header row space-between med-gap">
        <div>
          <div class="project-title">{{ props.projectTitle }}</div>
          <div v-if="date" class="date">{{ props.date }}</div>
        </div>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="row">
        <button v-if="codeLink" class="light" @click="openCode">See Code</button>
        <button v-if="projectLink" class="light" @click="openProject">
          See Live Project
        </button>
      </div>
      <ImageCarousel
        v-if="props.basic"
        :images="mediaItems"
        :imageFolder="props.imageFolder"
      ></ImageCarousel>
      <p v-if="props.basic">
        {{ props.description }}
      </p>
      <Masonry
        v-if="props.basic && props.processImages"
        :images="props.processImages"
        :imageFolder="props.imageFolder"
      ></Masonry>

      <component v-if="props.basic == false" :is="currentPage" v-bind="props" />
    </div>
  </Teleport>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import ImageList from "./imageLayouts/ImageList.vue";
import Masonry from "./imageLayouts/Masonry.vue";
import ImageCarousel from "./imageLayouts/ImageCarousel.vue";
import * as d3 from "d3";
import { isColorDark, isVideo } from "./helpers";
const router = useRouter();

const props = defineProps({
  projectTitle: { type: String, required: true },
  projectLink: { type: String, default: undefined },
  description: { type: String, default: "" },
  codeLink: { type: String, default: undefined },
  date: { type: String, default: undefined },
  mainColor: { type: String, required: true },
  images: { type: Array, required: false, default: () => [] },
  videoLink: { type: String, default: undefined },
  processImages: { type: Array, required: false },
  imageFolder: { type: String, required: true },
  basic: { type: Boolean, required: false },
});
const isDark = ref(false);
onMounted(() => {
  isDark.value = isColorDark(props.mainColor);
  console.log(isDark.value);
  d3.select(".popup").style("--bgColor", props.mainColor);
  if (isDark.value) {
    d3.select("button.light").attr("class", "dark");
    d3.select(".popup").style("--textColor", "white");
  }
});

function close() {
  router.push({ name: "DataViz" });
}
const currentPage = computed(() => {
  return pages[props.projectTitle] || NotFoundPage;
});
function openCode() {
  window.open(props.codeLink, "_blank");
}
function openProject() {
  window.open(props.projectLink, "_blank");
}

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

// -------------- pages--------------
import SoundStories from "../pages/dataViz/SoundStories.vue";

const pages = {
  "Sound Stories": SoundStories,
};
</script>

<style>
.popup {
  --bgColor: white;
  --textColor: black;
  position: fixed !important;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bgColor);
  border: 0.5px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 80px;
  gap: 24px;
  overflow-y: auto !important;
  overscroll-behavior: contain;
}
.popup * {
  color: var(--textColor);
}
.popup > * {
  width: 100%;
  max-width: 560px;
  flex-shrink: 0;
}
.popup .project-title {
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 10px;
}
.popup .date {
  font-size: 10px;
}
.popup .close-btn {
  font-family: Futura;
  font-weight: 100;
  position: fixed !important;
  top: 10px;
  right: 14px;
  width: 24px !important;
  font-size: 18px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px;
  z-index: 10000;
}
.popup .close-btn:hover {
  background: var(--textColor);
  color: var(--bgColor);
}
@media (max-width: 600px) {
  .popup {
    padding: 40px 28px;
  }
}
</style>
