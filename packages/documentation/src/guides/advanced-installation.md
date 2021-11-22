# Advanced Installation

This guide will cover the following topics:

- Using the CDN hosted UMD bundle of `react-md`
- Using the CDN hosted pre-compiled themes
- Pre-compiling the base `react-md` styles for quicker builds
- Self-hosting the fonts instead of relying on [Google Fonts]
  - also self-hosting the material icons font
- Switching to the SVG Icons instead of font icons

## Using the CDN hosted UMD bundle of react-md

The base `react-md` package is available as a [UMD bundle] that has been hosted
through the CDN: [unpkg.com]. The UMD will export a global variable named
`ReactMD` that will contain all the exported components, hooks, and utils just
like the npm package:

```js
import { Configuration, Layout, Button, useToggle } from "react-md";
```

Would be the same as:

```js
const { Configuration, Layout, Button, useToggle } = ReactMD;
```

To use the UMD bundle, you'll want to add a new `<script>` tag to your
`index.html`:

```diff
   <body>
     <noscript>You need to enable JavaScript to run this app.</noscript>
     <div id="root"></div>
+    <script src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md.production.min.js"></script>
     <!--
       This HTML file is a template.
       If you open it directly in the browser, you will see an empty page.

       You can add webfonts, meta tags, or analytics to this file.
       The build step will place the bundled scripts into the <body> tag.

       To begin the development, run `npm start` or `yarn start`.
       To create a production bundle, use `npm run build` or `yarn build`.
     -->
   </body>
```

> Note the `@{{RMD_VERSION}}` in the pathname. You'll want to change this to be
> the specific version of `react-md` you are using otherwise you'll always get
> the latest version which might cause your app to break.

This _can_ be used with a custom webpack configuration as well, but requires a
bit more work. Check out the documentation on [configuring externals].

#### react-md + Material Icons UMD Bundle

Since you'll normally only ever want to include either SVG icons or Font icons,
react-md has been split into two additional bundles if you want to use the
existing material icon components. Everything is the same as the base UMD bundle
except these bundles use a different file name and export the icon components.

To use the UMD bundle, choose either the font or svg icon bundle and a new
`<script>` tag to your `index.html` **instead** the base react-md bundle:

```diff
   <body>
     <noscript>You need to enable JavaScript to run this app.</noscript>
     <div id="root"></div>
-    <script src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md.production.min.js"></script>
+    <!-- only choose one of the following for your app -->
+    <script src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md-with-font-icons.production.min.js"></script>
+    <script src="https://unpkg.com/react-md@{{RMD_VERSION}}/dist/umd/react-md-with-svg-icons.production.min.js"></script>
     <!--
       This HTML file is a template.
       If you open it directly in the browser, you will see an empty page.

       You can add webfonts, meta tags, or analytics to this file.
       The build step will place the bundled scripts into the <body> tag.

       To begin the development, run `npm start` or `yarn start`.
       To create a production bundle, use `npm run build` or `yarn build`.
     -->
   </body>
```

Check out the #material-icons package for more information about the separate
icon components.

## Self-hosting the fonts

Sometimes it might not be ideal to use [Google Fonts] for providing the fonts
due to limited connectivity or since there is no control over Google changing
the font without notice. Luckily, the fonts from [Google fonts] can be
downloaded through the website so they can be hosted locally. The #typography
package also exports a mixin that helps referencing a locally hosted font:
`rmd-typography-host-google-font`. This quick example will go through the steps
for self-hosting the Roboto font.

First, download the Roboto font zip and extract into a `roboto` directory:

```sh
mkdir roboto
cd roboto
unzip ../Roboto.zip
cd ..
tree roboto
roboto
├── LICENSE.txt
├── Roboto-Black.ttf
├── Roboto-BlackItalic.ttf
├── Roboto-Bold.ttf
├── Roboto-BoldItalic.ttf
├── Roboto-Italic.ttf
├── Roboto-Light.ttf
├── Roboto-LightItalic.ttf
├── Roboto-Medium.ttf
├── Roboto-MediumItalic.ttf
├── Roboto-Regular.ttf
├── Roboto-Thin.ttf
└── Roboto-ThinItalic.ttf

0 directories, 13 files
```

