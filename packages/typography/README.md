# @react-md/typography
This is a small package that provides the typography styles for react-md as well as a helper component to render Text.

## Installation
```sh
$ npm install --save @react-md/typography
```

## Usage
### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-typography`:

```scss
// This import will generate styles by default.
@import '@react-md/typography/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/typography/dist/typography';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-typography;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/typography';

// Any custom styles that use the utilities
```

### Text Component
This package was also bundled with a small Text component that will either return the children or wrap the provided children with the required typography styles.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Text } from "@react-md/typography";

const App = () => (
  <main>
    <Text type="body-1">
      This is some text that will be wrapped in a p tag and have the classes .md-typography and .md-typography--body-1.
    </Text>
    <Text>This will just be a react-text block without a wrapping tag</Text>
    <Text tagName="span" type="headline-5">
      This is some text that normally would be rendered in an h5 tag, but now is rendered in a span tag. It will also have the classes .md-typograhy and .md-typography--headline-5 applied.
    </Text>
  </main>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

The `Text` component also supports a children callback function if that is your thing as well.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Text } from "@react-md/typography";

const App = () => (
  <main>
    <Text type="body-1">
      {({ className }) => (
        <span className={className}>
          The children callback function will just supply an object of the current typography className to apply to any element(s).
        </span>
      )}
    </Text>
  </main>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## Updating Styles
It is possible to add additional styles by creating global variables for each typography style in material design. Each variable is set up as `$md-typography-styles-STYLE_NAME` which must be a Map of style attributes with values. So for example:

```scss
// You really wouldn't want to do this...
$md-typography-headline-1: (
  color: white,
  background: red,
  padding: 1.235rem
);
```

This would now have the base styles for `md-typography--headline-1` to be:
```diff
 .md-typography--headline-1 {
   font-size: 6rem;
   line-height: 6rem;
   font-weight: 300;
   letter-spacing: -.01562em;
   text-decoration: inherit;
   text-transform: inherit;
+  color: white;
+  background: red;
+  padding: 1.235rem;
}
```

A full list of variables which can be used to override are:
- `$md-typography-styles-headline-1`
- `$md-typography-styles-headline-2`
- `$md-typography-styles-headline-3`
- `$md-typography-styles-headline-4`
- `$md-typography-styles-headline-5`
- `$md-typography-styles-headline-6`
- `$md-typography-styles-subtitle-1`
- `$md-typography-styles-subtitle-2`
- `$md-typography-styles-body-1`
- `$md-typography-styles-body-2`
- `$md-typography-styles-button`
- `$md-typography-styles-caption`
- `$md-typography-styles-overline`

Please note that this will only merge the base default values with your new styles.

If you want to completely remove the default styles, you can set a `$md-typography-styles` variable **before** importing the typography scss.

```scss
$md-typography-styles: (
  headline-1: (
    display: none
  )
);

@import '@react-md/typography/dist/typography';
```

Every key that you do not include in the map will no longer be created when including the base typography styles.
