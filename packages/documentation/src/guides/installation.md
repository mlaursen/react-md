# Installation

`react-md` is a [React] component library that aims to aid in creating an
accessible web application following the rules outlined at [w3.org], using the
[material design specifications] for design, and styles provided by [SCSS]
files. This page is targeted towards developers that have an existing app that
should be updated to use `react-md`. If you do not have an app initialized
already or a new user, I recommend the [creating a new app] documentation
instead.

## Installing Dependencies

First, let's install `react-md` and `node-sass`:

```sh
$ npm install --save react-md
$ npm install --save-dev node-sass
```

Or if you prefer [yarn]:

```sh
$ yarn add react-md
$ yarn add --dev node-sass
```

> Since `react-md` requires [hook support], you'll also need to ensure that
> `react` and `react-dom` are at least version **16.8 or higher**.

## Adding Base Styles

Once `react-md` and `node-sass` have been installed, you'll want to include the
base `react-md` styles. First, create a `src/index.scss` file and generate the
styles:

```scss
@import "~react-md/dist/react-md";

@include react-md-utils;
```

> Note how the `@import` is using a tilde (`~`). This allows `webpack` to import
> this from the `node_modules` directory to resolve the `react-md` package. If
> you are **not** using webpack and just a standalone Sass compiler, you'll want
> to read over the [including styles without webpack] instead.

Next, update your `src/index.js` file to include the `index.scss` file **before
all other imports**:

```diff
+import './index.scss';
 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './App';
 import * as serviceWorker from './serviceWorker';

 ReactDOM.render(<App />, document.getElementById('root'));
```

> Note: the default styles take a decent amount of time to compile, check out
> the [Advanced Installation] for additional info on speeding this process up.

## Adding the Roboto Font

Now that the base styles have been included, we'll also need to add the [Roboto
font]. This can be done through [Google Fonts]. Update your `public/index.html`
to include a link to the Roboto stylesheet:

```diff
     <!--
       manifest.json provides metadata used when your web app is installed on a
       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap" />
```

> The `Roboto` font is **not required** as the font for your app. If you'd like
> to use a different font, check out the [customizing your theme] guide.

## Adding the Material Icons Font

We're almost there! The last step is to include the [Material Icons font] so the
default font icons work throughout the app. Update `public/index.html` one last
time and add the icon font:

```diff
     <!--
       manifest.json provides metadata used when your web app is installed on a
       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap" />
```

## :tada: react-md should now be fully installed!

### Where do I go from here?

Well now that you've setup the basics for your first `react-md` styled app,
you'll probably be interested in:

- [Scoped Packages] - Describes the scoped packages within `react-md` and
  explains why all the demos and other guides will be using them.
- [Configuring your layout] - This will also go into more details about the
  navigation tree.
- [Customizing your theme] - The default colors, sizes, and fonts might not be
  your thing so this is all configurable.
- [Advanced Installation] - Using default styles from [unpkg.com] to speed up
  initial compilation and optionally using the UMD bundle.
- viewing the different packages within `react-md` and seeing the components
  they provide.

[react]: https://reactjs.org
[material design specifications]: https://material.io/design/
[w3.org]: https://www.w3.org
[scss]: https://sass-lang.com/
[npm package]: https://www.npmjs.com/package/react-md
[yarn]: https://yarnpkg.com/lang/en/
[typescript]: https://www.typescriptlang.org/
[create-react-app]:
  https://facebook.github.io/create-react-app/docs/getting-started
[hook support]: https://reactjs.org/docs/hooks-intro.html
[creating a new app]: /guides/creating-a-new-app
[roboto font]: https://fonts.google.com/specimen/Roboto
[google fonts]: https://fonts.google.com/
[advanced installation]: /guides/advanced-installation
[customizing your theme]: /guides/customizing-your-theme
[material icons font]: https://material.io/resources/icons/
[configuring your layout]: /guides/configuring-your-layout
[scoped packages]: /guides/scoped-packages
[including styles without webpack]: /guides/including-styles-without-webpack
[unpkg.com]: https://unpkg.com
