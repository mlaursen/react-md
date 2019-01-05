# @react-md/overlay
A very simple package for dynamically creating overlays.

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/overlay

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
    + [Updating Sass to include `node_modules`](#updating-sass-to-include-node_modules)
    + [webpack](#webpack)
    + [create-react-app and node-sass-chokidar](#create-react-app-and-node-sass-chokidar)
  * [Styles](#styles)
- [Usage](#usage)
  * [Simple Overlay Usage](#simple-overlay-usage)
- [Prop Types](#prop-types)
  * [Overlay](#overlay)
  * [OverlayPortal](#overlayportal)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/overlay
```

#### Updating Sass to include `node_modules`
If you want to include the SCSS styles for `@react-md/overlay`, you will need to update your Sass compiler to include the `node_modules` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

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
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-overlay`:

```scss
// This import will generate styles by default.
@import "@react-md/overlay/dist/styles";
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import "@react-md/overlay/dist/overlay";

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-overlay;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import "@react-md/overlay/dist/overlay";

// Any custom styles that use the utilities
```


## Usage
### Simple Overlay Usage
```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";

interface IAppState {
  visible: boolean;
}
class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = { visible: false };
  }

  public render() {
    const { visible } = this.state;

    return (
      <main>
        <Button onClick={this.toggle}>Toggle Overlay</Button>
        <Overlay visible={visible} onRequestClose={this.hide} />
      </main>
    );
  }

  private toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  private hide = () => {
    this.setState({ visible: false });
  };
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

<!-- PROPS_START -->
## Prop Types
### Overlay
The `Overlay` component is a simple component used to render a full page overlay in the page with
an enter and exit animation. If there are overflow issues or you need to portal the overlay to a
different area within your app, you should use the `OverlayPortal` component instead.

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
Boolean if the overlay is currently visible. When this prop changes, the overlay will enter/exit
with an opacity transition.
<br /><br />
</td>
</tr>
<tr>
<td>onRequestClose *</td>
<td><code>() => void</code></td>
<td><code>null</code></td>
<td>
A function that should change the <code>visible</code> prop to <code>false</code>. This is used so that clicking the overlay
can hide the overlay.
<br /><br />
</td>
</tr>
<tr>
<td>timeout</td>
<td><code>number | { enter?: number; exit?: number; }</code></td>
<td><code>150</code></td>
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


### OverlayPortal
The `OverlayPortal` is a wrapper of the `Overlay` component to portal the overlay somehwere else within
your app.

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
<td>portalInto</td>
<td><code>string | HTMLElement | (() => HTMLElement)</code></td>
<td><code>null</code></td>
<td>
Either a function that returns an HTMLElement, an HTMLElement, or a <code>document.querySelector</code> string
that will return the HTMLElement to render the children into. If both the <code>into</code> and <code>intoId</code> props
are <code>undefined</code>, the <code>document.body</code> will be chosen instead.
<br /><br />
</td>
</tr>
<tr>
<td>portalIntoId</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The id of an element that the portal should be rendered into. This element <b>must</b> exist on the page
before the <code>visible</code> prop is enabled to work. If both the <code>into</code> and <code>intoId</code> props are <code>undefined</code>,
the <code>document.body</code> will be chosen instead.
<br /><br />
</td>
</tr>
<tr>
<td>visible *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the overlay is currently visible. When this prop changes, the overlay will enter/exit
with an opacity transition.
<br /><br />
</td>
</tr>
<tr>
<td>onRequestClose *</td>
<td><code>() => void</code></td>
<td><code>null</code></td>
<td>
A function that should change the <code>visible</code> prop to <code>false</code>. This is used so that clicking the overlay
can hide the overlay.
<br /><br />
</td>
</tr>
<tr>
<td>timeout</td>
<td><code>number | { enter?: number; exit?: number; }</code></td>
<td><code>null</code></td>
<td>
The transition duration for the overlay. This should not be changed unless you manually change the
<code>$rmd-overlay-transition-duration</code> scss variable.
<br /><br />
</td>
</tr>
<tr>
<td>mountOnEnter</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
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
<td><code>null</code></td>
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
<td><code>react-md-overlay</code></td>
<td>Creates the styles for overlays.
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
<td><code>rmd-overlay-z-index</code></td>
<td>The z-index for overlays.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-overlay-transition-duration</code></td>
<td>The transition duration for overlays entering and leaving.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-overlay-color</code></td>
<td>The background color for the overlay. It is recommended to make sure that an opacity
is applied instead of a static color.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->

