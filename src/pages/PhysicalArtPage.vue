<template>
  <div class="page physical-art-page">
    <h2>PHYSICAL ART</h2>
    <button class="light" @click="openExternalSite">
      See My Full Art Site
    </button>
    <div class="masonry-grid">
      <div v-for="(art, i) in artData" :key="art.name" class="art-item">
        <img :src="basePath + art.name" :alt="art.name" />
        <div class="overlay">
          <p>{{ art.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { artData } from "../data/artData.js";

const basePath = import.meta.env.BASE_URL + "assets/physicalArt/";
function openExternalSite() {
  window.open("https://kchuiart.com", "_blank");
}
</script>

<style scoped>
.physical-art-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.masonry-grid {
  column-count: 3;
  column-gap: 8px;
}

@media (max-width: 900px) {
  .masonry-grid {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .masonry-grid {
    column-count: 1;
  }
}

.art-item {
  display: inline-block;
  width: 100%;
  margin: 0 0 8px;
  position: relative;
  break-inside: avoid;
}
.art-item img {
  display: block;
  width: 100%;
  height: auto;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fbfaf7c0;
  border: 0.5px solid black;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
}
.overlay p {
  color: black;
}
.art-item:hover .overlay {
  opacity: 1;
}
</style>
