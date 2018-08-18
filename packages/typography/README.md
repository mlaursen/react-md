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
  * [TextContainer](#textcontainer)
- [Updating Styles](#updating-styles)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example Usage SCSS](#example-usage-scss)
      - [Example Usage SCSS](#example-usage-scss-1)
      - [Example Usage Generated SCSS](#example-usage-generated-scss)
      - [create-react-app Example Usage](#create-react-app-example-usage)
      - [Example Usage SCSS](#example-usage-scss-2)
  * [Functions](#functions)
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
<td><code>"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "a" | "button" | "caption" | "bl...</code></td>
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


### TextContainer
The `TextContainer` component is a simple wrapper around a `<div>`, `<section>`, `<article>`, or `<aside>`
element that applies the text container styles.

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
<td>size</td>
<td><code>"auto" | "mobile" | "desktop"</code></td>
<td><code>null</code></td>
<td>
The size for the text container. This can usually just be left at the default of <code>&#34;auto&#34;</code> since
it will automatically transition between <code>&#34;mobile&#34;</code> and <code>&#34;desktop&#34;</code> based on media queries.
However, you can also manually specify <code>&#34;mobile&#34;</code> or <code>&#34;desktop&#34;</code> if needed.
<br /><br />
</td>
</tr>
<tr>
<td>tagName</td>
<td><code>"div" | "section" | "article" | "aside"</code></td>
<td><code>null</code></td>
<td>
The specific tagName to render as.
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
<td><code>rmd-typography(style)</code></td>
<td>Applies one of the provided material design styles to an element.
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
<td>style</td>
<td>String</td>
<td></td>
<td>One of the typography styles from <code>$rmd-typography-styles</code>.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-text-container(max-width)</code></td>
<td>A small util that will create a text container with the provided max width.
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
<td>max-width</td>
<td>Number</td>
<td>rmd-typography-desktop-max-line-length</td>
<td>The max width for a line of text.
  this number should be between 38em-42em on desktop and 17em-18em on mobile devices.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>react-md-typography</code></td>
<td>Creates all the typography styles from the react-md typography variables.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-typography-text-overflow-ellipsis</code></td>
<td>A simple mixin that can be used to update an element to ellipsis text when it is too long.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-typography-google-font-face(font-name, font-weight, font-url-or-prefix)</code></td>
<td>Creates the font face declaration for a Google font with a provided font weight. This will
need to be called multiple times if you are including multiple font weights.
<br /><br />
This should only be used if you are hosting the Google font locally instead of through the
Google fonts service.
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
<td>font-name</td>
<td>String</td>
<td>Roboto</td>
<td>The font name to use.</td>
</tr>
<tr>
<td>font-weight</td>
<td>String</td>
<td>map-get($rmd-typography-font-weights, regular)</td>
<td>The font weight to use.</td>
</tr>
<tr>
<td>font-url-or-prefix</td>
<td>String</td>
<td>null</td>
<td>This is either a font url prefix for the folder containing the font on your
  server or a url string to the font icon file on your server. If you are using create-react-app, you <b>must</b> use the
  url string approach for it to be correctly included in the build process. If this value is null, it will default to have
  &#39;/fonts/&#39; prefix and then a caterpillar-cased string. See the examples above for more details.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-typography-host-google-font(font-name, weights, font-url-prefix-or-url-map)</code></td>
<td>Generates all the font faces (with font weights) for a Google font. This should only be used if you are hosting the Google font
on your own servers instead of through the Google fonts service.
<br /><br />
If you are using create-react-app, you must provide the <code>$font-url-prefix-or-url-map</code> as a Map of urls to have the font files
correctly included and bundled during your build. See the examples for more details.
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
<td>font-name</td>
<td>String</td>
<td>Roboto</td>
<td>The font name to use.</td>
</tr>
<tr>
<td>weights</td>
<td>List</td>
<td>light regular medium bold</td>
<td>A list of font weights to use. These should be
  one of the <code>$rmd-typography-font-weights</code> keys.</td>
</tr>
<tr>
<td>font-url-prefix-or-url-map</td>
<td>String | Map</td>
<td>null</td>
<td>This is either a font url prefix for the folder containing the font on your
  server or a url string to the font icon file on your server. If you are using create-react-app, you <b>must</b> use the
  url string approach for it to be correctly included in the build process. If this value is null, it will default to have
  &#39;/fonts/&#39; prefix and then a caterpillar-cased string. See the <code>rmd-typography-google-font-face</code> mixin for more details.</td>
</tr>
</tbody>
</table>

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


##### Example Usage SCSS

```scss
@include rmd-typography-google-font-face(Roboto, regular, null);
@include rmd-typography-google-font-face('Source Code Pro', regular, null);
```

##### Example Usage Generated SCSS

```css
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'),
    local('Roboto-Regular'),
    url('/fonts/roboto/Roboto-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Code Pro'),
    local('SourceCodePro-Regular'),
    url('/fonts/source-code-pro/SourceCodePro-Regular.ttf') format('truetype');
}
```


##### create-react-app Example Usage

```scss
// This is going to assume you have downloaded the material-icons zip with all the icon font files and copied it into
// `src/fonts/material-icons` and you are including the fonts in `src/index.scss`
@include rmd-typography-host-google-font(Roboto, $rmd-typography-default-font-weights, (
  thin: url(./fonts/roboto/Roboto-Thin.ttf),
  regular: url(./fonts/roboto/Roboto-Regular.ttf),
  medium: url(./fonts/roboto/Roboto-Medium.ttf),
  bold: url(./fonts/roboto/Roboto-Bold.ttf),
));

@include rmd-typography-host-google-font(SourceCodePro, $rmd-typography-default-font-weights, (
  thin: url(./fonts/source-code-pro/SourceCodePro-Thin.ttf),
  regular: url(./fonts/source-code-pro/SourceCodePro-Regular.ttf),
  medium: url(./fonts/source-code-pro/SourceCodePro-Medium.ttf),
  bold: url(./fonts/source-code-pro/SourceCodePro-Bold.ttf),
));
```

##### Example Usage SCSS

```scss
// The next 3 lines are equivalent
@include rmd-typography-host-google-font;
@include rmd-typography-host-google-font(Roboto, $rmd-typography-default-font-weights, null);
@include rmd-typography-host-google-font(Roboto, $rmd-typography-default-font-weights, '/fonts/roboto');
@include rmd-typography-host-google-font('Source Code Pro');
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
<td><code>rmd-typography-google-font-suffix(weight)</code></td>
<td>String - the suffix for the provided font weight.</td>
<td>Gets the Google font suffix for the provided font weight.
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
<td>weight</td>
<td>String</td>
<td></td>
<td>The font weight to get a font suffix string for. This should be one of the
  <code>$rmd-typography-google-font-weight-suffixes</code> keys.</td>
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
<td><code>rmd-typography-font-family</code></td>
<td>The font family to use throughout the entire application.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-typography-mobile-max-line-length</code></td>
<td>The max length a line of text can be on mobile devices.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-typography-desktop-max-line-length</code></td>
<td>The max length a line of text can be on larger screens (mostly desktops or landscape tablets).
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
<td><code>rmd-typography-default-font-weight</code></td>
<td>A list of the &#34;default&#34; font weights that are normally included within an app.
This is really only used for hosting fonts on your own server.
<br /><br />
Each value in this should be one of the keys in <code>$rmd-typography-font-weights</code>.</td>
</tr>
<tr>
<td><code>rmd-typography-google-font-weight-suffixes</code></td>
<td>A Map of font weights to a font file suffix for a Google font.</td>
</tr>
<tr>
<td><code>rmd-typography-styles</code></td>
<td>A Map of all the typography styles in react-md</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
