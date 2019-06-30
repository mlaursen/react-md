# v2.0.0-alpha.0

This package was completely re-written to fix some accessibility issues, so
migration might be a bit difficult.

## Breaking Changes

Almost everything was a breaking change so I won't list out everything here
other than a few noteworthy changes. See the new features section below instead.

- The `MenuButton` component is no longer a wrapper of the `Button` + `Menu`
  components and is just an accessibility fix of the `Button` to work with
  `Menu`s.
- The provided components **no longer support relative positioning out of the
  box**. The menu will now be fixed within the viewport instead
- the `visible` prop no longer exists and can't be controlled. This might be
  changed before the full v2 release though

## New Features

There are now multiple components exported to help create menus as well as
reasonable defaults with the `DropdownMenu` component.

### Accessibility Fixes

The a11y props were moved from the surrounding `<div>` and instead applied
correctly to the `MenuButton` instead. This also changed the `aria-haspopup`
attribute to be `"menu"` instead of `"true"` and removed the `aria-controls`
since it doesn't really work as expected.

Additional keyboard behavior was also added to both the `MenuButton` and `Menu`
components. When the `MenuButton` is focused, the `ArrowUp` key will open the
menu and focus the last `MenuItem` while the `ArrowDown` key will open the menu
and focus the first `MenuItem`. The user can now also type while the menu is
open to focus specific items that start with the same letters.

The `Menu` now also requires the `aria-label` or `aria-labelledby` props to help
screen readers out as well as applying `role="menu"` and
`aria-orentation="vertical"` (or `"horizontal"`).
