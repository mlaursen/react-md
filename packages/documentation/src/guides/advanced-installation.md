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

- react-md.indigo-pink-200-dark.min.css
- react-md.indigo-pink-200-light.min.css
- react-md.light_blue-deep_orange-200-light.min.css
- react-md.light_blue-deep_orange-700-dark.min.css
- react-md.purple-pink-200-dark.min.css
- react-md.purple-pink-200-light.min.css
- react-md.teal-pink-200-dark.min.css
- react-md.teal-pink-200-light.min.css

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

If you want to see which themes are available, you can use the browser feature
from unpkg.com to see all the `.css` files:
https://unpkg.com/browse/react-md@next/dist/css/

## Pre-compiling the base react-md styles for quicker builds

## Self-hosting the fonts

### Self-hosting the Material Icons font

## Switching to SVG Icons

[google fonts]: https://fonts.google.com
[unpkg.com]: https://unpkg.com
[umd bundle]: https://github.com/umdjs/umd
[configuring externals]: https://webpack.js.org/configuration/externals/#object
