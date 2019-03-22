# react-md [![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=next)](https://travis-ci.org/mlaursen/react-md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/mlaursen/react-md/pulls) [![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

Create an accessible React application with the
[material design specifications](https://material.io/design/) and Scss.

- [Creating a new project](#creating-a-new-project) - How to create a new
  project with react-md
- [Updating an existing project](https://react-md.dev/getting-started/updating-an-existing-project) -
  How to add react-md into an existing project
- [Installing packages](https://react-md.dev/getting-started/installation) - How
  to install related components and packages within react-md for building your
  application
- [Implementing a theme](https://react-md.dev/implementing-a-theme) - How to
  implement a different theme for your React application
- [Full documentation](https://react-md.dev) - All the remaining documentation
  along with every single guide, API Reference, and examples

### Highlights/Features

- Matches the accessibility guidelines from
  [www.w3.org](https://www.w3.org/TR/wai-aria-practices)
- Low level customizable components
- Easily themeable on a global and component level
- Uses css variables for dynamic themes with fallbacks for older browsers
- Out of the box dark theme mode support
- Out of the box left-to-right and right-to-left language support
- UMD Bundles and pre-compiled css available on https://unpkg.com (see more
  information [here](#))
- Written and maintained in [Typescript](https://www.typescriptlang.org/)

## Creating a new project

```sh
$ npx create-react-app my-app --scripts-version @react-md/react-scripts
$ cd my-app
$ npm start
```

> npx comes with npm 5.2+ and higher, if you have an older version you will need
> to install `create-react-app` globally instead

Or with `yarn`:

```sh
$ yarn create react-app my-app --scripts-version @react-md/react-scripts
$ cd my-app
$ yarn start
```

> NOTE: You can also add the `--typescript` flag to bootstrap a react-app with
> typescript support

More information can be found on the documentation site's page
[about creating projects](https://react-md.dev/getting-started/installation)

## Contributing

This project is being developed while using [lerna](https://lernajs.io/) so it
is recommended to install it globally to make development easier or just use
`npx` for every `lerna` command.

### Quick setup

```sh
$ git clone https://github.com/mlaursen/react-md
$ cd react-md
$ yarn
$ yarn setup
$ yarn watch
$ cd packages/documentation
$ yarn dev
```

### Project structure

Each package will have a structure similar to this:

```
packages/typography
├── jest.config.js
├── package-lock.json
├── package.json
└── src
    ├── Text.tsx
    ├── __tests__
    │   ├── Text.tsx
    │   └── __snapshots__
    │       └── Text.tsx.snap
    ├── _functions.scss
    ├── _mixins.scss
    ├── _typography.scss
    ├── _variables.scss
    ├── index.ts
    └── styles.scss
```

### Running tests

Tests can be run from the root directory with either:

```sh
$ yarn test
```

Or

```sh
$ yarn test:each
```

The difference between these two commands is that the base `yarn test` command
will run tests for all packages in a single `jest` test runner while the
`yarn test:each` will spin up a different `jest` test runner for each project
that has tests.

Otherwise, you can change directories into a related project and run test from
there.

```sh
$ cd packages/typography
$ yarn test
```

Tests are being run with [jest](https://jestjs.io/), so you can add the
`--watch` flag to start the tests in watch mode.

### Linting

The project is currently linted with
[tslint](https://palantir.github.io/tslint/) and
[sass-lint](https://github.com/sasstools/sass-lint).

### Formatting

The project is setup to automatically format all files with
[prettier](https://prettier.io/) before each commit but it is still recommended
to update your editor to run prettier before saving.
