# @react-md/states
A package for managing the different interaction states on elements like hover, focus, and pressed

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/states

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [StatesProvider](#statesprovider)
  * [StatesConsumerWrapper](#statesconsumerwrapper)
  * [StatesConsumer](#statesconsumer)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
  * [Functions](#functions)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/states
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/states`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-states`:

```scss
// This import will generate styles by default.
@import "@react-md/states/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/states/dist/states";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-states;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/states/dist/states";

// Any custom styles that use the utilities
```


## Usage
<!-- PROPS_START -->
## Prop Types
### StatesProvider


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
<td>children</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
The children that should gain the state styles anywhere within the application. This is really
required so that the <code>StatesConsumer</code> can gain the appropriate context.
<br /><br />
</td>
</tr>
<tr>
<td>advancedFocus</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the &#34;advanced&#34; focus behavior should be enabled. This is really an over-engineered
way of making it so that elements only gain the focus state after using the keyboard. If this
is disabled, all elements will fallback to using the <code>:focus</code> selector instead of a conditional
class name.
<br /><br />
</td>
</tr>
<tr>
<td>programaticFocusKeys</td>
<td><code>string[]</code></td>
<td><code>null</code></td>
<td>
A list of keys that can trigger a &#34;programmatic&#34; focus event on a focusable element. This <i>should</i> most
likely stay as default list of keys since it will be updated for any custom keyboard focus events from
the W3C spec while new components are created, but it can be updated to include or remove keys as needed.
<br /><br />
</td>
</tr>
<tr>
<td>keyboardClickTimeout</td>
<td><code>number</code></td>
<td><code>500</code></td>
<td>
Since there are times where a user might interact with an element that will open or close
some temporary material, this prop is used to wait <code>x</code>ms between a keydown event and a focus
event to consider a focus event triggered from keyboard navigation.
<br /><br />
</td>
</tr>
</tbody>
</table>


### StatesConsumerWrapper


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
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional class name that should be merged with the current states class name.
<br /><br />
</td>
</tr>
<tr>
<td>disabled</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the element is disabled. This is mostly used so that elements that have been updated
to gain focus programmatically do not attach the <code>onBlur</code> event incorrectly.
<br /><br />
</td>
</tr>
<tr>
<td>pressable</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the child element should also gain the press states.
<br /><br />
</td>
</tr>
<tr>
<td>children *</td>
<td><code>((props: IStatesConsumerChildrenFunction) => ReactNode) | (((props: IStatesConsumerChildrenFuncti...</code></td>
<td><code>null</code></td>
<td>
A function to render any children with the merged class names and optional blur events. The child element
<b>must</b> apply the <code>ref</code> attribute to the child element as well as the provided class name and <code>onBlur</code> to
work correctly.
<br /><br />
</td>
</tr>
</tbody>
</table>


### StatesConsumer


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
<td><code>((props: IStatesConsumerChildrenFunction) => ReactNode) | (string & ((props: IStatesConsumerChild...</code></td>
<td><code>null</code></td>
<td>
A function to render any children with the merged class names and optional blur events. The child element
<b>must</b> apply the <code>ref</code> attribute to the child element as well as the provided class name and <code>onBlur</code> to
work correctly.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional class name that should be merged with the current states class name.
<br /><br />
</td>
</tr>
<tr>
<td>disabled</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the element is disabled. This is mostly used so that elements that have been updated
to gain focus programmatically do not attach the <code>onBlur</code> event incorrectly.
<br /><br />
</td>
</tr>
<tr>
<td>pressable</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the child element should also gain the press states.
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
<td><code>rmd-states-base-color(color, important)</code></td>
<td>Applies the base color for the different states to use. The different
states will apply different opacity values to this value.
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
<td>rmd-black-base</td>
<td>The background color for the different states.</td>
</tr>
<tr>
<td>important</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean if the background color should be applied
  with <code>!important</code>.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-opacity(state, color)</code></td>
<td>Updates the opacity for a provided state and color.
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
<td>state</td>
<td>String</td>
<td></td>
<td>The current state, this should be one of the <code>$rmd-states-light-opacities</code> and
  <code>$rmd-states-dark-opacities</code> keys.</td>
</tr>
<tr>
<td>color</td>
<td>Color</td>
<td>rmd-black-base</td>
<td>The color to use for determining whether to use the dark or light
  opacity map.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-base</code></td>
<td>Applies the base states styles.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-states-hover(color)</code></td>
<td>Applies the hover state opacity based on the provided color.
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
<td>rmd-black-base</td>
<td>The base hover color to get an opacity for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-focus(color)</code></td>
<td>Applies the focus state opacity based on the provided color.
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
<td>rmd-black-base</td>
<td>The base focus color to get an opacity for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-pressed(color)</code></td>
<td>Applies the pressed state opacity based on the provided color.
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
<td>rmd-black-base</td>
<td>The base pressed color to get an opacity for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-selected(color)</code></td>
<td>Applies the selected state opacity based on the provided color.
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
<td>rmd-black-base</td>
<td>The base selected color to get an opacity for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-active(color)</code></td>
<td>Applies the active state opacity based on the provided color.
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
<td>rmd-black-base</td>
<td>The base active color to get an opacity for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-simple(color)</code></td>
<td>Creates the style for &#34;simple&#34; states that only rely on css selectors.
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
<td>color</td>
<td>Color</td>
<td>rmd-black-base</td>
<td>The base color to get the different state opacities for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-surface(color)</code></td>
<td><br /><br />
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
<td>rmd-black-base</td>
<td>The base color to use for the surface. The different states will have
  their opacities updated for light or dark based on this color.</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>


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
<td><code>rmd-states-opacities(color)</code></td>
<td>Map - Either the `$rmd-states-light-opacities` or `$rmd-states-dark-opacities` based on the
  provided color and it's contrast value.</td>
<td>Gets the states opacity map based on the provided color. This will check the contrast
tone of the themed color, and return the correct opacities for a dark or light color.
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
<td>The color to get an opacity map for.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-states-opacity(color, state)</code></td>
<td>Number - the opacity value to apply for the provided state.</td>
<td>Gets the states opacity for with the provided color and state.
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
<td>The color to get an opacity map for.</td>
</tr>
<tr>
<td>state</td>
<td>String</td>
<td></td>
<td>The state that should be retrieved. This should be one of
  the keys in the <code>$rmd-states-opacities</code> dark or light Maps.</td>
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
<td><code>rmd-states-transition-duration</code></td>
<td>The transition duration for hover effects
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-states-light-opacities</code></td>
<td>A Map of all the hover opacities when the container should have
a light colored state.</td>
</tr>
<tr>
<td><code>rmd-states-dark-opacities</code></td>
<td>A Map of all the hover opacities when the container should have
a dark colored state.</td>
</tr>
<tr>
<td><code>rmd-states-opacities</code></td>
<td>A Map of the dark and light state opacities so that they can be quickly looked up programmatically.</td>
</tr>
<tr>
<td><code>rmd-states-tap-highlight-color</code></td>
<td>The highlight color to apply to &#34;fix&#34; the default android touch interaction
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

