<template>
  <div class="about-page">
    <h1 class="name">KATHERINE CHUI</h1>

    <div class="intro-row">
      <img :src="profilSrc" class="profile-img" />
      <p class="intro-text">
        Welcome to my digital sketchbook/archive! I'm fascinated by using data,
        code, and math to create art and tell multi-sensory stories. This
        sketchbook ranges from p5 experiments and mini games to my full stack
        data viz projects.
      </p>
    </div>

    <h4>FAVORITE PROJECTS</h4>
    <ul>
      <li v-for="fav in favProjects" :key="fav.name" @click="openLink(fav)">
        <h5>{{ fav.label }}</h5>
        &nbsp;- {{ fav.desc }}
      </li>
    </ul>
    <!-- <div class="favorites-section">
    <div class="favorites-grid">
      <PreviewBasic
        v-for="project in cardFavorites"
        :key="project.projectTitle"
        :projectTitle="project.projectTitle"
        :date="project.date"
        :description="project.description"
        :mainColor="project.mainColor"
        :imageFolder="project.imageFolder"
        :images="project.images"
        :videoLink="project.videoLink"
        @preview="handlePreview(project)"
      />
      <div
        v-for="art in artFavorites"
        :key="art.name"
        class="art-item"
      >
        <img :src="artBase + art.name" :alt="art.name" loading="lazy" />
        <div class="art-overlay">
          <p>{{ art.desc }}</p>
        </div>
      </div>
    </div>
    </div> -->

    <h4>BACKGROUND</h4>
    <p>
      I'm currently at the New York times where I've covered stories on <a href="https://www.nytimes.com/interactive/2026/06/01/climate/gulf-oil-gas-whale-sounds.html">rare whales</a>,
      <a href="https://www.nytimes.com/interactive/2026/04/30/us/politics/voting-rights-act-black-population-congress.html">the Voting Rights act</a>, 
      <a href="https://www.nytimes.com/interactive/2026/06/16/magazine/jeffrey-epstein-death-final-days.html">Epstein's death</a>, and <a href="https://www.nytimes.com/by/katherine-chui">more...</a>.

      Before that, I got my MS in data visualization at Parsons ('25) and studied math and computer science at Rice University ('24).
      There, I did research on gene visualization and algebraic topology. I love talking about sound, experimenting with light, 
      number theory, groups, combinatorial problems, and probably anything you find interesting.
      
      I want to tell stories that feel tangible and resonant.
    </p>
  </div>

 
  
</template>

<script setup>
import { useRouter } from "vue-router";
import PreviewBasic from "../components/PreviewBasic.vue";
import { dvData } from "../data/dvData.js";
import { designData } from "../data/designData.js";
import { p5Data } from "../data/p5Data.js";
import { artData } from "../data/artData.js";

const router = useRouter();
const profilSrc = `${import.meta.env.VITE_CDN_BASE}assets/about/profile.webp`;
const artBase = import.meta.env.VITE_CDN_BASE + "assets/physicalArt/";

const cardFavorites = [
  ...dvData.filter((d) => d.favorite === "true").map((d) => ({ ...d, _source: "dv" })),
  ...designData.filter((d) => d.favorite === "true").map((d) => ({ ...d, _source: "design" })),
  ...p5Data.filter((d) => d.favorite === "true").map((d) => ({ ...d, _source: "p5" })),
];

const artFavorites = artData.filter((d) => d.favorite === "true");

const popupRoutes = {
  dv: "DVPopup",
  design: "DesignPopup",
  p5: "SketchPopup",
};

function handlePreview(project) {
  const routeName = popupRoutes[project._source];
  router.push({
    name: routeName,
    params: { title: encodeURIComponent(project.projectTitle) },
  });
}

const favProjects = [
{ label: "Whales", desc: "a story I pitched at the NYT on the sounds of oil and gas surveys", external: "https://www.nytimes.com/interactive/2026/06/01/climate/gulf-oil-gas-whale-sounds.html", title: "Dive Into a Very Noisy Sea With Some Very Rare Whales"},
  { label: "SoundStories", desc: "visualizing the sound behind films", route: "DVPopup", title: "Sound Stories" },
  { label: "Grey Day", desc: "a digital music card for someone having a grey-ish day", route: "SketchPopup", title: "Grey Day" },
  { label: "MOIA", desc: "a platformer game in godot where art pieces come to life", external: "https://www.kchuiart.com/current-projects" },
  { label: "Paper City", desc: "a 3D paper world I built (that I would like to live in)", external: "https://www.kchuiart.com/paper-city" },
];

function openLink(fav) {
  if (fav.external) {
    window.open(fav.external, "_blank");
  } else if (fav.route) {
    router.push({ name: fav.route, params: { title: encodeURIComponent(fav.title) } });
  }
}
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 200px;

}
h1{
  margin:0px;
}
.name {
  font-size: 30px;
  letter-spacing: 6px;
}
.intro-row {
  display: flex;
  gap: 20px;
  align-items: center;
  /* padding: 20px 0 30px; */
}
.profile-img {
  width: 30%;
  max-width: 180px;
  object-fit: cover;
}
.intro-text {
  text-align: left;
  flex: 1;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
p,
li,
li h5 {
  font-family: "Courier New", Courier, monospace;
  font-weight: 100;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1.5;
  text-align: left;
}
li h5 {
  width: fit-content;
  white-space: nowrap;
}
li {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
li:hover {
  text-decoration: underline;
}
li:hover h5 {
  font-weight: 700;
}
h4 {
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 700;
}

.favorites-section {
  width: 80vw;
  margin-top: 40px;
  margin-bottom: -200px;
}
.favorites-grid {
  display: grid;
  gap: 0;
  grid-template-columns: repeat(3, 1fr);
}
.art-item {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 0.1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.art-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.art-overlay {
  position: absolute;
  inset: 0;
  background-color: #fbfaf7c0;
  border: 0.5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 2rem;
}
.art-item:hover .art-overlay {
  opacity: 1;
}

@media (max-width: 600px) {
  .intro-row {
    flex-direction: column;
  }
  .profile-img {
    width: 50%;
  }
  p,
  li,
  li h5 {
    font-size: 11px;
  }
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
