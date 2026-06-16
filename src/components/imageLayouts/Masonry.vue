<template>
  <div class="masonry-grid">
    <img
      v-for="name in props.images"
      :key="name"
      :src="`${props.imageFolder}${name}`"
      :alt="name"
      loading="lazy"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  imageFolder: { type: String, required: true },
});
</script>
<style scoped>
.masonry-grid {
  column-count: 3;
  column-gap: 1em;
  padding: 1em;
}

.masonry-grid img {
  width: 100%;
  margin-bottom: 1em;
  display: block;
  break-inside: avoid;
  object-fit: contain;
  height: auto;
}
.masonry-grid img:hover {
  width: 100%;
  margin-bottom: 1em;
  display: block;
  break-inside: avoid;
  border-radius: 4px;
}
@media (max-width: 1000px) {
  .masonry-grid {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .masonry-grid {
    column-count: 1;
  }
}
</style>
