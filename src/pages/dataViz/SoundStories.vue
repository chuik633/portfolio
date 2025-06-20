<template>
  <div class="wide row">
    <div class="column">
      <video
        class="media-element"
        controls
        autoplay="true"
        src="/assets/projects/Sound Stories/final_compressed.mp4"
      ></video>
      <ImageList
        class="media-element"
        v-if="imageListLevel == 1"
        :images="images"
        :imageFolder="imageFolder"
      ></ImageList>
    </div>

    <div class="wide column">
      <p>
        This project was my thesis for my masters in Data Viz at Parsons NYC!
      </p>
      <p>
        I experimented with visualizing music, as music is a powerful story
        telling device that can express emotion, signify themes, and convey
        intensity. One of the ways I did this was by creating a
        <strong>dynamic font library</strong>
        to convey the intensity and tone of dialogue through captions. In the
        project, I outline my entire process (in both creating the data,
        typography, and other sketches), and include a page which lets people
        process their own data.
      </p>
      <p>
        In the backend, I built my own processing pipeline with yt-dlp and
        FFMPEG to download youtube videos, extract image data, audio data, and
        captions. I used FFTs, spectrograms, and chromagrams to process the
        audio files, and I used clustering on the colors of the film to get
        thematic color palettes. For the backend, I used Docker, fly.io, and
        supabase to store the uploaded youtube data.
      </p>
      <p>
        Through this process, I've learned so much about audio processing, story
        telling, and sound visualization, and I hope to continue developing this
        project.
      </p>
      <a href="https://chuik633.github.io/SoundStories/#about"
        >Read about how it works!</a
      >
    </div>
  </div>
  <ImageList
    v-if="imageListLevel == 0"
    :images="images"
    :imageFolder="imageFolder"
  ></ImageList>

  <h2>Process</h2>
  <p>
    I used p5 to create different audio driven fonts. I used elements of
    cinematography to inspire these fonts (scale, perspective, light, symmetry,
    motion blur, and repitition). Below are some of the breakdowns of how I
    converted the audio => fonts.
  </p>
  <img :src="imageFolder + 'blur_font.png'" />
  <img :src="imageFolder + 'strings_font.png'" />
  <p>
    Since I wanted the colors/vibe of each page to match each film, I experiment
    with different methods for extracting colors from each scene.
  </p>
  <ImageList
    :images="['colors.png', 'colors2.png', 'figma.png']"
    :imageFolder="imageFolder"
  ></ImageList>
</template>
<script setup>
import ImageList from "../../components/imageLayouts/ImageList.vue";
import { dvDataTitle } from "../../data/dvData";
const { images, processImages, codeLink, mainColor, imageFolder } =
  dvDataTitle["Sound Stories"];
import { ref, onMounted } from "vue";

const imageListLevel = ref(1);
function getImageListLevel() {
  if (window.innerWidth > 1200) {
    imageListLevel.value = 0;
  } else {
    imageListLevel.value = 1;
  }
}
onMounted(() => {
  getImageListLevel();
});

window.addEventListener("resize", () => {
  console.log(imageListLevel.value);
  getImageListLevel();
});
</script>

<style scoped>
.media-element {
  max-height: 50vh;
  max-width: 60vw;
  width: fit-content;
}
video {
  max-height: 50vh;
  max-width: 60vw;
  width: fit-content;
}
.wide {
  display: flex;
  gap: 20px;
  width: 100%;
  height: fit-content;
  overflow-x: visible;
}
img {
  min-height: 100px;
  width: 100%;
  height: auto;
  object-fit: contain;
  align-content: start;
}
@media (max-width: 900px) {
  .media-element {
    max-width: 50vw;
  }
}

@media (max-width: 750px) {
  /* .column {
    flex-direction: row;
  } */
  .media-element {
    max-width: 100%;
  }
  .row {
    flex-direction: column;
  }
}
</style>
