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
           react-addons-pure-render-mixin \
           react-md
```

> Starting with v0.4.x, the `react-addons-pure-render-mixin` will no longer be required.
It requires React 15+ and uses the `PureComponent` when possible.

You can also use the UMD build from [npmcdn](https://npmcdn.com/#/):

```html
<!-- Production Version -->
<link rel="stylesheet" href="https://npmcdn.com/react-md/dist/react-md.min.css">
<script src="https://npmcdn.com/react-md/dist/react-md.min.js"></script>

<!-- Development Version -->
<link rel="stylesheet" href="https://npmcdn.com/react-md/dist/react-md.css">
<script src="https://npmcdn.com/react-md/dist/react-md.js"></script>
```

## Getting Started

> NOTE: There are some other implementations that might work better for you:
> - [Material-UI](https://github.com/callemall/material-ui) - Inline styling
> - [React Toolbox](https://github.com/react-toolbox/react-toolbox) - SASS Implementation


### Prerequisites

To use this library, it is recommended to have previous experience using React along with sass or css. Since the sass files are prefix-free, you will need
to include an autoprefixer for multi-browser support.

You will need to include the Roboto or Noto font library since they are the default typeface on Android and Chrome. They can
be included by using a CDN, the [WebFontLoader](/typekit/webfontloader), or importing through CSS.

In addition, some form of font icon library should be included. The [material-icons](https://design.google.com/icons/) is the default
font icon implementation, but any can be used.

Finally, if you want to use the `DatePicker` or `TimePicker` components, the [Intl polyfill](https://github.com/andyearnshaw/Intl.js) should
be included for older browsers. [See caniuse](http://caniuse.com/#search=intl) for browser support.

### Usage

#### Basic Webpack Usage

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

#### UMD Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://npmcdn.com/react-md/dist/react-md.min.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://npmcdn.com/react/dist/react-with-addons.min.js"></script>
    <script src="https://npmcdn.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://npmcdn.com/react-md/dist/react-md.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.7.7/babel.min.js"></script>
    <script>
const input = `
const { Button } = ReactMD;
const MyAwesomeComponent = () => (
  <Button raised label="Hello, World!" />
);

React.render(<MyAwesomeComponent />, document.getElementById('app'));`

eval(Babel.transform(input, { presets: ['es2015', 'react', 'stage-0'] }).code);
    </script>
  </body>
</html>
```

### Customizing the theme

Hopefully the [generated sassdoc](http://react-md.mlaursen.com/sassdoc) will help with
mixin usage and sass documentation.

The default colors are `indigo` and `pink` (hue A200). You can theme your application by either changing the default color variables:

```
$md-primary-color: $md-indigo-500 !default;
$md-primary-color-hue-1: $md-indigo-400 !default;
$md-secondary-color: $md-pink-a-200 !default;
$md-secondary-color-hue-1: $md-pink-a-100 !default;
```

Or defining your own theme with the theme mixins.
[Examples from Documentation website](http://react-md.mlaursen.com/customization/themes).

### Media queries

The default media queries for detecting if mobile are very simple. Anything below 600px is considered mobile.
If these do not work for you, you can use the correct mixins for making a component styled
for mobile/desktop.

See [the example \_media-queries.scss](../master/src/scss/_media-queries.scss) source.

### Upgrade Guide

If you need to view any upgrading help, view the [upgrade guide](../master/docs/UpgradeGuide.md)

## Contributing

The branching model used for this project is basically the [git flow diagram](http://nvie.com/img/git-model@2x.png).
The only difference is that I do not use a `develop` branch. The develop branch is just the current release branch.
So if the current release is v0.3, the active develop branch is `release/0.3.x`. Please make sure pull requests
are targeted to the correct release branch and not `master`.

The source files are located in the `src` dir. You can compile all the components and watch for changes with

```bash
$ npm run scripts:watch  # watch src and recompile
```

### Linting
The scss linting is done through the Ruby version of `sass` and `scss_lint`. Mostly because I use vim and it is
what I was using before. The `sass-lint` from `npm` did not follow the same rules as expected.

```bash
$ npm run lint        # lints scss and js files
$ npm run lint:fix    # attempts to fix linting problems for js
```

### Testing

```bash
$ npm test
$ npm run test:watch
```

## Known Bugs/Works in Progress/Future Changes

* Scrollable tabs do not exist for desktop. Wasn't sure how to calculate it yet or set it up.
* Bottom sheets
* Grid lists
* Steppers
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper
* Eventually update for dark themes
