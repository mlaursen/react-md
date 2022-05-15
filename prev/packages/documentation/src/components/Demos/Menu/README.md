Menus within `react-md` can be created by using the following components:

- `DropdownMenu` - a nice default implementation that renders a `<Button>` and a
  `<Menu>` together and handles the menu's visibility
- `MenuItem` - one of the actions inside of the `<Menu>`
- `MenuItemLink` - a `<Link>` specifically to be used inside of a `<Menu>`
- `MenuItemSeparator` - a `<Divider>` specifically to be used inside of a
  `<Menu>`
- `MenuItemGroup` - Render a `<ul role="group" aria-label="Accessible Label">`
  when rendering a group of related menu items together. This is generally used
  with the `MenuItemRadio` component.
- `MenuItemRadio` - Render a `<Radio>` as a `MenuItem`. Requires the #form
  package.
- `MenuItemCheckbox` - Render a `<Checkbox>` as a `MenuItem`. Requires the #form
  package.
- `MenuItemSwitch` - Render a `<Switch>` as a `MenuItem`. Requires the #form
  package.
- `MenuItemFileInput` - Render a `<FileInput>` as a `MenuItem`. Requires the
  #form package.
- `MenuItemTextField` - Render a `<TextField>` as a `MenuItem`. Requires the
  #form package.

In addition, menus have some built-in keyboard behavior:

- Pressing the `ArrowDown`/`ArrowUp` keys will focus the next/previous menu item
- Pressing the `Home`/`End` keys will focus the first/last menu item.
- Typing a letter will move focus to the next menu item that starts with that
  letter
- Pressing the `Escape`/`Tab` keys will close the menu
