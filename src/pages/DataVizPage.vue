<template>
  <div class="page">
    <h1 class="page-title">Data Viz</h1>
    <div class="grid">
      <PreviewBasic
        v-for="(sketch, i) in dvData"
        :key="sketch.projectTitle || i"
        :projectTitle="sketch.projectTitle"
        :projectLink="sketch.projectLink"
        :date="sketch.date"
        :description="sketch.description"
        :mainColor="sketch.mainColor"
        :imageFolder="sketch.imageFolder"
        :images="sketch.images"
        :videoLink="sketch.videoLink"
        @preview="handleDVPreview"
      />
    </div>
    <router-view :key="$route.fullPath" />
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>

<script setup>
import { ref } from "vue";
import PreviewBasic from "../components/PreviewBasic.vue";
import { dvData } from "../data/dvData.js";
import { useRouter } from "vue-router";
const router = useRouter();
function handleDVPreview({ projectTitle }) {
  if (!projectTitle) return;
  const target = dvData.find((s) => s.projectTitle === projectTitle);
  if (!target) return;
  router.push({
    name: "DVPopup",
    params: {
      title: encodeURIComponent(projectTitle),
    },
  });
}
</script>
