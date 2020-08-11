# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package @react-md/badge

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/badge

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/badge

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package @react-md/badge

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

This release has introduced two additional components: `BadgeContainer` and
`BadgedButton`. The `BadgedButton` is the closest thing to the old `Badge`
component but it always renders as a `Button` instead. The `BadgeContainer` is a
small wrapper component to add basic styles to allow a `Badge` to be positioned
relative to another component.

### New Behavior and Features

- the `Badge` now renders as a `<span>` instead of a `<div>`
- the `ref` is now correctly forwarded to the DOM element
- added a new `BadgeContainer` component for styling a `Badge` relative to
  another element
- added a new `BadgedButton` for convenience for adding a `Badge` to a `Button`
- badges are always circular without additional styles
- the badge's size, colors, and positioning can now be styled with the new theme
  API and CSS variables
- the badge's positioning automatically updates for right-to-left languages

### Breaking Changes

- the `max` prop no longer exists and the `Badge` will no longer automatically
  change a number greater than a specific threshold into `${max}+`
- `component` prop was removed so the `Badge` can only be rendered as a `<span>`
- the `primary`, `secondary`, and `default` props were removed in favor of the
  new `theme` prop
- the `circular` prop was removed since badges will always be rendered as a
  circle now
- `invisibleOnZero` was renamed to `disableNullOnZero`
- the multiple `"default"` themes were removed and there is only one `"default"`
  theme now
- the badge will no longer be offset from the parent element by default

#### New SCSS Variables, Functions, and Mixins

- `$rmd-badge-default-background-color: rgba($rmd-black-base, 0.2) !default` -
  the background-color to use for the `"default"` theme
- `$rmd-badge-default-color: rmd-theme-tone($rmd-badge-default-background-color) == light, $rmd-black-base, $rmd-white-base) !default` -
  the text color to use for the `"default"` theme

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-badge-top` to `$rmd-badge-offset-top` and changed the default
  value from `-8px` to `0`
- renamed `$md-badge-right` to `$rmd-badge-offset-right` and changed the default
  value from `-8px` to `0`
- renamed `$md-badge-circular-border-radius` to `$rmd-badge-border-radius`
- renamed `$md-badge-circular-font-size` to `$rmd-badge-font-size` and changed
  the default value from `10px` to `0.625rem`
- renamed `$md-badge-circular-height` and `$md-badge-circular-width` to
  `$rmd-badge-size` and changed the default value from `24px` to `1.5rem`
- `@function rmd-badge-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-badge-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-badge-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-badge-theme-update-var` - updates one of the theme values as a css
  variable

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-badge-include-circular` since badges are always circular going
  forward
- removed `$md-badge-include-default` since the default theme can be disabled by
  setting the `$rmd-badge-default-color` to `null`
- removed `$md-badge-bottom` and `$md-badge-left` since they are no longer
  needed
- removed `$md-bage-light-theme-default-color` and
  `$md-badge-dark-theme-default-color` since they are no longer used
- removed `react-md-theme-badges` since it is no longer required
