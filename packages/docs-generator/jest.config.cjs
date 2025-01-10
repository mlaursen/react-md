// NOTE: Should eventually be switched back to ts once ESM is natively supported
// import { type Config } from "jest";
// import { type Options as SwcOptions } from "@swc/core";

// const config: Config = {
const config = {
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        swcrc: false,
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
          target: "esnext",
        },
        // } satisfies SwcOptions,
      },
    ],
  },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // this allows the esm imports to work
    "^(\\.{1,2}/.*)\\.js$": "$1",
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
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/*-plugins.ts"],

  extensionsToTreatAsEsm: [".ts"],
};

// export default config;
module.exports = config;
