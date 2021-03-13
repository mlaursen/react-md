# @react-md/sheet

A sheet is an extension of the `Dialog` component that allows for creating a
fixed element that appears inline with other content fixed to the viewport
borders. Sheets are great for:

- containing a persistent navigation tree on desktop
- containing a temporary navigation tree on any device size
- creating dropdown menus on mobile

## Installation

```sh
npm install --save @react-md/sheet
```

It is also recommended to install these other packages as they work hand-in-hand
with this package:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/list \
  @react-md/dialog \
  @react-md/icon \
  @react-md/material-icons
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/sheet/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React, { ReactElement } from "react";
import { Button } from "@react-md/button";
import { List, ListItem } from "@react-md/list";
import { Sheet } from "@react-md/sheet";
import { useToggle } from "@react-md/utils";

export default function Example(): ReactElement {
  const [visible, show, hide] = useToggle(false);

  return (
    <>
      <Button
        id="show-sheet-position"
        onClick={show}
        theme="secondary"
        themeType="contained"
      >
        Show
      </Button>
      <Sheet
        id="example-sheet-1"
        aria-label="Example Sheet"
        visible={visible}
        onRequestClose={hide}
        position={position}
      >
        <List onClick={hide}>
          <ListItem id="example-sheet-item-1">Item 1</ListItem>
          <ListItem id="example-sheet-item-2">Item 2</ListItem>
          <ListItem id="example-sheet-item-3">Item 3</ListItem>
          <ListItem id="example-sheet-item-4">Item 4</ListItem>
          <ListItem id="example-sheet-item-5">Item 5</ListItem>
        </List>
      </Sheet>
    </>
  );
}
```
