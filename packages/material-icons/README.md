# @react-md/material-icons

This package is just a simple wrapper for using material icons within react-md
as either font icons or SVG icons. All of the icons were pulled directly from
[material-icons](https://github.com/google/material-design-icons) using the
[custom create cli](./scripts/cli.ts). Please thank all the contributors and
maintainers of material icons for the work they have put in.

## Installation

```sh
npm install --save @react-md/material-icons @react-md/icon
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/material-icons/demos) for
live examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

This package automatically creates a component file for each material-icon that
exists as both an inline SVG and a font icon. The script to generate these
components will take an SVG filename from the [SVGs folder](./svgs/) and convert
it into PascalCase. If the SVG starts with a number, the number will come after
the first `_` part instead of being the start of the name.

To see a full list of icons, just view the [source folder](./src).

### Examples

```tsx
import React from "react":
import { render } from "react-dom";

import {
  AccessAlarmFontIcon,
  AccessAlarmSVGIcon,
  Rotation3DFontIcon, // the sprite name for this was 3d_rotation.svg
  Rotation3DSVGIcon, // the sprite name for this was 3d_rotation.svg
  HomeFontIcon,
  HomeSVGIcon,
} from "@react-md/material-icons";

const App = () => (
  <main>
    <AccessAlarmFontIcon />
    <AccessAlarmSVGIcon />
    <Rotation3DFontIcon />
    <Rotation3DSVGIcon />
    <HomeFontIcon />
    <HomeSVGIcon />
  </main>
);

render(<App />, document.getElementById("root") );
```

## Creating sprite maps

One of the problems with inline SVGs is that all your icons are not cacheable
and reusable. If this is your goal, you can use this package to create icon
sprites from every SVG that is provided from this package. If your app needs to
support IE11 or Edge < 12, you will also need to polyfill the `<use>` in SVG
with [svgxuse](https://github.com/Keyamoon/svgxuse) or
[svg4everybody](https://github.com/jonathantneal/svg4everybody) since they do
not support `<use xlink:href>` and external SVG sprite maps.

There are multiple ways to create sprites, and material icons have a pretty good
description about some ways to
[generate sprite maps](https://github.com/google/material-design-icons/tree/master/sprites#creating-your-own-sprites)
but my current tool of choice is the
[svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) so it
integrates right into my webpack config and `svgxuse`. To get sprite maps
working, update your `webpack.config.js`:

```diff
 const webpack = require('webpack');
+const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


   module: {
     rules: [{
       test: /\.jsx?$/,
       include: src,
       loader: 'babel-loader',
+    }, {
+      test: /\.svg$/,
+      include: [
+        // optional if there are any custom svgs that are not apart of material-icons that should be used
+        'src/iconSprites',
+        // update webpack to allow svgs from the material-icons package (required)
+        'node_modules/@react-md/material-icons/svgs',
+      ],
+      use: [{
+        loader: 'svg-sprite-loader',
+        options: {
+          extract: true,
+          spriteFilename: 'icon-sprites.[hash:8].svg',
+        },
+      }, 'svg-fill-loader', 'svgo-loader'],
+    }],
```

Then you can just import the SVG into your file and it will automatically
include that icon in a sprite map.

```tsx
import "svgxuse";
import React from "react";
import { render } from "react-dom";
import { SVGIcon } from "@react-md/icon";
import homeIcon from "@react-md/material-icons/svgs/home.svg";
import menuIcon from "@react-md/material-icons/svgs/menu.svg";

const App = () => (
  <main>
    <SVGIcon use={homeIcon.url} />
    <SVGICon use={menuIcon.url} />
  </main>
);

render(<App />, document.getElementById("root"));
```

## Development

If material-icons has been updated or the components are out of date after a
react-md update, you can use the `icons` script to re-create the components and
optional re-download and create all SVGs again.
