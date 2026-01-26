<template>
  <div class="page">
    <h1 class="page-title">Design</h1>
    <div class="grid">
      <PreviewBasic
        v-for="(sketch, i) in designData"
        :projectTitle="sketch.projectTitle"
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>

<script setup>
import { ref } from "vue";
import PreviewBasic from "../components/PreviewBasic.vue";
import { designData } from "../data/designData.js";
import { useRouter } from "vue-router";
const router = useRouter();
function handlePreview({ projectTitle }) {
  router.push({
    name: "DesignPopup",
    params: {
      title: encodeURIComponent(projectTitle),
    },
  });
}
console.log(designData);
</script>
