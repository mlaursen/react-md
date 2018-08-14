# @react-md/transition
This package is for handling different transitions and anmimations within react-md.

The source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/transition

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
    + [Including Styles](#including-styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [Collapse](#collapse)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/transition
```


#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/transition`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-transition`:

```scss
// This import will generate styles by default.
@import '@react-md/transition/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/transition/dist/transition';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-transition;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/transition/dist/transition';

// Any custom styles that use the utilities
```

## Usage
<!-- PROPS_START -->
## Prop Types
### Collapse


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
<td>children *</td>
<td><code>((props: ICollapseChildrenProps) => ReactNode) | (string & ((props: ICollapseChildrenProps) => Re...</code></td>
<td><code>null</code></td>
<td>
A callback function that will include the props for rendering a child element with the collapse
transition.
<br /><br />
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply. This will be merged with the required animation styles of <code>min-height</code>,
<code>padding-top</code>, and <code>padding-bottom</code>. If the <code>style</code> prop defines any of these values, they will be
used instead of this component&#39;s computed values.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional class name to also apply to the collapse.
<br /><br />
</td>
</tr>
<tr>
<td>collapsed *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if currently collapsed. When this prop changes, the collapse transition will begin.
<br /><br />
</td>
</tr>
<tr>
<td>minHeight</td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>
An optional min height to set for the collapsing element. If this is set to <code>0</code>,
the <code>children</code> will be removed from the DOM once the collapsing animation has finished.
<br /><br />
Note: the height will include the padding props. So if you want the collapse to be
<code>50px</code> by default and 20px padding, you would want to set the <code>minHeight</code> to <code>90px</code>.
So you want to use this formula:
<br /><br />
```ts
   * const desiredHeight = minHeight + minPaddingBottom + minPaddingTop;
   * ```

</td>
</tr>
<tr>
<td>minPaddingBottom</td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>
The min padding bottom to apply to the collapse. This will be used with the <code>minHeight</code>
and <code>minPaddingTop</code> props to set the collapsed size.
<br /><br />
</td>
</tr>
<tr>
<td>minPaddingTop</td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>
The min padding top to apply to the collapse. This will be used with the <code>minHeight</code>
and <code>minPaddingBottom</code> props to set the collapsed size.
<br /><br />
</td>
</tr>
<tr>
<td>enterDuration</td>
<td><code>number</code></td>
<td><code>250</code></td>
<td>
The duration for the entire enter animation in milliseconds. This should normally stay as the default value
of <code>250ms</code>, but can be updated to be any value if you feel there should be a longer animation time based on
content size.
<br /><br />
</td>
</tr>
<tr>
<td>leaveDuration</td>
<td><code>number</code></td>
<td><code>200</code></td>
<td>
The duration for the entire leave animation in milliseconds. This should normally stay at the default value
of <code>200ms</code>, but can be updated to be any value if you feel there should be a longer animation time based on
content size.
<br /><br />
</td>
</tr>
<tr>
<td>isEmptyCollapsed</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the children should be removed from the DOM when collapsed. When this prop is
<code>undefined</code>, it will remove the collapsed children only when the <code>minHeight</code>, <code>minPaddingBottom</code>,
and <code>minPaddingTop</code> values are set to <code>0</code>.
<br /><br />
</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->

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
<td><code>rmd-transition(type)</code></td>
<td>Adds a transition timing function for the provided transition type.
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
<td>type</td>
<td>String</td>
<td></td>
<td>The transition type that should be used. This should be one of the
    keys for <code>$rmd-transitions</code></td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-collapse</code></td>
<td>Creates the styles for the Collapse component within react-md
<br /><br />

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
<td><code>rmd-transitions</code></td>
<td>A Map of all the available transitions for react-md.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-enter-transition-time</code></td>
<td>The default enter transition time.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-leave-transition-time</code></td>
<td>The default leave transition time.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-collapse-enter-transition-func</code></td>
<td>The transition easing function to apply when the collapse&#39;s content is animating
in. This should be one of the <code>$rmd-transitions</code> keys.</td>
</tr>
<tr>
<td><code>rmd-collapse-leave-transition-func</code></td>
<td>The transition easing function to apply when the collapse&#39;s content is animating
out. This should be one of the <code>$rmd-transitions</code> keys.</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
