const start = `${import.meta.env.VITE_CDN_BASE}`;
export const designData = [
  {
    projectTitle: "MOIA (Museum of Immersive Art)",
    date: "GAME",
    images: ["1.mov", "e2.mov", "2.png", "menu.mov"],
    links: {
      "steam page": `https://store.steampowered.com/app/2929400/Museum_of_Immersive_Art/`,
    },
    description: `
    An illustrated game I made with my friends, Jessica Opsahl-Ong, Theo Schweizer, and Desmond Roberts using a combo of Figma, Procreate, and Godot. 
    All of the assets are hand drawn/created to match a painting. The game follows an artist who steps into different paintings to explore platformer levels with mechanics and visuals based on each artword.
    The first level is inspired by MC Escher and plays with gravity. The second level is based off of Van Gogh and uses light/light refilling as a mechanic. The final level is based on Dali and plays with time where players can speed/slow down different enemies that they must jump on to defeat. 
    `,
    processImages: [
      "escherprocess.png",
      "vprocess.png",
      "dali_process1.png",
      "dali_process2.png",
    ],
    imageFolder: start + "assets/games/MOIA/",
    basic: true,
    mainColor: "#FFFFFF",
  },
  {
    projectTitle: "Noguchi",
    date: "MOTION",
    description: `Coded typography inspired by stretching lamps, icons representing morphing rock sculptures, and fun, airy layouts to showcase this museum. After effects + p5`,
    images: [
      "compiled.webm",
      "1-logo.webm",
      "2-homepage.webm",
      "3-shop.webm",
      "4-archives.webm",
      "5-exhibits.webm",
    ],
    processImages: [],
    icons: [
      "light2.webm",
      "longrock.webm",
      "rocks 2_1.webm",
      "sculptingworlds.webm",
      "shopping_1.webm",
      "search.webm",
    ],
    logoExplores: [
      {
        src: "1.webm",
        description: `I wanted to play with texture and 3d to create text that matched the floating, meditative, and physical/natural aspects of Noguchi's work.`,
      },
      {
        src: "2.webm",
        description: `The way noguchi uses light in both his rock and akari sculptures fascinates me. 
    His sculptures are still, but when they interact with light and different 
    environments, they morph. I wanted to emulate this with text, and was initially 
    inspired by the ribbing of his Akari light scultpures and wondered what it would look like to run your fingers across them. 
    I ended up going with this concept but abstracting it to give more contrast.`,
      },
      {
        src: "3.webm",
        description: `This logo focuses on the different sillhouetes of each sculpture in his museum. It changes as the user clicks to create varying logos. `,
      },
    ],
    imageFolder: start + "assets/motion/noguchi/",
    basic: true,
    mainColor: "#FFFFFF",
  },
  {
    projectTitle: "Renegade Craft",
    date: "MOTION",
    description: `Redesign for Renegade craft. In this project I played with bright risograph colors and textures. I used procreate to create some hand drawn animations in addition to after effects. After effects + procreate`,
    images: [
      "Final.webm",
      "1openingscreen.webm",
      "2vendors.webm",
      "3menu.webm",
      "scrollscreeen_1.webm",
      "4funsearch.webm",
    ],
    logoExplores: [
      {
        src: "1.webm",
        description: `I tried to capture a fun, playful vibe with this logo using wiggly lines and faces`,
      },
      {
        src: "2.webm",
        description: `This is another motion explore of the first logo. I used the pucker/bloat effect and trim paths to make the text reveal.`,
      },
      {
        src: "3.webm",
        description: `This concept uses bold text that stretches to emphasize different letters. It can be used as masks for videos, etc.`,
      },
      {
        src: "4.webm",
        description: `Playing with shape morphing and a custom font I made that felt round and uniform like the stands at the fairs. I ultimately chose this one to expand upon`,
      },
    ],
    processImages: [],
    imageFolder: start + "assets/motion/renegade/",
    basic: true,
    mainColor: "#FDF9F0",
  },
  {
    projectTitle: "Generative Motion Explores",
    date: "MOTION",
    description: `Playing around with different generative tools by spacetypegenerator.com, Studio DIA, and Antilli! Combined with after effects, these are so cool! `,
    images: ["allposters.webm"],
    processImages: [],
    imageFolder: start + "assets/motion/generative/",
    basic: true,
    mainColor: "#000000",
  },
  {
    projectTitle: "Art + Code",
    date: "MOTION",
    description: `Black and white typographic illustration about art and code! I created it in AE then tried to riso print the animation. I love making digital things physical.`,
    images: ["riso.webm", "textt.webm"],
    processImages: [],
    imageFolder: start + "assets/motion/type/",
    basic: true,
    mainColor: "#000000",
  },
  {
    projectTitle: "Motion Experiments",
    date: "MOTION",
    description: `Some of my intro after effects projects where I played with easing, shape morphing, paths, and more!`,
    images: ["paper studio_texture.webm", "Comp 1.webm"],
    processImages: [],
    imageFolder: start + "assets/motion/paper/",
    basic: true,
    mainColor: "#DACE6D",
  },
];
