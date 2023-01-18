import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^@react-md/app-bar$": ["<rootDir>/packages/app-bar/src/index.ts"],
    "^@react-md/avatar$": ["<rootDir>/packages/avatar/src/index.ts"],
    "^@react-md/button$": ["<rootDir>/packages/button/src/index.ts"],
    "^@react-md/card$": ["<rootDir>/packages/card/src/index.ts"],
    "^@react-md/chip$": ["<rootDir>/packages/chip/src/index.ts"],
    "^@react-md/core$": ["<rootDir>/packages/core/src/index.ts"],
    "^@react-md/dialog$": ["<rootDir>/packages/dialog/src/index.ts"],
    "^@react-md/divider$": ["<rootDir>/packages/divider/src/index.ts"],
    "^@react-md/expansion-panel$": [
      "<rootDir>/packages/expansion-panel/src/index.ts",
    ],
    "^@react-md/form$": ["<rootDir>/packages/form/src/index.ts"],
    "^@react-md/layout$": ["<rootDir>/packages/layout/src/index.ts"],
    "^@react-md/link$": ["<rootDir>/packages/link/src/index.ts"],
    "^@react-md/list$": ["<rootDir>/packages/list/src/index.ts"],
    "^@react-md/material-icons$": [
      "<rootDir>/packages/material-icons/src/index.ts",
    ],
    "^@react-md/material-icons/(.*)": [
      "<rootDir>/packages/material-icons/src/$1",
    ],
    "^@react-md/menu$": ["<rootDir>/packages/menu/src/index.ts"],
    "^@react-md/overlay$": ["<rootDir>/packages/overlay/src/index.ts"],
    "^@react-md/progress$": ["<rootDir>/packages/progress/src/index.ts"],
    "^@react-md/table$": ["<rootDir>/packages/table/src/index.ts"],
    "^@react-md/tabs$": ["<rootDir>/packages/tabs/src/index.ts"],
    "^@react-md/tooltip$": ["<rootDir>/packages/tooltip/src/index.ts"],
    "^@react-md/tree$": ["<rootDir>/packages/tree/src/index.ts"],
    "^@react-md/visual-media$": ["<rootDir>/packages/tree/src/index.ts"],
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
