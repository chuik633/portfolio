<template>
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
      :images="props.images"
      :imageFolder="props.imageFolder"
    ></ImageCarousel>
    <p v-if="props.basic">
      {{ props.description }}
    </p>
    <ImageList
      v-if="props.basic && props.processImages"
      :images="props.processImages"
      :imageFolder="props.imageFolder"
    ></ImageList>

    <component v-if="props.basic == false" :is="currentPage" v-bind="props" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import ImageList from "./imageLayouts/ImageList.vue";
import ImageCarousel from "./imageLayouts/ImageCarousel.vue";
import * as d3 from "d3";
const router = useRouter();

const props = defineProps({
  projectTitle: { type: String, required: true },
  projectLink: { type: String, default: undefined },
  description: { type: String, default: "" },
  codeLink: { type: String, default: undefined },
  date: { type: String, default: undefined },
  mainColor: { type: String, required: true },
  images: { type: Array, required: true },
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

console.log(props.images);
function isColorDark(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 128;
}
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

// -------------- pages--------------
import SoundStories from "../pages/dataViz/SoundStories.vue";

const pages = {
  "Sound Stories": SoundStories,
};
</script>

<style scoped>
.popup {
  --bgColor: white;
  --textColor: black;
}
.popup * {
  color: var(--textColor);
}
.project-title {
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 10px;
}
.date {
  font-size: 10px;
}
.close-btn {
  font-family: Futura;
  font-weight: 100;
  top: -50px;
  right: -50px;
  width: 20px;
  font-size: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px;
}
.close-btn:hover {
  background: var(--textColor);
  color: var(--bgColor);
}

.popup {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0vh;
  background-color: var(--bgColor);
  left: 0vw;
  border: 0.5px solid black;
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 20px;
  overflow-y: auto;
}

.image-carousel {
  width: 80%;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
}
</style>
