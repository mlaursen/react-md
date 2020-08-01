# Creating a New App

This guide will help you create a new app with `react-md` along with
[create-react-app] as the project bootstrapper. The basic requirements for
continuing are:

- [node] installed with at least version `10` to make things simple
- [yarn] or [npm]
- experience in React

> You can also check out the
> [GitHub examples folder]({{GITHUB_URL}}/tree/master/examples) to see completed
> examples and other build tools such as [Next.js](https://nextjs.org/).

## Bootstrapping a new Project

To get started, let's use `create-react-app` to bootstrap our new project:

```sh
$ npx create-react-app my-app
```

Or with `yarn`:

```sh
$ yarn create react-app my-app
```

Once the command has completed, `cd` into the `my-app` directory and install
`react-md` and `node-sass`:

```sh
$ npm install --save react-md
$ npm install --save-dev node-sass
```

Or with `yarn`:

```sh
$ yarn add react-md
$ yarn add --dev node-sass
```

Now that we've initialized our project, we can go ahead and start up the app
with the `start` command:

```sh
$ npm run start
```

Or with `yarn`:

```sh
$ yarn start
```

Once the app starts, you should see a page like this:

![Create React App's starting page](/creating-a-new-app-1.png)

Great! Let's start adding some `react-md` into the mix. First, let's add the
general `Configuration` and `Layout` to our app. Start by editing the main
`src/index.js` to use the `Configuration` component:

```diff
 import React from 'react';
 import ReactDOM from 'react-dom';
+import { Configuration } from 'react-md';
 import './index.css';
 import App from './App';
 import * as serviceWorker from './serviceWorker';

-ReactDOM.render(<App />, document.getElementById('root'));
+ReactDOM.render(
+  <Configuration>
+    <App />
+  </Configuration>,
+  document.getElementById('root')
+);
```

Next, update the `src/App.js` to include the `Layout` component. Since the
`Layout` component is also used to render a navigation pane, we'll use the
`useLayoutNavigation` hook along with an empty navigation tree to handle that
behavior to start with.

```diff
 import React from 'react';
 import logo from './logo.svg';
+import { Layout, useLayoutNavigation } from 'react-md';
 import './App.css';
+
+const navItems = {};

 function App() {
   return (
-    <div className="App">
+    <Layout
+      {...useLayoutNavigation(navItems, window.location.pathname)}
+      appBarTitle="react-md App"
+      navHeaderTitle="My App"
+    >
+      <div className="App">
         <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <p>
             Edit <code>src/App.js</code> and save to reload.
           </p>
           <a
             className="App-link"
             href="https://reactjs.org"
             target="_blank"
             rel="noopener noreferrer"
           >
             Learn React
           </a>
         </header>
-    </div>
+      </div>
+    </Layout>
   );
 }

 export default App;
```

When you hit save, you'll be presented with this beauty:

![react-md without styles](/creating-a-new-app-2.png)

What?! That doesn't look anything close to how it was advertised! No problem.
Let's fix that by adding the base styles. Create a new file `src/App.scss` that
will import the `react-md` scss library as well as generate the default styles:

```scss
@import "~react-md/dist/react-md";

@include react-md-utils;
```

Next, update `src/App.js` to import this file.

```diff
 import React from 'react';
 import logo from './logo.svg';
 import { Layout, useLayoutNavigation } from 'react-md';
 import './App.css';
+import './App.scss';

 const navItems = {};
```

Once you save this file, you should now see an app with a decent looking layout
with the default color scheme.

![react-md default styles but without fonts](/creating-a-new-app-3.png)

> If you get an error like this:
>
> ![Missing node-sass error](/creating-a-new-app-node-sass-error.png) you can
> fix it by ensuring to install `node-sass` and restarting your dev server.

We're getting close, but if you resize your browser, you'll notice something
weird in the layout:

![Missing Material Icons font](/creating-a-new-app-missing-icon-font.png)

Aha! We're missing the final part of including fonts! `react-md` defaults to
using the Roboto font along with the Material Icons font icon library. Luckily,
both of these can be quickly added to your site with [Google Fonts]. Let's
update the `public/index.html` one more time to add a `<link>` for the fonts:

```diff
     <!--
       manifest.json provides metadata used when your web app is installed on a
       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
+    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap" />
```

Once you save, you should now have both the material icons font and the Roboto
font available.

![react-md fonts loaded](/creating-a-new-app-complete.png)

### :tada: Your first setup has been completed.

### Where do I go from here?

Well now that you've setup the basics for your first `react-md` styled app,
you'll probably be interested in:

- [Configuring your layout] - This will also go into more details about the
  navigation tree.
- [Customizing your theme] - The default colors, sizes, and fonts might not be
  your thing so this is all configurable.
- [Advanced Installation] - Using default styles from [unpkg.com] to speed up
  initial compilation and optionally using the UMD bundle.
- viewing the different packages within `react-md` and seeing the components
  they provide.

[node]: https://nodejs.org
[npm]: https://docs.npmjs.com/about-npm/
[yarn]: https://yarnpkg.com
[roboto font]: https://fonts.google.com/specimen/Roboto
[google fonts]: https://fonts.google.com/
[material icons font]: https://material.io/resources/icons/
[create-react-app]: https://reactjs.org/docs/create-a-new-react-app.html
[unpkg.com]: https://unpkg.com
[configuring your layout]: /guides/configuring-your-layout
[customizing your theme]: /guides/customizing-your-theme
[advanced installation]: /guides/advanced-installation
