Now that you've seen sticky headers and footers, lets add the final peace of
allowing sticky cells within the `TableBody`. To create a sticky `TableCell`
within the `TableBody` there is no convenience API on the parent `TableBody` or
even `TableRow` components and must enable the `sticky` prop on each cell that
should be sticky. This is because you'll normally only have one cell that is
sticky per row that will be left aligned (or right aligned in RTL languages)
instead of making the entire row sticky.

The example below will show how you can create a table with sticky headers,
sticky checkboxes, and a sticky row header cell.
