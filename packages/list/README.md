# @react-md/list
This package is used to create lists with the material design specs.


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/list

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [List](#list)
  * [ListItem](#listitem)
  * [ListItemText](#listitemtext)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/list
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/list`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-list`:

```scss
// This import will generate styles by default.
@import "@react-md/list/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/list/dist/list";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-list;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/list/dist/list";

// Any custom styles that use the utilities
```


## Usage
### Simple Example
```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { List, ListItem } from "@react-md/list";

const App = () => (
  <main>
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </List>
  </main>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

### With Icons
```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { List, ListItem } from "@react-md/list";
import { SearchSVGIcon, InfoOutlineSVGIcon } from "@react-md/material-icons";

const App = () => (
  <main>
    <List>
      <ListItem leftIcon={<SearchSVGIcon />}>Search</ListItem>
      <ListItem rightIcon={<InfoOutlineSVGIcon />}>Info</ListItem>
    </List>
  </main>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

<!-- PROPS_START -->
## Prop Types
### List


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


### ListItem


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


### ListItemText


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
<td><code>rmd-list-unstyled(padding, margin)</code></td>
<td>A &#34;general&#34; use mixin that will remove the default browser styles for a list and apply the
optionally provided margin and padding instead.
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
<td>padding</td>
<td>Number | String</td>
<td>0</td>
<td>The amount of padding to apply.</td>
</tr>
<tr>
<td>margin</td>
<td>Number | String</td>
<td>0</td>
<td>The amount of margin to apply.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-list</code></td>
<td>Creates the styles for a list.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-list-item-base</code></td>
<td>Creates the base list item styles.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-list-item-addon-icon</code></td>
<td>Creates the styles for an icon that is placed within a list item.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-list-item</code></td>
<td>Creates the styles for a list item.
<br /><br />

</td>
</tr>
<tr>
<td><code>react-md-list</code></td>
<td>Creates all the styles for lists and list items.
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
<td><code>rmd-list-vertical-padding</code></td>
<td>The amount of padding to place before the first list item and after the last list item in the list.</td>
</tr>
<tr>
<td><code>rmd-list-horizontal-padding</code></td>
<td>The amount of padding to place to the left and right of all the list items. It is recommended
to keep this value at <code>0</code> and instead update the <code>$rmd-list-item-horizontal-padding</code> instead to
get better clickable areas and hover effects on each item.</td>
</tr>
<tr>
<td><code>rmd-list-line-height</code></td>
<td>The line height to apply to all items within the list. The default typography applied to lists uses
the <code>subtitle-1</code> typography specs, but it looks better to apply the main text line-height within lists.</td>
</tr>
<tr>
<td><code>rmd-list-dense-font-size</code></td>
<td>The font size to use for a &#34;dense&#34; list layout.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-list-dense-vertical-padding</code></td>
<td>The amount of padding to place before the first list item and after the last list item in the list.</td>
</tr>
<tr>
<td><code>rmd-list-dense-horizontal-padding</code></td>
<td>The amount of padding to place to the left and right of all the list items in a &#34;dense&#34; layout. It
is recommended to keep this value at <code>0</code> and instead update the <code>$rmd-list-item-horizontal-padding</code>
instead to get better clickable areas and hover effects on each item.</td>
</tr>
<tr>
<td><code>rmd-list-item-height</code></td>
<td>The default height for a list item. To help create more general lists and layouts this height will
be applied as a <code>min-height</code> instead of <code>height</code> so that it can grow in height based on the content.
When using the <code>ListItem</code> component, it will automatically &#34;upgrade&#34; to use <code>height</code> when the <code>secondaryText</code>
or list item &#34;addons&#34; are provided to help enforce the material design specs.</td>
</tr>
<tr>
<td><code>rmd-list-item-vertical-padding</code></td>
<td>The amount of vertical padding to apply to each list item. This is really only added to help with the
default &#34;growing height&#34; case of items since the list item is aligned using a centered flexbox.</td>
</tr>
<tr>
<td><code>rmd-list-item-horizontal-padding</code></td>
<td>The amount of horizontal padding to apply to each list item.</td>
</tr>
<tr>
<td><code>rmd-list-item-medium-height</code></td>
<td>The height for a &#34;medium&#34; sized list item. This will normally get applied
for any list item that has an icon or avatar.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-list-item-large-height</code></td>
<td>The height for a &#34;large&#34; sized list item. This will normally get applied
for any list item that has secondary text with no icon, avatar, or graphic.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-list-item-extra-large-height</code></td>
<td>The height for an &#34;extra large&#34; sized list item. This will normally get applied
for any list item that:
- is single line but has a graphic
- has secondary text with an icon, avatar, graphic, or metadata</td>
</tr>
<tr>
<td><code>rmd-list-item-three-line-height</code></td>
<td>The height for a list item with three lines of text.</td>
</tr>
<tr>
<td><code>rmd-list-item-text-keyline</code></td>
<td>This is the amount of spacing from the left side of the list item (excluding padding) up to the left side
of the text when there are additional list item &#34;addons&#34; (excluding large graphics). This is used to update
the spacing between the &#34;addon&#34; and the text to always match this value.</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

