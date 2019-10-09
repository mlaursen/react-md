Tables will have the default styles applied:

- a border-bottom applied to each row in the `<tbody>` except for the last row
- a row hover effect in the `<tbody>`
- prevent line-wrapping of cells
- each cell will have `padding-left: 1rem` and `padding-right: 3.5rem`

These settings can be configured on the top-level `Table` component, or
overridden at `TableCell`/`TableRow` level as needed.

The examples below will go through disabling/enabling only one prop at a time,
but these stylistic props can all be used together if you'd like. The only
outlier would be the `dense` prop which will have some additional info in
another example.