Next, move the fonts into your app's `public` directory:

```sh
cd /path/to/my/app
mkdir public/fonts
mv ~/Downloads/roboto public/fonts/roboto
```

Next, include the font with the weights by using the
`rmd-typography-host-google-font` mixin:

```scss
@use "react-md" as *;

@include rmd-typography-host-google-font;
```

Once this file has been saved, your fonts will automatically be loaded from the
`/fonts/roboto` folder on your website since the default arguments will include
the Roboto font, the default font weights, and resolve to the `/fonts/roboto`
folder with an **absolute path**.

##### Using Relative Paths for Fonts

Since this is an absolute path, the fonts will not be bundled with the normal
build process and will always resolve to `/fonts/roboto` even if your app is
hosted in production in a child route. Luckily, you can update this mixin to use
relative imports instead so the fonts will be bundled, hashed, and update
location with your build configuration.

Instead of copying the fonts into the `public` directory, all that is required
is to copy it into your `src` directory. From there, update the mixin to
reference the fonts locally:

```sh
cd /path/to/my/app
mkdir src/fonts
mv ~/Downloads/roboto src/fonts/roboto
```

```scss
@use "react-md" as *;

@include .rmd-typography-host-google-font(
  Roboto,
  react-md.$rmd-typography-default-font-weights,
  "~./fonts/roboto"
);
```

> Note the `~./` for the third argument. This will resolve to the `src`
> directory within `react-scripts` (tested 3.3.1). If you do not like this
> syntax, you'll need to create a path something like:
> `../../../../src/fonts/roboto` to resolve to your `src` directory.

You're done! The fonts should now be bundled as part of the `react-scripts`
build process and generate urls such as:
`/static/media/RobotoRegular.3e1af3ef.ttf` or
`...prefix.../static/media/RobotoRegular.3e1af3ef.ttf`

### Self-hosting the Material Icons font

Self hosting the material icons font will be similar to the other Google Fonts
hosting. However, instead of using the `rmd-typography-host-google-font` mixin,
you'll use the `rmd-icon-host-material-icons` mixin from the #icon package
instead.

```scss
@use "react-md" as *;

// if material icons are in `public/fonts/material-icons`
@include rmd-icon-host-material-icons;

// if material icons are in `public/material-icons`
@include rmd-icon-host-material-icons("/material-icons");

// if material icons are in `src/fonts/material-icons` and should be part of the
// build process
@include rmd-icon-host-material-icons("~./fonts/material-icons");
```

## Switching to SVG Icons

All the icons within `react-md` use a Material Icons font icon implementation by
default. Luckily all these default icons can be quickly configured and changed
using the `IconProvider` from the #icon package (or as the `icons` prop from the
#layout package's `Configuration` component). In addition, all the material
icons are available as React components from the #material-icons package for
convenience.

```tsx
import { render } = "react-dom";
import { IconProvider, ConfigurableIcons } from "@react-md/icon";
import {
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
} from "@react-md/material-icons";

const overrides: ConfiguredIcons = {
  // and/or any other configurable icons
  back: <KeyboardArrowLeftSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  forward: <KeyboardArrowRightSVGIcon />,
};

render(
  <IconProvider {...overrides}>
    <App />
  </IconProvider>,
  document.getElementById("root")
);
```

Or using the `Configuration` component:

```tsx
import { render } = "react-dom";
import { Configuration } from "@react-md/layout";
import { ConfigurableIcons } from "@react-md/icon";
import {
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
} from "@react-md/material-icons";


const icons: ConfiguredIcons = {
  // and/or any other configurable icons
  back: <KeyboardArrowLeftSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  forward: <KeyboardArrowRightSVGIcon />,
};

render(
  <Configuration icons={icons}>
    <App />
  </Configuration>,
  document.getElementById("root")
);
```

[google fonts]: https://fonts.google.com
[unpkg.com]: https://unpkg.com
[umd bundle]: https://github.com/umdjs/umd
[configuring externals]: https://webpack.js.org/configuration/externals/#object
