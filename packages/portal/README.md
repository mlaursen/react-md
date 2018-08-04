# @react-md/portal
The Portal component is a simple wrapper with React's createPortal API that will automatically generate portal nodes behind the scenes as needed

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/portal

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Prop Types](#prop-types)
  * [Portal](#portal)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/portal
```

## Usage
<!-- PROPS_START -->
## Prop Types
### Portal


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
<td>visible *</td>
<td><code>boolean</code></td>
<td><code>null</code></td>
<td>
Boolean if the portal is currently visible.
<br /><br />
</td>
</tr>
<tr>
<td>into *</td>
<td><code>string | (() => HTMLElement) | HTMLElement</code></td>
<td><code>null</code></td>
<td>
Either a function that returns an HTMLElement, an HTMLElement, or a <code>document.querySelector</code> string
that will return the HTMLElement to render the children into. If both the <code>into</code> and <code>intoId</code> props
are <code>undefined</code>, the <code>document.body</code> will be chosen instead.
<br /><br />
</td>
</tr>
<tr>
<td>intoId *</td>
<td><code>string</code></td>
<td><code>null</code></td>
<td>
The id of an element that the portal should be rendered into. This element <b>must</b> exist on the page
before the <code>visible</code> prop is enabled to work. If both the <code>into</code> and <code>intoId</code> props are <code>undefined</code>,
the <code>document.body</code> will be chosen instead.
<br /><br />
</td>
</tr>
</tbody>
</table>


<!-- PROPS_END -->

