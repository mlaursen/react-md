## @react-md/typography

This package is used to include typography into your application. There are 13
different font styles included with reasonable defaults, but they can also
easily be updated with custom values.

This package is mostly for generating the base typography onto different classes
throughout your app, but it also exposes `Text` and `TextContainer` components
to help add typography throughout your app.

### Installation

```sh
$ npm install --save @react-md/typography
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage

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
