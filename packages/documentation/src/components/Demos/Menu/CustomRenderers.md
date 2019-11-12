It is possible to also use a custom renderer if you need more control over the
menu or menu item generation using the `menuRenderer` and/or `itemRenderer`
props. The `menuRenderer` will provide the base `Menu` props as the first
argument as well as the `items` list as the second argument. The `itemRenderer`
will provide the current item and the `key` to use for the item.

A great example for this would be using a library like
[react-virtualized](https://github.com/bvaughn/react-virtualized) to render a
giant list of items. When virtualizing the menu's list you will gain a giant
performance boost in the mounting and unmounting of the menu, but the built in
keyboard accessibility will be broken.

The keyboard movement and focus behavior only works for items that are currently
rendered in the DOM. Since it is now a virtual list, you will be unable to:

- use the arrow keys to focus wrap to the top and bottom of the menu
- use the home or end keys to focus the first or last item in the menu
- type letters to match an item in the menu.

This example below will show a non-virtualized and virtualized example to show
the performance differences between the two and some drawbacks/limitations to
the custom renderer.
