module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  testRegex: '(/__tests__/.*|(.|/)(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
