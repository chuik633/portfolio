<template>
  <div class="popup" :style="{ backgroundColor: props.mainColor }">
    <div class="popup-header row space-between med-gap">
      <div>
        <div class="project-title">{{ props.projectTitle }}</div>
        <div v-if="date" class="date">{{ props.date }}</div>
      </div>
      <button class="close-btn" @click="close">×</button>
    </div>
    <component v-if="props.basic" :is="currentPage" v-bind="props" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import * as d3 from "d3";
import { isColorDark, isVideo } from "./helpers";
const router = useRouter();

const props = defineProps({
  projectTitle: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: String, default: undefined },
  mainColor: { type: String, required: true },
  images: { type: Array, required: true },
  logoExplores: { type: Array, required: false },
  icons: { type: Array, required: false },
  processImages: { type: Array, required: false },
  imageFolder: { type: String, required: true },
  basic: { type: Boolean, required: false },
});

const isDark = computed(() => isColorDark(props.mainColor));

onMounted(() => {
  d3.select(".popup").style("--bgColor", props.mainColor);
  if (isDark.value) {
    d3.select("button.light").attr("class", "dark");
    d3.select(".popup").style("--textColor", "white");
  }
});

function close() {
  router.push({ name: "DesignProjects" });
}

// -------------- pages--------------
import MotionProject from "../pages/design/MotionProject.vue";
import Noguchi from "../pages/design/Noguchi.vue";
const pages = {
  Noguchi: MotionProject,
  "Renegade Craft": MotionProject,
};
const currentPage = computed(() => {
  console.log(props.projectTitle);
  return pages[props.projectTitle] || MotionProject;
});
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

  width: 20px;
  font-size: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px;
  position: fixed;
  top: 0px;
  right: 0px;
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
