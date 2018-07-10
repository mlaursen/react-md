# @react-md/theme
This package is for declaring and using a theme for react-md.

The source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/theme

> NOTE: While react-md is in a pre-release stage, all SCSS variables, mixins, and functions will use a `rmd` prefix instead of the normal `md` prefix. This is so that you can have both the v1 and v2 versions working together. When v2 is finally released, the prefixes will switch back to `md`.

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
    + [Including Styles](#including-styles)
- [Usage](#usage)
  * [Declaring a Theme](#declaring-a-theme)
    + [Updating for any color](#updating-for-any-color)
    + [Updating for a react-md color](#updating-for-a-react-md-color)
    + [Updating for a Dark theme](#updating-for-a-dark-theme)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Normal SCSS Usage](#normal-scss-usage)
      - [Alternative SCSS Usage](#alternative-scss-usage)
  * [Functions](#functions)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/theme
```

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

## Usage
### Declaring a Theme
Starting with v2.0.0, react-md will use both scss and css variables to define themes. This allows you to work with IE 11 (if needed) as well as
the nice css variable support in evergreen browsers.

The theme by default is:
- `$rmd-theme-primary: $rmd-purple-500 !default;`
- `$rmd-theme-secondary: $rmd-pink-a-400 !default;`
- `$rmd-theme-background: #fff !default;` // the default background color. This is normally applied to the <html> tag
- `$rmd-theme-surface: #fff !default;` // the background color to use for temporary material such as menus or dialogs.

This can be overriden by setting these variables to new colors that are included in react-md, or a custom color.

#### Updating for any color
If the color does not need to come from react-md, it is a little bit easier since all you need to do is define your new variables before
importing this package's styles.

```scss
$rmd-theme-primary: #9b59b6;
$rmd-theme-secondary: #e67e22;

@import '@react-md/theme/dist/theme';

@include react-md-theme;
```

#### Updating for a react-md color
If the color needs to come from react-md, you will need to first import **only** the color-palette file so that the Sass maps won't be "compiled" with their default values. Once you have defined your theme,
you can import like normal.

```scss
@import '@react-md/theme/dist/color-palette';

$rmd-theme-primary: $rmd-blue-500;
$rmd-theme-secondary: $rmd-orange-a-400;

@import '@react-md/theme/dist/theme';

@include react-md-theme;
```

#### Updating for a Dark theme
In the past version of react-md, the dark theme was enabled by setting a `$md-light-theme` variable to `false`, now it is done by updating both
the `$rmd-theme-background` and `$rmd-theme-surface` variables. So here is an example of enabling the same dark theme as before.

```scss
@import '@react-md/theme/dist/color-palette';

$rmd-theme-background: #303030;
$rmd-theme-surface: $md-grey-800;

@import '@react-md/theme/dist/theme';

@include react-md-theme;
```

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
<td><code>rmd-theme(property, style, important, edge-opt-out)</code></td>
<td>This is really for internal use with the <code>react-md-theme</code> mixin, but you might be able to use it for some other stuff.&#10;&#10;
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
<td>property</td>
<td>String</td>
<td></td>
<td>This is normally <code>color</code> or <code>background-color</code>, but any valid CSS property that accepts&#10;    color values can be used.</td>
</tr>
<tr>
<td>style</td>
<td>String</td>
<td></td>
<td>The type of theme style to use. This should be one of the <code>$rmd-theme-property-values</code> or a literal&#10;    color value.</td>
</tr>
<tr>
<td>important</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean if the !important flag should also be applied. It is generally recommended&#10;    to not use this flag.</td>
</tr>
<tr>
<td>edge-opt-out</td>
<td>Boolean</td>
<td>$rmd-theme-edge-opt-out</td>
<td>Boolean whether to feature-detect around Edge to avoid emitting&#10;    CSS variables for it. This is really only intended for use cases where interactions with pseudo-element styles cause&#10;    problems due to Edge bugs.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>react-md-theme(primary-color, secondary-color)</code></td>
<td>Creates all the styles for a theme in react-md. This will start by creating CSS Variables&#10;for each theme variable and then create class names for each variable.&#10;&#10;
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
<td>primary-color</td>
<td>Color</td>
<td>rmd-theme-primary</td>
<td>The primary color to use to theme your app.</td>
</tr>
<tr>
<td>secondary-color</td>
<td>Color</td>
<td>rmd-theme-secondary</td>
<td>The secondary color to use to theme your app.</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>

#### Examples


##### Normal SCSS Usage

```scss
// declare your theme variables
$rmd-theme-primary: $rmd-teal-500;
$rmd-theme-secondary: $rmd-pink-a-400;

@include react-md-theme;
```

##### Alternative SCSS Usage

```scss
// if you want to create a theme without using the `$rmd-theme-primary` and `$rmd-theme-secondary` varaibles
@include react-md-theme($rmd-teal-500, $rmd-pink-a-400);
```


### Functions

<table>
<thead>
<tr>
<th>Name</th>
<th>Returns</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-theme-tone(color, min-contrast)</code></td>
<td>String - The string 'light' if the color is considered light, otherwise 'dark'.</td>
<td>Determines if a provided color is considered light or dark.&#10;&#10;
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
<td>color</td>
<td>Color</td>
<td></td>
<td>The color to test.</td>
</tr>
<tr>
<td>min-contrast</td>
<td>Number</td>
<td>3.1</td>
<td>The minimum contast that should be applied. The min&#10;    contrast for normal text should be 4.5 while large or 14px bold text should be 3.1. See&#10;    the link for contrasts for more information.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme-contrast-tone(color, min-contrast)</code></td>
<td>String - The string 'dark' if the color is considered light, or 'light' if the
    color is considered dark.</td>
<td>Determines if the provided color should have a light or dark contrast using the&#10;luminance algorithm to maintain a required contrast ratio for accessibility.&#10;&#10;
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
<td>color</td>
<td>Color</td>
<td></td>
<td>The color to test.</td>
</tr>
<tr>
<td>min-contrast</td>
<td>Number</td>
<td>3.1</td>
<td>The minimum contast that should be applied. The min&#10;    contrast for normal text should be 4.5 while large or 14px bold text should be 3.1. See&#10;    the link for contrasts for more information.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme(style)</code></td>
<td>Color - the theme color.</td>
<td>A small utility function to get a color from the current theme. This is normally used along with the&#10;<code>rmd-theme-var</code> function so that both css variables and a fallback can be applied.&#10;&#10;You are <i>most</i> likely looking for the <code>rmd-theme</code> mixin and not the functions instead.&#10;&#10;
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
<td>style</td>
<td>String</td>
<td></td>
<td>The theme style to get. This should be one of the keys from <code>$rmd-theme-property-values</code>.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme-var(style)</code></td>
<td>Color - the theme color.</td>
<td>A small utility function to get a color from the current theme as a css variable. This is normally used along with the&#10;<code>rmd-theme</code> function so that both css variables and a fallback can be applied.&#10;&#10;You are <i>most</i> likely looking for the <code>rmd-theme</code> mixin and not the functions instead.&#10;&#10;
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
<td>style</td>
<td>String</td>
<td></td>
<td>The theme style to get. This should be one of the keys from <code>$rmd-theme-property-values</code>.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme-prop-value(property)</code></td>
<td>Color - a color value for the provided property.</td>
<td>Attempts to get a specific theme color based on the property provided.&#10;&#10;If the property is a color or &#39;currentColor&#39;, it will be returned instead.&#10;&#10;NOTE: This has to be defined in variables so there aren&#39;t recursive imports.&#10;
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
<td>property</td>
<td>String|Color</td>
<td></td>
<td>The property to get from the theme colors.</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>


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
<td><code>rmd-color-map</code></td>
<td>This is a map of all the material design base colors so that you can programmatically get&#10;variables with the neat sass-map functions.&#10;&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-primary</code></td>
<td>The primary theme color to use for your app. This is normally one of the material design colors with a <code>-500</code> suffix,&#10;but it can be any color.&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-on-primary</code></td>
<td>The color to use when text should be displayed on the primary theme color. The default behavior is to test if the primary&#10;color&#39;s contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will&#10;be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast&#10;accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-secondary</code></td>
<td>The secondary theme color to use for your app. This is normally one of the material design colors with an accent&#10;suffix (<code>-a-100</code> or <code>-a-200</code> or <code>-a-400</code> or <code>-a-700</code>, but it can really be any color.&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-on-secondary</code></td>
<td>The color to use when text should be displayed on the secondary theme color. The default behavior is to test if the secondary&#10;color&#39;s contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will&#10;be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast&#10;accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-background</code></td>
<td>The theme&#39;s background color.&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-surface</code></td>
<td>The theme&#39;s surface background color. This is the background color that will be used for any temporary &#39;material&#39; (or surface)&#10;&#10;Ex: Dialogs, Lists&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-on-surface</code></td>
<td>The color to use when text should be displayed on a surface or temporary material. The default behavior is to test if the surface&#10;color&#39;s contrast tone. If the color is considered &#39;dark&#39;, <code>$rd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will&#10;be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast&#10;accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-text-colors</code></td>
<td>A Map of all the text colors for the app. This will be Map of &#39;light&#39; and &#39;dark&#39; that has the following keys:&#10;- primary&#10;- secondary&#10;- hint&#10;- disabled&#10;- icon&#10;&#10;This is normally used along with the <code>rmd-theme-contrast-tone</code> and the <code>map-get</code> Sass functions&#10;&#10;</td>
</tr>
<tr>
<td><code>rmd-theme-property-values</code></td>
<td>A Map of all the theme property values that can be used throughout the app. This is mainly created&#10;so that the specific <code>rmd-theme--NAME</code> classes can be created, but also for the <code>rmd-theme-prop-value</code> function&#10;to get a specific color within your theme.&#10;</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
