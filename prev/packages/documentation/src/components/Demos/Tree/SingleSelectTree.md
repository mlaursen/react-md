One of the most common forms of a tree is a single selection tree that only
allows one item to be selected at a time. This example will render a very simple
folder tree and show how items are linked together and rendered within the tree
along with an example of using the `useTreeItemSelection` and
`useTreeItemExpansion` hooks.

The `useTreeItemSelection` hook returns an object containing the following props
to pass to the `Tree` component to get selection behavior:

- `selectedIds` - A list of the current selected ids within the tree.
- `onItemSelection` - A callback that updates the `selectedIds` when an item
  within the tree is clicked
- `onMultiItemSelection` - A callback that updates the `selectedIds` when a
  "batch selection" occurs. This callback will never be called if the second
  argument for this hook is omitted or set to `false`.
- `multiSelect` - Boolean if multi-select behavior is enabled for this tree. The
  default is `false`.

The `useTreeItemExpansion` hook returns an object containing the following props
to pass to the `Tree`component to get expansion behavior:

- `expandedIds` - A list of the current expanded ids within the tree.
- `onItemExpansion` - A callback that updates the `expandedIds` when a tree item
  should be expanded or collapsed
- `onMultiItemExpansion` - A callback that updates the `expandedIds` when a
  "batch expansion" occurs (pressing the asterisk `*` key)
