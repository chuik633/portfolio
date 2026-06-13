const cdnBase = `${import.meta.env.VITE_CDN_BASE || import.meta.env.BASE_URL || "/"}`;
const noncdn_start = `${import.meta.env.BASE_URL || "/"}`;

export const dvData = [
  {projectTitle:"Rice's Whales",
    projectLink:"https://www.nytimes.com/interactive/2026/06/01/climate/gulf-oil-gas-whale-sounds.html",
    date:"June 2026",
    videoLink:`${noncdn_start}assets/projects/Whales/1.mp4`,
    mainColor:"#030937",
    imageFolder:cdnBase + "assets/projects/Whales/",
    basic:true,
    description:`
    Collaborated with Catrin Einhorn. Pitched and researched initial idea. Worked with scientists from NOAA and the Scripps Machine Listening Lab.
    `,
    processImages:[],
    images:[],

  },
  {
    projectTitle: "Resonance",
    projectLink: "https://animatedpiano.onrender.com",
    date: "November 2025",
    description: `I made an animated piano! Press keys to play notes and see what happens when you build a world out of sound. 
    I built the houses/hills in blender and animated them using Tone.js and THREE.js. I tried to make it feel like a film that responds to the music.`,
    images: [],
    mainColor: "#000000ff",
    imageFolder: cdnBase + "assets/projects/Resonance/",
    basic: true,
    videoLink: `${noncdn_start}assets/projects/Resonance/video.webm`,
  },
  {
    projectTitle: "Sound Stories",
    codeLink: "https://chuik633.github.io/SoundStories/",
    date: "May 2025",
    description: `
               (STILL IN PROGRESS DEPLOYING) This project was my thesis for my masters in Data Viz at Parsons NYC! In Sound Stories, I experimented with visualizing music, as music is a powerful story telling device that can express emotion, signify themes, and convey intensity. 
               In this project, I used p5 to created audio reactive typography for the captions of films. In the backend, I built my own processing pipeline to download youtube videos, extract image data, audio data, and captions. 
               I used tools like FFTs to deconstruct the audio files and clustering on the colors of the film to get thematic color palettes. Read more on the page!
               For the backend, I used Docker, fly.io, and supabase to store the uploaded youtube data.
               `,

    images: ["full.webm", "2.webm", "3.webm", "4.webm", "5.webm"],
    processImages: [
      "wiggly_font.png",
      "blur_font.png",
      "strings_font.png",
      "colors.png",
      "colors2.png",
      "layouts.png",
      "figma.png",
    ],
    mainColor: "#000000ff",
    imageFolder: cdnBase + "assets/projects/Sound Stories/",
    basic: false,
  },
  // {
  //   projectTitle: "Holiday Puzzles",
  //   date: "December 2025",
  //   description: `I created a double sided 2025-26 puzzle and sent it to my friends and family! I also coded a website where people could add when they finished the puzzle which would light up a tree/their room in the building. Everyone I sent the puzzle to was featured in the illustration!`,
  //   processImages: ["holiday2.webp", "holidaybox.webp", "newyears2.webp"],
  //   mainColor: "#CD301E",
  //   imageFolder: cdnBase + "assets/projects/HolidayPuzzle/",
  //   basic: true,
  //   videoLink: `${noncdn_start}assets/projects/HolidayPuzzle/video.webm`,
  // },
  {
    projectTitle: "DV for Dummies",
    date: "December 2025",
    description: `(Disclaimer: this is slightly a troll project) I sent my family a survey... then analyzed them :). I gave this as a white elephant gift and my cousin won! We took some photos of it for fun.`,
    processImages: [
      "3.webp",
      "Frame 2.webp",
      "Frame 4.webp",
      "3.webp",
      "6.webp",
      "8.webp",
      "9.webp",
      "12.webp",
      "13.webp",
      "19.webp",
      "26.webp",
      "27.webp",
      "28.webp",
      "29.webp",
      "32.webp",
      "34.webp",
      "35.webp",
      "36.webp",
      "37.webp",
    ],
    mainColor: "#DED839",
    imageFolder: cdnBase + "assets/projects/Dummies/",
    basic: true,
    videoLink: `${noncdn_start}assets/projects/Dummies/video.webm`,
  },
  {
    projectTitle: "Puzzle Race",
    projectLink: "https://chuik633.github.io/Puzzle/",
    date: "December 2024",
    description: `
                New Yorker Mini Puzzle Advent Calendar! 
                We did a 100 piece puzzle every day of December and tracked our times. 
                I played around with visualizing average times of puzzles and made it a fun race between my family :P
                I experimented with using p5 to create rotating heads, and with using an API so that my family could modify a shared spreadsheet / see live updates.
                `,
    codeLink: "https://github.com/chuik633/Puzzle",
    images: ["1.webm", "2.webm"],
    processImages: [
      "m1.png",
      "m2.png",
      "process.png",
      "process1.png",
      "process4.jpeg",
      "process2.png",
      "process3.png",
      "5.png",
      "1.png",
      "3.png",
      "2.png",
      "4.png",
    ],
    mainColor: "#F7F7F0",
    imageFolder: cdnBase + "assets/projects/Puzzle Race/",
    basic: true,
  },
  {
    projectTitle: "ColorSearch",
    projectLink: "https://chuik633.github.io/ColorSearch/",
    date: "December 2024",
    description: `
           For this project, I was interesting in extending my "Hats of the Smithsonian" project by focusing on creating a color driven search. I extended the data to include all fashion related objects from the Smithsonian Open Access Collection as I was also curious about different colors in fabrics, jewelry, shirts, pants, etc. I had a lot of fun experimenting with extracting color swatches and learnning d3.force. I also added an experimental "show gradients" button to create some coded art based on the selected colors!
            `,
    codeLink: "https://github.com/chuik633/ColorSearch",

    images: ["expand-cards.webp", "move-clusters.webp", "zoom.webp"],
    mainColor: "#E9E8E4",
    imageFolder: cdnBase + "assets/projects/ColorSearch/",
    basic: true,
  },
  {
    projectTitle: "Yelp Reviews",
    projectLink: "https://chuik633.github.io/yelpData/",
    date: "December 2024",
    description: `
                Visualizing yelp data: how do review sentiments change based on topic? where are restaurants open late? what proteins are most mentioned in different cuisine?
                `,
    codeLink: "https://github.com/chuik633/yelpData",
    processImages: ["1.png", "2.png", "3.png", "4.png", "Dataset.png"],
    images: [
      "sentimentplot.gif",
      "cuisineclusters.gif",
      "hoursplot.gif",
      "proteinplot.gif",
    ],
    mainColor: "#F7F7F0",
    imageFolder: cdnBase + "assets/projects/Yelp Reviews/",
    basic: true,
  },

  {
    projectTitle: "Hats of the Smithsonian",
    projectLink: "https://chuik633.github.io/QualitativeDataVizProject/",
    date: "November 2024",
    description: `
           I collaborated with Josh Strupp on this project to create an interactive exploration of the hat collection at the Smithsonian! We organized the hats by their most vibrant colors on an HSL axis and used d3 force to allow users to move them around and reveal the hats belonging to each color. We also bucketted the hats by the date they were made, so as you scroll on the page, it controls the timeline and the hats you see.
            `,
    codeLink: "https://github.com/chuik633/QualitativeDataVizProject",
    processImages: ["process.png", "processmid.png", "processfigma.png"],
    images: [
      "intro_screen.webp",
      "collection_1.webp",
      "cursor_1.webp",
      "display_1.webp",
      "scroll_1.webp",
    ],
    mainColor: "#E9E8E4",
    imageFolder: cdnBase + "assets/projects/Hats of the Smithsonian/",
    basic: true,
  },
  {
    projectTitle: "Fish Lengths",
    projectLink: "https://chuik633.github.io/major-studio1-code-chuik633/",
    date: "October 2024",
    description: `
          This visualization explores the relationship between a fish’s length and the depth that they live in. I played around with translating the scale of a fish to the screen. As you scroll down, the “depth” of your screen’s view corresponds to the depth of the ocean that you are exploring! I also created a big picture plot on the side which shows the minimum, average, and maximum lengths of fish at all depths. As you scroll, this plot highlights your current depth region relative to all of the data to help orient you. For fun, I also created a dynamic “fish” sketch that moves with your mouse to help you visualize “how long a fish is”.
            `,
    processImages: ["process.png", "mockup.png"],
    codeLink: "https://github.com/chuik633/major-studio1-code-chuik633",
    images: ["scroll.webp", "popup.webp", "snaptogrid.webp"],
    mainColor: "#07253C",
    imageFolder: cdnBase + "assets/projects/Fish Lengths/",
    basic: true,
  },
];

export const dvDataTitle = Object.fromEntries(
  new Map(dvData.map((d) => [d.projectTitle, d])),
);
console.log(dvDataTitle);
