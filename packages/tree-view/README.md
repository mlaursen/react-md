# @react-md/tree-view

So to get a working tree view... I need:
- list of tree items for focus behavior
- list of unique ids for determining if a node is opened
- list of unique ids for determining if a node is focused
- treeview renderer
- treeitem renderer
  - takes child tree items as well


This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/tree-view

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [TreeView](#treeview)
  * [TreeItem](#treeitem)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/tree-view
```

## Usage
<!-- PROPS_START -->
## Prop Types
### TreeView


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
<td>children</td>
<td><code>ReactNode</code></td>
<td><code>null</code></td>
<td>
The children to render within the list. This should normally be the <code>ListItem</code> component, but
it can also be links or any other element.
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
<td>forwardedRef</td>
<td><code>string | ((instance: HTMLUListElement | HTMLOListElement | null) => any) | RefObject<ListElement>...</code></td>
<td><code>null</code></td>
<td>
An optional forwareded ref. This is really &#34;private&#34; but it is being documented so that it is know
that applying a <code>ref</code> to a <code>List</code> will return the actual ul or ol element instead of the component
instance.
<br /><br />
</td>
</tr>
</tbody>
</table>


### TreeItem


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

</tbody>
</table>


<!-- PROPS_END -->



