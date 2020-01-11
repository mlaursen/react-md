A table is made up by the following components:

- `Table` -> `<table>`
- `TableHeader` -> `<thead>`
- `TableBody` -> `<tbody>`
- `TableFooter` -> `<tfooter>`
- `TableRow` -> `<tr>`
- `TableCell` -> `<th>` and `<td>`
- `Caption` -> `<caption>` _(you probably won't use this much)_

You can pick and choose the components that you need for your use-case and
implement a custom table. The `TableRow` and `TableCell` components will
automatically inherit any style overrides that were provided to the root `Table`
component so you don't need to keep applying the same props repeatedly. The
`TableCell` will also automatically render as a `<th>` instead of a `<td>` when
it is a child of the `TableHeader` component.
