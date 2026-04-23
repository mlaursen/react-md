/// <reference types="vitest/config" />
import { materialSymbolsPlugin } from "@react-md/vite-material-symbols-plugin";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    materialSymbolsPlugin(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      everything: resolve(import.meta.dirname, "src/_everything.scss"),
    },
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.ts",
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/**"],
  },
});
