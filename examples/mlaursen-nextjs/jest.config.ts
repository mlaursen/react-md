import { type Options as SwcOptions } from "@swc/types";
import { type Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
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
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  coverageProvider: "v8",

  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
      statements: -10,
    },
  },

  // ensure that all files are picked up correctly and included in the results.
  collectCoverageFrom: [
    "<rootDir>/app/**/*.{ts,tsx}",

    "!<rootDir>/app/robots.ts",
    "!<rootDir>/app/sitemap.ts",
    "!<rootDir>/app/layout.tsx",
  ],

  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default config;
