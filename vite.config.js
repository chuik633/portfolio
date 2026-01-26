import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/portfolio/",

  plugins: [vue()],

  server: {
    // Ignore heavy static assets so the watcher starts faster
    watch: {
      ignored: ["**/docs/**", "**/public/assets/projects/**"],
    },
  },

  build: {
    outDir: "docs", // ← write to docs/ instead of dist/
    emptyOutDir: true, // clear docs/ before each build
  },
});
