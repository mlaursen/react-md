A table is made up by the following components:

- `TableContainer` -> `<div>` (used for responsive tables)
- `Table` -> `<table>`
- `TableHeader` -> `<thead>`
- `TableBody` -> `<tbody>`
- `TableFooter` -> `<tfooter>`
- `TableRow` -> `<tr>`
- `TableCell` -> `<th>` and `<td>`
- `Caption` -> `<caption>` _(you probably won't use this much)_
- `TableCheckbox` -> `<td><input type="checkbox" /></td>`

To help reduce some of the repeated code, boilerplate, and apply minimal
accessibility, the `TableCell` will be updated automatically depending on where
it was rendered. When a `TableCell` is rendered in a `TableHeader`, it'll
automatically update to be rendered as a `<th>` element instead of a `<td>`. In
addition, it'll apply a `scope="col"` to help screen readers out.

When the `TableCell` is rendered anywhere else, it'll default to the `<td>`
element unless the `header` prop is enabled. If the `header` prop is enabled
within the `TableBody`, it'll apply a `scope="row"` instead.

In case you didn't know, styling tables is _super fun_! The tables within
`react-md` have been created in a way that you can hopefully style them as you
need with some sensible defaults. That being said, there will be some "weird
edge cases" that you will come across if you are more used to a flexbox-based
layout approach. The demos below should hopefully point you in the right
direction for accomplishing your styling needs.
