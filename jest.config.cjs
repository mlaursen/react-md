/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^@react-md/utils$": ["<rootDir>/packages/utils/src/index.ts"],
  },
  testPathIgnorePatterns: ["prev\\/"],
  watchPathIgnorePatterns: ["\\.next", "public\\/"],
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    // index.ts files are always `export * from "./fileOrFolder"`
    "/index\\.ts/",
  ],
};
