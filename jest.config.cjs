/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
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
    "^@react-md/icon$": ["<rootDir>/packages/icon/src/index.ts"],
    "^@react-md/layout$": ["<rootDir>/packages/layout/src/index.ts"],
    "^@react-md/link$": ["<rootDir>/packages/link/src/index.ts"],
    "^@react-md/list$": ["<rootDir>/packages/list/src/index.ts"],
    "^@react-md/material-icons$": [
      "<rootDir>/packages/material-icons/src/index.ts",
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
  testPathIgnorePatterns: ["prev\\/"],
  watchPathIgnorePatterns: ["\\.next", "public\\/"],
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  collectCoverageFrom: [
    // "<rootDir>/src/**/*.{ts,tsx}",
    "<rootDir>/packages/*/src/**/*.{ts,tsx}",
    "!<rootDir>/packages/material-icons/src/**/*.{ts,tsx}",
    // index.ts files are always `export * from "./fileOrFolder"`
    "!<rootDir>/**/index.ts",
    "!<rootDir>/prev/**/*",
  ],
};
