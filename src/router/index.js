import { createRouter, createWebHistory } from "vue-router";
import AboutPage from "../pages/AboutPage.vue";
import DataVizPage from "../pages/DataVizPage.vue";
import CodeSketchesPage from "../pages/CodeSketchesPage.vue";
import PhysicalArtPage from "../pages/PhysicalArtPage.vue";
import CodePopup from "../components/CodePopup.vue";
import { p5Data } from "../data/p5Data.js";

const routes = [
  { path: "/about", name: "About", component: AboutPage },
  { path: "/data-viz", name: "DataViz", component: DataVizPage },
  {
    path: "/code-sketches",
    name: "CodeSketches",
    component: CodeSketchesPage,
    children: [
      {
        path: ":title",
        name: "SketchPopup",
        component: CodePopup,
        props: (route) => {
          const props = route.params;
          const title = decodeURIComponent(props.title);
          const sketch = p5Data.find((s) => s.projectTitle === title);
          return sketch
            ? {
                projectTitle: sketch.projectTitle,
                projectLink: sketch.projectLink,
                codeLink: sketch.codeLink,
                date: sketch.date,
                mainColor: sketch.mainColor,
              }
            : {};
        },
      },
    ],
  },
  { path: "/physical-art", name: "PhysicalArt", component: PhysicalArtPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
