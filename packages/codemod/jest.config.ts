import { type Options as SwcOptions } from "@swc/core";
import { type Config } from "jest";

const config: Config = {
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
      } satisfies SwcOptions,
    ],
  },
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
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
  // collectCoverageFrom: [
  //   "<rootDir>/src/**/*.{ts,tsx}",
  //
  //   // index.ts files are always `export * from "./fileOrFolder"`. I might be
  //   // able to remove this one I start testing the documentation site
  //   "!<rootDir>/src/**/index.ts",
  //   "!<rootDir>/src/**/types.ts",
  //   // it's hard to verify these since they probably only occur when trying to
  //   // use react-dom/server in jsdom?
  //   "!<rootDir>/src/test-utils/polyfills/TextEncoder.ts",
  //   "!<rootDir>/src/test-utils/polyfills/TextDecoder.ts",
  // ],

  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default config;
