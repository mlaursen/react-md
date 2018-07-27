# @react-md/button


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/button

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [Button](#button)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example Usage SCSS](#example-usage-scss)
      - [Example Usage SCSS](#example-usage-scss-1)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/button
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/button`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-button`:

```scss
// This import will generate styles by default.
@import "@react-md/button/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/button/dist/button";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-button;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/button/dist/button";

// Any custom styles that use the utilities
```


## Usage
After including the styles, you can create buttons using the provided props:

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";

const App = () => (
  <main>
    <h3>Text Buttons</h3>
    <Button id="button-1">Text button</Button>
    <Button id="button-2" theme="primary" themeType="outline">Text button</Button>
    <Button id="button-3" theme="secondary" themeType="contained">Text button</Button>
    <Button id="button-4" theme="default" themeType="text">Text button</Button>
    <Button id="button-5" theme="default" themeType="text" icon={<FontIcon>favorite</FontIcon>}>
      Text button
    </Button>

    <h3>Icon Buttons</h3>
    <Button id="button-6" btnType="icon"><FontIcon>menu</FontIcon></Button>
    <Button id="button-7" btnType="icon" theme="primary" themeType="outline"><FontIcon>menu</FontIcon></Button>
  </main>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

<!-- PROPS_START -->
## Prop Types
### Button


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
Any children to render within the button. This will normally just be text or an icon.
<br /><br />
Please note that it is considered invalid html to have a <code>&#60;div&#62;</code> as a descendant of a <code>&#60;button&#62;</code>.
You can fix this by enabling the <code>asDiv</code> prop.
<br /><br />
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply.
<br /><br />
</td>
</tr>
<tr>
<td>type</td>
<td><code>"button" | "reset" | "submit"</code></td>
<td><code>null</code></td>
<td>
The button&#39;s type attribute.
<br /><br />
</td>
</tr>
<tr>
<td>asDiv</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the button should be rendered as a div instead. This will update the div to be fully
accessible with the [button role](https://www.w3.org/TR/wai-aria-practices/#button). If you want
to have a <code>&#60;div&#62;</code> as a child of the button, you should enable this prop.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional className to apply.
<br /><br />
</td>
</tr>
<tr>
<td>disabled</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the button is currently disabled.
<br /><br />
</td>
</tr>
<tr>
<td>btnType</td>
<td><code>"icon" | "text"</code></td>
<td><code>text</code></td>
<td>
The specific material design button type to use. A text button will display
text while an icon button will only contain an icon.
<br /><br />
</td>
</tr>
<tr>
<td>theme</td>
<td><code>"clear" | "primary" | "secondary" | "default"</code></td>
<td><code>primary</code></td>
<td>
The material design theme to apply to the button.
<br /><br />
</td>
</tr>
<tr>
<td>themeType</td>
<td><code>"flat" | "outline" | "contained"</code></td>
<td><code>flat</code></td>
<td>
The material design theme type to apply.
<br /><br />
</td>
</tr>
<tr>
<td>icon</td>
<td><code>string | number | boolean | {} | ReactElement<any> | ReactNodeArray | ReactPortal | ReactElement<...</code></td>
<td><code>null</code></td>
<td>
An optional icon to display with a text button. This is invalid for icon buttons. If this is
a single element, a new class name will be cloned into the element to get correct spacing so
if you have a custom icon element, you <b>must</b> also pass that class name down. If you are using
one of the react-md icon component packages, this is handled automatically.
<br /><br />
If this is not a valid react element, the icon will be wrapped in a <code>&#60;span&#62;</code> instead
with the class names applied.
<br /><br />
</td>
</tr>
<tr>
<td>iconAfter</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the icon should appear after the text instead of before.
<br /><br />
</td>
</tr>
<tr>
<td>beforeClassName</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The class name to use for an icon that is placed before text.
<br /><br />
</td>
</tr>
<tr>
<td>afterClassName</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The class name to use for an icon that is placed after text.
<br /><br />
</td>
</tr>
<tr>
<td>forceIconWrap</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the icon should be forced into a <code>&#60;span&#62;</code> with the class names applied instead of attempting
to clone into the provided icon.
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
<td><code>rmd-btn-unstyled</code></td>
<td>A simple mixin to create an unstyled button.
<br /><br />
NOTE: An unstyled button removed the <code>outline-style</code> so you *must* add a custom focus behavior with
either ripples or something else for keyboard users.

</td>
</tr>
<tr>
<td><code>rmd-btn-base</code></td>
<td>The base styles for a button.

</td>
</tr>
<tr>
<td><code>rmd-btn-text</code></td>
<td>Creates the base styles for a text button.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-btn-icon</code></td>
<td>Creates the base styles for an icon button.
<br /><br />

</td>
</tr>
<tr>
<td><code>react-md-button</code></td>
<td>Creates all the styles for buttons within react-md.
<br /><br />

</td>
</tr>
</tbody>
</table>

#### Examples


##### Example Usage SCSS

```scss
.my-button {
  @include rmd-btn-unstyled;
  @include rmd-typography(button);

  display: inline-flex;
}
```


##### Example Usage SCSS

```scss
.my-button {
  @include rmd-btn-base;
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
<td><code>rmd-btn-text-border-radius</code></td>
<td>The border radius to apply to text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-horizontal-padding</code></td>
<td>The amount of left and right padding to apply to text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-vertical-padding</code></td>
<td>The amount of top and bottom padding to apply to text buttons. Since buttons
are now displayed as inline-flex, it is generally recommended to keep this value
at 0 and just increase the height of the button instead.</td>
</tr>
<tr>
<td><code>rmd-btn-text-height</code></td>
<td>The height for text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-min-width</code></td>
<td>The min width for text buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-text-icon-size</code></td>
<td>The text button&#39;s icon size. This is than the normal icon size by default since buttons
have additional padding. You can set this to <code>null</code> if you want consistent icon sizes.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-icon-border-radius</code></td>
<td>The border radius to apply to all icon buttons.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-icon-size</code></td>
<td>The height and width to apply to an icon button.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-hover-background-color</code></td>
<td>The background color to apply when a button is hovered. This will be applied in the <code>::after</code>
pseudo element so it is recommended to be either black or white with an opacity applied.</td>
</tr>
<tr>
<td><code>rmd-btn-background-color-transition-time</code></td>
<td>The transition duration for the hover background color to be applied.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-box-shadow-width</code></td>
<td>The base box-shadow width to apply to buttons
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-box-shadow</code></td>
<td>The base box-shadow to apply to buttons when outlined. This will normally be used along with a color variable
to define a box shadow.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-default-color</code></td>
<td>The color to use for a button&#39;s &#34;default&#34; state.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-contained-elevation-transition-time</code></td>
<td>The transition time for a contained button to raise to the pressed elevation.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-contained-resting-elevation</code></td>
<td>The elevation to use for a resting contained button. This should be a number between
0 and 24.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-btn-contained-pressed-elevation</code></td>
<td>The elevation to use for a contained button that is being pressed. This should be a number
between 0 and 24.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

