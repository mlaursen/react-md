# @react-md/accessibility
Accessibility helper components and styles for react-md.

## Installation
```sh
$ npm install --save @react-md/accessibility
```

## Usage
### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-accessibility`:

```scss
// This import will generate styles by default.
@import '@react-md/accessibility/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/accessibility/dist/typography';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-accessibility;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/accessibility';

// Any custom styles that use the utilities
```
