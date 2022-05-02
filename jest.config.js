// const isWatchMode = /(-w|--watch)(\s?.+)?$/.test(process.argv);

// let collectCoverageFrom = [];
// if (!isWatchMode) {
//   collectCoverageFrom = [
//     '<rootDir>/packages/*/src/**/*.{ts,tsx}',
//     // internal usage and don't matter for the library coverage reports
//     '!<rootDir>/packages/{dev-utils,documentation,material-icons,react-md}/src/**/*',
//     '!<rootDir>/packages/codemod/**/*',
//     // these are generated files
//     '!<rootDir>/packages/*/src/scssVariables.ts',
//     // index.ts files are always `export * from "./fileOrFolder"`
//     '!<rootDir>/packages/**/index.ts',
//   ];
// }

export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/testSetup/init.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
    '\\.svg$': '<rootDir>/testSetup/inlineSvgTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/testSetup/fileTransformer.js',
  },
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
  // collectCoverageFrom,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
