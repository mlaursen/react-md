Menus within `react-md` can be created using the `DropdownMenu` component which
is a wrapper for the [lower level components](#lower-level-components) and
should work for most of your use cases. The menu will handle the visibility of
the menu and renders the button to show the menu, the menu itself, and all items
within the menu.

All the props provided to the `DropdownMenu` will be passed down to the `Button`
component so you can style your button like normal. To render dropdown items,
you must supply a list of items to the dropdown menu which will be rendered in
`MenuItem`s with the following logic by default:

- if it is false-ish, render `null` (so nothing)
- if it is the string "separator", render a `MenuItemSeparator`
- if it is an object that has `role="separator"`, render a `MenuItemSeparator`
  and pass the object as props.
- if it is a string, number, render it as the children of the `MenuItem`
  component.
- if it is a valid React element, **return it instead**.
- if it is an object, render it as the props for the `MenuItem`
