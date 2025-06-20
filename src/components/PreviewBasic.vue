<template>
  <div
    class="preview-basic"
    :style="containerStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="
      emit('preview', {
        projectTitle: props.projectTitle,
      })
    "
  >
    <div class="row">
      <div class="project-title">{{ props.projectTitle }}</div>
      <div v-if="date" class="date">{{ props.date }}</div>
    </div>

    <img
      :src="currentImageSrc"
      :style="imgStyle"
      @mouseover="imgHover = true"
      @mouseleave="imgHover = false"
      @click="nextImage"
    />

    <div v-if="description" class="description hide-scrollbar">
      {{ props.description }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["preview"]);
const props = defineProps({
  projectTitle: { type: String, required: true },
  projectLink: { type: String, required: false },
  date: { type: String, required: false },
  description: { type: String, required: false },
  mainColor: { type: String, required: true },
  images: { type: Array, default: () => [] },
  imageFolder: {
    type: String,
    default: `/assets/sketch_images/`,
  },
});

function isColorDark(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 128;
}
const hover = ref(false);
const imgHover = ref(false);

const idx = ref(0);
const currentImageSrc = computed(
  () => `${props.imageFolder}${props.images[idx.value]}`
);
function nextImage() {
  idx.value = (idx.value + 1) % props.images.length;
}

const dark = isColorDark(props.mainColor);
const frontColor = dark ? "#FFFFFF" : "#000000";

const containerStyle = computed(() => ({
  backgroundColor: hover.value ? props.mainColor : "inherit",
  color: hover.value ? frontColor : "black",
  cursor: props.projectLink ? "pointer" : "default",
}));

const imgStyle = computed(() => ({
  border: imgHover.value ? "1px solid black" : ".3px solid black",
}));
</script>

<style scoped>
.preview-basic {
  flex-shrink: 0;
  border: 0.1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;

  width: 100%;
  aspect-ratio: 1 / 1;

  padding: 50px;
  transition: background-color 0.2s ease;
  gap: 20px;
}

.date {
  font-size: 8px;
  font-weight: 100;
  width: fit-content;
}
.description {
  font-size: 8px;
  overflow-y: auto;
  height: 100%;
  min-height: 50px;
  line-height: 130%;
  font-family: "Courier New";
}
.project-title {
  font-size: 13px;
  width: fit-content;
}

.row {
  justify-content: space-between;
  align-items: flex-end;
}
</style>
