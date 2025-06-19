import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/portfolio/" : "/",

  plugins: [vue()],

  build: {
    outDir: "docs", // ← write to docs/ instead of dist/
    emptyOutDir: true, // clear docs/ before each build
  },
});
