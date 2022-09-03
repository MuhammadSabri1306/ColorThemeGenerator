import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const plugins = [vue()];
  const base = command == "serve" ? "/" : "/ColorThemeGenerator/";
  const resolve = {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  };

  return { plugins, base, resolve };
});
