Another common functionality found within tables is the ability to sort based on
a column header. `react-md` does not provide a way to sort your data since there
are multiple ways to sort a list of data, but it does provide an accessible way
to render these sortable headers.

To create a sortable header cell, you'll want to provide the `"aria-sort"` prop
to a `TableCell` which should be one of the following:

- `"ascending"` - The data has been sorted in ascending order. So A-z, 0-9, and
  earlier dates before later dates.
- `"descending"` The data has been sorted in descending order. So z-A, 9-0, and
  later dates before earlier dates.
- `"other"` - The data has been sorted in another programmatic order.
- `"none"` - The data has not been sorted (`"aria-sort"` default)

When the `"aria-sort"` prop has been set to one of these values, the cell will
automatically update the `children` to be rendered within a `button` element so
that it can be tab-focused and clickable for keyboard users. However when the
sort behavior has been set to `"none"`, only the button element will be rendered
without the current sort icon to show that it is not currently sorted, but _can_
be.

If you do not like the default behavior of the sort icon and would like to style
the children and/or cell manually, you can set the `sortIcon` prop to `null` and
render your custom `children` instead.

The example below will show a possible way to implement a sortable table with
this behavior.
