<template>
  <div class="image-list">
    <img
      v-for="(img, index) in images"
      :key="index"
      :src="`${imageFolder}${img}`"
      :alt="img"
      class="image-item"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true, // Array of image file names
  },
  imageFolder: {
    type: String,
    required: true, // Folder path for images, e.g. '/assets/images'
  },
});
</script>

<style scoped>
.image-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  gap: 8px;
  min-height: 100px;
  height: 150px;
  align-items: stretch;
  width: 100%;
}
.image-item {
  min-height: 100px;
  height: auto;
  width: auto;
  flex: 0 0 auto;
  min-width: 80px;
  object-fit: cover;
  flex: 0 0 auto;
  border: 0.1px solid black;
}
</style>
