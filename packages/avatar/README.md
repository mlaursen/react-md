# @react-md/avatar

Create avatars to represent people or objects with images, icons, or text.
Different theme colors can also be applied for icons or text.

## Installation

```sh
npm install --save @react-md/avatar
```

It is generally recommended to also install the following packages since they
work hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/list \
  @react-md/icon
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/avatar/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

One of the main use-cases will probably be to display a list of people with
specific avatars with them:

```tsx
import React from "react";
import { render } from "react-dom";
import { Avatar } from "@react-md/avatar";
import { List, ListItem } from "@react-md/list";

const people = [
  { name: "Logan Tyler", avatarUrl: "https://some-picture.com" },
  { name: "Trenton Berry", avatarUrl: "https://some-picture.com" },
  { name: "Damon Fletcher", avatarUrl: "https://some-picture.com" },
  { name: "Thomas Owen", avatarUrl: "https://some-picture.com" },
  { name: "Charity Henderson", avatarUrl: "https://some-picture.com" },
];

const App = () => (
  <List>
    {people.map(({ name, avatarUrl }, i) => (
      <ListItem
        id={`person-${i}`}
        key={i}
        leftAddon={<Avatar src={avatarUrl} alt={`${name}'s avatar'`} />}
        leftAddonType="avatar"
      >
        {name}
      </ListItem>
    ))}
  </List>
);

render(<App />, document.getElementById("root"));
```
