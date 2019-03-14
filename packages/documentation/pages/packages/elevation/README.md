## @react-md/elevation

This is a small package for react-md that can create the elevation styles in the
material design spec. Unlike the other `react-md` packages, this package only
exports utility mixins and does not provide any React components or any default
styles.

### Installation

```sh
$ npm install --save @react-md/elevation
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage

Material design has 24 different elevation types and the `rmd-elevation` mixin
accepts a number between 0 and 24 to create that elevation.

```scss
@import "@react-md/elevation/dist/mixins";

.my-elevated-component {
  @include rmd-elevation(8);
}
```

This package also exports some box-shadow transition mixins to get some great
performance when animating between different box shadows.

```scss
@import "@react-md/elevation/dist/mixins";

.my-box-shadow-component {
  // animate from 4 to 8 on hover
  @include rmd-elevation-transition(4, 8, "&:hover");
}
```
