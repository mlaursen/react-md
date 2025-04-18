import { type Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.jsx?$": "$1",
  },

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  coverageProvider: "v8",

  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },

  // ensure that all files are picked up correctly and included in the results.
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",

    "!<rootDir>/src/**/robots.ts",
    "!<rootDir>/src/**/sitemap.ts",
    "!<rootDir>/src/**/layout.tsx",
  ],

  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default createJestConfig(config);
