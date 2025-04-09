/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.ts",
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/**"],
  },
});
