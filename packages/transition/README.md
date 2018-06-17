# @react-md/transition

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [Styles](#styles)
- [Prop Types](#prop-types)
  * [withMountingTransition](#withmountingtransition)

<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/transition
```

## Usage
### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-transition`:

```scss
// This import will generate styles by default.
@import '@react-md/transition/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/transition/dist/transition';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-transition;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/transition/dist/transition';

// Any custom styles that use the utilities
```
