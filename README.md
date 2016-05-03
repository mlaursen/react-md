# react-md

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at https://gitter.im/mlaursen/react-md](https://badges.gitter.im/mlaursen/react-md.svg)](https://gitter.im/mlaursen/react-md?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

React material design - React components built with sass

```bash
$ npm i -S react \
           react-dom \
           react-addons-transition-group \
           react-addons-css-transition-group \
           react-addons-pure-render-mixin \
           react-md
```

## Documentation

To view examples and component documentation, please view the [documentation website](http://react-md.mlaursen.com)

# Getting Started

## Prerequisites

To use this libarary, it is recommended to have previous experience using React components along with sass/css. In addition, you should use an autoprefixer to support multiple browsers. The sass
files are currently prefix-free.

If you want to use the `DatePicker` or the `TimePicker` components, you m ust either include the [Intl polyfill](https://github.com/andyearnshaw/Intl.js/) or implement your own if you need to
support browsers that do not have it implemented. [See caniuse](http://caniuse.com/#search=intl).

This project was developed with the [Roboto font](https://www.google.com/fonts/specimen/Roboto) in mind. Make sure to include the font library locally or from the cdn (or some font equivalent).

Finally, some form of font icon library should be included. The defaults for this project are using [material-icons](https://design.google.com/icons/), but any font library can be used. (Hopefully).
There are some mixins for helping pull these font libraries in from a cdn or locally hosted.

> Note: Most components are using the `PureRenderMixin`. So if a component isn't updating as expected, it is probably because you used updated an object or list prop without creating a new reference.

## Customizing the theme

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
[Examples in \_theme.scss](../master/src/scss/_theme.scss).

## Media queries

The default media queries for detecting if mobile are very simple. Anything below 600px is considered mobile.
If these do not work for you, you can use the correct mixins for making a component styled
for mobile/desktop.

See [the example \_media-queries.scss](../master/src/scss/_media-queries.scss) source.


# Known Bugs/Works in Progress/Future Changes

* Scrollable tabs do not exist for desktop. Wasn't sure how to calculate it yet or set it up.
* Autocomplete
* Bottom sheets
* Grid lists
* Steppers
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper
* Eventually add a way to use chips in text fields
* Eventually update for dark themes



# Contributing

The source files are located in the `src` dir. When doing a pull request, please do not commit any files
from the transpiled `lib` dir.

You can compile all the components and watch for changes with

```bash
$ npm run scripts:watch  # watch src and recompile
```

## Linting
The scss linting is done through the Ruby version of `sass` and `scss_lint`. Mostly because I use vim and it is
what I was using before. The `sass-lint` from `npm` did not follow the same rules as expected.

```bash
$ npm run lint        # lints scss and js files
$ npm run lint:fix    # attempts to fix linting problems for js
```

## Testing

```bash
$ npm test
$ npm run test:watch
```
