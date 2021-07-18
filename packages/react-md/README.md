# react-md [![license](https://img.shields.io/npm/l/react-md)](https://github.com/mlaursen/react-md/blob/main/LICENSE) [![codecov](https://codecov.io/gh/mlaursen/react-md/branch/main/graph/badge.svg)](https://codecov.io/gh/mlaursen/react-md) [![Actions Status](https://github.com/mlaursen/react-md/workflows/Build,%20Lint,%20and%20Test/badge.svg)](https://github.com/mlaursen/react-md/actions) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)

[![npm](https://img.shields.io/npm/v/react-md)](https://www.npmjs.com/package/react-md)
[![downloads](https://img.shields.io/npm/dw/react-md)](https://www.npmjs.com/package/react-md)
[![Join the Chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

Create an accessible React application with the
[material design specifications](https://material.io/design/) and Scss.

- [Installing packages](https://react-md.dev/guides/installation) - How to
  install related components and packages within react-md for building your
  application
- [Creating a new app](https://react-md.dev/guides/creating-a-new-app) - How to
  create a new app with react-md
- [Examples with Build Tools](https://github.com/mlaursen/react-md/tree/main/examples) -
  View and download examples of using ReactMD with build tools such as
  [create-react-app], [Next.js], and [Gatsby]
- [Working from v1](https://react-md.dev/guides/working-with-v1) - How to use
  migrate from v1 of `react-md` to v2.
- [Customizing your theme](https://react-md.dev/guides/customizing-your-theme) -
  How to implement a different theme for your React application
- [Full documentation](https://react-md.dev) - All the remaining documentation
  along with every single guide, API Reference, and examples
- [Library Size](#library-size) - The UMD bundle size for the entire `react-md`
  library and sizes for some of the pre-built css files.

## Installation

react-md has been updated to use
[scoped packages](https://react-md.dev/guides/scoped-packages) starting with the
v2 release to help slowly transition to the new components and API. If you do
not need to slowly transition over this package can be used instead which is a
convenience package for exporting all the functionality from a single entry
point.

```sh
npm install --save react-md
```

or with `yarn`:

```sh
yarn add react-md
```

For convenience, here is a list of all the included react-md scoped packages and
a link to their demo documentation page:

- [@react-md/alert](https://react-md.dev/packages/alert/demos)
- [@react-md/app-bar](https://react-md.dev/packages/app-bar/demos)
- [@react-md/autocomplete](https://react-md.dev/packages/autocomplete/demos)
- [@react-md/avatar](https://react-md.dev/packages/avatar/demos)
- [@react-md/badge](https://react-md.dev/packages/badge/demos)
- [@react-md/button](https://react-md.dev/packages/button/demos)
- [@react-md/card](https://react-md.dev/packages/card/demos)
- [@react-md/chip](https://react-md.dev/packages/chip/demos)
- [@react-md/dialog](https://react-md.dev/packages/dialog/demos)
- [@react-md/divider](https://react-md.dev/packages/divider/demos)
- [@react-md/elevation](https://react-md.dev/packages/elevation/demos)
- [@react-md/expansion-panel](https://react-md.dev/packages/expansion-panel/demos)
- [@react-md/form](https://react-md.dev/packages/form/demos)
- [@react-md/icon](https://react-md.dev/packages/icon/demos)
- [@react-md/layout](https://react-md.dev/packages/layout/demos)
- [@react-md/link](https://react-md.dev/packages/link/demos)
- [@react-md/list](https://react-md.dev/packages/list/demos)
- [@react-md/material-icons](https://react-md.dev/packages/material-icons/demos)
- [@react-md/media](https://react-md.dev/packages/media/demos)
- [@react-md/menu](https://react-md.dev/packages/menu/demos)
- [@react-md/overlay](https://react-md.dev/packages/overlay/demos)
- [@react-md/portal](https://react-md.dev/packages/portal/demos)
- [@react-md/progress](https://react-md.dev/packages/progress/demos)
- [@react-md/sheet](https://react-md.dev/packages/sheet/demos)
- [@react-md/states](https://react-md.dev/packages/states/demos)
- [@react-md/table](https://react-md.dev/packages/table/demos)
- [@react-md/tabs](https://react-md.dev/packages/tabs/demos)
- [@react-md/theme](https://react-md.dev/packages/theme/demos)
- [@react-md/tooltip](https://react-md.dev/packages/tooltip/demos)
- [@react-md/transition](https://react-md.dev/packages/transition/demos)
- [@react-md/tree](https://react-md.dev/packages/tree/demos)
- [@react-md/typography](https://react-md.dev/packages/typography/demos)
- [@react-md/utils](https://react-md.dev/packages/utils/demos)

### Highlights/Features

- Matches the accessibility guidelines from
  [www.w3.org](https://www.w3.org/TR/wai-aria-practices)
- Low level customizable components
- Easily themeable on a global and component level
- Uses css variables for dynamic themes with fallbacks for older browsers
- Out of the box dark theme mode support
- Out of the box left-to-right and right-to-left language support
- UMD Bundles and pre-compiled css available on https://unpkg.com (see more
  information [here](https://react-md.dev/guides/cdn-links))
- Written and maintained in [Typescript]

## Creating a new project

> Check out the [examples folder](./examples) to see completed examples with
> different build tools such as [Next.js], [Gatsby], and [create-react-app].

First use [create-react-app] to create your project:

```sh
npx create-react-app my-app
cd my-app
npm start
```

> npx comes with npm 5.2+ and higher, if you have an older version you will need
> to install `create-react-app` globally instead

Or with `yarn`:

```sh
yarn create react-app my-app
cd my-app
```

> NOTE: You can also add the `--typescript` flag to bootstrap a react-app with
> typescript support

Next, install `react-md` and `node-sass`:

```sh
npm install --save react-md node-sass
```

Next, create a `src/App.scss` file to include all the `react-md` styles and
import the `App.scss` file in the `src/App.js`:

```scss
@import "~react-md/dist/scss/react-md";

// this will include all the styles from react-md
@include react-md-utils;
```

```diff
+import './App.scss';
 import React from 'react';
 import logo from './logo.svg';
 import './App.css';
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
 import './App.scss';
 import React from 'react';
-import logo from './logo.svg';
-import './App.css';
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
+
+// see @react-md/layout package for info on the main navigation
+const routes = {};
+function App() {
+  return (
+    <Configuration>
+      <Layout
+        title="My Title"
+        navHeaderTitle="My Nav Title"
+        treeProps={...useLayoutNavigation(routes, pathname)}
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
yarn dev-utils libsize

The gizipped UMD bundle sizes are:
 - dist/umd/react-md.production.min.js 86.92 KB
 - dist/umd/react-md-with-font-icons.production.min.js 111.21 KB
 - dist/umd/react-md-with-svg-icons.production.min.js 176.99 KB

The min and max gzipped CSS bundle sizes are:
 - themes/react-md.grey-red-700-light.min.css 17.57 KB
 - themes/react-md.lime-teal-200-dark.min.css 17.63 KB
```

## Contributing

Please read the [contributing guidelines](./.github/CONTRIBUTING.md) if you
would like to contribute.

[typescript]: https://www.typescriptlang.org/
[next.js]: https://nextjs.org/
[gatsby]: https://www.gatsbyjs.org
[create-react-app]: https://facebook.github.io/create-react-app
