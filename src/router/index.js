import { createRouter, createWebHashHistory } from "vue-router";
import AboutPage from "../pages/AboutPage.vue";
import { p5Data } from "../data/p5Data.js";
import { dvData } from "../data/dvData.js";
import { designData } from "../data/designData.js";

const routes = [
  { path: "/", name: "About", component: AboutPage },
  {
    path: "/data-viz",
    name: "DataViz",
    component: () => import("../pages/DataVizPage.vue"),
    children: [
      {
        path: ":title",
        name: "DVPopup",
        component: () => import("../components/DVPopup.vue"),
        props: (route) => {
          const props = route.params;
          const title = decodeURIComponent(props.title);
          const project = dvData.find((s) => s.projectTitle === title);
          return project
            ? {
                ...project,
              }
            : {};
        },
      },
    ],
  },
  {
    path: "/design-projects",
    name: "DesignProjects",
    component: () => import("../pages/DesignPage.vue"),
    children: [
      {
        path: ":title",
        name: "DesignPopup",
        component: () => import("../components/DesignPopup.vue"),
        props: (route) => {
          const props = route.params;
          const title = decodeURIComponent(props.title);
          console.log("title", title);
          const project = designData.find((s) => s.projectTitle === title);
          return project
            ? {
                ...project,
              }
            : {};
        },
      },
    ],
  },
  {
    path: "/code-sketches",
    name: "CodeSketches",
    component: () => import("../pages/CodeSketchesPage.vue"),
    children: [
      {
        path: ":title",
        name: "SketchPopup",
        component: () => import("../components/CodePopup.vue"),
        props: (route) => {
          const props = route.params;
          const title = decodeURIComponent(props.title);
          const sketch = p5Data.find((s) => s.projectTitle === title);
          return sketch
            ? {
                projectTitle: sketch.projectTitle,
                projectLink: sketch.projectLink,
                description: sketch.description,
                date: sketch.date,
                mainColor: sketch.mainColor,
              }
            : {};
        },
      },
    ],
  },
  { path: "/physical-art", name: "PhysicalArt", component: () => import("../pages/PhysicalArtPage.vue") },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
