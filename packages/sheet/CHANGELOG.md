# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package @react-md/sheet

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/sheet

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/sheet

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

This package is the new version of the `Drawer` component from v1 that is no
longer really used for layout and app size.

### New Features / Behavior

- relies on the `AppSizeListener` from [@react-md/utils] to determine the app
  size
- fixed the accessibility issues and now handles automatic focus changes when
  changing visibility
- fixed the accessibility issues and now defaults to being rendered as a
  `dialog`, but can also be rendered as a `menu` or `none`
- supports being rendered at the `top`, `right`, `bottom`, and `left` of the
  page instead of only right and left
- new sizing behavior that can be configured horizontally or vertically
- no longer needs to be unmounted while invisible to create a persistent sheet
  off-screen
- renders as a `<div>` instead of an `<aside>` since that was the wrong element
  anyways
- the width will be the same when rendered to the `left` or `right` of the
  viewport
- added the ability to theme the width and height with CSS variables and mixins

### Breaking Changes

- no longer supports the mini variants but will be added in a later release
- no longer has the `getCurrentMedia` and `matchesMedia` static methods
- no longer handles controlling the current app size
- no longer renders as the `Paper` component since it was removed and has no
  `zDepth` prop
- no longer renders `navItems`

#### New SCSS Variables, Functions, and Mixins

- `$rmd-sheet-z-index: 5` - The z-index for a sheet that appears inline with
  other content
- `$rmd-sheet-overlay-z-index: $rmd-sheet-raised-z-index - 1 !default` (`16`) -
  The z-index for the sheet's overlay
- `$rmd-sheet-elevation: 2 !default` - The elevation to use for the sheet when
  rendered inline with other content
- `$rmd-sheet-elevation: 16 !default` - The elevation to use for the sheet when
  rendered as a temporary element
- `$rmd-sheet-touch-width: calc(100vw - #{$rmd-sheet-touch-margin}) !default` -
  The width for a sheet on touch devices that should fill up as much space as
  possible
- `$rmd-sheet-static-width: 16rem !default` - The width for a sheet that does
  not change size based on content. This is _kind_ of like the new
  `$md-drawer-tablet-width` and `$md-drawer-desktop-width`
- `$rmd-sheet-max-height: 100% !default` - the max height for a sheet rendered
  to the top or bottom of the viewport
- `$rmd-sheet-touchable-max-height: calc(100% - #{$rmd-sheet-touch-margin}) !default` -
  The max height for a sheet that has a "touchable" area that can be clicked to
  close
- `$rmd-sheet-recommended-max-height: 50% !default` - The material design
  recommended max-height for a sheet rendered at the top or bottom of the
  viewport
- `$rmd-sheet-enabled-positions: top right bottom left !default` - A list of the
  positions that should generate styles. You can maybe save a few bytes by
  removing the positions that aren't used in your app
- `$rmd-sheet-scrollable-padding: 3.25rem !default` - The amount of padding tp
  use before the first tab when the `scrollable` prop is enabled on the `sheet`
  component
- `@function rmd-sheet-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-sheet-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-sheet-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-sheet-theme-update-var` - updates one of the theme values as a css
  variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-sheet-z-index` to `$rmd-sheet-raised-z-index` and changed the
- `$md-sheet-transition-time` was split into two variables
  `$rmd-sheet-enter-duration` and `$rmd-sheet-leave-duration` and changed the
  default duration from `0.3s` to `0.2s` and `0.15s`
- renamed `$md-sheet-mobile-margin` to `$rmd-sheet-touch-margin` and changed the
  default value from `56px` to `3.5rem`

#### Removed SCSS Variables and Mixins

- removed `$md-drawer-mobile-max-width`
- removed `$md-drawer-mobile-mini-width`, `$md-drawer-desktop-mini-width`,
  `$md-drawer-mobile-mini-item-padding`, and
  `$md-drawer-desktop-mini-item-padding` since mini drawers aren't supported
  again yet
- removed `$md-drawer-desktop-left-max-width` since there is no difference when
  rendering at the left or right anymore

[@react-md/utils]:
  https://github.com/mlaursen/react-md/tree/master/packages/utils
