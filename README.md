# react-md

![react-md](/imgs/readme.svg)

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


You can also use the UMD build from [unpkg](https://unpkg.com/#/):

```html
<!-- Production Version -->
<link rel="stylesheet" href="https://unpkg.com/react-md/dist/react-md.min.css">
<script src="https://unpkg.com/react-md/dist/react-md.min.js"></script>

<!-- Development Version -->
<link rel="stylesheet" href="https://unpkg.com/react-md/dist/react-md.css">
<script src="https://unpkg.com/react-md/dist/react-md.js"></script>
```


#### UMD Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/react-md/dist/react-md.min.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react/dist/react-with-addons.min.js"></script>
    <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://unpkg.com/react-md/dist/react-md.min.js"></script>
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

* Bottom sheets
* Steppers
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper
