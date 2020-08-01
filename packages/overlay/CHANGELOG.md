# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/overlay

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/overlay

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package @react-md/overlay

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

This package is kind of new for the v2 release since the `Overlay` was never
actually a public component but the SCSS variables were public.

### New Features / Behavior

- the `Overlay` can be conditionally portalled
- the `Overlay` can be rendered as an invisible element to capture click
  behavior if desired
- the overlay opacity and background-color can are now themeable

#### New SCSS Functions and Mixins

- `@function rmd-overlay-theme` - gets one of the theme values and validates
  that the theme name is valid
- `@function rmd-overlay-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-overlay-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-overlay-theme-update-var` - updates one of the theme values as a
  css variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-overlay-z-index` to `$rmd-overlay-z-index`
- renamed `$md-overay-transition-time` to `$rmd-overlay-transition-duration`
- renamed `$md-overlay-color` to `$rmd-overlay-color`
