The `Menu` component is used to display a list of items in a temporary sheet once
it has been toggled open by a button or some other input. Starting from 1.1.0, the
`Menu` component uses the [Layover](/components/helpers/layovers) component behind
the scenes, so it can automatically attempt to position the menu in the viewport.
This feature is **disabled by default** to keep backwards compatibility, but can be
enabled by enabiling the `simplified` prop.

There are 3 types of menus included by default in `react-md`:

#### Menu
The menu is the lowest level component. It will require all control to be provided
by the developer about if the menu should be visible and how it should be toggled.

#### DropdownMenu
This is a simple wrapper with the `Menu` component so that the overhead of setting
the visibility can be abstracted away. This will render whatever chldren as a toggle
component for the `Menu` and display a `List` of the `items` provided.

#### MenuButton
This is a simple wrapper of the `DropdownMenu` component that defaults to being displayed
as a button. All the props from `Button` as well as the `DropdownMenu` are available.

The examples below will display in reverse order of complexity for usage.
