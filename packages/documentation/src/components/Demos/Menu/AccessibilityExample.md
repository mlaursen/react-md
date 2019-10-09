Menus within `react-md` are fully accessible for screen readers and keyboard
users. The menu can be opened in a few different ways:

- clicking on the menu button via mouse, touch, or keyboard (space or enter)
- using the up or down arrow keys

If the menu was opened with an up arrow key, the last item in the menu will be
focused initially while all the other event types will focus the first item.
While the menu is open, the user can navigate through the items by:

- using the up and down arrow keys
- using the end and home keys
- typing the letters for one of the menu items

The menu will also automatically have an `aria-labelledby="BUTTON_ID"` by
default since the `MenuButton` _normally_ describes the menu. If this is not the
case, you can provide your own `menuLabel` or `menuLabelledBy` props to
correctly label your menu.

> Just a reminder, if you render an icon `MenuButton`, you'll need to correctly
> provide an accessible label via `aria-label`, `aria-labelledby`, or add a
> screen reader visible only text within the button.
