<template>
  <VueScrollama
    :offset="0"
    @step-enter="onStepEnter"
    class="scroller-container"
  >
    <div v-for="i in numSteps" :key="i" class="progress-step"></div>
  </VueScrollama>
  <div class="about-fixed">
    <h1
      class="name"
      :style="{
        fontSize: fontSize + 'px',
        top: `${yShift}%`,
      }"
      ref="nameRef"
    >
      KATHERINE CHUI
    </h1>

    <div class="about-scroll">
      <p>
        Welcome to my digital sketchbook/archive! I’m fascinated by using data,
        code, and math to create art and tell multi-sensory stories. This
        sketchbook ranges from p5 experiments and mini games to my full stack
        data viz projects.
      </p>
      <h4>FAVORITE PROJECTS</h4>
      <ul>
        <li class="soundstories">
          <h5>SoundStories</h5>
          - my thesis visualizing the sound behind films
        </li>
        <li class="greyday">
          <h5>Grey Day</h5>
          - a digital music card for someone having a grey-ish day
        </li>
        <li class="moia">
          <h5>MOIA</h5>
          - a platformer game in godot where art pieces come to life
        </li>
        <li class="papercity">
          <h5>Paper City</h5>
          - a 3D paper world I built (that I would like to live in)
        </li>
      </ul>

      <h4>BACKGROUND</h4>
      <p>
        I recently finished my MS in data visualization at Parsons (’25). In my
        undergrad at Rice (’24), I studied Math and Computer Science, but have
        always loved visual art and working across disciplines.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import "intersection-observer";
import VueScrollama from "vue3-scrollama";
import * as d3 from "d3";
import { favorites } from "../data/favorites.js";

const numSteps = 300;
const fontSize = ref(100);
const yShift = ref(30);
const fontScale = d3.scaleLinear().domain([0, numSteps]).range([80, 24]);
const startW = 20;
let animationtimer = null;
const topBoundary = 0;
const speed = 0.1;
const bottomBoundary = window.innerHeight - 80;
function onStepEnter({ index }) {
  if (index >= numSteps - 2) {
    console.log(index);
    if (animationtimer) {
      return;
    }
    animationtimer = d3.timer((elapsed) => {
      let dy;
      d3.selectAll(".img-node")
        .style("left", (d) => {
          return `${d.x1}px`;
        })
        .style("top", (d, i) => {
          if (i % 2 == 0) {
            dy = -speed;
            if (d.y < topBoundary) {
              d.y = bottomBoundary;
            }
          } else {
            dy = speed;
            if (d.y > bottomBoundary) {
              d.y = topBoundary;
            }
          }
          d.y += dy;
          return `${d.y}px`;
        });
      // return;
    });
  } else {
    if (animationtimer != null) {
      animationtimer.stop();
      animationtimer = null;
    }
  }
  fontSize.value = fontScale(index);
  const progress = (index - 1) / numSteps;
  d3.select(".about-scroll").style("top", `calc( ${(1 - progress) * 100}%)`);
  yShift.value = (1 - progress ** 3) * 30;
  d3.selectAll(".img-node")
    .style("width", (d) => `${startW + (d.endW - startW) * progress}px`)
    .style("top", (d) => {
      const interp = d3.interpolateNumber(d.y0, d.y1);
      d.y = interp(progress);
      return `${d.y}px`;
    })
    .style("left", (d) => {
      const interp = d3.interpolateNumber(d.x0, d.x1);
      return `${interp(progress)}px`;
    })
    .style("transform", (d) => {
      const interp = d3.interpolateNumber(0, d.endAngle);
      return `rotate(${Math.floor(interp(progress ** 3))}deg) `;
    })
    .style("pointer-events", () => {
      if (progress > 0.8) {
        return "auto";
      } else {
        return "none";
      }
    });
}

