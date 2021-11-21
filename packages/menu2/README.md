# @react-md/menu

Create accessible dropdown menus that auto-position themselves to stay within
the viewport. The menus are entirely navigable with a keyboard along with some
additional behavior:

- `ArrowUp` and `ArrowDown` to focus the previous/next `MenuItem` that also
  allows wrapping
- `Home` and `End` to focus the first/last `Menuitem` in the menu
- type the starting letters of a `MenuItem` to focus it

<!-- DOCS_REMOVE -->

> More information on the built-in accessibility can be found in the
> [accessibility example](https://react-md.dev/packages/menu/demos#accessibility-example-title)
> on the documentation site.

<!-- DOCS_REMOVE_END -->

## Installation

```sh
npm install --save @react-md/menu
```

You will also need to install the following packages for their styles:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/icon \
  @react-md/list \
  @react-md/button \
  @react-md/states \
  @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/menu/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React from "react";
import { render } from "react-dom";
import { DropdownMenu } from "@react-md/menu";

const App = () => (
  <DropdownMenu
    id="example-dropdown-menu"
    items={[
      { onClick: () => console.log("Clicked Item 1"), children: "Item 1" },
      { onClick: () => console.log("Clicked Item 2"), children: "Item 2" },
      { onClick: () => console.log("Clicked Item 3"), children: "Item 3" },
    ]}
  >
    Dropdown
  </DropdownMenu>
);

render(<App />, document.getElementById("root"));
```
