# @react-md/icon
This package is for including icons within react-md. There is included support for both font icons and SVG icons.


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/icon

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
  * [Including a font icon library](#including-a-font-icon-library)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [FontIcon](#fonticon)
  * [SVGIcon](#svgicon)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example SCSS Usage](#example-scss-usage)
      - [Example SCSS Usage](#example-scss-usage-1)
      - [Example SCSS Usage](#example-scss-usage-2)
      - [Example SCSS Usage](#example-scss-usage-3)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/icon
```

`SVGIcon`s will be inline svgs by default to make it easier to install-and-use. If you want to use spritemaps, please read the documentation in the [@react-md/material-icons](https://github.com/mlaursen/react-md/tree/next/packages/material-icons/README.md#creating-spritemaps) and if you
want to use `FontIcon`s, you will need to first include the font icon library into your app for the icons to display.

### Including a font icon library
The easiest way to include a font icon library is to update your `index.html` file to have a link to material icons. The following example would show how you can update
your `index.html` template file from create-react-app. Edit `public/index.html`;

```diff
     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
+    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Now you should have access to the material icons and can use them as expected.

An alternative is to use the [webfontloader](https://github.com/typekit/webfontloader) to load the fonts. Edit `src/index.tsx`:

```diff
 import * as React from 'react';
 import * as ReactDOM from 'react-dom';
+import * as WebFontLoader from 'webfontloader';
 import App from './App';
 import registerServiceWorker from './registerServiceWorker';
 import './index.css';

+WebFontLoader.load({
+  google: {
+    families: ['Material Icons'],
+  },
+});

 ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
 registerServiceWorker();
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/icon`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-icon`:

```scss
// This import will generate styles by default.
@import "@react-md/icon/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/icon/dist/icon";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-icon;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/icon/dist/icon";

// Any custom styles that use the utilities
```


## Usage

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { SVGIcon, FontIcon } from "@react-md/icon";

const App = () => (
  <main>
    <FontIcon>home</FontIcon>
    <FontIcon>menu</FontIcon>
    <FontIcon iconClassName="fa fa-github" />
    <SVGIcon><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></SVGIcon>{/* menu icon */}
  </main>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```
<!-- PROPS_START -->
## Prop Types
### FontIcon


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
Any children to render to create the font icon. This is required for material-icons.&#10;
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply.&#10;
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional className to apply.&#10;
</td>
</tr>
<tr>
<td>iconClassName</td>
<td><code>string</code></td>
<td><code>material-icons</code></td>
<td>
The font icon class name to use.&#10;
</td>
</tr>
<tr>
<td>dense</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the font icon should use the dense spec.&#10;
</td>
</tr>
<tr>
<td>forceSize</td>
<td><code>number | boolean</code></td>
<td><code>false</code></td>
<td>
Either a boolean that will enforce the 24x24 size of the font icon or a number of the size&#10;to enforce. This is useful when using other font icon libraries that do not have a consistent&#10;size.&#10;
</td>
</tr>
<tr>
<td>forceFontSize</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the <code>forceSize</code> prop should also force the <code>font-size</code> instead of only <code>width</code> and <code>height</code>.&#10;
</td>
</tr>
</tbody>
</table>


### SVGIcon


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
Any <code>&#60;svg&#62;</code> children to render to create your icon. This can not be used with the <code>use</code> prop.&#10;
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply to the svg element.&#10;
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional className to apply to the svg element.&#10;
</td>
</tr>
<tr>
<td>role</td>
<td><code>"img" | "presentation"</code></td>
<td><code>img</code></td>
<td>
The role to apply to the SVG. When using icons, it is generally recommended to leave it as the default&#10;<code>img</code> so that it is insured as a graphic.&#10;
</td>
</tr>
<tr>
<td>titleAttr</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
This prop is the title attribute to provide to the <code>&#60;svg&#62;</code> element itself. This should be used when you&#10;are using a spritesheet that has defined <code>&#60;title&#62;</code> with each SVG symbol.&#10;
</td>
</tr>
<tr>
<td>aria-labelledby</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional list of ids to use to label the SVG icon with. This is helpful to add when you use the <code>title</code>&#10;and <code>desc</code> props as this is used to create ids for those two props. This is super beneficial to screen readers.&#10;&#10;When this is defined, it is a space-delimited string of ids to provide to the title and desc (in order). If&#10;this is omitted and the <code>use</code> prop is defined, it will take everything after the <code>#</code> sign and append <code>-title</code> and&#10;<code>-desc</code> as a fallback. Check out the examples for more information about this.&#10;&#10;@link #title}&#10;@see {&#10;@link #desc}&#10;@docgen
</td>
</tr>
<tr>
<td>title</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional title to give to your SVG icon. This is generally recommended for accessibility when not using&#10;the <code>use</code> prop, or your spritemap does not contain <code>&#60;title&#62;</code> and `&#60;desc&#62;.&#10;   *&#10;   * &#10;   * @docgen&#10;   *
</td>
</tr>
<tr>
<td>desc</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional description to give to your SVG icon. This is generally recommended for accessibility when not using&#10;the <code>use</code> prop, or your spritemap does not contain <code>&#60;title&#62;</code> and `&#60;desc&#62;.&#10;   *&#10;   * &#10;   * @docgen&#10;   *
</td>
</tr>
<tr>
<td>focusable</td>
<td><code>string</code></td>
<td><code>false</code></td>
<td>
Boolean if the SVG should gain the <code>focusable</code> attribute. This is disabled by default since IE11&#10;and Edge actually default this to true and keyboard&#39;s will tab focus all SVGs.&#10;
</td>
</tr>
<tr>
<td>size</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
An optional size to apply to the SVG. This can be used to set both the&#10;<code>height</code> and <code>width</code> simultaneously. This will be provided as inline styles&#10;since the <code>height</code> and <code>width</code> are normally controlled by CSS, and CSS has&#10;higher precedence than the <code>height</code>/<code>width</code> attributes.&#10;
</td>
</tr>
<tr>
<td>viewBox</td>
<td><code>string</code></td>
<td><code>0 0 24 24</code></td>
<td>
The viewBox attribute allows you to specify that a given set of graphics stretch to&#10;fit a particular container element.&#10;&#10;The value of the viewBox attribute is a list of four numbers min-x, min-y, width and&#10;height, separated by white space and/or a comma, which specify a rectangle in user&#10;space which should be mapped to the bounds of the viewport established by the given&#10;element, taking into account attribute preserveAspectRatio.&#10;&#10;Negative values for width or height are not permitted and a value of zero disables&#10;rendering of the element.An optional viewbox for the SVG.&#10;&#10;For example, if the SVG element is 250 (width) by 200 (height) and you provide&#10;`viewBox=&#34;0 0 25 20&#34;`, the coordinates inside the SVG will go from the top left corner&#10;(0, 0) to the bottom right (25, 20) and each unit will be worth <code>10px</code>.&#10;
</td>
</tr>
<tr>
<td>xmlns</td>
<td><code>string</code></td>
<td><code>http://www.w3.org/2000/svg</code></td>
<td>
An optional xmlns string to provide. The <code>use</code> prop will not work without this prop&#10;defined.&#10;
</td>
</tr>
<tr>
<td>use</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
This should be a link to a part of an SVG spritemap. So normally one of the following:&#10;- <code>&#39;#some-custom-svg&#39;</code>&#10;- <code>&#39;/images/spritemap.svg#some-custom-svg&#39;</code>&#10;&#10;This prop <b>should not</b> be used with the <code>children</code> prop as only one will be rendered.&#10;&#10;&#62; NOTE: IE **does not support** external SVGs. Please see the demo for more details.&#10;
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
<td><code>rmd-icon-font</code></td>
<td>Creates the base styles for a font icon.&#10;&#10;

</td>
</tr>
<tr>
<td><code>rmd-icon-font-dense</code></td>
<td>Creates the styles for updating a font icon to use the dense spec. This requires the&#10;base font icon styles to already be applied.&#10;&#10;

</td>
</tr>
<tr>
<td><code>rmd-icon-svg</code></td>
<td>Creates the base styles for an svg icon.&#10;&#10;

</td>
</tr>
<tr>
<td><code>rmd-icon-svg-dense</code></td>
<td>Creates the styles for updating an svg icon to use the dense spec. This requires the&#10;base svg icon styles to already be applied.&#10;&#10;

</td>
</tr>
<tr>
<td><code>react-md-icon</code></td>
<td>Creates the styles for icons within react-md. This requires either the <code>rmd-icon-use-font-icons</code> or <code>rmd-icon-use-svg-icons</code> variables&#10;to be enabled to generate any styles.&#10;

</td>
</tr>
</tbody>
</table>

#### Examples


##### Example SCSS Usage

```scss
.font-icon {
  @include rmd-icon-base;
  @include rmd-icon-font;
}
```
,
##### Example SCSS Usage

```scss
.font-icon {
  @include rmd-icon-base;
  @include rmd-icon-font;
}

@media (min-width: 1200px) {
  .font-icon {
    @include rmd-icon-font-dense;
  }
}
```
,
##### Example SCSS Usage

```scss
.svg-icon {
  @include rmd-icon-base;
  @include rmd-icon-scg;
}
```
,
##### Example SCSS Usage

```scss
.svg-icon {
  @include rmd-icon-base;
  @include rmd-icon-svg;
}

@media (min-width: 1200px) {
  .svg-icon {
    @include rmd-icon-svg-dense;
  }
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
<td><code>rmd-icon-size</code></td>
<td>The base icon size to use.&#10;</td>
</tr>
<tr>
<td><code>rmd-icon-dense-size</code></td>
<td>The dense icon size to use. If you do not want to include the dense icon spec, disable the&#10;<code>$rmd-icon-include-dense</code> variable.&#10;</td>
</tr>
<tr>
<td><code>rmd-icon-include-dense</code></td>
<td>Boolean if the dense spec for icons should be included. This will just generate <code>.md-icon--font-dense</code> and <code>.md-icon--svg-dense</code> class names&#10;that can be applied.&#10;&#10;</td>
</tr>
<tr>
<td><code>rmd-icon-use-font-icons</code></td>
<td>Boolean if font icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can&#10;disable the style generation for the unused type to save a few bytes.&#10;&#10;</td>
</tr>
<tr>
<td><code>rmd-icon-use-svg-icons</code></td>
<td>Boolean if svg icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can&#10;disable the style generation for the unused type to save a few bytes.&#10;&#10;</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

