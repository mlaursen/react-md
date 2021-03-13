# @react-md/tree

Create accessible tree widgets following the
[tree view specifications](https://www.w3.org/TR/wai-aria-practices/#TreeView)
using the material design styles and fairly customizable renderers and styles
and reasonable defaults.

## Installation

```sh
npm install --save @react-md/tree
```

It is also recommended to install these other packages as they work hand-in-hand
with this package:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/icon \
  @react-md/material-icons \
  @react-md/list
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/tree/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

The main export from this package is the `Tree` component which allows you to
render a tree from `TreeData` which is really a lookup of
`Record<TreeItemId, TreeItem>`. The `Tree` component is fully controlled and
requires you to provide the selection and logic expansion with a few props. You
can use the `useTreeItemExpansion` and `useTreeItemSelection` hooks to get
pretty reasonable support out of the box including multi-select behavior.

If you are a Typescript user, this package also exports a decent amount of types
to help out such as the `TreeData`, `BaseTreeItem`, and `TreeItemSorter`.

Here's a quick example:

```tsx
import React, { ReactElement, ReactNode } from "react";
import { render } from "react-dom";
import {
  Tree,
  TreeData,
  BaseTreeItem,
  useTreeItemExpansion,
  useTreeItemSelection,
} from "@react-md/tree";

interface MyTreeItem extends BaseTreeItem {
  name: string;
}

const data: TreeData<MyTreeItem> = {
  "item-1-id": {
    name: "Root Node",
    itemId: " item-1-id",
    parentId: null,
  },
  "item-2-id": {
    name: "Child 1",
    itemId: "item-2-id",
    parentId: "item-1-id",
  },
  "item-3-id": {
    name: "Child 2",
    itemId: "item-3-id",
    parentId: "item-1-id",
  },
};

export default function Example(): ReactElement {
  const selection = useTreeItemSelection([], false);
  const expansion = useTreeItemExpansion([]);

  return (
    <Tree
      id="example-tree"
      aria-label="Tree"
      data={data}
      {...selection}
      {...expansion}
    />
  );
}
```
