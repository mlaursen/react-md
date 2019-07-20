module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  plugins: ['jest', 'react-hooks'],
  env: {
    node: true,
    browser: true,
  },
  globals: {
    gtag: 'readonly',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  rules: {
    // I think it's fine to do shadowed variables. It can cause some bugs where you forget
    // to use an updated variable (like redux), but it doesn't happen much in this type of
    // project
    'no-shadow': 0,

    // only time I do empty catch statements is for prop-type imports
    'no-empty': ['error', { allowEmptyCatch: true }],

    // I don't know how to get this to work with peerDependencies
    'import/no-extraneous-dependencies': 0,

    // This doesn't play well with hooks and it doesn't mean much with Typescript to me
    'consistent-return': 0,

    // no need to worry about regenerator stuff since it's handled by Typescript
    'no-restricted-syntax': 0,

    // it's useful for reduce cases and a lot of other stuff. Easily caught in reviews
    'no-param-reassign': 0,

    // I normally don't use require statements other than for prop type declarations
    // on components.
    'global-require': 0,

    // normally caught my Typescript instead.
    'react/no-unused-prop-types': 0,

    // normally caught my Typescript instead.
    'react/require-default-props': 0,

    // normally caught my Typescript instead and I don't care too much about speciifc objects
    'react/forbid-prop-types': 0,

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // overridden by prettier
    'react/jsx-wrap-multilines': 0,
    'react/jsx-one-expression-per-line': 0,

    // deprecated
    'jsx-a11y/label-has-for': 0,

    // Allow expressions to work with react hooks. Annoying to have to typedef each arrow
    // function in a useEffect or useCallback when it can be derived.
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        // allow FC definitions for React
        allowTypedFunctionExpressions: true,
      },
    ],

    // handled by strict tsconfig
    '@typescript-eslint/no-unused-vars': 0,

    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect'] }],
    'jest/lowercase-name': ['error', { ignore: ['describe'] }],
    'jest/no-duplicate-hooks': 'error',
    'jest/no-empty-title': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-test-prefixes': 'error',
    'jest/no-truthy-falsy': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/valid-describe': 'error',
  },
  overrides: [
    {
      files: ['**/__tests__/*'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-object-literal-type-assertion': 0,
        'jsx-a11y/no-autofocus': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'react/prop-types': 0,
        'react/prefer-stateless-function': 0,
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        // .tsx is .jsx extension
        'react/jsx-filename-extension': 0,
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        // some type definition files will only have one export, but shouldn't be default
        'import/prefer-default-export': 0,
      },
    },
    {
      files: [
        'packages/documentation/*/**/*.ts',
        'packages/documentation/*/**/*.tsx',
      ],
      rules: {
        // handled by ts and false negatives right now with monorepo setup
        'import/no-unresolved': 0,
        'react/prop-types': 0,
      },
    },
  ],
};
