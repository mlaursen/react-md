Since `react-md` might not have every component available for every single use
case, `@react-md/states` also provides a React hook: `useInteractionStates` that
allows you to add interaction states to any component. In order to use the hook,
you will also need to ensure that your component has `position: relative` as
well as using the `rmd-states-surface` mixin. The `position: relative` is so
that the different states can be contained within your component and the
`rmd-states-surface` mixin will create the `::before` or `::after` tag within
your component so the different states can be applied.

The example below will show its usage in a custom button implementation.
