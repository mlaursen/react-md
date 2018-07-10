# @react-md/button


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/button

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [Button](#button)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/button
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/button`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-button`:

```scss
// This import will generate styles by default.
@import "@react-md/button/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/button/dist/button";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-button;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/button/dist/button";

// Any custom styles that use the utilities
```


## Usage
<!-- PROPS_START -->
## Prop Types
### Button


> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>

</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>

</td>
</tr>
<tr>
<td>disabled</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>

</td>
</tr>
<tr>
<td>type</td>
<td><code>"button" | "reset" | "submit"</code></td>
<td><code>null</code></td>
<td>

</td>
</tr>
<tr>
<td>btnType</td>
<td><code>"text" | "icon"</code></td>
<td><code>text</code></td>
<td>

</td>
</tr>
<tr>
<td>theme</td>
<td><code>"clear" | "primary" | "secondary" | "default"</code></td>
<td><code>primary</code></td>
<td>

</td>
</tr>
<tr>
<td>themeType</td>
<td><code>"flat" | "outline" | "contained"</code></td>
<td><code>flat</code></td>
<td>

</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->


<!-- SASSDOC_START -->

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
<td><code>rmd-btn-text-border-radius</code></td>
<td>The border radius to apply to text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-horizontal-padding</code></td>
<td>The amount of left and right padding to apply to text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-vertical-padding</code></td>
<td>The amount of top and bottom padding to apply to text buttons. Since buttons
are now displayed as inline-flex, it is generally recommended to keep this value
at 0 and just increase the height of the button instead.</td>
</tr>
<tr>
<td><code>rmd-btn-text-height</code></td>
<td>The height for text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-min-width</code></td>
<td>The min width for text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-icon-border-radius</code></td>
<td>The border radius to apply to all icon buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-icon-size</code></td>
<td>The height and width to apply to an icon button.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-hover-background-color</code></td>
<td>The background color to apply when a button is hovered. this will be applied in the <code>::after</code>
pseudo element so it is recommended to be either black or white with an opacity applied.</td>
</tr>
<tr>
<td><code>rmd-btn-background-color-transition-time</code></td>
<td>The transition duration for the hover background color to be applied.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-box-shadow</code></td>
<td>The base box-shadow to apply for buttons when outlined. This will normally be used along with a color variable
to define a box shadow.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-default-color</code></td>
<td>The color to use for a button's "default" state.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

