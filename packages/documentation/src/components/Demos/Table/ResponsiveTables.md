Tables will actually not be responsive by default and will render inline as
large as the content is and rely on any parent element's `overflow` behavior.
This works decently for desktops, but if you have to support mobile or large
tables this can be a bit of a pain. If there is too much content, it'll overflow
until a parent's custom scroll behavior is defined. So it isn't really
recommended to do this unless you only need to support desktop, you know it'll
fit on all screens, or your parent component defines `overflow` behavior.

> Now why is this the default? Well, it'll lead into the
> [fixed table example](#fixed-table-title) a bit, but it's allows you to also
> have some more control about how the table renders for different layouts.

To make a table responsive, you can use the wrapper component `TableContainer`
that will be scrollable. If the `Table` is taller or wider than the
`TableContainer`, it'll now scroll as expected.

This is getting us most of the way there, but another big use-case is that we
want the table to span the entire width of the `TableContainer`. This can be
done by enabling the `fullWidth` prop on the `Table` component or enabling the
`grow` prop on the first `TableCell` in the `TableHeader`. The `fullWidth` prop
will just apply `width: 100%` to the table which might have same-width cells
depending on the screen size. The `grow` prop will make the column fill all the
remaining space in the table and ensuring all the other columns are as small as
possible.

> The `fullWidth` and `grow` versions won't really be noticeable until on a
> large desktop screen.
