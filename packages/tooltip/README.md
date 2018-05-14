# @react-md/tooltip
Accessible tooltips for react-md.

## Installation
```sh
$ npm install --save @react-md/tooltip
```

## Usage
### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-tooltip`:

```scss
// This import will generate styles by default.
@import '@react-md/tooltip/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/tooltip/dist/typography';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-tooltip;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/tooltip';

// Any custom styles that use the utilities
```
