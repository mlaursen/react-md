Starting with `react-md@v5.0.0`, menus can behave like native operating system
menus by wrapping group of menus with a `MenuBar`. This will update each
`DropdownMenu` with the following functionality:

- In **mouse mode**, clicking on a `DropdownMenu` will display the menu like
  normal. If the user hovers over another `DropdownMenu` within the `MenuBar`,
  the current menu will hide and the `DropdownMenu` that is being hovered will
  be visible instead. This behavior will continue until:
  - a root level `DropdownMenu` is clicked
  - a `MenuItem` is clicked
  - an element outside of the `MenuBar` has been clicked
- In **keyboard mode**, the focus can change between the `DropdownMenu`s by
  using the `ArrowLeft`, `ArrowRight`, `Home`, and `End` keys. The user can also
  type the first letter of one of the `DropdownMenu` to move focus to that
  element. If the **menu is visible**, pressing the `ArrowLeft` or `ArrowRight`
  keys will: close the current menu, move focus to the previous or next
  `DropdownMenu`, and open that menu unless the current menu item has a submenu.
- In **touch mode**, there are no changes in behavior.

This functionality was a bit difficult to describe, so check out the demo below
to get a better understanding of the mouse and keyboard changes.

> You an see some more details around the menubar spec
> [here](https://www.w3.org/TR/wai-aria-practices/#menu).
