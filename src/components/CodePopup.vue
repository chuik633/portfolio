<template>
  <div class="code-popup" :style="{ backgroundColor: props.mainColor }">
    <div class="popup-header row space-between med-gap">
      <div>
        <div class="project-title">{{ props.projectTitle }}</div>
        <div v-if="date" class="date">{{ props.date }}</div>
      </div>
      <button class="close-btn" @click="close">×</button>
    </div>

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
      <button class="open-project" @click="openProject">Open Project</button>
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
  gap: 10px;
}
.code-container {
  width: 50%;
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
  border: 1px solid black;
  max-height: 60vh;
  width: 50%;
  height: 100%;
  flex-shrink: 1;
}
iframe {
  height: 100%;
  width: 100%;
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
}
.close-btn:hover {
  background: black;
  color: white;
}

.preview-container {
  display: flex;
  flex-direction: row;
}
@media (max-width: 600px) {
  .preview-container {
    display: flex;
    flex-direction: column;
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
  date: { type: String, default: undefined },
  mainColor: { type: String, required: true },
});
const codeDir = `../codeFiles/${props.projectTitle}/`;
const codeLink = `${codeDir}index.html`;
const codeSrcPath = `${codeDir}sketch.js`;
function close() {
  console.log("close click");
  router.push({ name: "CodeSketches" });
}

const codeText = ref("Loading code...");

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

  iframe.style.transform = `scale(${scale})`;
  iframe.style.transformOrigin = "top left";
  iframe.style.width = `${contentWidth}px`;
  iframe.style.height = `${contentHeight}px`;
  iframe.style.position = "relative";

  const topOffset = (containerHeight - contentHeight * scale) / 2;
  iframe.style.top = `${topOffset}px`;
}
</script>
