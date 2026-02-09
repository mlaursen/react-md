/// <reference types="vitest/config" />
import { materialSymbolsPlugin } from "@react-md/vite-material-symbols-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    materialSymbolsPlugin(),
    tsconfigPaths(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  resolve: {
    alias: {
      everything: resolve(import.meta.dirname, "src/_everything.scss"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.ts",
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/**"],
  },
});
