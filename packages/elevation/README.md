# @react-md/elevation


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/elevation

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/elevation
```

## Usage

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/elevation`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### webpack
```diff
 {
   test: /.scss$/,
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

### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-elevation`:

```scss
// This import will generate styles by default.
@import '@react-md/elevation/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/elevation/dist/elevation';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-elevation;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/elevation/dist/elevation';

// Any custom styles that use the utilities
```



