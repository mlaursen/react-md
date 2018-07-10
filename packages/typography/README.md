# @react-md/typography
This package is for including typography for react-md.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/typography

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Updating Styles](#updating-styles)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example Usage SCSS](#example-usage-scss)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/typography
```


#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/typography`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-typography`:

```scss
// This import will generate styles by default.
@import '@react-md/typography/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/typography/dist/typography';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-typography;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/typography';

// Any custom styles that use the utilities
```


## Usage
## Updating Styles
It is possible to add additional styles by creating spherical variables for each typography style in material design. Each variable is set up as `$md-typography-styles-STYLE_NAME` which must be a Map of style attributes with values. So for example:

```scss
// You really wouldn't want to do this...
$md-typography-headline-1: (
  color: white,
  background: red,
  padding: 1.235rem
);
```

This would now have the base styles for `md-typography--headline-1` to be:
```diff
 .md-typography--headline-1 {
   font-size: 6rem;
   line-height: 6rem;
   font-weight: 300;
   letter-spacing: -.01562em;
   text-decoration: inherit;
   text-transform: inherit;
+  color: white;
+  background: red;
+  padding: 1.235rem;
}
```

A full list of variables which can be used to override are:
- `$md-typography-styles-headline-1`
- `$md-typography-styles-headline-2`
- `$md-typography-styles-headline-3`
- `$md-typography-styles-headline-4`
- `$md-typography-styles-headline-5`
- `$md-typography-styles-headline-6`
- `$md-typography-styles-subtitle-1`
- `$md-typography-styles-subtitle-2`
- `$md-typography-styles-body-1`
- `$md-typography-styles-body-2`
- `$md-typography-styles-button`
- `$md-typography-styles-caption`
- `$md-typography-styles-overline`

Please note that this will only merge the base default values with your new styles.

If you want to completely remove the default styles, you can set a `$md-typography-styles` variable **before** importing the typography scss.

```scss
$md-typography-styles: (
  headline-1: (
    display: none
  )
);

@import '@react-md/typography/dist/typography';
```

Every key that you do not include in the map will no longer be created when including the base typography styles.

<!-- SASSDOC_START -->

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
<td><code>rmd-typography-base</code></td>
<td>Applies the base typography styles to an element.&#10;&#10;

</td>
</tr>
<tr>
<td><code>rmd-typography</code></td>
<td>Applies one of the provided material design styles to an element.&#10;

</td>
</tr>
<tr>
<td><code>react-md-typography</code></td>
<td>Creates all the typography styles from the react-md typography variables.&#10;

</td>
</tr>
</tbody>
</table>

#### Examples


##### Example Usage SCSS

```scss
 .custom-class-name {
   @include rmd-typography-base;

   font-size: 1.3rem;
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
<td><code>rmd-typography-font-family</code></td>
<td>The font family to use throughout the entire application.&#10;</td>
</tr>
<tr>
<td><code>rmd-typography-base</code></td>
<td>The base styles for typography.&#10;</td>
</tr>
<tr>
<td><code>rmd-typography-font-weights</code></td>
<td>A Map of all the font weights.&#10;&#10;</td>
</tr>
<tr>
<td><code>rmd-typography-styles</code></td>
<td>A Map of all the typography styles in react-md&#10;&#10;</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
