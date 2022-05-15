Since it might not always be desired to use a scroll container for the sticky
columns, it's also possible to use the entire viewport and document instead. The
only difference between this example and the example above is that the `Table`
component will no longer be wrapped in the `TableContainer` component so the
scroll behavior is inherited from the entire document as well as updating the
`top` value for the fixed headers.

Since this website uses a fixed `AppBar`, it would be nice for the sticky table
headers to be sticky beneath this `AppBar`. This can be accomplished by:

- using the `rmd-table-theme-update-var` mixin to modify the `sticky-header`
  value with the pre-defined `AppBar` height
- using the `rmd-table-theme-update-var` mixin along with the
  `rmd-app-bar-theme-var` function to modify the `sticky-header` value with the
  current `AppBar` height if it changes based on viewport size
- updating the `top` property for each `<td>` or `<th>` in the `TableHeader`

The example below will use the `rmd-table-theme-update-var` mixin along with the
`rmd-app-bar-theme-var` function to create a sticky header within the viewport.
