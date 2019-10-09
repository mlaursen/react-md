module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: false,
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/testSetup/init.js'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/src/testSetup/styleMock.js',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^icons/(.*)$': '<rootDir>/src/icons/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  transform: {
    '\\.svg$': '<rootDir>/src/testSetup/inlineSvgTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/testSetup/fileTransformer.js',
  },
};
