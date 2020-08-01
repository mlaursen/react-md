# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/chip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/chip

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

The chip package was completely re-written with Typescript and additional
theming support for the v2 release.

### New Behavior and Features

- supports a new `"outline"` theme along with the old `"solid"` theme
- supports rendering as a checkbox/radio component with a new `selected` state
  that includes a customizable icon
- supports rendering a `CircularProgress` bar as the `leftIcon`
- automatically updates padding and spacing for right-to-left languages
- supports updating all the sizing, spacing, and colors through css variables
  with the new theme functions and mixins
- renders as a [toggle button](https://www.w3.org/TR/wai-aria-practices/#button)

### Breaking Changes

- everything related to styling and props for the chip
- no longer supports a dense spec out of the box since they are already pretty
  dense

#### New SCSS Variables, Functions, and Mixins

- `$rmd-chip-disable-focus-background-color: $rmd-states-use-focus-shadow !default` -
  boolean if the chip should disable the background-color change when it gains
  keyboard focus. This is disabled by default since the focus-shadow looks a bit
  nicer than the background-color changes due to the color of chips
- `rmd-chip-border-radius: 1rem !default` - the new border radius to apply to
  chips
- `$rmd-chip-small-spacing: 0.25rem !default` - the amount of spacing to use
  between the left edge and the leading icon/avatar in a chip
- `$rmd-chip-medium-spacing: 0.5rem !default` - the amount of spacing to use
  between the leading icon/avatar and the chip's main content/text and the
  trailing icon
- `$rmd-chip-large-spacing: 0.75rem !default` - the amount of spacing to use for
  the chip's edge when there are no leading or trailing addons/icons.
- `$rmd-chip-icon-size: 1.125rem !default` - the size to use for icons that
  appear as a child of the chip
- `$rmd-chip-avatar-size: 1.5rem !default` - the size to use for avatars that
  appear as a child of the chip
- `$rmd-chip-progress-size: $rmd-chip-icon-size !default` - the size for a
  circular progress within a chip
- `$rmd-chip-progress-width: 12 !default` - the `stroke-width` to use for the
  circular progress within a chip
- `$rmd-chip-themed-background-color: rmd-theme-get-swatch($rmd-theme-primary, 300, false, darken($rmd-theme-primary, 20%)) !default` -
  the background-color to use for the selected and themed state of the chip
- `$rmd-chip-themed-color: if(rmd-theme-tone($rmd-chip-themed-background-color) == light, $rmd-black-base, $rmd-white-base) !default` -
  The text color to use for the selected and themed state of the chip
- `$rmd-chip-solid-light-disabled-background-color: $md-grey-100 !default` - the
  background color to use for a solid disabled chip when using the light theme
- `$rmd-chip-solid-dark-disabled-background-color: lighten($rmd-grey-900, 2%) !default` -
  the background color to use for a solid disabled chip when using the dark
  theme
- `$rmd-chip-solid-background-color: if($rmd-theme-light, $rmd-chip-solid-light-background-color, $rmd-chip-solid-dark-background-color) !default` -
  the default background color for solid themed chips
- `$rmd-chip-solid-color: if($rmd-theme-light, $rmd-chip-solid-light-color, $rmd-chip-solid-dark-color) !default` -
  the default color for solid themed chips
- `$rmd-chip-solid-disabled-background-color: if($rmd-theme-light, $rmd-chip-solid-light-disabled-background-color, $rmd-chip-solid-dark-disabled-background-color) !default` -
  the default background-color to use for disabled solid chips
- `$rmd-chip-outline-light-background-color: $rmd-theme-light-surface !default` -
  the background-color to use for an outlined chip when using the light theme
- `$rmd-chip-outline-light-color: if($rmd-theme-tone($rmd-chip-outline-light-background-color) == light, $rmd-black-base, $rmd-white-base) !default` -
  the text color to use for an outlined chip when using the light theme
- `$rmd-chip-outline-dark-background-color: $rmd-theme-dark-surface !default` -
  the background-color to use for an outlined chip when using the dark theme
- `$rmd-chip-outline-dark-color: if($rmd-theme-tone($rmd-chip-outline-dark-background-color) == dark, $rmd-black-base, $rmd-white-base) !default` -
  the text color to use for an outlined chip when using the dark theme
- `$rmd-chip-outline-background-color: if($rmd-theme-light, $rmd-chip-outline-light-background-color, $rmd-chip-outline-dark-background-color) !default` -
  the default background-color to use for an outlined chip
- `$rmd-chip-outline-color: if($rmd-theme-light, $rmd-chip-outline-light-color, $rmd-chip-outline-dark-color) !default` -
  the default color to use for an outlined chip
- `$rmd-chip-outline-border-color: $rmd-grey-300 !default` - the border color to
  use for an outline themed chip
- `$rmd-chip-box-shadow: inset 0 0 0 1px !default` - the base box-shadow to
  apply to chips when outlined
- `@function rmd-chip-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-chip-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-chip-theme` - applies one of the theme values to a css property as
  a css variable
- `@mixin rmd-chip-theme-update-var` - updates one of the theme values as a css
  variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-chip-height` to `$rmd-chip-height` and changed the default value
  from `32px` to `2rem`
- renamed `$md-chip-light-theme-color` to `$rmd-chip-solid-light-color` and
  changed the default value from `rgba($md-black-base, 0.87)` to
  `if(rmd-theme-tone($rmd-chip-solid-light-background-color) == light, $rmd-black-base, $rmd-white-base)`
- renamed `$md-chip-light-theme-bg-color` to
  `$rmd-chip-solid-light-background-color`
- renamed `$md-chip-dark-theme-color` to `$rmd-chip-solid-dark-color` and
  changed the default value from `get-color(secondar, false)` to
  `if(rmd-theme-tone($rmd-chip-solid-dark-background-color) == light, $rmd-black-base, $rmd-white-base)`
- renamed `$md-chip-dark-theme-bg-color` to `$rmd-chip-dark-background-color`
  and changed the default value from `$md-grey-600` to `$rmd-grey-900`

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-chip-include-remove` since it's no longer required
- removed `$md-chip-include-avatar` since it's no longer required
- removed `$md-chip-include-contact` and `$md-chip-contact-font-size` since this
  never really worked anyways
- removed `$md-chip-font-size` since it's no longer configurable out of the box
- removed `$md-chip-icon-color` since it's no longer required
- removed `$md-chip-default-padding`, `$md-chip-avatar-left-padding`,
  `$md-chip-icon-padding`, and `$md-chip-icon-dense-padding` since the padding
  was changed to spacing
- removed `@mixin react-md-theme-chips` since it was replaced with the new
  theming api
