# react-md

React material design - React components built with sass

```bash
$ npn install -S react-md
```

## Documentation

To view examples and component documentation, please view the [documentation website](http://mlaursen.github.io/react-md)

# Getting Started

## Prerequisites

To use this libarary, it is recommended to have previous experience using React components along with sass/css. In addition, you should use an autoprefixer to support multiple browsers. The sass
files are currently prefix-free.

If you want to use the `DatePicker` or the `TimePicker` components, you m ust either include the [Intl polyfill](https://github.com/andyearnshaw/Intl.js/) or implement your own if you need to
support browsers that do not have it implemented. [See caniuse](http://caniuse.com/#search=intl).

> Note: Most components are using the `PureRenderMixin`. So if a component isn't updating as expected, it is probably because you used updated an object or list prop without creating a new reference.

## Customizing the theme

Hopefully the [generated sassdoc](https://mlaursen.github.io/react-md/sassdoc) will help with
mixin usage and sass documentation.

There is a sass function called `get-md-color($color, $hue, $secondary)` that can be used to set the primary and secondary colors for your application. It is based off of
the [Material design color palette](https://www.google.com/design/spec/style/color.html#color-color-palette).

The default colors are `indigo` and `pink` (hue A200). You can theme your application by either changing the default color variables:

```
$md-primary-color: indigo !default;
$md-secondary-color: pink !default;
$md-secondary-hue: 2 !default;
```

Or defining your own theme with the theme mixins.
[Examples in \_theme.scss](../blob/master/src/scss/_theme.scss).

## Media queries

The default media queries for detecting if mobile are very simple. Anything below 600px is considered mobile.
If these do not work for you, you can use the correct mixins for making a component styled
for mobile/desktop.

See [the example \_media-queries.scss](../blob/master/src/scss/_media-queries.scss) source.


# Known Bugs/Works in Progress/Future Changes

* Firefox does not like clickable elements inside of buttons, so the ink effect does not work in firefox.
* Text fields are positioned absolutely in their container, so you must specify a max width or else they are always full width.. Woops.
* Scrollable tabs do not exist for desktop. Wasn't sure how to calculate it yet or set it up.
* Hopefully update ListItem components to not require Line1 and Line2 crap.
* Time pickers are not fully implemented. It shows an empty circle. So helpful!
* The circular progress only changes color in IE instead of animating the stroke-width or whatever it is called.
* Autocomplete
* Data Tables -- there is some starter css for tables in [\_data-tables.scss](../blob/master/src/scss/components/_data-tables) but no components with functionality.
* Bottom sheets
* Grid lists
* Sliders
* Steppers
* Tooltips
* Eventually add Floating button transitions/morphing abilities. Ex: Speed Dial, Morph into toolbar/material/paper
* Eventually add a way to use chips in text fields

> I will probably remove all references to valueLink to simplify some of the components.



# Development

## Publishing

```bash
$ npm run dist
```
