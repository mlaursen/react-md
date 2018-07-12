# @react-md/typography
This package is for including typography for react-md as well as a simple helper component to render text.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/typography

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
  * [Text Component](#text-component)
- [Prop Types](#prop-types)
  * [Text](#text)
- [Updating Styles](#updating-styles)
- [SassDoc](#sassdoc)
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
### Text Component
This package was also bundled with a small Text component that will either return the children or wrap the provided children with the required typography styles.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Text } from "@react-md/typography";

const App = () => (
  <main>
    <Text type="body-1">
      This is some text that will be wrapped in a p tag and have the classes .md-typography and .md-typography--body-1.
    </Text>
    <Text>This will just be a react-text block without a wrapping tag</Text>
    <Text tagName="span" type="headline-5">
      This is some text that normally would be rendered in an h5 tag, but now is rendered in a span tag. It will also have the classes .md-typograhy and .md-typography--headline-5 applied.
    </Text>
  </main>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

The `Text` component also supports a children callback function if that is your thing as well.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Text } from "@react-md/typography";

const App = () => (
  <main>
    <Text type="body-1">
      {({ className }) => (
        <span className={className}>
          The children callback function will just supply an object of the current typography className to apply to any element(s).
        </span>
      )}
    </Text>
  </main>
);

ReactDOM.render(<App />, document.getElementById('root'));
```
<!-- PROPS_START -->
## Prop Types
### Text


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
<td><code>string | number | boolean | {} | ReactElement<any> | ReactNodeArray | ReactPortal | ((props: ITex...</code></td>
<td><code>null</code></td>
<td>
This can either be any renderable element or a children callback function that gets provided the current class
name.
<br /><br />
</td>
</tr>
<tr>
<td>tagName</td>
<td><code>"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "a" | "button" | "caption" | "bo...</code></td>
<td><code>null</code></td>
<td>
An optional html tag name to render in. If this is omitted, it will determine the &#34;best&#34; tag
based on the provided <code>type</code>.
<br /><br />
</td>
</tr>
<tr>
<td>type</td>
<td><code>"button" | "caption" | "headline-1" | "headline-2" | "headline-3" | "headline-4" | "headline-5" |...</code></td>
<td><code>null</code></td>
<td>
An optional text type to render as. If both this and the tagName are omitted, only the base typography styles
will be applied.
<br /><br />
</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->

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
<td><code>rmd-typography-base</code></td>
<td>Applies the base typography styles to an element.

</td>
</tr>
<tr>
<td><code>rmd-typography</code></td>
<td>Applies one of the provided material design styles to an element.
<br /><br />

</td>
</tr>
<tr>
<td><code>react-md-typography</code></td>
<td>Creates all the typography styles from the react-md typography variables.
<br /><br />

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
<td>The font family to use throughout the entire application.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-typography-base</code></td>
<td>The base styles for typography.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-typography-font-weights</code></td>
<td>A Map of all the font weights.</td>
</tr>
<tr>
<td><code>rmd-typography-styles</code></td>
<td>A Map of all the typography styles in react-md</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
