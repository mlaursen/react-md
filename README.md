# react-md
React Material Design - React components built using Google's [material design](https://material.io/) system as a base for styles
and attempting to be fully accessible for screen readers and keyboard users following the [W3C](https://www.w3.org/) specifications.

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
  * [Compiling styles](#compiling-styles)
    + [Compiling styles with create-react-app](#compiling-styles-with-create-react-app)
    + [Compiling styles with webpack](#compiling-styles-with-webpack)
  * [Including the styles](#including-the-styles)
    + [Examples](#examples)
- [Getting Started](#getting-started)
- [Development and Contributing](#development-and-contributing)
  * [Minimal Installation](#minimal-installation)
<!-- TOC_END -->


## Installation
Starting with react-md@3, each component is split into scoped packaging so it is easier to pick and choose specific components or styles
without requiring every feature to bloat your application. A package can be simply installed with:

```sh
$ npm install --save @react-md/COMPONENT_NAME
```

So if you want to install the theme and buttons:

```sh
$ npm install --save @react-md/button @react-md/theme
```

It is recommended to at least always install the following packages to have a good starting base:

```sh
$ npm install --save @react-md/theme @react-md/typography @react-md/icon
```

### Compiling styles
Each package that has styles will require Sass to compile. You can read more about how to get started with [webpack](#compiling-styles-with-webpack) or [create-react-app](#compiling-styles-with-cra) but the basics will
require updating your Sass compiler (normally `node-sass`) to include `node_modules` in the `includePaths` as well as using an [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### Compiling styles with create-react-app
This guide will basically follow the steps for [adding a css-preprocessor](#adding-a-css-preprocessor-sass-less-etc) in the create-react-app documentation, but it has been updated to always include `node_modules`.

First, install the command-line interface for Sass:

```sh
npm install --save-dev node-sass-chokidar
```

Then in `package.json`, add the following lines to `scripts`:

```diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-css && npm run build-css -- --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

This is a bit different than the `create-react-app` example since it includes `--include-path ./node_modules`. This is **required** for react-md to correctly import files.

Next, let's rename `src/App.css` and `src/index.css` to `src/App.scss` and `src/index.scss` and run `npm run watch-css`.

```sh
$ mv src/index.css src/index.scss
$ mv src/App.css src/App.scss
```

The watcher will find every Sass file in `src` subdirectories, and create a corresponding CSS file next to it, in our case
overwriting `src/App.css`. Since `src/App.js` still imports `src/App.css`, the styles become a part of your application.
You can now edit `src/App.scss`, and `src/App.css` will be regenerated.

At this point you might want to remove all CSS files from the source control, and add `src/*.css` and  `src/**/*.css `to your
`.gitignore` file.  It is generally a good practice to keep the build products outside of the source control. Edit `.gitignore`:

```diff
 npm-debug.log*
 yarn-debug.log*
 yarn-error.log*
+
+# build artifacts
+src/*.css
+src/**/*.css
```

As a final step, you may find it convenient to run `watch-css` automatically with `npm start`, and run `build-css` as a part of
`npm run build`. You can use the `&&` operator to execute two scripts sequentially. However, there is no cross-platform way to
run two scripts in parallel, so we will install a package for this:

```sh
$ npm install --save-dev npm-run-all
```

Then we can change `start` and `build` scripts to include the CSS preprocessor commands:

```diff
   "scripts": {
     "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
     "watch-css": "npm run build-css && npm run build-css --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build": "npm run build-css && react-scripts build",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```

Now running `npm start` and `npm run build` also builds Sass files.

Continue reading the `create-react-app`'s documentation about [adding a css-preprocessor](#adding-a-css-preprocessor-sass-less-etc) for some more information.

#### Compiling styles with webpack
To compile the styles with webpack, you will need to either add or update your css rules to be the following:

```diff
 {
   test: /\.scss$/,
   use: [{
     loader: 'style-loader',
     options: { sourceMap: true },
   }, {
     loader: 'css-loader',
     options: { sourceMap: true, importLoaders: 2 },
   }, {
     loader: 'postcss',
     options: { sourceMap: true },
   }, {
     loader: 'sass-loader',
     options: {
       sourceMap: true,
+      includePaths: [
+        './node_modules', // or whatever relative path it is to node_modules
+      ],
     },
   }],
 }
```

### Including the styles
Each scoped package that has styles will include their scss files within the `dist` folder and include the following files:
- `_variables.scss`
- `_functions.scss`
- `_mixins.scss`
- `_PACKAGE_NAME.scss` (so in `@react-md/theme`, this would be `_theme.scss`)
- `styles.scss`

Each file that starts with an underscore (`_`) can be imported individually and will only expose variables, mixins, or functions that can be used
within your scss file. Each package will **always** include a file that is `_PACKAGE_NAME.scss` that will automatically import all other underscored
files for convenience so all variables, mixins, and functions for that package are available with one import.

The `styles.scss` file is different than all the other files since it will **generate styles when imported**, so you must set any custom variables and
overrides before importing this file into your project.

#### Examples
The following examples will import the theme package and generate the styles for your theme.

This is example will be using the "convenience" file to generate a theme.

```scss
// src/index.scss

// this will import all the mixins, variables, and functions within the theme package so you can use them
@import '@react-md/theme/dist/theme';

@include react-md-theme; // generate the theme using the imported mixin.
```


This example will just use the `styles.scss` file so that the styles are generated just from an import.

```scss
// src/index.scss

@import '@react-md/theme/dist/styles'; // generates the theme
```

As you can see, there is a bit more flexibility by using the `_theme.scss` over the `styles.scss` file, but both are available.

## Getting Started
Material design requires a theme to be defined before using any component. The theme is defined using css variables with a fallback for older browsers that
do not support it yet.  The theme by default is:
- `$rmd-theme-primary: $rmd-purple-500 !default;`
- `$rmd-theme-secondary: $rmd-pink-a-400 !default;`
- `$rmd-theme-background: #fff !default;` // the default background color. This is normally applied to the <html> tag
- `$rmd-theme-surface: #fff !default;` // the background color to use for temporary material such as menus or dialogs.

Please see the [theme usage](packages/theme/README.md#usage) for more details about updating the theme and the helpful theme
utils.

## Development and Contributing
This project is using [lerna](https://github.com/lerna/lerna) to install all the dependencies, so you will be required to install it globally before continuing.

### Minimal Installation
This will install all the packages and run the initial builds for all modules so that you can start developing.

```sh
$ npm install
$ lerna bootstrap
$ npm run build
```
