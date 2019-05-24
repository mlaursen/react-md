It is possible to also use a custom renderer if you need more control over the
menu or menu item generation using the `menuRenderer` and/or `itemRenderer`
props. The `menuRenderer` will provide the base `Menu` props as the first
argument as well as the `items` list as the second argument. The `itemRenderer`
will provide the current item and the `key` to use for the item.

A great example for this would be using a library like
[react-virtualized](https://github.com/bvaughn/react-virtualized) to render a
giant list of items. When virtualizing the menu's list you will gain a giant
performance boost in the mounting and unmounting of the menu, but there are a
few drawbacks:

###### 1. Broken `onItemClick`<!-- no-margin -->

The `onItemClick` function will no longer guaranteed to return the correct item
as the first argument anymore since it relies on **visible** items to determine
which item in the `items` list is clicked. Luckily, this can be fixed by adding
the required accessibility props for virtual lists and using the `itemElement`
provided in the callback. When you have a feed or lazy-loading items, you will
need to add the `aria-setsize` and `aria-posinset` attributes to each item so
that assistive technologies know that there are more items available. Adding the
`aria-posinset` actually works great for us as well since you can now determine
the position in the `items` list since the index is persisted to the DOM.

###### 2. Keyboard Movement<!-- no-margin -->

The keyboard movement and focus behavior only works for items that are currently
rendered in the DOM. Since it is now a virtual list, you will be unable to:

- use the arrow keys to focus wrap to the top and bottom of the menu
- use the home or end keys to focus the first or last item in the menu
- type letters to match an item in the menu.

This example below will show a non-virtualized and virtualized example to show
the performance differences between the two and some drawbacks/limitations to
the custom renderer.
