# react-md
React Material Design - React components built with sass

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at https://gitter.im/mlaursen/react-md](https://badges.gitter.im/mlaursen/react-md.svg)](https://gitter.im/mlaursen/react-md?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

react-md is a set of React components and sass files for implementing [Google's Material Design](https://material.google.com). The
[Documentation Website](http://react-md.mlaursen.com) can be used for viewing live examples, code samples, and general prop documentation.

There are some other implementations that might work better for you:
- [Material-UI](/callemall/material-ui) - Uses inline styling
- [React Toolbox](/react-toolbox/react-toolbox) - SASS Implementation

## Installation

```bash
$ npm i -S react \
           react-dom \
           react-addons-transition-group \
           react-addons-css-transition-group \
           react-addons-pure-render-mixin \
           react-md
```

## Getting Started

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
Here is a basic setup using webpack:

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
import RaisedButton from 'react-md/lib/Buttons/RaisedButton';
// or
// import { RaisedButton } from 'react-md/lib/Buttons';

export default class MyAwesomeComponent extends Component {
  render() {
		return <RaisedButton label="Hello, World!" />;
	}
}
```


```scss
/* _styles.scss */

@import '~react-md/scss/react-md';
```

### Customizing the theme

Hopefully the [generated sassdoc](https://react-md.mlaursen.com/sassdoc) will help with
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

The source files are located in the `src` dir. When doing a pull request, please do not commit any files
from the transpiled `lib` dir.

You can compile all the components and watch for changes with

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
* Eventually add a way to use chips in text fields
* Eventually update for dark themes
