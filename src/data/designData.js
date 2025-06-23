const start = `${import.meta.env.BASE_URL}`;
export const designData = [
  {
    projectTitle: "Noguchi",
    date: "MOTION",
    description: `Coded typography inspired by stretching lamps, icons representing morphing rock sculptures, and fun, airy layouts to showcase this museum. After effects + p5`,
    images: [
      "compiled.mp4",
      "1-logo.mp4",
      "2-homepage.mp4",
      "3-shop.mp4",
      "4-archives.mp4",
      "5-exhibits.mp4",
    ],
    processImages: [],
    icons: [
      "light2.mp4",
      "longrock.mp4",
      "rocks 2_1.mp4",
      "sculptingworlds.mp4",
      "shopping_1.mp4",
      "search.mp4",
    ],
    logoExplores: [
      {
        src: "1.mp4",
        description: `I wanted to play with texture and 3d to create text that matched the floating, meditative, and physical/natural aspects of Noguchi's work.`,
      },
      {
        src: "2.mov",
        description: `The way noguchi uses light in both his rock and akari sculptures fascinates me. 
    His sculptures are still, but when they interact with light and different 
    environments, they morph. I wanted to emulate this with text, and was initially 
    inspired by the ribbing of his Akari light scultpures and wondered what it would look like to run your fingers across them. 
    I ended up going with this concept but abstracting it to give more contrast.`,
      },
      {
        src: "3.mov",
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
      "Final.mp4",
      "1openingscreen.mp4",
      "2vendors.mp4",
      "3menu.mp4",
      "scrollscreeen_1.mp4",
      "4funsearch.mp4",
    ],
    logoExplores: [
      {
        src: "1.mp4",
        description: `I tried to capture a fun, playful vibe with this logo using wiggly lines and faces`,
      },
      {
        src: "2.mp4",
        description: `This is another motion explore of the first logo. I used the pucker/bloat effect and trim paths to make the text reveal.`,
      },
      {
        src: "3.mp4",
        description: `This concept uses bold text that stretches to emphasize different letters. It can be used as masks for videos, etc.`,
      },
      {
        src: "4.mp4",
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
    images: ["allposters_1.mp4"],
    processImages: [],
    imageFolder: start + "assets/motion/generative/",
    basic: true,
    mainColor: "#000000",
  },
  {
    projectTitle: "Texture Experiments",
    date: "MOTION",
    description: `Some of my intro after effects projects where I played with easing, shape morphing, paths, and more!`,
    images: ["paper studio_texture.mp4", "Comp 1.mp4"],
    processImages: [],
    imageFolder: start + "assets/motion/paper/",
    basic: true,
    mainColor: "#DACE6D",
  },
];
