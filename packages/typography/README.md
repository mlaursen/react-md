# @react-md/typography

This package is used to include typography into your application. There are 13
different font styles included with reasonable defaults, but they can also
easily be updated with custom values.

This package is mostly for generating the base typography onto different classes
throughout your app, but it also exposes `Text` and `TextContainer` components
to help add typography throughout your app. There is also an accessibility
helper component named `SrOnly` that allows you to display text to screen
readers only.

If you'd like to change the typography values, check out the
[SassDoc page](https://react-md.dev/packages/typography/sassdoc) on the
documentation site.

## Installation

```sh
npm install --save @react-md/typography
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/typography/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React from "react";
import { render } from "react-dom";
import { Text, TextContainer } from "@react-md/typography";

const App = () => (
  <TextContainer>
    <Text type="headline-1">Headline 1</Text>
    <Text type="headline-2">Headline 2</Text>
    <Text type="headline-3">Headline 3</Text>
    <Text type="headline-4">Headline 4</Text>
    <Text type="headline-5">Headline 5</Text>
    <Text type="headline-6">Headline 6</Text>
    <Text type="subtitle-1">Subtitle 1</Text>
    <Text type="subtitle-2">Subtitle 2</Text>
    <Text type="body-1">Body 1</Text>
    <Text type="body-2">Body 2</Text>
    <Text type="overline">Overline</Text>
    <Text type="caption" component="p">
      Caption
    </Text>
  </TextContainer>
);

render(<App />, document.getElementById("root"));
```
