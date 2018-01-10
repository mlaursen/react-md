# react-md

React Material Design - React components built with sass

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

react-md is a set of React components and sass files for implementing [Google's Material Design](https://material.google.com). The
[Documentation Website](http://react-md.mlaursen.com) can be used for viewing live examples, code samples, and general prop documentation.

## Installation

```bash
$ npm i -S react react-dom react-md
```

## Customizing the theme
The application should define a `primary` and `secondary` color. The `primary` color
should be chosen from one of the `'-500'` colors and the `secondary` should be one of
the `'a-'` colors.

The default color palette is defined as:

```scss
$md-primary-color: $md-indigo-500 !default;
$md-secondary-color: $md-pink-a-200 !default;
```

If you change these variables before the `react-md-everything` mixin is included, your entire
application will be styled with your new theme.

```scss
@import '~react-md/src/scss/react-md';

$md-primary-color: $md-teal-500;
$md-secondary-color: $md-lime-a-400;

@include react-md-everything;
```

See the [themes page](http://react-md.mlaursen.com/customization/themes) on the documentation website. There
is also a theme builder available to try mix and matching different colors.

## Usage
Please see the list of [examples](examples/) for how you can get a project started off quickly with React and React MD.

### UMD Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/react-md@1.2.11/dist/react-md.deep_purple-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Roboto:400,500,700">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react/dist/react-with-addons.min.js"></script>
    <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://unpkg.com/react-md@1.2.11/dist/react-md.min.js"></script>
    <script>
    var MyAwesomeComponent = React.createClass({
      render: function()  {
        return React.createElement(ReactMD.Button, { label: 'Hello, World!', flat: true });
      }
    });

    ReactDOM.render(React.createElement(MyAwesomeComponent), document.getElementById('app'));
    </script>
  </body>
</html>
```

## Known Bugs/Works in Progress/Future Changes

* Bottom sheets
* Steppers
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper

## Contributing
Please see the [documentation site README](https://github.com/mlaursen/react-md/tree/master/docs#react-md-documentation)
for information about contributing using the documentation server. Otherwise, here is some information about only working
within `react-md`.

Right now I am using the `Ruby` version of `scss_lint` to lint scss files. This means that you will need to have Ruby installed
and the `sass-lint` gem.

```bash
$ gem install scss_lint
```

I have an issue (#274) open about switching over to the node port, but it hasn't really been worked on because I don't like
the little amount of features that have been ported over so far.

Otherwise this _should_ work on most systems with node >= 6.

### Minimal Setup
```bash
mlaursen @ ~/code/react-md
$ yarn
$ yarn scripts
$ cd docs
mlaursen @ ~/code/react-md/docs
$ yarn
$ cp .env.example .env
$ cd ..
mlaursen @ ~/code/react-md
$ yarn dev
```

Development Scripts
=====
* [lint](#lint)
  * [lint:fix](#lintfix)
  * [lint:styles](#lintstyles)
  * [lint:scripts](#lintscripts)
* [test](#test)
  * [test:tsc](#testtsc)
  * [test:watch](#test-watch)
* [tsd](#tsd)
* [css-bundles](#css-bundles)
* [dev](#dev)
  - [dev:minimal](#devminimal)
* [docs](#docs)
  - [docs:minimal](#docsminimal)
* [scripts](#scripts)
  * [scripts:watch](#scriptswatch)
* [prebuild](#prebuild)
* [build](#build)
  * [build:es](#buildes)
  * [build:es:watch](#buildeswatch)
  * [build:umd:dev](#buildumddev)
  * [build:umd:prod](#buildumdprod)

### lint
This will run both the [lint:styles](#lintstyles) and [lint:scripts](#lintscripts) commands.

#### lint:fix
This will attempt to automatically fix any `eslint` errors that can be fixed.

#### lint:styles
As stated above, this will lint all the scss files within the `src/scss` directory. Unfortunately, this requires the Ruby gems
version of `scss-lint` to be installed to work because the node port isn't quite there yet for me. You can either
remove this temporarily from the build process or:

```bash
$ gem install scss_lint
```

#### lint:scripts
This will run `eslint` over all the files in the `src/js` folder.

### dev
This command will run the `build:`

### test
This command will run [test:tsc](#testtsc) followed by `jest`.

#### test:tsc
This will do a simple Typescript compliation test to make sure there aren't any syntax errors or
invalid types. There should probably be a better testing system put in place.

#### test:watch
This will just run `jest` in watch mode.

#### test:docs
This will just run `jest` in the docs folder.

#### test:docs:watch
This will just run `jest` in watch mode in the docs folder.

#### test:all
This will run tests for Typescript definitions, the base react-md repo, and the docs folder.

### tsd
This command will just copy all the Typescript definitions into the `lib` folder so that it can be used correctly
by Typescript users.

### css-bundles
This script makes 255 different scss files to be compiled for production use. This is automatically run before
[build](#build).

### scripts
This will compile all the components and utilities in the `src/js` using babel with the `babel-preset-env`.
All the files will be output into the `lib` directory.

#### scripts:watch
This is the same as above, but it will be done in watch mode. This is very helpful when running the development server and want to see
immediate changes.

### dev
This will start up the documentation server in development mode as well as watching for changes within the base react-md library.
Please look at the [Getting Started](docs/README.md#getting-started) for some preliminary setup required.

### dev:minimal
This will start up the documentation server in development mode as well as watching for changes within the base react-md library.
The only difference is that the [docs:minimal](#docsminimal) command will be run instead of [docs](#docs)

### docs
This will start up the documentation server in development mode. For some more information about this command,
please see the [documentation server scripts](docs/README.md#Scripts).

### docs:minimal
This will start up the documentation server in development mode without rebuilding all the "databases" before startup.

### prebuild
This command is automatically run before [build](#build). It will basically remove all the old artifacts and compiled
files followed by linting the entire project.

### build
This command will do the full build of `react-md` before a release. It runs almost all of the other scripts in a specified
order so that the `es`, `lib`,`dist` folders are created and contain the correct files for release.

#### build:umd
This command will create the UMD bundles for development and production use. In addition, it will create all the
pre-compiled css bundles for production use.
