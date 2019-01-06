# react-md [![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=next)](https://travis-ci.org/mlaursen/react-md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/pulls) [![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

Create an accessible React application with the
[material design specifications](https://material.io/design/) and Scss.

- [Creating a new project](#creating-a-new-project) - How to create a new
  project with react-md
- [Updating an existing project](https://mlaursen.github.io/react-md/getting-started/updating-an-existing-project) -
  How to add react-md into an existing project
- [Installing packages](https://mlaursen.github.io/react-md/getting-started/installation) -
  How to install related components and packages within react-md for building
  your application
- [Implementing a theme](https://mlaursen.github.io/react-md/implementing-a-theme) -
  How to implement a different theme for your React application
- [Full documentation](https://mlaursen.github.io/react-md/) - All the remaining
  documentation along with every single guide, API Reference, and examples

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

(_npx comes with npm 5.2+ and higher, if you have an older version you will need
to install `create-react-app` globally instead_)

Or with `yarn`:

```sh
$ yarn create react-app my-app --scripts-version @react-md/react-scripts
$ cd my-app
$ yarn start
```

> NOTE: You can also add the `--typescript` flag to bootstrap a react-app with
> typescript support

More information can be found on the documentation site's page
[about creating projects](https://mlaursen.github.io/react-md/getting-started/creating-a-project)

## Contributing

This project is being developed while using [lerna](https://lernajs.io/) so it
is recommended to install it globally to make development easier or just use
`npx` for every `lerna` command.

### Quick setup

```sh
$ git clone https://github.com/mlaursen/react-md
$ cd react-md
$ npm install
$ npm run bootstrap
$ npm run build
```

> `npm run bootstrap` is the same as `lerna bootstrap --hoist`

> `npm run build` is the same as `lerna run build`

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

Tests can be run either with `lerna` or changing into a specific package
directory and running the test command:

```sh
$ lerna run test
```

```sh
$ cd packages/typography
$ npm run test
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
