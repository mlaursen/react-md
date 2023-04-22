import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  // this is required to get the correct line coverage when using swc for some
  // reason.
  coverageProvider: "v8",

  // TODO: Determine required threshold once I get further along
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

    // index.ts files are always `export * from "./fileOrFolder"`. I might be
    // able to remove this one I start testing the documentation site
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/**/types.ts",
  ],
};

export default createJestConfig(config);
