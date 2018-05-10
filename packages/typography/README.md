# @react-md/typography
This is a small package that provides the typography styles for react-md as well as a helper component to render Text.

## Installation
```sh
$ npm install --save @react-md/typography
```

## Usage
### Styles
The styles can be used in a few ways. If you just want to include the typography styles and compile them:

```scss
@import '@react-md/typography/dist/styles';

// OR
@import '@react-md/typography/dist/typography';

@include react-md-typography;
```

If you would like to just import all the variables, mixins, and functions:
```scss
@import '@react-md/typography/dist/typography';
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
    <Text weight="bold" type="body-1">
      {({ className }) => (
        <span className={className}>
          The children callback function will just supply an object of the current typography className to apply to any element(s).
        </span>
      )}
    </Text>
  </main>
);

ReactDOM.render(<App />, document.getElementById('root'));
