# react-md

React Material Design - React components built with sass

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Join the chat at https://gitter.im/mlaursen/react-md](https://badges.gitter.im/mlaursen/react-md.svg)](https://gitter.im/mlaursen/react-md?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

react-md is a set of React components and sass files for implementing [Google's Material Design](https://material.google.com). The
[Documentation Website](http://react-md.mlaursen.com) can be used for viewing live examples, code samples, and general prop documentation.

## Installation

```bash
$ npm i -S react \
           react-dom \
           react-addons-transition-group \
           react-addons-css-transition-group \
           react-md
```

## Usage

### Using create-react-app
`create-react-app` does [not support Sass](https://github.com/facebookincubator/create-react-app/issues/78), so
here are some steps to get it working:

```bash
$ create-react-app my-app --scripts-version --custom-react-scripts
$ npm i -S react-md
```

Customize the `.env` to include SASS. See [custom-react-scripts](https://github.com/kitze/create-react-app)
for more information.

If this is not a solution for you, you can always run `yarn run eject` (or `npm run eject`) from your app and add Sass yourself.

```bash
$ create-react-app my-app
$ yarn run eject
$ yarn add react-md
$ yarn add --dev sass-loader node-sass
$ vim -O config/webpack.config.dev.js config/webpack.config.prod.js
```

Add an scss/sass exclusion on line 109 (webpack.config.dev.js) and line 115 (webpack.config.prod.js)

```js
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /\.s(c|a)ss$/,
        ],
```

In the dev config, add a new loader after the CSS loader:

```js
      {
        test: /\.s(a|c)ss$/,
        loader: 'style!css?importLoaders=2!postcss!sass?sourceMap&outputStyle=expanded'
      },
```

In the prod config:
```js
      {
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2!postcss!sass?outputStyle=compressed')
      },
```

### Using one of the Boilerplates
If `create-react-app` is not your thing, you can try using one of the available [boilerplates](https://react-md.mlaursen.com/discover-more/boilerplates).

### Basic Webpack Usage

```js
/* App.jsx */

import React from 'react';
import { render } from 'react-dom';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
		families: ['Roboto:300,400,500,700', 'Material Icons'],
	},
});

import './_styles.scss';
import MyAwesomeComponent from './MyAwesomeComponent';

const App = () => (
	<MyAwesomeComponent />
);

render(<App />, document.getElementById('app'));
```

```js
/* MyAwesomeComponent.jsx */

import React, { Component }  from 'react';
import Button from 'react-md/lib/Buttons';

export default class MyAwesomeComponent extends Component {
  render() {
		return <Button raised label="Hello, World!" />;
	}
}
```


```scss
/* _styles.scss */

@import '~react-md/scss/react-md';
```


You can also use the UMD build from [unpkg](https://unpkg.com/#/):

```html
<!-- Production Version -->
<link rel="stylesheet" href="https://unpkg.com/react-md@1.0.11/dist/react-md.deep_purple-pink.min.css">
<script src="https://unpkg.com/react-md@1.0.11/dist/react-md.min.js"></script>

<!-- Development Version -->
<!-- development version of CSS unavailable -->
<script src="https://unpkg.com/react-md@1.0.11/dist/react-md.js"></script>
```


### UMD Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/react-md@1.0.11/dist/react-md.deep_purple-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Roboto:400,500,700">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react/dist/react-with-addons.min.js"></script>
    <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://unpkg.com/react-md@1.0.11/dist/react-md.min.js"></script>
    <script>
    var MyAwesomeComponent = React.createClass({
      render: function()  {
        return React.createElement(ReactMD.Button, { label: 'Hello, World!', flat: true });
      }
    });

    ReactDOM.render(React.createElement(MyAwesomeComponent), document.getElementById('app'));
    </script>
  </body>
</html>
```

## Customizing the theme
The application should define a `primary` and `secondary` color. The `primary` color
should be chosen from one of the `'-500'` colors and the `secondary` should be one of
the `'a-'` colors.

The default color palette is defined as:

```scss
$md-primary-color: $md-indigo-500 !default;
$md-secondary-color: $md-pink-a-200 !default;
```

If you change these variables before the `react-md-everything` mixin is included, your entire
application will be styled with your new theme.

```scss
@import '~react-md/src/scss/react-md';

$md-primary-color: $md-teal-500;
$md-secondary-color: $md-lime-a-400;

@include react-md-everything;
```

See the [themes page](http://react-md.mlaursen.com/customization/themes) on the documentation website. There
is also a theme builder available to try mix and matching different colors.

## Known Bugs/Works in Progress/Future Changes

* Bottom sheets
* Steppers
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper
