// const { pathsToModuleNameMapper } = require('ts-jest/utils');

// const {
//   compilerOptions: { paths },
// } = require('./tsconfig.test.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: false,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['./testSetup/init.js'],
  moduleNameMapper: {
    // ...pathsToModuleNameMapper(paths),
    '\\.scss$': '<rootDir>/testSetup/styleMock.js',
    '^constants/(.*)$': '<rootDir>/constants/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^icons/(.*)$': '<rootDir>/icons/$1',
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^utils/(.*)$': '<rootDir>/utils/$1',
    '^next/router$': '<rootDir>/testSetup/nextRouter.js',
  },
  transform: {
    '\\.svg$': '<rootDir>/testSetup/inlineSvgTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/testSetup/fileTransformer.js',
  },
};
