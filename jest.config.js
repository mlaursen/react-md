const fs = require('fs');
const path = require('path');

const packages = fs
  .readdirSync(path.join(process.cwd(), 'packages'))
  .filter((name) => !['dev-utils', 'codemod'].includes(name));

const roots = packages.map((name) => `<rootDir>/packages/${name}/src`);
roots.push('<rootDir>/packages/codemod');

const docsSrc = '<rootDir>/packages/documentation/src';

const isWatchMode = /(-w|--watch)(\s?.+)?$/.test(process.argv);

let collectCoverageFrom = [];
if (!isWatchMode) {
  collectCoverageFrom = [
    '<rootDir>/packages/*/src/**/*.{ts,tsx}',
    // internal usage and don't matter for the library coverage reports
    '!<rootDir>/packages/{dev-utils,documentation,material-icons,react-md}/src/**/*',
    '!<rootDir>/packages/codemod/**/*',
    // these are generated files
    '!<rootDir>/packages/*/src/scssVariables.ts',
    // index.ts files are always `export * from "./fileOrFolder"`
    '!<rootDir>/packages/**/index.ts',
  ];
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots,
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/testSetup/init.js'],
  transform: {
    '\\.svg$': '<rootDir>/testSetup/inlineSvgTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/testSetup/fileTransformer.js',
  },
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '^constants/(.*)$': `${docsSrc}/constants/$1`,
    '^components/(.*)$': `${docsSrc}/components/$1`,
    '^hooks/(.*)$': `${docsSrc}/hooks/$1`,
    '^icons/(.*)$': `${docsSrc}/icons/$1`,
    '^pages/(.*)$': `${docsSrc}/pages/$1`,
    '^utils/(.*)$': `${docsSrc}/utils/$1`,
  },
  collectCoverageFrom,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
