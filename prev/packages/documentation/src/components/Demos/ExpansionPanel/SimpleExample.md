When using an expansion panel, you'll normally have a list of two or more in a
list to dynamically show content as needed. Each `ExpansionPanel` requires:

- an `id` for a11y
- an `expanded` prop to determine if the content is currently expanded and
  visible
- an `onExpandedClick` prop to toggle the `expanded` state
- header content provided either with the `header` or a custom implementation
  with `customHeader` prop

The `usePanels` hook provided by this package will help generate these props for
you. The `usePanels` hook requires an `idPrefix` to generate unique ids for each
panel and a `count` for the total number of panels to generate props for. The
hook will also provide an `onKeyDown` event handler as the second item in the
returned array which should be passed to a parent DOM element (normally an
`ExpansionList`). When the `onKeyDown` handler is attached, the user can now
quickly jump from panel header to panel header with the up and down arrow keys
or to the first and last panels with the home and end keys.

Check out simple example below to see how these are used together.
