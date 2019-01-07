module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  roots: ['<rootDir>/src'],
  // fixes not being able to see console.log in tests...
  verbose: false,
};
