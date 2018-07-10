# @react-md/elevation


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/elevation

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example Usage SCSS](#example-usage-scss)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/elevation
```

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

## Usage

<!-- SASSDOC_START -->
## SassDoc

### Mixins

<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-elevation(z-value, color, opacity-boost)</code></td>
<td>Create the box shadow based on a z-value.&#10;&#10;
<h5>Parameters</h5>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</thead>
<tbody>
<tr>
<td>z-value</td>
<td>Number</td>
<td></td>
<td>This should be a number between 0 and 24.</td>
</tr>
<tr>
<td>color</td>
<td>Color</td>
<td>rmd-elevation-color</td>
<td>The color to use for the box-shadow.</td>
</tr>
<tr>
<td>opacity-boost</td>
<td>Number</td>
<td>0</td>
<td>The amount to boost the default opacity levels for the&#10;  three box-shadows applied.</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>

#### Examples


##### Example Usage SCSS

```scss
.my-class {
  @include rmd-elevation(8);

  background-color: white;
  position: fixed;
  z-index: 8;
}
```


### Variables
<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-elevation-color</code></td>
<td>The normal elevation color to use.&#10;</td>
</tr>
<tr>
<td><code>rmd-elevation-shadow-1-opacity</code></td>
<td>The opacity to apply to the first box-shadow&#10;</td>
</tr>
<tr>
<td><code>rmd-elevation-shadow-2-opacity</code></td>
<td>The opacity to apply to the second box-shadow&#10;</td>
</tr>
<tr>
<td><code>rmd-elevation-shadow-3-opacity</code></td>
<td>The opacity to apply to the third box-shadow&#10;</td>
</tr>
<tr>
<td><code>rmd-elevation-shadow-1-map</code></td>
<td>A Map of the first layer of box-shadows to apply for elevation.&#10;This is a map of numbers from 0 -&#62; 24.&#10;</td>
</tr>
<tr>
<td><code>rmd-elevation-shadow-2-map</code></td>
<td>A Map of the second layer of box-shadows to apply for elevation.&#10;This is a map of numbers from 0 -&#62; 24.&#10;</td>
</tr>
<tr>
<td><code>rmd-elevation-shadow-3-map</code></td>
<td>A Map of the third layer of box-shadows to apply for elevation.&#10;This is a map of numbers from 0 -&#62; 24.&#10;</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
