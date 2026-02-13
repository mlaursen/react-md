import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  root: import.meta.dirname,
  test: {
    // environment: "jsdom",
    // setupFiles: "./vitest.setup.ts",
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/**.{ts,tsx,js,jsx}"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/types.ts", ...coverageConfigDefaults.exclude],
    },
    testTimeout: 20_000,
  },
});
