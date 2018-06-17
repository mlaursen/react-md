module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  setupFiles: ['raf/polyfill', './jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
