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
+    <script src="https://unpkg.com/react-md@next/dist/umd/react-md.production.min.js"></script>
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

> Note the `@next` in the pathname. You'll want to change this to be the
> specific version of `react-md` you are using otherwise you'll always get the
> latest version which might cause your app to break.

This _can_ be used with a custom webpack configuration as well, but requires a
bit more work. Check out the documentation on [configuring externals].

## Using the CDN hosted pre-compiled themes

The base `react-md` package also pre-compiles a few different themes for you
with all the features enabled which are also available through [unpkg.com]. Each
theme will follow the naming pattern of:

- `react-md.{PRIMARY}-{SECONDARY}-{SECONDARY_WEIGHT}-{LIGHT|DARK}.min.css`

So a few examples are:

- `react-md.indigo-pink-200-dark.min.css`
- `react-md.indigo-pink-200-light.min.css`
- `react-md.light_blue-deep_orange-200-light.min.css`
- `react-md.light_blue-deep_orange-700-dark.min.css`
- `react-md.purple-pink-200-dark.min.css`
- `react-md.purple-pink-200-light.min.css`
- `react-md.teal-pink-200-dark.min.css`
- `react-md.teal-pink-200-light.min.css`

Once again, you can use these `.css` files by updating your `index.html` to
include a new `<link>` tag in the `<header>`:

```diff
     <meta
       name="description"
       content="Web site created using create-react-app"
     />
     <link rel="apple-touch-icon" href="logo192.png" />
     <!--
       manifest.json provides metadata used when your web app is installed on a
       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link rel="stylesheet" href="https://unpkg.com/react-md@next/dist/css/react-md/teal-pink-200-light.min.css" />
```

> Note the `@next` in the pathname. You'll want to change this to be the
> specific version of `react-md` you are using otherwise you'll always get the
> latest version which might cause your app to break.

If you want to see which themes are available, you can use the browse feature
from unpkg.com to see all the `.css` files:
https://unpkg.com/browse/react-md@next/dist/css/

## Pre-compiling the base react-md styles for quicker builds

The initial build for `react-md` styles can take awhile since it does a lot
behind the scenes to validate the different colors, contrast ratios, and other
things to prevent errors. Since you won't really be changing the `react-md`
styles much once you've defined your theme or other custom overrides, you can
speed up this process by just pre-building the base `react-md` CSS file. If you
are using all the default "feature flags" within `react-md`, you can use the CDN
hosted pre-compiled theme for this OR if you want to ensure everything works
locally, you can import the `.css` file from the `react-md` `dist` folder:

```diff
+import 'react-md/dist/css/react-md/teal-pink-200-light.min.css';
 import React from 'react';
 import { render } from 'react-dom';
 import App from './App';

 render(<App />, document.getElementById('root'));
```

> See the naming conventions above for choosing your default theme.

If you have changed more than just the color variables and the light/dark theme
toggle, you'll need to manually compile the base `react-md` styles yourself. The
[including styles without webpack] guide will go into full details for this, but
here's a quick version.

First, install `node-sass` if you haven't already:

```sh
$ npm install --save-dev node-sass
```

Or with `yarn`:

```sh
$ yarn add --dev node-sass
```

Next, create a new `src/react-md.scss` file that will import the `react-md`
library along with your variable overrides:

```scss
@import "./my-custom-variables";

// or just define them in this file
$rmd-list-vertical-padding: 0.565rem;
$rmd-icon-use-font-icons: false;
$rmd-icon-icon-spacing-with-text: 0.75rem;

@import "react-md/dist/scss/styles";
```

> Note that there is no leading tilde (`~`) for the `@import` statement for the
> react-md styles file along with now being `dist/scss` instead of just `dist`.
> This is to work without webpack.

Next, create a new script in your `package.json` to compile the base styles:

```diff
   "scripts": {
     "start": "react-scripts start",
+    "styles": "node-sass --include-path=node_modules src/react-md.scss src/react-md.css",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject"
   },
```

> Note that `node-sass` is run with `--include-path=node_modules`. This is
> required now that it is being compiled without webpack.

Run the new `styles` script to generate your `src/index.css` file:

```sh
$ npm run styles
```

Or with `yarn`:

```sh
$ yarn styles
```

Finally, update the `src/index.js` to include the newly created `react-md.css`
file:

```diff
+import './react-md.css';
 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './App';
 import * as serviceWorker from './serviceWorker';
```

You're done! The normal build process will now include the newly compiled
`react-md.css` file and handle the auto-prefixing based on the `browserlist`.
Depending on your preference, you can commit this generated file to `git` if you
know it won't change much, add a `postinstall` script to automatically generate
this file for you, or use something like [npm-run-all] to run the `styles`
command before the `react-scripts start`.

## Self-hosting the fonts

### Self-hosting the Material Icons font

## Switching to SVG Icons

[google fonts]: https://fonts.google.com
[unpkg.com]: https://unpkg.com
[umd bundle]: https://github.com/umdjs/umd
[configuring externals]: https://webpack.js.org/configuration/externals/#object
[npm-run-all]: https://www.npmjs.com/package/npm-run-all
[including styles without webpack]: /guides/inlucding-styles-without-webpack
