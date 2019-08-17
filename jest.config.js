const fs = require('fs');
const path = require('path');

const packages = fs
  .readdirSync(path.join(process.cwd(), 'packages'))
  .filter(name => !['dev-utils', 'documentation'].includes(name));

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  roots: packages.map(name => `<rootDir>/packages/${name}/src`),
  // fixes not being able to see console.log in tests...
  verbose: false,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    ...packages.map(name => `<rootDir>/packages/${name}/es`),
    ...packages.map(name => `<rootDir>/packages/${name}/lib`),
  ],
};
