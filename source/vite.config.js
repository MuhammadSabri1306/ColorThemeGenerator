import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const plugins = [vue()];
  const base = command == "serve" ? "/" : "/ColorThemeGenerator/";

  return { plugins, base };
});
