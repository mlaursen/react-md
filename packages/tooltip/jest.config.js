
module.exports = {
  setupFiles: ['./jest.setup.js'],
  testRegex: '(/__tests__/.*|(.|/)(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  transform: {
    '^.+\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

