# @react-md/card

This package is for creating interactable cards from the material design
guidelines.

## Installation

```sh
npm install --save @react-md/card
```

It is also recommended to install the following packages as they work
hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/icon \
  @react-md/media \
  @react-md/avatar \
  @react-md/button \
  @react-md/transition
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/card/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React, { Fragment } from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button";
import { Card, CardHeader, CardTitle, CardSubtitle, CardActions } from "@react-md/card"
import { Text } from "@react-md/typography"

const App = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent>
      <Text>Here is some text to display in the card. It is
    </CardContent>
    <CardActions>
      <Button>Action 1</Button>
      <Button<Action 2</Button>
    </CardActions>
  </Card>
);

render(<App />, document.getElementById("root"));
```
