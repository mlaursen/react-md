# @react-md/app-bar

This small package implments the AppBar spec in material design.

This source code of this package can be found at:
https://github.com/mlaursen/react-md/tree/next/packages/app-bar

<!-- TOC_START -->

## Table of Contents

- [Installation](#installation)
  - [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
  - [webpack](#webpack)
  - [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
  - [Simple Usage](#simple-usage)
- [Prop Types](#prop-types)
  - [AppBar](#appbar)
  - [AppBarAction](#appbaraction)
  - [AppBarNav](#appbarnav)
  - [AppBarTitle](#appbartitle)
  - [AppBarRow](#appbarrow)
- [SassDoc](#sassdoc)
  - [Mixins](#mixins)
    - [Examples](#examples)
      - [Example Usage SCSS](#example-usage-scss)
      - [Example Usage SCSS](#example-usage-scss-1)
      - [Example Usage SCSS](#example-usage-scss-2)
      - [Example Usage SCSS](#example-usage-scss-3)
      - [Example Usage SCSS](#example-usage-scss-4)
      - [Example Usage SCSS](#example-usage-scss-5)
  - [Variables](#variables)
    <!-- TOC_END -->

## Installation

```sh
$ npm install --save @react-md/app-bar
```

#### Updating Sass to include `node_modules`

If you want to include the SCSS styles for `@react-md/app-bar`, you will need to
update your Sass compiler to include the `node_modules` in the paths as well as
add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple
browser compatibility.

> If you are using
> [create-react-app](https://github.com/facebook/create-react-app), the
> autoprefixer is already included.

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

Including all the base styles can be done by either importing the styles file
from the `dist` folder or importing the helpers file and using the mixin
`react-md-app-bar`:

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

If you would like to just import all the utility variables, mixins, and
functions:

```scss
@import "@react-md/app-bar/dist/app-bar";

// Any custom styles that use the utilities
```

## Usage

### Simple Usage

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/button";

const App = () => (
  <React.Fragment>
    <AppBar>
      <AppBarNav>
        <HomeSVGIcon />
      </AppBarNav>
      <AppBarTitle>Example App!</AppBarTitle>
    </AppBar>
    <main className={AppBar.offsetClassName}>
      This is some content that will have additional padding-top applied that
      matches the height of the fixed app bar.
    </main>
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

<!-- PROPS_START -->

## Prop Types

### AppBar

The `AppBar` component is usually used to create a fixed header within your page
that has a title, an optional nav, and optional actions. Since it is fixed on
the page, it normally requires adding padding or margin to relative elements so
that they aren't covered by this component. You can use the static class names
on the `AppBar` to correctly add the padding or margin.

- `AppBar.offsetClassName`
- `AppBar.offsetProminentClassName`
- `AppBar.offsetDenseClassName`
- `AppBar.offsetProminentDenseClassName`

You can also use the provided `rmd-app-bar-offset` mixin to manually apply the
offset to one element.

> Note: Required props will have an asterisk (\*) after their name.

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
<td>fixed</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the <code>AppBar</code> should be fixed to the top or bottom of the page.
<br /><br />
</td>
</tr>
<tr>
<td>fixedPosition</td>
<td><code>"top" | "bottom"</code></td>
<td><code>top</code></td>
<td>
The position within the page to &#34;fix&#34; the <code>AppBar</code> when the <code>fixed</code> prop is enabled.
<br /><br />
</td>
</tr>
<tr>
<td>fixedElevation</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if the fixed <code>AppBar</code> should gain elevation. This is recommended to stay enabled unless
you manually apply a border to help separate the <code>AppBar</code> from other content.
<br /><br />
</td>
</tr>
<tr>
<td>dense</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the <code>AppBar</code> should use the <code>dense</code> spec. This prop can be used along with the <code>prominent</code> prop
to create a prominent and dense <code>AppBar</code>.
<br /><br />
</td>
</tr>
<tr>
<td>prominent</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the <code>AppBar</code> should use the <code>prominent</code> spec. This prop can be used along with the <code>dense</code> prop
to create a prominent and dense <code>AppBar</code>.
<br /><br />
</td>
</tr>
<tr>
<td>theme</td>
<td><code>"clear" | "primary" | "secondary" | "default"</code></td>
<td><code>primary</code></td>
<td>
The theme to apply to the <code>AppBar</code>.
<br /><br />
</td>
</tr>
<tr>
<td>inheritColor</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the <code>AppBarNav</code>, <code>AppBarTitle</code>, and <code>AppBarActions</code> should inherit the color that for the provided
<code>theme</code>. If this value is <code>undefined</code>, the color will only be inherited when the theme is set to <code>primary</code> or
<code>secondary</code>. However if this value is a boolean, it will be used instead. So if you set this to <code>false</code> and set
the <code>theme</code> to <code>&#34;primary&#34;</code>, the defined primary text clor will not be inherited.
<br /><br />
</td>
</tr>
</tbody>
</table>

### AppBarAction

The `AppBarAction` component is a simple wrapper of the `Button` component that
just adds some additional styles as needed to position itself within the
`AppBar` as well as changing the default props so that it is `"icon"` by default
instead of `"text"` and `"clear"` instead of `"primary"` for the theme.

> Note: Required props will have an asterisk (\*) after their name.

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
Boolean if this is the first action within the app bar. This is really just used to automatically
right-align all the actions by applying `margin-left: auto` to this action.

</td>
</tr>
<tr>
<td>last</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if this is the last action within the app bar&#39;s row. This will just apply the <code>$rmd-app-bar-lr-margin</code>
as <code>margin-right</code>.
<br /><br />
NOTE: This should not be used when using an overflow menu.
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

The `AppBarNav` component is a simple wrapper of the `Button` component used to
add some additional styles to position itself within the `AppBar` as well as
changing the default props so that it is `"icon"` by default instead of `"text"`
and `"clear"` instead of `"primary"` for the theme.

> Note: Required props will have an asterisk (\*) after their name.

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

The `AppBarTitle` component is a simple wrapper around an `<h6>` tag to get
styling for a title within an app bar.

> Note: Required props will have an asterisk (\*) after their name.

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
<td>keyline</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the title should be placed at the <code>$rmd-app-bar-title-keyline</code>.
<br /><br />
</td>
</tr>
</tbody>
</table>

### AppBarRow

The `AppBarRow` is used to help generate a "prominent" AppBar with different
rows with correct spacing and alignment. It really just helps enforce the
vertical alignment of each item within a row. This should not be used if you
want to have a dynamic `AppBar` height.

> Note: Required props will have an asterisk (\*) after their name.

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
<td>dense</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if each row is using the &#34;dense&#34; spec for an app bar.
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
<td><code>rmd-app-bar</code></td>
<td>Creates the styles for the <code>AppBar</code> component.

</td>
</tr>
<tr>
<td><code>rmd-app-bar-nav</code></td>
<td>Creats the styles for the <code>AppBarNav</code> component.

</td>
</tr>
<tr>
<td><code>rmd-app-bar-title</code></td>
<td>Creates the styles for the <code>AppBarTitle</code> component.

</td>
</tr>
<tr>
<td><code>rmd-app-bar-action</code></td>
<td>Creates the styles for the <code>AppBarAction</code> component.

</td>
</tr>
<tr>
<td><code>rmd-app-bar-row</code></td>
<td>Creates the styles for the <code>AppBarRow</code> component.

</td>
</tr>
<tr>
<td><code>rmd-app-bar-offset(prominent, dense, style)</code></td>
<td>A simple mixin for updating an element to be offset by the current app bar&#39;s height if it is one
of the built-in heights for react-md. This is normally just used for fixed top app bars, but you
can change the <code>$style</code> param to be <code>padding-bottom</code> for app bars fixed at the bottom of the viewport.
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
<td>prominent</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean if the styles should reflect a prominent app bar. If both
    this and the <code>dense</code> params are set to <code>true</code>, the styles will reflect a prominent dense app bar.</td>
</tr>
<tr>
<td>dense</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean if the styles should reflect a dense app bar. If both this and
    the <code>prominent</code> params are set to <code>true</code>, the styles will reflect a prominent dense app bar.</td>
</tr>
<tr>
<td>style</td>
<td>String</td>
<td>rmd-app-bar-offset-style</td>
<td>The style to apply the offset to.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-app-bar-offsets(style, offsets)</code></td>
<td>Creates all the offset class names applied with the current style.
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
<td>rmd-app-bar-offset-style</td>
<td>The style to apply the offset to.</td>
</tr>
<tr>
<td>offsets</td>
<td>String</td>
<td>rmd-app-bar-offsets</td>
<td>A list of offsets that should be created.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>react-md-app-bar</code></td>
<td>Creates all the styles for all the AppBar components.
<br /><br />

</td>
</tr>
</tbody>
</table>

#### Examples

##### Example Usage SCSS

```scss
.rmd-app-bar {
  @include rmd-app-bar;
}
```

##### Example Usage SCSS

```scss
.rmd-app-bar__nav {
  @include rmd-app-bar-nav;
}
```

##### Example Usage SCSS

```scss
.rmd-app-bar__title {
  @include rmd-app-bar-title;
}
```

##### Example Usage SCSS

```scss
.rmd-app-bar__action {
  @include rmd-app-bar-action;
}
```

##### Example Usage SCSS

```scss
.rmd-app-bar__row {
  @include rmd-app-bar-row;
}
```

##### Example Usage SCSS

```scss
.main {
  @include rmd-app-bar-offset;

  &--prominent {
    @include rmd-app-bar-offset(true, $true);
  }

  &--dense {
    @include rmd-app-bar-offset(false, true);
  }

  &--dense-prominent {
    @include rmd-app-bar-offset(true, true);
  }

  &--margin {
    @include rmd-app-bar-offset(false, false, margin-top);
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
<td><code>rmd-app-bar-z-index</code></td>
<td>The z-index to use for the fixed app bar. Ideally this value should be less than
any of the &#34;temporary&#34; materials like overlays, sheets, and menus.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-fixed-elevation</code></td>
<td>The elevation to use for &#34;fixed&#34; app bars. This should be a number between 0 and 16.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-height</code></td>
<td>The height for the app bar.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-dense-height</code></td>
<td>The dense height for the app bar.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-prominent-height</code></td>
<td>The prominent/extended height for the app bar.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-prominent-dense-height</code></td>
<td>The prominent/extended height for the app bar when the <code>dense</code> prop is also enabled.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-keyline</code></td>
<td>The default keyline to use for either the <code>AppBarNav</code> or <code>AppBarTitle</code>. This makes the icon in the <code>AppBarNav</code> or
the first letter in the <code>AppBarTitle</code> appear at this distance.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-nav-margin</code></td>
<td>The amount of margin to apply to the <code>AppBarNav</code> based on the <code>$rmd-app-bar-keyline</code> so that the icon will be positioned
at the keyline (ignoring the button padding).
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-title-line-height</code></td>
<td>The line-height to apply to the <code>AppBarTitle</code>.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-title-keyline</code></td>
<td>The keyline for the <code>AppBarTitle</code> to use when used with the <code>AppBarNav</code> or the <code>offset</code> prop is enabled.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-title-nav-margin</code></td>
<td>The amount of margin to apply to the title when used with the <code>AppBarNav</code> component.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-lr-margin</code></td>
<td>The amount of margin to apply to the first and last element within the app bar (per row basis). This will automatically be
applied if using the <code>AppBarNav</code> component and will be applied to the <code>AppBarAction</code> component that enables the <code>last</code> prop.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-default-background-color</code></td>
<td>The background-color to use for an <code>AppBar</code> that is using the <code>default</code> theme.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-default-text-color</code></td>
<td>The color to use for an <code>AppBar</code> that is using the <code>default</code> theme.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-valid-offsets</code></td>
<td>A list of &#34;valid&#34; offsets the are supported by the <code>rmd-app-bar-offsets</code> mixin.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-offsets</code></td>
<td>The app bar offsets that should be created by default.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-app-bar-offset-style</code></td>
<td>The default style to apply the app bar offsets to. This should normally be one of:
- padding-top
- padding-bottom
- margin-top
- margin-bottom
- top
- bottom
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
