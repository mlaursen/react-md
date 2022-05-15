A `Tree` represents a hierarchical list of items that might have child items
that can be expanded, collapsed, or selected. To create a `Tree` within
`react-md`, the basic requirements are to provide:

- an `id` for the tree (required for a11y)
- either an `aria-label` or `aria-labelledby` describing the purpose of the tree
- an object of `TreeData` to render where the requirements are to have an
  `itemId` and `parentId` referencing other `itemId`s within the tree or `null`
  for root level items.
- a list of selected `itemId`s within the tree and handlers for updating the
  selected ids
- a list of expanded `itemId`s within the tree and handlers for updating the
  expanded ids

This might seem like a lot to get started with, but luckily `@react-md/tree`
provides two hooks for handling the `selectedIds` and `expandedIds` named
`useTreeItemSelection` and `useTreeItemExpansion` that should work for most
cases out of the box.

A tree will be created by traversing the `TreeData` and linking `itemId`s of
each item to a `parentId`. Every item that has a `parentId` pointing to `null`
(or a custom `rootId` prop) will appear at the root of the tree while all
`parentId`s pointing to another `itemId` will be a child of that item.

> If you are a Typescript user, this package also provides a bunch of types you
> can use to strictly type your tree: `TreeItemIds`, `BaseTreeItem`, `TreeData`,
> `TreeItemSorter`, `TreeItemRenderer`, etc. See more in the examples below.

#### Built-in Accessibility

One of the biggest "selling points" for this package is the built-in
accessibility and keyboard movement. They key features are:

- accessible keyboard movement using `aria-activedescendant`
- moving up and down the tree with `ArrowUp` and `ArrowDown` keys
- selecting and clicking items with `Space` and `Enter`
- jumping to the first or last item in the tree with `Home` and `End`
- typeahead to match visible tree items with the same letters that were typed
- expanding and collapsing tree items with the `ArrowRight` and `ArrowLeft` keys
  - jumping to a parent tree item with the `ArrowLeft`
  - jumping to the first child of an expanded tree item with `ArrowRight`
- expanding all tree items at the current level with `*` (asterisk)
- selecting all visible items in the tree with `Control+a` (requires
  `multiSelect` prop enabled)
- selecting all visible tree items from the current selection to the first tree
  item with `Control+Shift+Home` (requires `multiSelect` prop enabled)
- selecting all visible tree items from the current selection to the last tree
  item with `Control+Shift+End` (requires `multiSelect` prop enabled)
