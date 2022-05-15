`DropdownMenu`s can be nested to create complex cascading menus by rendering a
`DropdownMenu` as a child of another `DropdownMenu`. This will render the
`DropdownMenu` as a `MenuItem` instead of a button and change up some available
props/functionality. The `DropdownMenu` will now accept `ListItem` props instead
of `Button` props and the some keyboard functionality will change:

- when the menu is rendered horizontally, pressing the `ArrowDown` key will open
  the submenu and focus the first item. Pressing the `ArrowUp` key will close
  the submenu and return focus to the `MenuItem`
- when the menu is rendered vertically, pressing the `ArrowRight` key will open
  the submenu and focus the first item. Pressing the `ArrowLeft` key will close
  the submenu and return focus to the `MenuItem`.
- pressing the `Escape` key will only close the top-most menu and return focus
  to the `MenuItem`

Clicking a `MenuItem` that does not open a submenu will close all visible menus
unless `event.stopPropagation()` is called.
