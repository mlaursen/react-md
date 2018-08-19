# @react-md/tree-view
This package is used to implement the [tree view widget](https://www.w3.org/TR/wai-aria-practices/#TreeView) with _decent_
customization ability.


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/tree-view

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [Simple Usage of TreeView and TreeViewControls](#simple-usage-of-treeview-and-treeviewcontrols)
- [Prop Types](#prop-types)
  * [TreeView](#treeview)
  * [TreeViewControls](#treeviewcontrols)
  * [FlattenedTreeView](#flattenedtreeview)
  * [TreeItem](#treeitem)
  * [TreeGroup](#treegroup)
  * [TreeItemExpanderIcon](#treeitemexpandericon)
  * [TreeItemContent](#treeitemcontent)
  * [DefaultTreeItemRenderer](#defaulttreeitemrenderer)
- [SassDoc](#sassdoc)
  * [Mixins](#mixins)
    + [Examples](#examples)
      - [Example Usage SCSS](#example-usage-scss)
      - [Example Usage SCSS](#example-usage-scss-1)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/tree-view
```

## Usage
### Simple Usage of TreeView and TreeViewControls
Since the `TreeView` component requires "control" of the `selectedIds` and `expandedIds`, you can use
the `TreeViewControls` component to add the base functionality for your tree as needed.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { TreeView, TreeViewControls, TreeViewDataList } from "@react-md/tree-view";

const data: TreeViewDataList = [{
  itemId: "item-1",
  children: "Item 1",
}, {
  itemId: "item-2",
  children: "Item 2",
  childItems: [{
    itemId: "item-2-1",
    children: "Item 2-1",
    childItems: [{
      itemId: "item-2-1-1",
      children: "Item 2-1-1",
    }],
  }, {
    itemid: "item-2-2",
    children: "Item 2-2",
  }],
}, {
  itemId: "item-3",
  children: "Item 3",
}];

const App = () => (
  <TreeViewControls id="example-tree-view" data={data}>
    {props => <TreeView {...props} />}
  </TreeViewControls>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

<!-- PROPS_START -->
## Prop Types
### TreeView
The `TreeView` component is used to create an accessible
[tree view widget](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) by adding the base required
click and keyboard listeners to the tree to open, close, and select tree items. However, the items will
not be opened, closed, or selected unless the provided `onItemSelect`, `onItemExpandedChange`, and
`onItemSiblingExpansion` props do not update the `expandedIds` and `selectedIds` props. There is a
`TreeViewControls` component that can be used to automatically handle this logic for you though.

To make rendering the tree easy, there are decent defaults for rendering the entire `TreeView` and each
`TreeItem` that should work out of the box for simple tree views. However, this can be updated for more
complex trees that have drag and drop or other functionality built in.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>id *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The id for the tree view. This is required as it will be passes as a prop to the <code>treeViewRenderer</code>.
<br /><br />
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style that will get passed down to the <code>treeViewRenderer</code>.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional style that will get merged and passed down to the <code>treeViewRenderer</code>.
<br /><br />
</td>
</tr>
<tr>
<td>aria-labelledby</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional id that points to an element that labels this tree. Either this or the <code>aria-label</code>
prop are required for a11y.
<br /><br />
</td>
</tr>
<tr>
<td>aria-label</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional label string that describes this tree. Either this or the <code>aria-labelledby</code> prop are
required for a11y.
<br /><br />
</td>
</tr>
<tr>
<td>data *</td>
<td><code>TreeViewData<D>[]</code></td>
<td><code>null</code></td>
<td>
A list of data that should be transformed into a tree view.
<br /><br />
</td>
</tr>
<tr>
<td>treeViewRenderer</td>
<td><code>treeViewRenderer<R></code></td>
<td><code>null</code></td>
<td>
A function that will render the entire tree view. This should mostly remain the default implementation
of passing down to the <code>List</code> component, but it can be changed to something else if you need more flexibility
or functionality.
<br /><br />
</td>
</tr>
<tr>
<td>treeItemRenderer</td>
<td><code>treeItemRenderer<D></code></td>
<td><code>null</code></td>
<td>
A function that will render a specific tree item. The default implementation <i>should</i> probably be good enough
for most use cases, but this can be updated if you need additional functionality.
<br /><br />
</td>
</tr>
<tr>
<td>multiSelect</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the TreeView can have multiple treeitems selected.
<br /><br />
</td>
</tr>
<tr>
<td>selectOnFocus</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if focusing using any of the provided keyboard navigation shortcuts should also select the item. This
should most likely be <code>false</code> at all times.
<br /><br />
</td>
</tr>
<tr>
<td>selectableChildItemsItem</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the <code>TreeItem</code>s that have child items can also be selected.
<br /><br />
</td>
</tr>
<tr>
<td>disableSiblingExpansion</td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>
Boolean if the functionality for opening all siblings at the same level when the asterisk (<code>*</code>) key is pressed
should be disabled.
<br /><br />
</td>
</tr>
<tr>
<td>searchResetTime</td>
<td><code>number</code></td>
<td><code>500</code></td>
<td>
The <code>TreeView</code> component allows the user to search for items by typing a letter which will attempt to find
the first item that matches that letter. If the user keeps pressing the same letter, the next item that starts
with that letter will be chosen instead. If a different letter is pressed, the search string will include both
letters and the match will now require the tree item to start with both letters.
<br /><br />
This prop is the amount of time in milliseconds that this search logic should be active before the search resets
back to the empty string.
<br /><br />
</td>
</tr>
<tr>
<td>onItemSiblingExpansion</td>
<td><code>onItemSiblingExpansion</code></td>
<td><code>null</code></td>
<td>
A function to call when the <code>disableSiblingExpansion</code> prop is not enabled and the user presses the <code>*</code>
key on a tree item to expand all related sibling nodes.
<br /><br />
</td>
</tr>
<tr>
<td>selectedIds *</td>
<td><code>string[]</code></td>
<td><code>null</code></td>
<td>
A list of tree item ids that are currently selected.
<br /><br />
</td>
</tr>
<tr>
<td>expandedIds *</td>
<td><code>string[]</code></td>
<td><code>null</code></td>
<td>
A list of tree item ids that are currently expanded.
<br /><br />
</td>
</tr>
</tbody>
</table>


### TreeViewControls
The `TreeViewControls` component is used as a simple higher order component to add the basic selection and
expansion event handlers and state to the `TreeView` component.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>children *</td>
<td><code>((controls: ITreeViewControls<D, R>) => ReactNode) | (string & ((controls: ITreeViewControls<D, R...</code></td>
<td><code>null</code></td>
<td>
A callback function that will provide all the required item listeners and item id lists to the
<code>TreeView</code> component as well as any other prop that was passed to the <code>TreeViewControls</code> component.
<br /><br />
</td>
</tr>
<tr>
<td>defaultSelectedIds</td>
<td><code>string[]</code></td>
<td><code>null</code></td>
<td>
An optional list of item ids that are selected when the <code>TreeViewControls</code> component mounts. If
this list is empty, the first item within the provided <code>data</code> set will be used instead since
the tree will not be keyboard focusable without a selected element.
<br /><br />
</td>
</tr>
<tr>
<td>defaultExpandedIds</td>
<td><code>string[]</code></td>
<td><code>null</code></td>
<td>
An optional list of item ids that are expanded when the <code>TreeViewControls</code> component mounts. If
this list is empty and there are items in the <code>defaultSelectedIds</code> list, the component will
traverse the <code>data</code> set and find all parent ids for each id in the <code>defaultSelectedIds</code> list so
that the selected items will be visible by default.
<br /><br />
</td>
</tr>
<tr>
<td>id *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The id for the tree view. This is required as it will be passes as a prop to the <code>treeViewRenderer</code>.
<br /><br />
</td>
</tr>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style that will get passed down to the <code>treeViewRenderer</code>.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional style that will get merged and passed down to the <code>treeViewRenderer</code>.
<br /><br />
</td>
</tr>
<tr>
<td>aria-labelledby</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional id that points to an element that labels this tree. Either this or the <code>aria-label</code>
prop are required for a11y.
<br /><br />
</td>
</tr>
<tr>
<td>aria-label</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional label string that describes this tree. Either this or the <code>aria-labelledby</code> prop are
required for a11y.
<br /><br />
</td>
</tr>
<tr>
<td>data *</td>
<td><code>TreeViewData<D>[]</code></td>
<td><code>null</code></td>
<td>
A list of data that should be transformed into a tree view.
<br /><br />
</td>
</tr>
<tr>
<td>treeViewRenderer</td>
<td><code>treeViewRenderer<R></code></td>
<td><code>null</code></td>
<td>
A function that will render the entire tree view. This should mostly remain the default implementation
of passing down to the <code>List</code> component, but it can be changed to something else if you need more flexibility
or functionality.
<br /><br />
</td>
</tr>
<tr>
<td>treeItemRenderer</td>
<td><code>treeItemRenderer<D></code></td>
<td><code>null</code></td>
<td>
A function that will render a specific tree item. The default implementation <i>should</i> probably be good enough
for most use cases, but this can be updated if you need additional functionality.
<br /><br />
</td>
</tr>
<tr>
<td>multiSelect</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the TreeView can have multiple treeitems selected.
<br /><br />
</td>
</tr>
<tr>
<td>selectOnFocus</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if focusing using any of the provided keyboard navigation shortcuts should also select the item. This
should most likely be <code>false</code> at all times.
<br /><br />
</td>
</tr>
<tr>
<td>selectableChildItemsItem</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the <code>TreeItem</code>s that have child items can also be selected.
<br /><br />
</td>
</tr>
<tr>
<td>disableSiblingExpansion</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the functionality for opening all siblings at the same level when the asterisk (<code>*</code>) key is pressed
should be disabled.
<br /><br />
</td>
</tr>
<tr>
<td>searchResetTime</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
The <code>TreeView</code> component allows the user to search for items by typing a letter which will attempt to find
the first item that matches that letter. If the user keeps pressing the same letter, the next item that starts
with that letter will be chosen instead. If a different letter is pressed, the search string will include both
letters and the match will now require the tree item to start with both letters.
<br /><br />
This prop is the amount of time in milliseconds that this search logic should be active before the search resets
back to the empty string.
<br /><br />
</td>
</tr>
<tr>
<td>onItemSelect</td>
<td><code>onItemSelect</code></td>
<td><code>null</code></td>
<td>
The function that should be called when a new tree item is selected. The callback function should
be used to update the <code>selectedId</code> prop to the provided <code>itemId</code>.
<br /><br />
</td>
</tr>
<tr>
<td>onItemExpandedChange</td>
<td><code>onItemExpandedChange</code></td>
<td><code>null</code></td>
<td>
The function that should be called when a tree item&#39;s expansion value changes. The callback function
should be used to update the <code>expandedIds</code> prop to include or remove the provided <code>itemId</code>.
<br /><br />
</td>
</tr>
<tr>
<td>onItemSiblingExpansion</td>
<td><code>onItemSiblingExpansion</code></td>
<td><code>null</code></td>
<td>
A function to call when the <code>disableSiblingExpansion</code> prop is not enabled and the user presses the <code>*</code>
key on a tree item to expand all related sibling nodes.
<br /><br />
</td>
</tr>
</tbody>
</table>


### FlattenedTreeView
The `FlattenedTreeView` component is a pretty performant component used to rendering a flattened data structure
into the required nested lists data structure of the `TreeView` component.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>children *</td>
<td><code>((data: FlattenedTreeViewData<D>[]) => ReactNode) | (string & ((data: FlattenedTreeViewData<D>[])...</code></td>
<td><code>null</code></td>
<td>
A children callback function that will be provided a list of <code>FlattenedTreeViewData</code> and
should eventually be passed into the <code>TreeView</code> component as the <code>data</code> prop.
<br /><br />
</td>
</tr>
<tr>
<td>rootId</td>
<td><code>string | null</code></td>
<td><code>null</code></td>
<td>
The root id to use for the flattened tree. Every item that has a <code>parentId</code> set
to this value will be displayed at the top level.
<br /><br />
</td>
</tr>
<tr>
<td>data *</td>
<td><code>IFlattenedTreeViewData<D></code></td>
<td><code>null</code></td>
<td>
A flattened tree view data object to convert into a <code>FlattenedTreeViewDataList</code>.
<br /><br />
</td>
</tr>
<tr>
<td>sort</td>
<td><code>((data: FlattenedTreeViewData<D>[]) => FlattenedTreeViewData<D>[])</code></td>
<td><code>null</code></td>
<td>
An optional function that will sort the data at each level. It should take in a <code>FlattenedTreeViewDataList</code>
and return a sorted <code>FlattenedTreeViewDataList</code>.
<br /><br />
</td>
</tr>
</tbody>
</table>


### TreeItem
The `TreeItem` component is an extremely simple component that just renders an `li` element
with the "base" tree item props and any children provided. This should be used in combination
with the `TreeItemContent` and `TreeGroup` components to get a fully functional tree item.

If you want to render the treeitem as a link, please use the `TreeLinkItem` component instead
of this one.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>tabIndex</td>
<td><code>0 | -1</code></td>
<td><code>null</code></td>
<td>
The tabindex for the tree item. When working with a single-selection tree view, <b>only 1 treeitem</b> can have a
tab index of <code>0</code> while all other treeitems should have a tab index of <code>-1</code>.
<br /><br />
It is generally recommended to keep this prop <code>undefined</code> and let the <code>selected</code> prop handle setting the correct
<code>tabIndex</code> instead. However, you can manually override the built-in behavior by setting this to valid number.
<br /><br />
</td>
</tr>
<tr>
<td>aria-expanded</td>
<td><code>"true"</code></td>
<td><code>null</code></td>
<td>
Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
An optional aria-expanded attribute to apply to the tree item. This should only be provided as the value &#34;true&#34;
and only if it is currently expanded. It should be <code>undefined</code> otherwise.
<br /><br />
</td>
</tr>
<tr>
<td>aria-level *</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
Defines the hierarchical level of an element within a structure.
The current level (depth) for the tree item.
<br /><br />
</td>
</tr>
<tr>
<td>aria-posinset *</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
Defines an element&#39;s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
The tree item&#39;s current position within the parent treeview or a sub-group. This should be a number starting
from <code>1</code>.
<br /><br />
@docgen
</td>
</tr>
<tr>
<td>aria-setsize *</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
The size of the treeview or sub-group that the tree item is in. This should be a number starting from <code>1</code>.
<br /><br />
@docgen
</td>
</tr>
<tr>
<td>selected</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the tree item is current selected. This will update the styles to be have the selected state as well
as changing the <code>tabIndex</code> from <code>-1</code> to <code>0</code> so it is focusable. If the <code>tabIndex</code> prop is defined, that value
will <b>always</b> be used instead.
<br /><br />
</td>
</tr>
</tbody>
</table>


### TreeGroup
The `TreeGroup` component is used to render a tree item's nested items whenever the `expanded` prop
is `true`. It uses the `Collapse` component behind the scenes to animate in-and-out of view and will
fully unrender when the `expanded` prop is `false`.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>enterDuration</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
An optional configurable enter duration. This defaults to the <code>Collapse</code>&#39;s enter duration
of <code>250ms</code>.
<br /><br />
</td>
</tr>
<tr>
<td>leaveDuration</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
An optional configurable leave duration. This defaults to the <code>Collapse</code>&#39;s leave duration
of <code>200ms</code>.
<br /><br />
</td>
</tr>
<tr>
<td>isEmptyCollapsed</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the group should be removed from the DOM when the group is not expanded.
<br /><br />
</td>
</tr>
<tr>
<td>expanded *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the group is currently expanded.
<br /><br />
</td>
</tr>
<tr>
<td>role</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The role to apply to the list. This should really be one of:
- list
- tree
- navigation
- menu
- listbox
<br /><br />
but any value will be supported in case I forgot a use-case for lists.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional className to apply.
<br /><br />
</td>
</tr>
<tr>
<td>dense</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the &#34;dense&#34; spec should be applied to the list. this will just reduce
the vertical padding a bit by default.
<br /><br />
</td>
</tr>
<tr>
<td>ordered</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the list has a specific order. This will update the list to be
rendered as a <code>&#60;ol&#62;</code> instead of <code>&#60;ul&#62;</code>.
<br /><br />
</td>
</tr>
<tr>
<td>inline</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the list should be positioned inline (horizontally) instead of vertically.
<br /><br />
</td>
</tr>
<tr>
<td>children</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
The children to render within the list. This should normally be the <code>ListItem</code> component, but
it can also be links or any other element.
<br /><br />
</td>
</tr>
</tbody>
</table>


### TreeItemExpanderIcon
The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to be used within a `TreeView`.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>style</td>
<td><code>CSSProperties</code></td>
<td><code>null</code></td>
<td>
An optional style to apply to the surrounding span when the <code>forceIconWrap</code> prop is enabled
or the children is not a single react element.
<br /><br />
</td>
</tr>
<tr>
<td>className</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
An optional className to apply.
<br /><br />
</td>
</tr>
<tr>
<td>from</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
The starting degree amount that should be used. This should be one of the values in the
<code>$rmd-icon-rotator-rotation-degrees</code> list or a value specified when using the <code>rmd-icon-rotator-degrees</code>
mixin so that a valid class name can be applied.
<br /><br />
</td>
</tr>
<tr>
<td>to</td>
<td><code>number</code></td>
<td><code>null</code></td>
<td>
The ending degree amount that should be used. This should be one of the values in the
<code>$rmd-icon-rotator-rotation-degrees</code> list or a value specified when using the <code>rmd-icon-rotator-degrees</code>
mixin so that a valid class name can be applied.
<br /><br />
</td>
</tr>
<tr>
<td>animate</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the rotation should be animated instead of static.
<br /><br />
</td>
</tr>
<tr>
<td>rotated *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the icon is currently rotated.
<br /><br />
</td>
</tr>
<tr>
<td>forceIconWrap</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the child icon should be &#34;forcefully&#34; wrapped in a <code>&#60;span&#62;</code> element. This should be enabled if
you have a custom icon that does not pass the <code>className</code> prop down.
<br /><br />
</td>
</tr>
</tbody>
</table>


### TreeItemContent
The `TreeItemContent` is extremely similar to the `ListItem` component as it uses some of the same props.
It is used to layout the contents within a `TreeItem` so that is it separated from the `TreeGroup` and has
the different focus states and icon alignments.

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>linkComponent *</td>
<td><code>string | ComponentClass<any, ComponentState> | StatelessComponent<any></code></td>
<td><code>null</code></td>
<td>
The component to use that renders a <code>Link</code> component. This should normally be something like the <code>Link</code>
from <code>react-router</code> or <code>reach-router</code>, but can also just be the <code>Link</code> from <code>@react-md/link</code> if you are
not creating a SPA.
<br /><br />
</td>
</tr>
<tr>
<td>medium</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the <code>medium</code> <code>ListItem</code> spec should be used for the content.
<br /><br />
</td>
</tr>
<tr>
<td>leftIcon</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
An optional icon to display to the left of the children or provided text elements. If this is
a valid React element, the spacing class names will be cloned into the element. Otherwise it
will be wrapped with a <code>&#60;span&#62;</code> to have the correct class name applied. You can also use the
<code>forceIconWrap</code> prop to <b>always</b> wrap the icon in a <code>&#60;span&#62;</code> with the correct class name applied.
<br /><br />
</td>
</tr>
<tr>
<td>rightIcon</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
An optional icon to display to the right of the children or provided text elements. If this is
a valid React element, the spacing class names will be cloned into the element. Otherwise it
will be wrapped with a <code>&#60;span&#62;</code> to have the correct class name applied. You can also use the
<code>forceIconWrap</code> prop to <b>always</b> wrap the icon in a <code>&#60;span&#62;</code> with the correct class name applied.
<br /><br />
</td>
</tr>
<tr>
<td>forceIconWrap</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the left and/or right icons should be &#34;forcefully&#34; wrapped in a <code>&#60;span&#62;</code> with the spacing
class names applied instead of attempting to clone it into the provided icon element.
<br /><br />
</td>
</tr>
</tbody>
</table>


### DefaultTreeItemRenderer


> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>leftIcon</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
An optional icon to display to the left of the children or provided text elements. If this is
a valid React element, the spacing class names will be cloned into the element. Otherwise it
will be wrapped with a <code>&#60;span&#62;</code> to have the correct class name applied. You can also use the
<code>forceIconWrap</code> prop to <b>always</b> wrap the icon in a <code>&#60;span&#62;</code> with the correct class name applied.
<br /><br />
</td>
</tr>
<tr>
<td>rightIcon</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
An optional icon to display to the right of the children or provided text elements. If this is
a valid React element, the spacing class names will be cloned into the element. Otherwise it
will be wrapped with a <code>&#60;span&#62;</code> to have the correct class name applied. You can also use the
<code>forceIconWrap</code> prop to <b>always</b> wrap the icon in a <code>&#60;span&#62;</code> with the correct class name applied.
<br /><br />
</td>
</tr>
<tr>
<td>forceIconWrap</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the left and/or right icons should be &#34;forcefully&#34; wrapped in a <code>&#60;span&#62;</code> with the spacing
class names applied instead of attempting to clone it into the provided icon element.
<br /><br />
</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->

<!-- SASSDOC_START -->
## SassDoc

### Mixins

<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-tree-item-at-depth(depth, selector-prefix, incrementor, base)</code></td>
<td>Creates styles to add additional padding to tree items based on depth. This will only work
if you correctly apply the <code>aria-level</code> attributes to the list items.
<br /><br />

The formula used for creating padding is:
```scss
$padding: (($depth - 1) * $incrementor) + $base;
```
<h5>Parameters</h5>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</thead>
<tbody>
<tr>
<td>depth</td>
<td>Number</td>
<td></td>
<td>The depth to create styles for.</td>
</tr>
<tr>
<td>selector-prefix</td>
<td>String</td>
<td>''</td>
<td>An optional selector prefix to add before the <code>aria-level</code>.</td>
</tr>
<tr>
<td>incrementor</td>
<td>Number</td>
<td>rmd-tree-view-item-padding-incrementor</td>
<td>The amount of padding to be used for each level of depth.</td>
</tr>
<tr>
<td>base</td>
<td>Number</td>
<td>rmd-tree-view-item-padding-base</td>
<td>The base amount of padding that should be added to a tree item.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-tree-view-depths(selector-prefix, min, max, incrementor, base)</code></td>
<td>Creates the styles for all the depths from the provided min and max values for a tree.
<h5>Parameters</h5>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</thead>
<tbody>
<tr>
<td>selector-prefix</td>
<td>String</td>
<td>''</td>
<td>An optional prefix to apply before the <code>aria-level</code> selector.</td>
</tr>
<tr>
<td>min</td>
<td>Number</td>
<td>1</td>
<td>The min level to use. This needs to be a number greater than 0.</td>
</tr>
<tr>
<td>max</td>
<td>Number</td>
<td>rmd-tree-view-max-depth</td>
<td>The max number of levels to create styles for.</td>
</tr>
<tr>
<td>incrementor</td>
<td>Number</td>
<td>rmd-tree-view-item-padding-incrementor</td>
<td>The amount of padding to be used for each level of depth.</td>
</tr>
<tr>
<td>base</td>
<td>Number</td>
<td>rmd-tree-view-item-padding-base</td>
<td>The base amount of padding that should be added to a tree item.</td>
</tr>
</tbody>
</table>

</td>
</tr>
<tr>
<td><code>rmd-tree-item</code></td>
<td>Creates the styles for a tree item. This really requires the <code>@react-md/list</code> styles to be created
beforehand since these styles just prevent the outline when focused to work with the <code>@react-md/states</code>
package.

</td>
</tr>
<tr>
<td><code>rmd-tree-group</code></td>
<td>Creates the styles for the tree group.

</td>
</tr>
<tr>
<td><code>react-md-tree-view</code></td>
<td>Creates all tree-view specific styles. This really requires the <code>@react-md/list</code> styles to be created
beforehand since these styles just prevent the outline when focused to work with the <code>@react-md/states</code>
package.
<br /><br />

</td>
</tr>
</tbody>
</table>

#### Examples


##### Example Usage SCSS

```scss
.rmd-tree-item {
  @include rmd-tree-item;
}
```


##### Example Usage SCSS

```scss
.rmd-tree-group {
  @include rmd-tree-group;
}
```


### Variables
<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-tree-view-max-depth</code></td>
<td>The default max-depth to create for the tree view depths. This is used in the <code>rmd-tree-view-depths</code> mixin
to generate offsets in css based on how deep a tree item is. If this value is less than or equal to 1, no
depth styles will be created.</td>
</tr>
<tr>
<td><code>rmd-tree-view-item-padding-incrementor</code></td>
<td>The amount of padding that should be multiplied by the current depth and added to the <code>rmd-tree-view-item-padding-base</code>.</td>
</tr>
<tr>
<td><code>rmd-tree-view-item-padding-base</code></td>
<td>The base amout of padding to apply to a tree item that has a depth greater than 1. This is set to a value
that assumes you have icons to the left of the items at the base level. If you do not, it would be better to
set this value to something smaller or `$rmd-list-item-horizontal-padding * 2.5`.</td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
