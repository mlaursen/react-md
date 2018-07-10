# @react-md/tooltip
This package is for creating accessible tooltips following the tooltip spec on [W3C](https://www.w3.org/TR/wai-aria-practices/#tooltip).

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/tooltip

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example SCSS Usage](#example-scss-usage)
      - [Example Custom Tooltip](#example-custom-tooltip)
      - [Example SCSS Usage](#example-scss-usage-1)
      - [Example SCSS Usage](#example-scss-usage-2)
      - [Example Custom Tooltip](#example-custom-tooltip-1)
      - [Example SCSS Usage](#example-scss-usage-3)
      - [Overriding Default Styles](#overriding-default-styles)
      - [Overriding Default Styles v2](#overriding-default-styles-v2)
      - [Example SCSS Usage](#example-scss-usage-4)
      - [Example SCSS Usage](#example-scss-usage-5)
      - [Example SCSS Usage](#example-scss-usage-6)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/tooltip
```


#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/tooltip`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-tooltip`:

```scss
// This import will generate styles by default.
@import '@react-md/tooltip/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/tooltip/dist/tooltip';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-tooltip;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/tooltip/dist/tooltip';

// Any custom styles that use the utilities
```


## Usage
<!-- PROPS_START -->
<!-- PROPS_END -->


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
<td><code>rmd-tooltip-base</code></td>
<td>Creates the base tooltip styles only.

</td>
</tr>
<tr>
<td><code>rmd-tooltip-active</code></td>
<td>Creates the active tooltip styles only. The active styles will increase the z-index and
change the visibility from <code>hidden</code> to <code>visible</code>. This class should be applied during the
entire enter and leave transition.

</td>
</tr>
<tr>
<td><code>rmd-tooltip-visible</code></td>
<td>Creates the visible tooltip styles only. This should only be applied when the tooltip is visible
as it will cause the enter and leave transition by being applied or removed.

</td>
</tr>
<tr>
<td><code>rmd-tooltip-dense</code></td>
<td>Creates the dense tooltip style overrides. Since the base tooltip styles define
these values as well, this should be included <b>after</b> the base styles have been
included or with an additional selector depth.

</td>
</tr>
<tr>
<td><code>rmd-tooltip-position(position, spacing)</code></td>
<td>Creates the styles for one of the four tooltip positions.
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
<td>position</td>
<td>String</td>
<td></td>
<td>One of the four tooltip positions. (top, right, bottom, or left)</td>
</tr>
<tr>
<td>spacing</td>
<td>Number</td>
<td></td>
<td>The amount of spacing to use between the tooltip and the container element. This should
  normally just be <code>$rmd-tooltip-spacing</code> or <code>$rmd-tooltip-dense-spacing</code>.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-tooltip-line-wrap</code></td>
<td>Creates the base styles to allow line-wrapping tooltips.

</td>
</tr>
<tr>
<td><code>react-md-tooltip</code></td>
<td>Creates all the base styles to get tooltips working with the <code>Tooltip</code> component.

</td>
</tr>
</tbody>
</table>

#### Examples


##### Example SCSS Usage

```scss
.rmd-tooltip {
  @include rmd-tooltip-base;
}
```

##### Example Custom Tooltip

```scss
.tooltip {
  @include rmd-tooltip-base;

  padding-bottom: .825rem;
  padding-top: .825rem;
}
```
,
##### Example SCSS Usage

```scss
.rmd-tooltip--active {
  @include rmd-tooltip-active;
}
```
,
##### Example SCSS Usage

```scss
.md-tooltio--visible {
  @include rmd-tooltip-visible;
}
```

##### Example Custom Tooltip

```scss
.tooltip-container:focus,
.tooltip-container:hover {
  .tooltip {
    @include rmd-tooltip-active;
  }
}
```
,
##### Example SCSS Usage

```scss
.rmd-tooltip--dense {
  @include rmd-tooltip-dense;
}
```

##### Overriding Default Styles

```scss
.rmd-tooltip {
  @include rmd-tooltip-base;
  @include rmd-tooltip-dense;
}

// or
.rmd-tooltip {
  @include rmd-tooltip-base;

    &--dense {
      @include rmd-tooltip-dense;
    }
}
```

##### Overriding Default Styles v2

```scss
.rmd-tooltip--dense.rmd-tooltip--dense {
   @include rmd-tooltip-dense;
}

// somewhere later in your stylesheet
.rmd-tooltip {
  @include rmd-tooltip-base;
}
```
,
##### Example SCSS Usage

```scss
.rmd-tooltip--left {
  @include rmd-tooltip-position(left, $rmd-tooltip-spacing);
}
```
,
##### Example SCSS Usage

```scss
.rmd-tooltip--line-wrap {
  @include rmd-tooltip-line-wrap;
}
```
,
##### Example SCSS Usage

```scss
@include react-md-tooltip;
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
<td><code>rmd-tooltip-background-color</code></td>
<td>The background color to use for tooltips.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-text-color</code></td>
<td>The text color to use for tooltips. This will be white on dark backgrounds and black
on light backgrounds by default.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-enter-transition-time</code></td>
<td>The enter transition time for the tooltip to enter or to leave.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-leave-transition-time</code></td>
<td>The leave transition time for the tooltip to enter or to leave.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-z-index</code></td>
<td>The z-index to use for tooltips when they are visible.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-font-size</code></td>
<td>The font size to use for tooltips</td>
</tr>
<tr>
<td><code>rmd-tooltip-min-height</code></td>
<td>The min height to use for tooltips. This allows the tooltips to grow in height automatically
based on line wrapping. You will need to add additional padding in these cases though.</td>
</tr>
<tr>
<td><code>rmd-tooltip-lr-padding</code></td>
<td>The left and right padding to apply to tooltips.</td>
</tr>
<tr>
<td><code>rmd-tooltip-line-wrap-tb-padding</code></td>
<td>The top and bottom padding to apply to tooltips when line wrapping is enabled.</td>
</tr>
<tr>
<td><code>rmd-tooltip-spacing</code></td>
<td>The amount of spacing to place between the tooltip and the tooltip's container element.</td>
</tr>
<tr>
<td><code>rmd-tooltip-dense-font-size</code></td>
<td>The font size to use for dense tooltips.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-dense-min-height</code></td>
<td>The min-height to use for dense tooltips. This allows the tooltips to grow in height automatically
based on line wrapping. You will need to add additional padding in these cases though.</td>
</tr>
<tr>
<td><code>rmd-tooltip-dense-lr-padding</code></td>
<td>The left and right padding to use for dense tooltips
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-dense-line-wrap-tb-padding</code></td>
<td>The top and bottom padding to apply to dense tooltips when line wrapping is enabled.</td>
</tr>
<tr>
<td><code>rmd-tooltip-dense-spacing</code></td>
<td>The amount of spacing to place between the dense tooltip and the tooltip's container element.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-border-radius</code></td>
<td>The border radius to apply to tooltips
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-tooltip-transition-distance</code></td>
<td>The distance that the tooltip should animate from the tooltip's control element.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

