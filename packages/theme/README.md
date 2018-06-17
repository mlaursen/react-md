# @react-md/theme
This package is for declaring and using a theme for react-md.

The source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/theme

> NOTE: While react-md is in a pre-release stage, all SCSS variables, mixins, and functions will use a `rmd` prefix instead of the normal `md` prefix. This is so that you can have both the v1 and v2 versions working together. When v2 is finally released, the prefixes will switch back to `md`.

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [Declaring a Theme](#declaring-a-theme)
  * [Styles](#styles)
    + [CSS Variables](#css-variables)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
    + [Including Styles](#including-styles)

<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/theme
```

## Usage
### Declaring a Theme
### Styles
#### CSS Variables
The theme is defined using CSS Variables, so if you need to support IE 11, you should also "polyfill" CSS variable support. One of the simplest ways is to use [postcss](https://github.com/postcss/postcss) with the [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) plugin.

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/theme`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### webpack
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

#### create-react-app and node-sass-chokidar
```diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-csss && npm run build-css -- --watch --recursive"
   }
```

#### Including Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-theme`:

```scss
// This import will generate styles by default.
@import '@react-md/theme/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/theme/dist/theme';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-theme;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/theme/dist/theme';

// Any custom styles that use the utilities
```
