const fs = require('fs');
const path = require('path');

const packages = fs
  .readdirSync(path.join(process.cwd(), 'packages'))
  .filter((name) => !['dev-utils'].includes(name));

const docsSrc = '<rootDir>/packages/documentation/src';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: packages.map((name) => `<rootDir>/packages/${name}/src`),
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/testSetup/init.js'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/testSetup/styleMock.js',
    '\\.svg$': '<rootDir>/testSetup/inlineSvgTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/testSetup/fileTransformer.js',
    '^constants/(.*)$': `${docsSrc}/constants/$1`,
    '^components/(.*)$': `${docsSrc}/components/$1`,
    '^hooks/(.*)$': `${docsSrc}/hooks/$1`,
    '^icons/(.*)$': `${docsSrc}/icons/$1`,
    '^pages/(.*)$': `${docsSrc}/pages/$1`,
    '^utils/(.*)$': `${docsSrc}/utils/$1`,
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/documentation/src',
    '<rootDir>/testSetup',
    ...packages.map((name) => `<rootDir>/packages/${name}/es`),
    ...packages.map((name) => `<rootDir>/packages/${name}/lib`),
  ],
};
