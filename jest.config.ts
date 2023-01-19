import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^@react-md/core$": ["<rootDir>/packages/core/src/index.ts"],
    "^@react-md/material-icons$": [
      "<rootDir>/packages/material-icons/src/index.ts",
    ],
    "^@react-md/material-icons/(.*)": [
      "<rootDir>/packages/material-icons/src/$1",
    ],
  },

  testPathIgnorePatterns: ["prev\\/", "\\.next", "public\\/"],
  modulePathIgnorePatterns: ["prev\\/"],
  moduleDirectories: ["node_modules", "<rootDir>"],

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  watchPathIgnorePatterns: ["\\.next", "public\\/"],

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
    "<rootDir>/packages/*/src/**/*.{ts,tsx}",

    // TODO: Uncomment these lines once I figure out how the documentation site
    // will work
    "!<rootDir>/src/**/*",
    // "<rootDir>/src/**/*.{ts,tsx}",
    // "!<rootDir>/src/pages/**/*",

    // there isn't really anything to test with material icons
    "!<rootDir>/packages/material-icons/**/*",
    "!<rootDir>/packages/material-symbols/**/*",

    // index.ts files are always `export * from "./fileOrFolder"`. I might be
    // able to remove this one I start testing the documentation site
    "!<rootDir>/**/index.ts",
    "!<rootDir>/**/types.ts",
  ],
};

export default config;
