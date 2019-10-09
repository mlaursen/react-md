Now that you've learned a bit about how to use the `Tree` component to render
simple trees, let's look at how we can customize how each item is rendered with
the `getItemProps` prop on the `Tree`.

This prop can be used to add additional styling or general `ListItem` props that
you'd like to not store in your tree and dynamically apply to each item. This
function will provide the current `item` merged with the `focused`, `selected`,
and `expanded` booleans representing the state of the item.

The example below will render a simple "code file tree" by dynamically applying
icons based on file types and overriding some styles when focused or selected.
