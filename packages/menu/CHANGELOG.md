# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package @react-md/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Features

- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added sideEffects field to package.json
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- sideEffects formatting
  ([78a7b6b](https://github.com/mlaursen/react-md/commit/78a7b6b0e40c7daefb749835670705f21bd21720))

## v2.0.1

No changes.

## v2.0.0

The menu package was completely re-written to fix all the accessibility issues
and keyboard focus behavior.

The main exports starting in v2:

- `DropdownMenu`
- `MenuItem`
- `MenuItemLink`
- `MenuItemSeparator`
- `DropdownMenuItem`
- `defaultMenuRenderer`
- `defaultMenuItemRenderer`
- `useContextMenu`

### New Features / Behavior

- the menu will now automatically position itself within the viewport with fixed
  positioning
- implemented custom context menus with a new `useContextMenu` hook
- nested dropdown menus are fully supported along with keyboard movement and
  open/close behavior
- no longer use the `menuItem` props and instead render the `MenuItem` component
  instead within the `DropdownMenu`
- no longer uses the weird `Layover` component

### Breaking Changes

- the visibility for the menus can no longer be controlled externally. this
  functionality will come back in a later release
- the menu no longer supports relative positioning
- the `MenuButton` is no longer a combination of a `Button` and a `Menu` and
  instead is an accessibility helper component

#### New SCSS Variables, Functions, and Mixins

- `$rmd-menu-background-color: rmd-theme-var(surface) !default` - The background
  color to use in menus
- `$rmd-menu-color: rmd-theme-var(on-surface) !default` - The text color to use
  in menus
- `$rmd-menu-elevation: 8 !default` - The elevation/box shadow to use for the
  menu
- `@function rmd-menu-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-menu-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-menu-theme` - applies one of the theme values to a css property as
  a css variable
- `@mixin rmd-menu-theme-update-var` - updates one of the theme values as a css
  variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-menu-z-index` to `$rmd-menu-z-index` and changed the default
  value from `null` (`100` from `Layover`) to `11`
- renamed `$md-menu-min-width` to `$rmd-menu-min-width` and changed the default
  value from `112px` to `7rem`

#### Removed SCSS Variables and Mixins

- removed `$md-menu-include-cascading`, `$md-menu-include-cascading-styles`,
  `$md-menu-cascading-font-size`, `$md-menu-cascading-padding`,
  `$md-cascading-height` and `$md-menu-cascading-list-padding` since the
  cascading/nested menus was completely reworked and no longer needs additional
  styles
- removed all other SCSS variables relating to height and width

#### Accessibility Fixes

The accessibility props were moved from the surrounding `<div>` and instead
applied correctly to the `MenuButton` instead. This also changed the
`aria-haspopup` attribute to be `"menu"` instead of `"true"` and removed the
`aria-controls` since it doesn't really work as expected.

Additional keyboard behavior was also added to both the `MenuButton` and `Menu`
components. When the `MenuButton` is focused, the `ArrowUp` key will open the
menu and focus the last `MenuItem` while the `ArrowDown` key will open the menu
and focus the first `MenuItem`. The user can now also type while the menu is
open to focus specific items that start with the same letters.

The `Menu` now also requires the `aria-label` or `aria-labelledby` props to help
screen readers out as well as applying `role="menu"` and
`aria-orentation="vertical"` (or `"horizontal"`).
