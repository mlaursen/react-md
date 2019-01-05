# @react-md/sheet
A package for making temporary sheets of material (normally for navigation or details).

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/sheet

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [Sheet](#sheet)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/sheet
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/sheet`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-sheet`:

```scss
// This import will generate styles by default.
@import "@react-md/sheet/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/sheet/dist/sheet";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-sheet;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/sheet/dist/sheet";

// Any custom styles that use the utilities
```


## Usage
<!-- PROPS_START -->
## Prop Types
### Sheet


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
<td>visible *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the sheet is currently visible.
<br /><br />
</td>
</tr>
<tr>
<td>onRequestClose *</td>
<td><code>() => void</code></td>
<td><code>null</code></td>
<td>
A function used to close the sheet when the overlay is clicked. This is really only required
when the <code>overlay</code> prop is enabled, but I haven&#39;t figured out a way to typedef that in Typescript
yet.
<br /><br />
</td>
</tr>
<tr>
<td>overlay</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Boolean if there should be an overlay displayed with the sheet. This is recommended/required on mobile devices.
<br /><br />
</td>
</tr>
<tr>
<td>position</td>
<td><code>"calculated" | "top" | "right" | "bottom" | "left"</code></td>
<td><code>bottom</code></td>
<td>
The position for the sheet to be rendered.
<br /><br />
</td>
</tr>
<tr>
<td>horizontalSize</td>
<td><code>"none" | "media" | "small" | "large" | "until-small" | "until-large" | "until-media"</code></td>
<td><code>media</code></td>
<td>
The size to use for sheets that have been positioned left or right. The default supported values are:
- none - no limits added to sizing. the size will be based on content or custom styles
- small - used for mobile devices.
- large - used for landscape tablets and desktops.
- media - automatically switches between &#34;small&#34; and &#34;large&#34; based on css media queries. (this is the default)
<br /><br />
</td>
</tr>
<tr>
<td>verticalSize</td>
<td><code>"none" | "touch" | "recommended"</code></td>
<td><code>recommended</code></td>
<td>
The size to use for sheets that have been positioned top or bottom. The supported sizes are:
- none - the size is based on content and is limited to the viewport height.
- touch - the size is based on content and is limited to the viewport height with a touchable area to close the
sheet.
- recommended - the material design recommended sizing that forces a max-height of 50vh and min-height of 3.5rem
<br /><br />
</td>
</tr>
<tr>
<td>inline</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the sheet should be updated to have the look-and-feel of being rendered inline with other content on the
page instead of directly over everything. This is really just used to lower the box shadow.
<br /><br />
</td>
</tr>
<tr>
<td>classNames</td>
<td><code>string | ICSSTransitionClassNames</code></td>
<td><code>{
      enter: "rmd-sheet--enter",
      enterActive: "rmd-sheet--enter-active",
      exit: "rmd-sheet--exit",
      exitActive: "rmd-sheet--exit-active",
    }</code></td>
<td>
The class names to use during the different parts of the animation.
<br /><br />
</td>
</tr>
<tr>
<td>timeout</td>
<td><code>number | { enter?: number; exit?: number; }</code></td>
<td><code>{
      enter: 200,
      exit: 150,
    }</code></td>
<td>
The transition duration for the overlay. This should not be changed unless you manually change the
<code>$rmd-overlay-transition-duration</code> scss variable.
<br /><br />
</td>
</tr>
<tr>
<td>mountOnEnter</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group. By default, the overlay will
not be rendered in the DOM until the <code>visible</code> prop is <code>true</code> but this can be changed by setting this
prop to <code>false</code>.
<br /><br />
</td>
</tr>
<tr>
<td>unmountOnExit</td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group. By default, the overlay will
be removed from the DOM when the <code>visible</code> prop is <code>false</code> but this can be changed by setting this
prop to <code>false</code>.
<br /><br />
</td>
</tr>
<tr>
<td>onEnter</td>
<td><code>TransitionEnterHandler</code></td>
<td><code>null</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group.
<br /><br />
</td>
</tr>
<tr>
<td>onEntering</td>
<td><code>TransitionEnterHandler</code></td>
<td><code>null</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group.
<br /><br />
</td>
</tr>
<tr>
<td>onEntered</td>
<td><code>TransitionEnterHandler</code></td>
<td><code>null</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group.
<br /><br />
</td>
</tr>
<tr>
<td>onExit</td>
<td><code>TransitionExitHandler</code></td>
<td><code>null</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group.
<br /><br />
</td>
</tr>
<tr>
<td>onExiting</td>
<td><code>TransitionExitHandler</code></td>
<td><code>null</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group.
<br /><br />
</td>
</tr>
<tr>
<td>onExited</td>
<td><code>TransitionExitHandler</code></td>
<td><code>null</code></td>
<td>
Pass-down prop to the <code>Transition</code> component from react-transition-group.
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
<td><code>rmd-sheet-base</code></td>
<td>Creates the base styles for a sheet.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-sheet-top-base</code></td>
<td>Creates the base styles for a sheet placed at the top of the viewport. This still
requires the use of the <code>rmd-sheet-base</code> mixin.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-sheet-bottom-base</code></td>
<td>Creates the base styles for a sheet placed at the bottom of the viewport. This still
requires the use of the <code>rmd-sheet-base</code> mixin.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-sheet-left-base</code></td>
<td>Creates the base styles for a sheet placed at the left of the viewport. This still
requires the use of the <code>rmd-sheet-base</code> mixin.
<br /><br />

</td>
</tr>
<tr>
<td><code>rmd-sheet-right-base</code></td>
<td>Creates the base styles for a sheet placed at the right of the viewport. This still
requires the use of the <code>rmd-sheet-base</code> mixin.
<br /><br />

</td>
</tr>
<tr>
<td><code>react-md-sheet</code></td>
<td>Creates all the styles for sheets.
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
<td><code>rmd-sheet-elevation</code></td>
<td>The elevation to use for sheets that are displayed &#34;inline&#34; with other content. This <i>should</i>_ most likely
stay the default, but it needs to be a number between 0 and 16.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-fixed-elevation</code></td>
<td>The elevation to use for fixed sheets. This <i>should</i> most likely stay the default, but it needs to
be a number between 0 and 16.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-z-index</code></td>
<td>The z-index for sheets. The value doesn&#39;t matter <i>too</i> much but it needs to at least be above the
overlay that is created along with the sheet.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-enter-duration</code></td>
<td>The duration for the enter transition.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-leave-duration</code></td>
<td>The duration for the leave transition.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-positions</code></td>
<td>A list of positions that are supported by the sheet component.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-enabled-positions</code></td>
<td>The positions that are created by default with the <code>react-md-sheet</code> mixin. When generating
styles, this list will be looped through to create the correct position styles.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-small-margin</code></td>
<td>The amount of horizontal margin to use between the viewport&#39;s edge and the sheet&#39;s edge. This
is used so that mobile devies have an overlay &#34;touch target&#34; to close the sheet without requiring
one of the actions to be clicked.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-small-width</code></td>
<td>The width to apply to &#34;small&#34; sheets. This width <b>should</b> be used for mobile devices along with
the max-width.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-small-max-width</code></td>
<td>The max-width to apply to &#34;small&#34; sheets. This max-width <b>should</b> be used for mobile devices along with
the max-width.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-large-width</code></td>
<td>The width to apply to &#34;large&#34; sheets. This width <b>should not</b> be used on phones but can be used for tablets or
desktops.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-large-max-width</code></td>
<td>The max-width to apply to &#34;large&#34; sheets. This max-width <b>should not</b> be used on phones but can be used for tablets or
desktops.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-max-height</code></td>
<td>The max height to set for sheets. It is recommended to leave this as 100% and instead update the
<code>$rmd-sheet-touchable-max-height</code> instead.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-touchable-max-height</code></td>
<td>The max height for a sheet that has a &#34;touchable&#34; area that can be used to close the sheet without selecting
one of the actions.</td>
</tr>
<tr>
<td><code>rmd-sheet-recommended-min-height</code></td>
<td>The &#34;recommended&#34; min-height from the material design spec for bottom sheets.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-sheet-recommended-max-height</code></td>
<td>The &#34;recommended&#34; max-height from the material design spec for bottom sheets. I personally think it is better
to either set the max-height to `calc(100% - 3.5rem)` or <code>100%</code> with a close button.
</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

