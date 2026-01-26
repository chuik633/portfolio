<template>
  <div class="page">
    <h1 class="page-title">Code Sketches</h1>
    <div class="grid">
      <PreviewBasic
        v-for="(sketch, i) in p5Data"
        :projectTitle="sketch.projectTitle"
        :projectLink="sketch.projectLink"
        :date="sketch.date"
        :description="sketch.description"
        :mainColor="sketch.mainColor"
        :imageFolder="sketch.imageFolder"
        :images="sketch.images"
        :videoLink="sketch.videoLink"
        @preview="handlePreview"
      />
    </div>
    <router-view />
  </div>
</template>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-title {
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}

.grid {
  padding: 0px;
  display: grid;
  gap: 0;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
:deep(.preview-basic img) {
  /* height: 60%; */
  /* max-height: 70%; */
  max-width: 100% !important;
  aspect-ratio: 1/1 !important;
  object-fit: cover !important;
}
:deep(.preview-basic) {
  aspect-ratio: 1/1.2;
}
</style>
<script setup>
import PreviewBasic from "../components/PreviewBasic.vue";
import { useRouter } from "vue-router";
import { p5Data } from "../data/p5Data.js";
// handle pop ups for code sketches
const router = useRouter();
function handlePreview({ projectTitle }) {
  router.push({
    name: "SketchPopup", // must match the child-route name you gave in router/index.js
    params: {
      title: encodeURIComponent(projectTitle),
    },
  });
}
</script>
