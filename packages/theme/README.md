# @react-md/theme
This package is for declaring and using a theme for react-md. The theme will be generated with css variables but with
a fallback for older browsers that do not support it yet. Once a theme is defined, it is recommended to use the
`rmd-theme` mixin to apply dynamic theming throughout your app.

The source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/theme

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
    + [Examples](#examples-1)
      - [Example Material Design Color Usage](#example-material-design-color-usage)
      - [Example Non-Material Design Color Usage](#example-non-material-design-color-usage)
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
Starting with v3.0.0, react-md will use both scss and css variables to define themes. This allows you to work with IE 11 (if needed) as well as
the nice css variable support in evergreen browsers.

The theme by default is:
- `$rmd-theme-primary: $rmd-purple-500 !default;`
- `$rmd-theme-secondary: $rmd-pink-a-400 !default;`
- `$rmd-theme-background: #fff !default;` // the default background color. This is normally applied to the <html> tag
- `$rmd-theme-surface: #fff !default;` // the background color to use for temporary material such as menus or dialogs.

This can be overridden by setting these variables to new colors that are included in react-md, or a custom color.

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
<td>This is really for internal use with the <code>react-md-theme</code> mixin, but you might be able to use it for some other stuff.
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
<td>This is normally <code>color</code> or <code>background-color</code>, but any valid CSS property that accepts
    color values can be used.</td>
</tr>
<tr>
<td>style</td>
<td>String</td>
<td></td>
<td>The type of theme style to use. This should be one of the <code>$rmd-theme-property-values</code> or a literal
    color value.</td>
</tr>
<tr>
<td>important</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean if the !important flag should also be applied. It is generally recommended
    to not use this flag.</td>
</tr>
<tr>
<td>edge-opt-out</td>
<td>Boolean</td>
<td>$rmd-theme-edge-opt-out</td>
<td>Boolean whether to feature-detect around Edge to avoid emitting
    CSS variables for it. This is really only intended for use cases where interactions with pseudo-element styles cause
    problems due to Edge bugs.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>react-md-theme(primary-color, secondary-color)</code></td>
<td>Creates all the styles for a theme in react-md. This will start by creating CSS Variables
for each theme variable and then create class names for each variable.
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
// if you want to create a theme without using the `$rmd-theme-primary` and `$rmd-theme-secondary` variables
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
<td>Determines if a provided color is considered light or dark.
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
<td>The minimum contrast that should be applied. The min
    contrast for normal text should be 4.5 while large or 14px bold text should be 3.1. See
    the link for contrasts for more information.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme-contrast-tone(color, min-contrast)</code></td>
<td>String - The string 'dark' if the color is considered light, or 'light' if the
    color is considered dark.</td>
<td>Determines if the provided color should have a light or dark contrast using the
luminance algorithm to maintain a required contrast ratio for accessibility.
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
<td>The minimum contrast that should be applied. The min
    contrast for normal text should be 4.5 while large or 14px bold text should be 3.1. See
    the link for contrasts for more information.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme-get-swatch(color, swatch, accent, fallback-color, fallback-name)</code></td>
<td>Color - the new color within the same color family with the provided swatch and optional accent.</td>
<td>A theme utility function to convert a material design color to the same color but with a different
swatch. If your app is not using material design colors, this utility function is useless but you
will need to define fallback colors so compliation does not fail.
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
<td>The material design color to create a new color for with the provided swatch.</td>
</tr>
<tr>
<td>swatch</td>
<td>Number</td>
<td></td>
<td>The swatch to apply. This should be one of <code>$rmd-theme-primary-suffixes</code> or
  <code>$rmd-theme-accent-suffixes</code> if the <code>$accent</code> param is enabled.</td>
</tr>
<tr>
<td>accent</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean if the swatch is an accent color instead of a primary color.</td>
</tr>
<tr>
<td>fallback-color</td>
<td>Color</td>
<td>null</td>
<td>The color to fallback to if the <code>$color</code> is not a valid
  material design color. Since this is null by default, the complilation will fail until a valid
  fallback is provided.</td>
</tr>
<tr>
<td>fallback-name</td>
<td>String</td>
<td>null</td>
<td>The name of a variable or global variable that should be set to
  automatically fix the compilation error.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-theme(style)</code></td>
<td>Color - the theme color.</td>
<td>A small utility function to get a color from the current theme. This is normally used along with the
<code>rmd-theme-var</code> function so that both css variables and a fallback can be applied.
<br /><br />
You are <i>most</i> likely looking for the <code>rmd-theme</code> mixin and not the functions instead.
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
<td>A small utility function to get a color from the current theme as a css variable. This is normally used along with the
<code>rmd-theme</code> function so that both css variables and a fallback can be applied.
<br /><br />
You are <i>most</i> likely looking for the <code>rmd-theme</code> mixin and not the functions instead.
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
<td>Attempts to get a specific theme color based on the property provided.
<br /><br />
If the property is a color or &#39;currentColor&#39;, it will be returned instead.
<br /><br />
NOTE: This has to be defined in variables so there aren&#39;t recursive imports.
<br /><br />
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

#### Examples


##### Example Material Design Color Usage

```scss
.something {
  color: rmd-theme-get-swatch($rmd-theme-primary, 200);
}

.something-2 {
  color: rmd-theme-get-swatch($rmd-theme-primary, 200, true);
}
```

##### Example Non-Material Design Color Usage

```scss
$my-theme-color: #3498db;
.something-failed {
  color: rmd-theme-get-swatch($my-theme-color, 200);
}

.something-failed--fixed {
  color: rmd-theme-get-swatch($my-theme-color, 200, false, rgba($my-theme-color, .32));
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
<td><code>rmd-theme-color-map</code></td>
<td>This is a map of all the material design base colors so that you can programmatically get
variables with the neat sass-map functions.</td>
</tr>
<tr>
<td><code>rmd-theme-primary</code></td>
<td>The primary theme color to use for your app. This is normally one of the material design colors with a <code>-500</code> suffix,
but it can be any color.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-on-primary</code></td>
<td>The color to use when text should be displayed on the primary theme color. The default behavior is to test the primary color&#39;s
contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will be used. If
this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast accessibility
requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-secondary</code></td>
<td>The secondary theme color to use for your app. This is normally one of the material design colors with an accent
suffix (<code>-a-100</code> or <code>-a-200</code> or <code>-a-400</code> or <code>-a-700</code>, but it can really be any color.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-on-secondary</code></td>
<td>The color to use when text should be displayed on the secondary theme color. The default behavior is to test the secondary color&#39;s
contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will be used. If
this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast accessibility
requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-warning</code></td>
<td>The warning theme color to use for your app. This isn&#39;t used by anything internally within react-md at this time, but it might
be helpful to have this variable defined as more things get developed.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-on-warning</code></td>
<td>The color to use when text should be displayed on the warning theme color. The default behavior is to test the warning color&#39;s
contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will
be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast
accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-error</code></td>
<td>The error theme color to use for your app.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-on-error</code></td>
<td>The color to use when text should be displayed on the warning theme color. The default behavior is to test the error color&#39;s
contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will
be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast
accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-success</code></td>
<td>The success theme color to use for your app. This isn&#39;t used by anything internally within react-md at this time, but it might
be helpful to have this variable defined as more things get developed.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-on-success</code></td>
<td>The color to use when text should be displayed on the warning theme color. The default behavior is to test the success color&#39;s
contrast tone. If the color is considered &#39;dark&#39;, <code>$rmd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will
be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast
accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-background</code></td>
<td>The theme&#39;s background color.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-surface</code></td>
<td>The theme&#39;s surface background color. This is the background color that will be used for any temporary &#39;material&#39; (or surface)
<br /><br />
Ex: Dialogs, Lists
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-on-surface</code></td>
<td>The color to use when text should be displayed on a surface or temporary material. The default behavior is to test if the surface
color&#39;s contrast tone. If the color is considered &#39;dark&#39;, <code>$rd-white-base</code> will be used. Otherwise <code>$rmd-black-base</code> will
be used. If this isn&#39;t sufficient for your app, you can change this to be any color. Just make sure that it meets the contrast
accessibility requirements (3.1:1 ratio for large (18px regular or 14px bold) and 4.5:1 for normal text).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-text-colors</code></td>
<td>A Map of all the text colors for the app. This will be Map of &#39;light&#39; and &#39;dark&#39; that has the following keys:
- primary
- secondary
- hint
- disabled
- icon
<br /><br />
This is normally used along with the <code>rmd-theme-contrast-tone</code> and the <code>map-get</code> Sass functions</td>
</tr>
<tr>
<td><code>rmd-theme-property-values</code></td>
<td>A Map of all the theme property values that can be used throughout the app. This is mainly created
so that the specific <code>rmd-theme--NAME</code> classes can be created, but also for the <code>rmd-theme-prop-value</code> function
to get a specific color within your theme.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-theme-edge-opt-out</code></td>
<td>Boolean if the theme should opt-out of edge support by default with the provided mixins.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
