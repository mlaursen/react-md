Ok... I must admit that the example above was not super exciting but it helped
set a baseline for what tables look like. To help with some additional styling,
tables can be configured to:

- disable row hover behavior with `disableHover`
- disable row border behavior with `disableBorders`
- allow line-wrapping with the `lineWrap` prop (can be a boolean or `"padded"`)
- change the default horizontal and vertical alignments with the `hAlign` and
  `vAlign` props (respectively)

In addition, there is a decent amount of "inheritance" for these styles that
comes into play within tables. These styles can be defined and/or overridden
from the following components:

- `Table`
- `TableHeader`
- `TableBody`
- `TableFooter`
- `TableRow`
- `TableCell`

where the precedence is in reverse order. For example, if the `Table` component
set the `hAlight="right"` prop and a `TableCell` set `hAlign="center"`, the
`TableCell` would still center it's text while all other table cells would be
right aligned.

The `Table` component also allows for a `fullWidth` prop which will make it
expand to always be the same width as the container element or enabling a
`dense` spec that decreases the height of each cell. However, something you'll
notice is that the `Table` component is not responsive by default and will
overflow the container element if the content is too wide. This can be "fixed"
by wrapping the `Table` in the `TableContainer` element, enabling
`overflow: auto` on a parent element, enabling line wrapping, or setting a
`width` on columns that you'd like to overflow.

This might not make too much sense immediately since it's a giant wall of text,
so play with the example below and the different configurations to show how this
applies.
