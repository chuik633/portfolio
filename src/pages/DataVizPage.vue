<template>
  <div class="grid">
    <PreviewBasic
      v-for="(sketch, i) in dvData"
      :projectTitle="sketch.projectTitle"
      :projectLink="sketch.projectLink"
      :date="sketch.date"
      :description="sketch.description"
      :mainColor="sketch.mainColor"
      :imageFolder="sketch.imageFolder"
      :images="sketch.images"
      @preview="handleDVPreview"
    />
  </div>
  <router-view />
</template>

<style scoped>
.grid {
  padding: 0px 80px;
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
  console.log("HERE", encodeURIComponent(projectTitle));
  router.push({
    name: "DVPopup",
    params: {
      title: encodeURIComponent(projectTitle),
    },
  });
}
</script>
