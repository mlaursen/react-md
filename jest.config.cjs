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
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
