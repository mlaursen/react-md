This demo page will be a bit different than the others as it'll start with the
low-level components to help show the types of styles and configuration that is
available. Most of the demos will actually redirect you to a different page as
well since tables are _normally_ the main focal-point when used in an
application and require a bit more real estate.

Once the base components have been show and explained, the more advanced
`DataTable` component will be introduced that will help dynamically render your
tables with some convenience built in. We're starting with the low-level
components as it is not the goal of the `DataTable` to match 100% use-cases and
you'll probably need to fall back to the low level components for the more
complex workflows and apps.

A table is made up by the following components:

- `Table` -> `<table>`
- `TableHeader` -> `<thead>`
- `TableBody` -> `<tbody>`
- `TableFooter` -> `<tfooter>`
- `TableRow` -> `<tr>`
- `TableCell` -> `<th>` and `<td>`
- `Caption` -> `<caption>` _(you probably won't use this much)_

To help reduce some of the repeated code, boilerplate, and apply minimal
accessibility, the `TableCell` will be updated automatically depending on where
it was rendered. When a `TableCell` is rendered in a `TableHeader`, it'll
automatically update to be rendered as a `<th>` element instead of a `<td>`. In
addition, it'll apply a `scope="col"` to help screen readers out.

When the `TableCell` is rendered anywhere else, it'll default to the `<td>`
element unless the `header` prop is enabled. If the `header` prop is enabled
within the `TableBody`, it'll apply a `scope="row"` instead.
