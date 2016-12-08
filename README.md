# react-md

React Material Design - React components built with sass

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at https://gitter.im/mlaursen/react-md](https://badges.gitter.im/mlaursen/react-md.svg)](https://gitter.im/mlaursen/react-md?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
<link rel="stylesheet" href="https://unpkg.com/react-md@1.0.0-beta/dist/react-md.deep_purple-pink.min.css">
<script src="https://unpkg.com/react-md@1.0.0-beta/dist/react-md.min.js"></script>

<!-- Development Version -->
<!-- development version of CSS unavailable -->
<script src="https://unpkg.com/react-md@1.0.0-beta/dist/react-md.js"></script>
```


### UMD Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/react-md@1.0.0-beta/dist/react-md.deep_purple-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Roboto:400,500,700">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react/dist/react-with-addons.min.js"></script>
    <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://unpkg.com/react-md@1.0.0-beta/dist/react-md.min.js"></script>
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
