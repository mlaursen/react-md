# @react-md/app-bar
This small package implments the AppBar spec in material design.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/app-bar

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [AppBar](#appbar)
  * [AppBarAction](#appbaraction)
  * [AppBarNav](#appbarnav)
  * [AppBarTitle](#appbartitle)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/app-bar
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/app-bar`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-app-bar`:

```scss
// This import will generate styles by default.
@import "@react-md/app-bar/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/app-bar/dist/app-bar";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-app-bar;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/app-bar/dist/app-bar";

// Any custom styles that use the utilities
```


## Usage
<!-- PROPS_START -->
## Prop Types
### AppBar


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


### AppBarAction


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
<td>first</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
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
<td>asDiv</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
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
<td><code>null</code></td>
<td>
Boolean if the button is currently disabled.
<br /><br />
</td>
</tr>
<tr>
<td>btnType</td>
<td><code>"text" | "icon"</code></td>
<td><code>null</code></td>
<td>
The specific material design button type to use. A text button will display
text while an icon button will only contain an icon.
<br /><br />
</td>
</tr>
<tr>
<td>theme</td>
<td><code>"clear" | "primary" | "secondary" | "default"</code></td>
<td><code>null</code></td>
<td>
The material design theme to apply to the button.
<br /><br />
</td>
</tr>
<tr>
<td>themeType</td>
<td><code>"flat" | "outline" | "contained"</code></td>
<td><code>null</code></td>
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
<td><code>null</code></td>
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


### AppBarNav


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
<td>asDiv</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
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
<td><code>null</code></td>
<td>
Boolean if the button is currently disabled.
<br /><br />
</td>
</tr>
<tr>
<td>btnType</td>
<td><code>"text" | "icon"</code></td>
<td><code>null</code></td>
<td>
The specific material design button type to use. A text button will display
text while an icon button will only contain an icon.
<br /><br />
</td>
</tr>
<tr>
<td>theme</td>
<td><code>"clear" | "primary" | "secondary" | "default"</code></td>
<td><code>null</code></td>
<td>
The material design theme to apply to the button.
<br /><br />
</td>
</tr>
<tr>
<td>themeType</td>
<td><code>"flat" | "outline" | "contained"</code></td>
<td><code>null</code></td>
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
<td><code>null</code></td>
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


### AppBarTitle


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
<!-- SASSDOC_END -->

