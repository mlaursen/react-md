A select field is called a Dropdown Button in the
[material design specs](https://www.google.com/design/spec/components/buttons.html#buttons-dropdown-buttons).

Select Fields have been built to have screen reader and keyboard accessibility.

When selecting an item with the keyboard, a user can press the up or down arrow keys to open the list
of menu items and then navigate with the up or down arrow keys to find their match. The item can then
be selected by pressing enter.

The user can also start typing to attempt to match with a menu item. If the menu is closed while typing,
the first and best match will be selected automatically. If the menu is open while the user is typing,
the best match will be highlighted and require the user to press enter to select that value.

To cancel a selection, the user can either tab away from the select field or press the escape key.

The screen reader accessibility has been implemented with using the `aria-` attributes and specific ids.
It is required to have a unique id for the select field.
