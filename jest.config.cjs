/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^@react-md/button$": ["<rootDir>/packages/button/src/index.ts"],
    "^@react-md/core$": ["<rootDir>/packages/core/src/index.ts"],
    "^@react-md/icon$": ["<rootDir>/packages/icon/src/index.ts"],
    "^@react-md/progress$": ["<rootDir>/packages/progress/src/index.ts"],
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
    // index.ts files are always `export * from "./fileOrFolder"`
    "!<rootDir>/**/index.ts",
    "!<rootDir>/prev/**/*",
  ],
};
