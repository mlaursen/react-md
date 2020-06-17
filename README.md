# react-md [![codecov](https://codecov.io/gh/mlaursen/react-md/branch/master/graph/badge.svg)](https://codecov.io/gh/mlaursen/react-md) [![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/mlaursen/react-md/pulls) [![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

Create an accessible React application with the
[material design specifications](https://material.io/design/) and Scss.

- [Installing packages](https://react-md.dev/guides/installation) - How to
  install related components and packages within react-md for building your
  application
- [Creating a new app](https://react-md.dev/guides/creating-a-new-app) - How to
  create a new app with react-md
- [Working from v1](https://react-md.dev/guides/working-with-v1) - How to use
  migrate from v1 of `react-md` to v2.
- [Customizing your theme](https://react-md.dev/guides/customizing-your-theme) -
  How to implement a different theme for your React application
- [Full documentation](https://react-md.dev) - All the remaining documentation
  along with every single guide, API Reference, and examples
- [Library Size](#library-size) - The UMD bundle size for the entire `react-md`
  library and sizes for some of the pre-built css files.

#### If you are still on v1, please see the [v1 documentation site](https://react-md.dev/v1) and [branch](../../tree/v1) instead

<!-- rmd-readme-replace -->

### Highlights/Features

- Matches the accessibility guidelines from
  [www.w3.org](https://www.w3.org/TR/wai-aria-practices)
- Low level customizable components
- Easily themeable on a global and component level
- Uses css variables for dynamic themes with fallbacks for older browsers
- Out of the box dark theme mode support
- Out of the box left-to-right and right-to-left language support
- UMD Bundles and pre-compiled css available on https://unpkg.com (see more
  information
  [here](https://react-md.dev/guides/advanced-installation#using-the-cdn-hosted-pre-compiled-themes))
- Written and maintained in [Typescript]

## Creating a new project

First use [create-react-app] to create your project:

```sh
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

> npx comes with npm 5.2+ and higher, if you have an older version you will need
> to install `create-react-app` globally instead

Or with `yarn`:

```sh
$ yarn create react-app my-app
$ cd my-app
```

> NOTE: You can also add the `--typescript` flag to bootstrap a react-app with
> typescript support

Next, install `react-md` and `node-sass`:

```sh
$ npm install --save react-md node-sass
```

Next, create a `src/App.scss` file to include all the `react-md` styles and
import the `App.scss` file in the `src/App.js`:

```scss
@import "~react-md/dist/scss/react-md";

// this will include all the styles from react-md
@include react-md-utils;
```

```diff
 import React from 'react';
 import logo from './logo.svg';
 import './App.css';
+import './App.scss';
```

Finally, update the `public/index.html` to include the `Roboto` font and the
Material Icons font icons stylesheets from Google fonts:

```diff
     <meta charset="utf-8" />
     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <meta name="theme-color" content="#000000" />
     <!--
       manifest.json provides metadata used when your web app is installed on a
       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
     <!--
       Notice the use of %PUBLIC_URL% in the tags above.
       It will be replaced with the URL of the `public` folder during the build.
       Only files inside the `public` folder can be referenced from the HTML.

       Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
       work correctly both with client-side routing and a non-root public URL.
       Learn how to configure a non-root public URL by running `npm run build`.
     -->
     <title>React App</title>
   </head>
-  <body>
+  <body class="rmd-typography">
```

Once you have the styles, fonts, and font icons setup, you can start creating
components from react-md. It is generally recommended to update your base
`src/App.js` to include some default configuration components:

```diff
 import React from 'react';
-import logo from './logo.svg';
-import './App.css';
-import './App.scss';
-
-function App() {
-  return (
-    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.js</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer">
-          Learn React
-        </a>
-      </header>
-    </div>
-  );
-}
+import {
+  Configuration,
+  Layout,
+  useLayoutNavigation,
+  Text,
+  Button,
+} from 'react-md';
+import './App.scss';
+
+// see @react-md/layout package for info on the main navigation
+const routes = {};
+function App() {
+  return (
+    <Configuration>
+      <Layout
+        {...useLayoutNavigation(routes, pathname)}
+        appBarTitle="My App"
+        navHeaderTitle="My App"
+      >
+        <Text type="headline-4">Hello, world!</Text>
+        <Button theme="primary">Example button</Button>
+      </Layout>
+    </Configuration>
+  );
+}

export default App;
```

More information can be found on the documentation site's page
[about creating projects](https://react-md.dev/guides/installation)

## Library Size

The base `react-md` package (non-scoped) is the only package that also provides
pre-built css themes and a UMD bundle. If you are interested in seeing what an
estimated size for this library, check out the results below:

```sh
$ yarn dev-utils libsize

The gzipped UMD bundle sizes are:
 - dist/umd/react-md.production.min.js 86.49 KB
 - dist/umd/react-md-with-font-icons.production.min.js 196.05 KB
 - dist/umd/react-md-with-svg-icons.production.min.js 196.03 KB


The min and max gzipped CSS bundle sizes are:
 - dist/css/react-md.grey-deep_orange-200-light.min.css 15.65 KB
 - dist/css/react-md.indigo-blue-400-dark.min.css 15.71 KB
```

## Contributing

Please read the [contributing guidelines](./.github/CONTRIBUTING.md) if you
would like to contribute.

[typescript]: https://www.typescriptlang.org/
[create-react-app]:
  https://facebook.github.io/create-react-app/docs/getting-started
