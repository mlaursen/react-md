import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/**.{ts,tsx,js,jsx}"],
  },
});
