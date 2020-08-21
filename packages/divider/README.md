# @react-md/divider

Dividers group and separate content within lists and page layouts. The divider
is a thin rule, lightweight yet sufficient to distinguish content visually and
spatially.

## Installation

```sh
npm install --save @react-md/divider
```

This package is not super helpful on its own, so it is recommended to also
install the following packages:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/list \
  @react-md/icon
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/divider/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

One of the main use-cases will probably be to display a list with specific
dividers or to add dividers between page elements:

```tsx
import React from "react";
import { render } from "react-dom";
import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";

const App = () => (
  <main>
    <div className="section-1">
      <Text>Here is some text.</Text>
    </div>
    <Divider />
    <div className="section-2">
      <Text>Here is some more text.</Text>
    </div>
    <List>
      <ListItem id="item-1">Item 1</ListItem>
      <ListItem id="item-2">Item 2</ListItem>
      <ListItem id="item-3">Item 3</ListItem>
      <ListItem id="item-4">Item 4</ListItem>
      <Divider />
      <ListItem id="item-5">Item 5</ListItem>
    </List>
  </main>
);

render(<App />, document.getElementById("root"));
```
