import react from "@vitejs/plugin-react-swc";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/**.{ts,tsx,js,jsx}"],
    coverage: {
      include: ["src/**"],
      exclude: [
        "**/index.ts",
        "**/types.ts",
        "**/test-utils/data-testid.ts",

        // generated file that doesn't really matter
        "**/icon/material.ts",

        // it's hard to verify these since they probably only occur when trying to
        // use react-dom/server in jsdom?
        "**/test-utils/polyfills/TextEncoder.ts",
        "**/test-utils/polyfills/TextDecoder.ts",
        // can't really test jest with vitest
        "**/test-utils/jest-globals/**",
        ...coverageConfigDefaults.exclude,
      ],
    },

    // increase test timeout for tooltips since they are funky
    testTimeout: 10_000,
  },
});
