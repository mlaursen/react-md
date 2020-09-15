# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/theme](../theme)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/theme](../theme)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/theme](../theme)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/theme](../theme)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/theme](../theme)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

### Bug Fixes

- [@react-md/theme](../theme): Fixed `rmd-theme-get-swatch` to loop over all
  `rmd-theme-colors` instead of the primaries only
  ([353de23](https://github.com/mlaursen/react-md/commit/353de2368f9aad74add60559bb6489692b1e2c62)),
  closes [#884](https://github.com/mlaursen/react-md/issues/884)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- Booleans in `dist/scssVariables`
  ([f6d43a3](https://github.com/mlaursen/react-md/commit/f6d43a31a13647e0b92c256975652913fb8bb34e))

### Features

- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added `sideEffects` field to `package.json`
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- `sideEffects` formatting
  ([78a7b6b](https://github.com/mlaursen/react-md/commit/78a7b6b0e40c7daefb749835670705f21bd21720))

## v2.0.1

No changes.

## v2.0.0

This package is new for the v2 release, but replaces and expands upon the
existing theming and color system in v1. Starting with v2, the theme has
built-in support for automatically attempting to fix color contrast ratios.

### New Features / Behavior

- completely new theming system that utilizes functions, mixins, and CSS
  variables (applies to other `react-md` packages as well)
- provides functions and mixins to check color contrast ratios and updates the
  default theme automatically
- new mixins to switch your app to the `light` or `dark` modes which can be used
  with the `prefers-color-scheme` media query to automatically adjust based on
  user OS settings

### Breaking Changes

- `color` and `background-color` class names can no longer be generated for you
  with a mixin

#### New SCSS Variables, Functions, and Mixins

- `$rmd-theme-no-css-variables-fallback: true !default` - Boolean if the main
  `@mixin rmd-theme` should no longer provide a fallback value when a css
  variable is not set.
- `$rmd-theme-define-colors-with-rgba: false !default` - Boolean if the light
  and dark theme colors should be created with `rgba` instead of `lighten`.
- `$rmd-theme-on-primary` - An accessible text color to use on top of the
  primary color
- `$rmd-theme-on-secondary` - An accessible text color to use on top of the
  secondary color
- `$rmd-theme-warning: $rmd-deep-orange-a-200 !default` - The color to use for a
  warning state.
- `$rmd-theme-on-warning` - An accessible text color to use on top of the
  warning color
- `$rmd-theme-on-error` - An accessible text color to use on top of the error
  color
- `$rmd-theme-success: $rmd-green-a-700 !default` - The color to use for a
  "successful" state.
- `$rmd-theme-on-success` - An accessible text color to use on top of the
  success color
- `$rmd-theme-light-surface: #fff !default` - The background color to use for
  elevated surfaces in the light theme
- `$rmd-theme-dark-surface: $rmd-grey-800 !default` - The background color to
  use for elevated surfaces in the dark theme
- `$rmd-theme-surface: if($rmd-theme-light, $rmd-theme-light-surface, $rmd-theme-dark-surface)` -
  The background color to use for elevated surfaces
- `$rmd-theme-default-contrast-ratio: 3 !default` - The default contrast ratio
  used for color accessibility
- `@function rmd-theme-tone` - determines if the provided color is `light` or
  `dark`
- `@function rmd-theme-contrast-tone` - determines if the contrast color should
  be `light` or `dark`
- `@function rmd-theme` - gets one of the theme values and validates that the
  theme name is valid
- `@function rmd-theme-var` - gets one of the theme values as a css variable
  with a fallback value and validates that the theme name is valid
- `@mixin rmd-theme` - applies one of the theme values to a css property as a
  css variable
- `@mixin rmd-theme-update-var` - updates one of the theme values as a css
  variable
- `@mixin rmd-theme-light` - Updates all the `@import`-ed `react-md` packages to
  use the light theme
- `@mixin rmd-theme-dark` - Updates all the `@import`-ed `react-md` packages to
  use the dark theme

#### Renamed SCSS Variables, Functions, and Mixins

- renamed all the color variables to be prefixed with `rmd` instead of `md`
- renamed `$md-light-theme` to `$md-theme-light`
- renamed `$md-primary-color` to `$rmd-theme-primary` and changed the default
  value from `$md-indigo-500` to `$rmd-purple-500`
- renamed `$md-primary-background-text-color` to `$rmd-theme-on-primary` and
  changed the default value to be automatically adjusted to be contrast
  compliant
- renamed `$md-error-color` to `$rmd-error-color`
- renamed `$md-secondary-color` to `$rmd-theme-secondary`
- renamed `$md-secondary-background-text-color` to `$rmd-theme-on-secondary` and
  changed the default value to be automatically adjusted to be contrast
  compliant
- renamed `$md-light-theme-background-color` to `$rmd-theme-light-background`
- renamed `$md-dark-theme-background-color` to `$rmd-theme-dark-background`
- renamed `$md-light-theme-text-color` to `$rmd-theme-light-primary-text-color`
  and changed the default value from `rgba($md-black-base, 0.87)` to
  `lighten($rmd-black-base, 13%)`
- renamed `$md-light-theme-secondary-text-color` to
  `$rmd-theme-light-secondary-text-color` and changed the default value from
  `rgba($md-black-base, 0.54)` to `lighten($rmd-black-base, 46%)`
- renamed `$md-light-theme-hint-text-color` to
  `$rmd-theme-light-hint-text-color` and changed the default value from
  `rgba($md-black-base, 0.38)` to `lighten($rmd-black-base, 66%)`
- renamed `$md-light-theme-disabled-text-color` to
  `$rmd-theme-light-disabled-text-color` and changed the default value from
  `rgba($md-black-base, 0.38)` to `lighten($rmd-black-base, 62%)`
- renamed `$md-light-theme-icon-text-color` to `$rmd-theme-light-icon-color` and
  changed the default value from `rgba($md-black-base, 0.54)` to
  `lighten($rmd-black-base, 46%)`
- renamed `$md-dark-theme-text-color` to `$rmd-theme-dark-primary-text-color`
  and changed the default value from `$md-white-base` to
  `darken($rmd-white-base, 15%)`
- renamed `$md-dark-theme-secondary-text-color` to
  `$rmd-theme-dark-secondary-text-color` and changed the default value from
  `rgba($md-white-base, 0.7)` to `darken($rmd-white-base, 30%)`
- renamed `$md-dark-theme-hint-text-color` to `$rmd-theme-dark-hint-text-color`
  and changed the default value from `rgba($md-white-base, 0.3)` to
  `darken($rmd-white-base, 50%)`
- renamed `$md-dark-theme-disabled-text-color` to
  `$rmd-theme-dark-disabled-text-color` and changed the default value from
  `rgba($md-white-base, 0.3)` to `darken($rmd-white-base, 50%)`
- renamed `$md-dark-theme-icon-text-color` to `$rmd-theme-dark-icon-color` and
  changed the default value from `rgba($md-white-base, 0.7)` to
  `darken($rmd-white-base, 30%)`
- renamed `$md-light-theme-colors` to `$rmd-theme-light-text-colors` and
- renamed `$md-dark-theme-colors` to `$rmd-theme-dark-text-colors`
- renamed `@function get-swatch` to `@function rmd-theme-get-swatch`

#### Removed SCSS Variables, Functions, and Mixins

- removed `$md-colors-include-class-names`
- removed `$md-colors-warn-md`
- removed `$md-primary-hover-opacity` since it is no longer used
- removed `$md-secondary-hover-opacity` since it is no longer used
- removed `$md-light-theme-status-bar-color`,
  `$md-dark-theme-status-bar-color`,`$md-light-theme-card-color`,
  `$md-dark-theme-card-color`, `$md-light-theme-app-bar-color` and
  `$md-dark-theme-app-bar-color`
- removed the `divider`, `background`, `hover`, and `toolbar` keys from the
  `$rmd-theme-light-text-colors` and `$rmd-theme-dark-text-colors` maps
- removed `@function get-color` since it was pretty worthless and
  `@function rmd-theme` or `@mixin rmd-theme` are preferred
- removed `@mixin react-md-colors` since it's preferred to use the new theme
  mixins instead of adding classes
- removed `@mixin react-md-theme-colors` since the new theming system will
  handle this automatically if using the `@mixin rmd-theme`
- removed `@mixin react-md-colors-hover` since the new theming system and user
  interaction behavior no longer requires this
- removed `@mixin react-md-color-class-name` and
  `@mixin react-md-color-class-names`
