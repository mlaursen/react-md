# react-md

React Material Design - React components built with sass

[![Build Status](https://travis-ci.org/mlaursen/react-md.svg?branch=master)](https://travis-ci.org/mlaursen/react-md)
[![Join the chat at Slack](https://react-md.herokuapp.com/badge.svg)](https://react-md.herokuapp.com) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/mlaursen03)

react-md is a set of React components and sass files for implementing [Google's Material Design](https://material.google.com). The
[Documentation Website](http://react-md.mlaursen.com) can be used for viewing live examples, code samples, and general prop documentation.

## Installation

```bash
$ npm i -S react react-dom react-md
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

## Usage
Please see the list of [examples](examples/) for how you can get a project started off quickly with React and React MD.

### UMD Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/react-md@1.0.19/dist/react-md.deep_purple-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Roboto:400,500,700">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react/dist/react-with-addons.min.js"></script>
    <script src="https://unpkg.com/react-dom/dist/react-dom.min.js"></script>
    <script src="https://unpkg.com/react-md@1.0.19/dist/react-md.min.js"></script>
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

## Known Bugs/Works in Progress/Future Changes

* Bottom sheets
* Steppers
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper
