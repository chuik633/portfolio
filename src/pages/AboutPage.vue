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

    <h4>BACKGROUND</h4>
    <p>

      I recently finished my MS in data visualization at Parsons ('25). In my
      undergrad at Rice ('24), I studied Math and Computer Science where I did
      CS research on gene visualization and math research in algebraic topology
      and presented at conferences like NCUWM. I love talking about number
      theory, groups, combinatorial problems, and probably anything you find
      interesting.
    </p>
    <p>
      <!-- Growing up I thought I would be a children book illustrator, then a photo
      journalist, then a mathematician, then a software engineer, and now? I'm
      not quite sure, but I want do something with a little bit of everything
      that feels both digital and physical and uses stories to connect with
      people. -->
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const profilSrc = `${import.meta.env.VITE_CDN_BASE}assets/about/profile.webp`;

const favProjects = [
  { label: "SoundStories", desc: "my thesis visualizing the sound behind films", route: "DVPopup", title: "Sound Stories" },
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
}
</style>
