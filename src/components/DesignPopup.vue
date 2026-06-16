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
      <button
        class="light"
        v-if="props.links"
        v-for="linkinfo of Object.entries(props.links)"
        @click="openProject(linkinfo[1])"
      >
        {{ linkinfo[0] }}
      </button>
      <component v-if="props.basic" :is="currentPage" v-bind="props" />
    </div>
  </Teleport>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import * as d3 from "d3";
import { isColorDark, isVideo } from "./helpers";
const router = useRouter();
function openProject(link) {
  console.log(link);
  window.open(link, "_blank");
}
const props = defineProps({
  projectTitle: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: String, default: undefined },
  links: { type: Object, required: false },
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
import ArtCode from "../pages/design/ArtCode.vue";
const pages = {
  Noguchi: MotionProject,
  "Renegade Craft": MotionProject,
  "Art + Code": ArtCode,
};
const currentPage = computed(() => {
  console.log(props.projectTitle);
  return pages[props.projectTitle] || MotionProject;
});
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
