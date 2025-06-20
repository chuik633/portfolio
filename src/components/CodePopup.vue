<template>
  <div
    class="code-popup"
    :style="{
      backgroundColor: props.mainColor,
      '--text-color': textClr,
      '--bgColor': props.mainColor,
    }"
  >
    <div class="popup-header row space-between med-gap">
      <div>
        <div class="project-title">{{ props.projectTitle }}</div>
        <div v-if="props.date" class="date">{{ props.date }}</div>
      </div>
      <button class="close-btn" @click="close">×</button>
    </div>
    <p v-if="props.description">{{ props.description }}</p>
    <div class="preview-container">
      <div class="code-container">
        <pre class="code-text no-select">{{ codeText }}</pre>
      </div>

      <div class="iframe-container">
        <iframe
          id="sketch-iframe"
          ref="iframe"
          :src="codeLink"
          frameborder="0"
          scrolling="no"
          @load="resizeIframe"
        ></iframe>
      </div>
    </div>

    <div v-if="props.projectLink" class="footer row justify-center">
      <button class="open-project light" @click="openProject">
        Open Project
      </button>
    </div>
  </div>
</template>

<style scoped>
.code-popup {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0vh;
  left: 0vw;
  border: 0.5px solid black;
  display: flex;
  flex-direction: column;
  padding: 50px;
  padding-bottom: 100px;
  overflow-y: auto;
  gap: 10px;
  --text-color: white;
  --bgColor: black;
}
.code-popup * {
  color: var(--text-color);
}
.code-container {
  max-width: 50%;
  width: fit-content;
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
.iframe-container {
  max-height: 60vh;
  max-width: 50%;
  width: fit-content;
  height: 100%;
  flex-shrink: 1;
}
iframe {
  height: 100%;
  width: 100%;
  min-width: 500px;
  border: 1px solid var(--text-color);
}
.code-text {
  white-space: pre-wrap;
  letter-spacing: -0.5px;
  padding: 20px;
  text-align: left;
  max-height: 60vh;
  overflow-y: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 10px;
  color: white;
  flex-shrink: 3;
  background-color: black;
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* standard */
}

.close-btn {
  font-family: Futura;
  font-weight: 100;
  top: -50px;
  right: -50px;
  width: 20px;
  font-size: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px;
  color: var(--text-color);
}
.close-btn:hover {
  background: var(--text-color);
  color: var(--bgColor);
}

.preview-container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 700px) {
  .preview-container {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
  }
  .iframe-container {
    max-height: 70vh;
    max-width: 100%;
    width: 100vw;
    min-height: 500px;
    height: fit-content;
    flex-shrink: 1;
  }
  .code-container {
    max-width: 100%;
  }
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  projectTitle: { type: String, required: true },
  projectLink: { type: String, default: undefined },
  description: { type: String, default: "" },
  date: { type: String, default: undefined },
  mainColor: { type: String, required: true },
});
const base = import.meta.env.BASE_URL;
const codeDir = base + `codeFiles/${props.projectTitle}/`;
const codeLink = `${codeDir}index.html`;
const codeSrcPath = `${codeDir}sketch.js`;
function close() {
  console.log("close click");
  router.push({ name: "CodeSketches" });
}

const codeText = ref("Loading code...");
const isDark = computed(() => isColorDark(props.mainColor));
const textClr = computed(() => (isDark.value ? "white" : "black"));

// resizeIframe(document.getElementById("sketch-iframe"));
// console.log("iframe resize");
onMounted(async () => {
  try {
    const res = await fetch(codeSrcPath);
    codeText.value = await res.text();
  } catch (e) {
    codeText.value = "Error loading code";
    console.error(e);
  }
});
function isColorDark(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 128;
}
function openProject() {
  window.open(props.projectLink, "_blank");
}

function resizeIframe(event) {
  const iframe = event.target;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  if (!iframeDoc || !iframeDoc.body) return;

  const container = iframe.parentElement;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const contentWidth = iframeDoc.body.scrollWidth;
  let contentHeight = iframeDoc.body.scrollHeight;

  if (contentHeight === 0) contentHeight = containerHeight;

  const scaleWidth = containerWidth / contentWidth;
  const scaleHeight = containerHeight / contentHeight;
  const scale = Math.min(scaleWidth, scaleHeight, 1);
  console.log("CONTAINER SIZE", containerWidth, containerHeight);
  iframe.style.transform = `scale(${scale})`;
  iframe.style.transformOrigin = "top left";
  iframe.style.width = `${contentWidth}px`;
  iframe.style.height = `${contentHeight}px`;
  iframe.style.position = "relative";

  const topOffset = (containerHeight - contentHeight * scale) / 2;
  iframe.style.top = `${topOffset}px`;
}
</script>
