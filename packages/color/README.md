# @react-md/color


## Installation
```sh
$ npm install --save @react-md/color
```

## Usage
### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-color`:

```scss
// This import will generate styles by default.
@import '@react-md/color/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/color/dist/typography';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-color;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/color';

// Any custom styles that use the utilities
```
