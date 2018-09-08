const JEST_CONFIG_TEMPLATE = `module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.test.json',
    },
  },
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: '(/__tests__/.*|(.|/)(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  transform: {
    '^.+\\\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
`;

const JEST_SETUP_TEMPLATE = `const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
`;

const TSCONFIG_COMMONJS_TEMPLATE = `{
  "extends": "../../tsconfig.commonjs.json",
  "compilerOptions": {
    "outDir": "./lib"
  },
  "exclude": [
    "types/*"
  ]
}
`;

const TSCONFIG_TEMPLATE = `{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types",
    "outDir": "./es"
  },
  "exclude": [
    "types/*",
    "**/__tests__/*"
  ]
}
`;

const TSCONFIG_TEST_TEMPLATE = `{
  "extends": "../../tsconfig.test.json"
}
`;

const TSLINT_TEMPLATE = `{
  "extends": "../../tslint.json"
}
`;

module.exports = {
  JEST_CONFIG_TEMPLATE,
  JEST_SETUP_TEMPLATE,
  TSCONFIG_COMMONJS_TEMPLATE,
  TSCONFIG_TEMPLATE,
  TSCONFIG_TEST_TEMPLATE,
  TSLINT_TEMPLATE,
};
