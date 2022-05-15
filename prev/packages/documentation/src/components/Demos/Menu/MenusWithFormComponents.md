The #form package includes some additional `MenuItem` components to render form
components within menus:

- `MenuItemGroup` - Render a `<ul role="group" aria-label="Accessible Label">`
  when rendering a group of related menu items together. This is generally used
  with the `MenuItemRadio` component.
- `MenuItemRadio` - Render a `<Radio>` as a `MenuItem`.
- `MenuItemCheckbox` - Render a `<Checkbox>` as a `MenuItem`.
- `MenuItemSwitch` - Render a `<Switch>` as a `MenuItem`.
- `MenuItemFileInput` - Render a `<FileInput>` as a `MenuItem`.
- `MenuItemTextField` - Render a `<TextField>` as a `MenuItem`.

These components are just wrappers that implement custom keyboard focus and
movement behavior to work within `Menu`s.

##### Updated Behavior

- All of these components will gain focus within the menu with normal menu
  keydown focus behavior.
  - The `MenuItemTextField` will only move focus to another `MenuItem` when it
    does not have a value so that the arrow keys can be used to move the
    location within the text field.
- Clicking a `MenuItemRadio`, `MenuItemCheckbox`, or `MenuItemSwitch` will only
  change the `checked` state and close the menu. You can disable this behavior
  by calling `event.stopPropagation()` in a custom `onClick` handler.
- Clicking a `MenuItemFileInput` will not close the menu so that custom file
  upload behavior can happen (like the `useFileUpload` hook).
- Clicking a `MenuItemTextField` will not close the menu and instead gain focus.
  - Pressing `Tab` or `Escape` while the `MenuItemTextField` is focused will
    still close the menu. You can prevent this behavior by implementing a custom
    `onKeyDown` event handler and calling `event.stopPropagation()`.
