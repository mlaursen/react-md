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
  * [withMountingTransition](#withmountingtransition)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
  * [Variables](#variables)
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
### withMountingTransition
This is like another version of CSSTransitionGroup (v1) that renders null instead
of a span when empty and only works for one element at a time.

When the visible prop is false, nothing will be rendered. When the visible prop is switched
to true, it will start the in transition by:
- rendering the component as normal (so no additional class names)
- providing the component with an enter transition class name
- providing the component with an enter and active transition class name
- rendering the component as normal once transition has finished (so no additional class names)

Now when the visible prop is switched to false, it will start the leave transition with the same flow as
above but reversed. Once the transition is done, it will render nothing again.

The class names generated will be:
- `${transitionName}--enter`
- `${transitionName}--enter-active`
- `${transitionName}--leave`
- `${transitionName}--leave-active`

So to get the animation working correctly, your component being wrapped with this HOC **must** apply the
provided className prop and apply the onTransitionEnd prop that gets passed down.
@param transitionName - The transition name to use for the enter and leave transitions. Suffixes will
be applied this this string for each stage of the transition.
@return a higher order component creator function.

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
</tbody>
</table>

<!-- SASSDOC_END -->
