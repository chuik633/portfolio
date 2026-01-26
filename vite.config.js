import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const base = process.env.VITE_BASE || "/"; // use env for GH Pages, default root for Render

export default defineConfig({
  base,

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