onMounted(async () => {
  const cw = window.innerWidth;
  const ch = window.innerHeight - 80;

  const cx = cw / 2;
  const cy = ch * 0.3;

  //move out
  const r0 = 200;

  const angle = d3
    .scaleLinear()
    .domain([0, favorites.length])
    .range([0, 2 * Math.PI]);
  let lefty = 80;
  let righty = 80;
  favorites.forEach((d, i) => {
    const a = angle(i);
    const gap = 100;
    d.x0 = cx + Math.cos(a) * r0;
    d.y0 = cy + Math.sin(a) * r0;
    d.y = d.y0;
    // d.endAngle = Math.random() * 90 - 45;
    d.endAngle = 0;
    d.endW = Math.random() * 50 + 50;
    if (i % 2 == 0) {
      d.x1 = window.innerWidth * 0.15;
      d.y1 = lefty;
      lefty += d.endW + gap;
    } else {
      d.x1 = window.innerWidth - window.innerWidth * 0.15;
      d.y1 = righty;
      righty += d.endW + gap;
    }
  });

  // setup the images
  d3.select(".about-fixed")
    .selectAll("img")
    .data(favorites)
    .enter()
    .append("img")
    .attr("class", (d) => "img-node " + d.name)
    .attr("src", (d) => `./assets/about/favorites/${d.name}.${d.ext}`)
    .attr("alt", (d) => d.name)
    .style("top", (d, i) => `${d.y0}px`)
    .style("left", (d, i) => `${d.x0}px`)
    .style("width", `${startW}px`)
    .style("pointer-events", "none")
    .style("object-fit", "contain")
    .style("position", "absolute")
    .style("border", ".4px solid black")
    .style("transform-origin", "center")
    .style("transform", "rotate(0deg) ")
    .style("transition", "transform .2s ease-in-out")
    .on("mouseover", function (event, d) {
      d3.select(this).style("transform", " rotate(0deg) scale(2)");
    })
    .on("mouseleave", function (event, d) {
      d3.select(this)
        .style("border", ".4px solid black")
        .style("transform", `rotate(${d.endAngle}deg)`);
    })
    .on("click", (d) => {
      window.open(d.link, "_blank");
    });

  d3.selectAll("li")
    .on("mouseover", function (d) {
      const name = d3.select(this).attr("class");
      d3.selectAll(`.img-node.${name}`)
        .style("transition", "transform .2s ease-in-out")
        .style("transform", "rotate(0deg) scale(2)");
    })
    .on("mouseleave", function (d) {
      const name = d3.select(this).attr("class");
      d3.selectAll(`.img-node.${name}`)
        .style("border", ".1px solid black")
        .style("width", (d) => d.endW + "px")
        .style("transform", (d) => `rotate(${d.endAngle}deg)`);
    })
    .on("click", function (d) {
      const name = d3.select(this).attr("class");
      const entry = favorites.filter((e) => e.name == name)[0];
      window.open(entry.link, "_blank");
    });
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.about-fixed {
  position: fixed;
  z-index: 1;
  top: 100px;
  height: calc(100vh - 80px);
  width: 100vw;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px;
}
.about-scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: fit-content;

  position: relative;
  max-width: 400px;
  align-self: center;
  position: relative;
  /* top: 100%; */
}
ul {
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
}
p,
li,
li h5 {
  font-family: "Courier New", Courier, monospace;
  font-weight: 100;
  font-size: 9px;
  letter-spacing: 0;
  line-height: 1.5;
  text-align: justify;
}
/* li::marker {
  display: none;
} */
li h5 {
  width: fit-content;
  text-wrap: nowrap;
  white-space: nowrap;
}
li {
  display: flex;
  flex-direction: row;
  pointer-events: auto;
}
li:hover {
  text-decoration: underline;
}
li:hover h5 {
  font-weight: 700;
}
h4 {
  margin-top: 20px;
  margin-bottom: 0px;
  font-size: 10px;
  font-weight: 700;
  width: 100%;
}
.scroller-container {
  position: fixed;
  top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 100vh;
  /* padding-top: 50px; */

  /* background: linear-gradient(to bottom, #ffc0cb, #add8e6); */
}
.progress-step {
  height: 5px;
  /* border: 0.1px solid black; */
}
.name {
  pointer-events: none;
  font-size: 80px;
  text-wrap: no-wrap;
  z-index: 1;
  position: relative;
  transition: all 0.1 ease;
}
</style>
