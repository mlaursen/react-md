import { reactRouter } from "@react-router/dev/vite";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      everything: resolve(import.meta.dirname, "_everything.scss"),
    },
  },
});
