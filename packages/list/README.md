# @react-md/list

Create lists of content that can have optional supplementary icons, avatars, or
images placed with the text.

## Installation

```sh
npm install --save @react-md/list
```

It is also recommended to install the following packages as they normally work
together well with lists:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/divider \
  @react-md/avatar \
  @react-md/icon \
  @react-md/media
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/list/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React from "react";
import { render } from "react-dom";
import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";
import { FontIcon } from "@react-md/icon";

const App = () => (
  <List>
    <ListItem id="item-1">Item 1</ListItem>
    <ListItem id="item-2" secondaryText="This is secondary text">
      Item 2 Primary Text
    </ListItem>
    <ListItem id="item-3" disabled>
      Item 3 Disabled
    </ListItem>
    <Divider />
    <ListSubheader>Sub actions</ListSubheader>
    <ListItem id="item-4" leftAddon={<FontIcon>close</FontIcon>}>
      Close
    </ListItem>
    <ListItem
      id="item-5"
      leftAddon={
        <Avatar
          src="https://picsum.photos/40?random"
          alt="A random image from https://picsum.photos"
        />
      }
      leftAddonType="avatar"
    >
      With Avatar
    </ListItem>
  </List>
);

render(<App />, document.getElementById("root"));
```
