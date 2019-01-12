import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

import SingleSelectionTreeExample from "./SingleSelectionTreeExample";
import MultiSelectionTreeExample from "./MultiSelectionTreeExample";

const examples: ExampleList = [
  {
    title: "Single Selection Tree Example",
    children: <SingleSelectionTreeExample />,
  },
  {
    title: "Multi-Selection Tree Example",
    children: <MultiSelectionTreeExample />,
  },
];

const description = `
This package is used to create the accessible [tree view widget](https://www.w3.org/TR/wai-aria-practices/#TreeView)
from [www.w3.org](https://www.w3.org/) with the styles of react-md, some decent default rendering logic, and
keyboard/mouse events to select and open nodes. If you are unfamiliar with the specifications for tree views,
you can read below for the single selection and multi-selection trees below that will also include keyboard behavior.

### Single Selection Trees
A single selection tree will only allow 1 item within the tree to be selected at once. By default, the selected item
will gain a darkened background color to help show it is selected.

#### Keyboard Navigation
When the user is navigating through the page with keyboard only, the selected tree item will be the only item that is
focusable with the \`TAB\` key. The user can navigate through the tree by using the \`UP\` and \`DOWN\` arrow keys to
move the "focus state" up an item or down an item. If the user presses the \`UP\` arrow key on the first item in the
tree, the "focus state" will wrap around and focus the last visible item in the tree. This same logic applies for the
\`DOWN\` arrow key so that pressing the \`DOWN\` arrow key on the last visible item in the tree will move the
"focus state" to the first item in the tree. In addition, the user can hit the \`HOME\` and \`END\` keys to quickly
move the "focus state" to the first or last visible item in the tree respectively.

The tree also has type-ahead built in so that the user can type letters to find the next item that starts with the
typed letters. The tree will keep searches alive for \`500ms\` by default so that if a user quickly types letters in
succession, they will be joined together in the search to find items easily. However, if the user types the same letter
is succession, the search will be reset each time and the next item starting with that letter will gain the
"focus state" instead.

#### Keyboard Selection
In a single selection tree, an item can only be selected  \`ENTER\` key.

#### Keyboard Item Expansion
Items can be expanded and collapsed by pressing the \`RIGHT\` arrow key or \`LEFT\` arrow key respectively on an item
that has child items. An item's expansion can be toggled by pressing the \`ENTER\` key. In addition, the user can press
the \`ASTERISK\` (\`*\`) key to open all items at the same level as the item that currently has the "focus state".

### Multi-Selection Trees
A multi-selection tree will allow zero to many items within the tree to be selected at once. Just like the single
selection trees, each focused item will gain a darkened background color by dfault to help show it is selected.

#### Keyboard Navigation
When the user is navigating through the page with keyboard only, each selected item will be focusable by using the
\`TAB\` key. If there are currently no selected items, only the first item in the tree will be tab focusable.

The remaining keyboard navigation behavior is the same as the single selection tree except that it gains a few more
selection shortcuts so read the next section for more information.

#### Keyboard Selection
Just like in a single selection tree, pressing the \`ENTER\` key will will select an item and **never** deselect an
item. The item's selection can be toggled by using the \`SPACE\` key instead.

If the user presses \`SHIFT\` + the \`UP\` arrow key, the focus will be moved to the item above the current item and
toggle the selection state of that item. If the user presses \`SHIFT\` + the \`DOWN\` arrow key, the focus will be moved
to the item below the current item and toggle the selection state of that item. Just like normal \`UP\` and \`DOWN\`
"focus state" navigation, \`SHIFT+UP\` and \`SHIFT+DOWN\` logic will wrap.

If the user presses \`CTRL+SHIFT+HOME\`, the current item and all visible items up to the first item in the tree will be
selected while pressing \`CTRL+SHIFT+END\` will select the current item and all visible items down tot he last item
in the tree.

Finally, the user can quickly select all items (even the non-expanded child items) by pressing \`CTRL+A\`. If the user
presses \`CTRL+A\` while all the items were selected, all items will be deselected instead.
`;

const Examples = () => (
  <ExamplesPage title="TreeView" examples={examples} description={description} />
);

export default Examples;
