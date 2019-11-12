Data tables display raw data sets. They usually appear in desktop enterprise
products.

#### Responsiveness

By default, the data tables will be responsive by allowing the user to scroll
left/right when there is too much content to be viewed at once.

#### Table Types

In `react-md`, data tables come in two types: `plain` and `selectable` where
`selectable` is the default. A `plain` data table is not part of the material
design specs and attempts to just add the base styles for a table and allow any
sized content to be displayed. A `selectable` data table will inject checkboxes
as the first column and allow each row to be selected.

#### Performance

If you are working with large data sets and have heavy table edit abilities, it
is recommended to use a virtualization library such as
[react-virtualized](https://github.com/bvaughn/react-virtualized) instead of my
tables. The html `<table>` is already pretty slow if you don't use fixed layouts
and know the exact size of each cell beforehand. When all the event listeners
and styles have been applied for the data table, you might start noticing
performance issues around a 20x20 table. If a virtualization library isn't your
thing, you can always try to paginate the results with the `TablePagination`
component to limit the number of rendered rows/columns at a time
