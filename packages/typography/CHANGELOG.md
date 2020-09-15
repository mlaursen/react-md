# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/typography](../typography)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/typography](../typography)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/typography](../typography)

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

The typography package is kind of new for the v2 release since there weren't any
components beforehand for typography. This package exports three components:
`Text`, `TextContainer`, and `SrOnly`. The `Text` component can be used to
render any of the typography styles. The `TextContainer` component is used to
create a centered block of text that uses the recommended line-width for
legibility on different device sizes. Finally, the `SrOnly` component allows for
text to only be visible to screen readers.

In addition, the naming for the different typography styles have been renamed
for the updated Material Design guidelines for typography.

All the default typography styles can be configured by declaring global
variables that will be merged with the recommended values:

- `$rmd-typography-headline-1`
- `$rmd-typography-headline-2`
- `$rmd-typography-headline-3`
- `$rmd-typography-headline-4`
- `$rmd-typography-headline-5`
- `$rmd-typography-headline-6`
- `$rmd-typography-subtitle-1`
- `$rmd-typography-subtitle-2`
- `$rmd-typography-body-1`
- `$rmd-typography-body-2`
- `$rmd-typography-button`
- `$rmd-typography-caption`
- `$rmd-typography-overline`

### New Behavior and Features

- typography will never modify the default tags by default
- all typography styles are configurable in a SCSS Map
- persistent typography across all device sizes
- switched from `px` to `rem` and `em` for typography
- removed the default `transition-timing-function` that was applied to all
  elements and pseudo elements
- removed the default `min-width` and `font-size` on the `html`
- added a simpler "css reset" for the `html` and `body` that is in the
  [@react-md/utils] package now

### Breaking Changes

- removed the `react-md-typography-utilities` mixin
- removed all the SCSS placeholders
- every SCSS variable, function, and mixin has been renamed or removed

#### New SCSS Variables, Functions, and Mixins

- `$rmd-typography-text-container-breakpoint: 37.5rem !default` - breakpoint to
  use for switching the typography max line-length from mobile to desktop
- `$rmd-typography-font-weights` - a map of all the available font weights which
  can be overridden
- `$rmd-typography-default-font-weights: light regular medium bold !default` all
  the default available font weights
- `$rmd-typography-thin: 100 default` - the thin font weight value
- `$rmd-typography-black: 900 !default` - the darkest font weight value
- `@function rmd-typography-theme` - gets one of the theme values and validates
  that the theme name is valid
- `@function rmd-typography-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@function rmd-typography-value` - most likely mostly internal, but allows you
  to get one of the typography values based on the type
- `@mixin rmd-typography-theme` - applies one of the theme values to a css
  property as a css variable
- `@mixin rmd-typography-theme-update-var` - updates one of the theme values as
  a css variable
- `@mixin rmd-typography-value` - applies the specifified typography type to an
  element with an optional list of properties to use
- `@mixin rmd-typography-base` - applies the base typography to an element
- `@mixin rmd-typography` - the inverse of `rmd-typography-value` that will
  default to apply all styles to an element
- `@mixin rmd-text-container-base` - the default styles for creating a text
  container
- `@mixin rmd-text-container-auto`- generally used with the
  `rmd-text-container-base` mixin to automatically update the max line-width
  based on media size
- `@mixin rmd-text-overflow-ellispis` - updates a class name or selector so that
  long text will be overflown with an ellipsis

#### Renamed SCSS Variables, Functions, and Mixins

- `$md-font-family` was renamed to `$rmd-typography-font-family` but keeps the
  same default value of `Roboto, sans-serif`
- `$md-typography-max-line-length` was renamed and split into
  `$rmd-typography-mobile-max-line-length` and
  `$rmd-typography-desktop-max-line-length` with defaults of `17em` and `40em`
  respectively
- `$md-font-light` was renamed to `$rmd-typography-light`
- `$md-font-regular` was renamed to `$rmd-typography-regular`
- `$md-font-medium` was renamed to `$rmd-typography-medium`
- `$md-font-bold` was renamed to `$rmd-typography-bold`
- `$md-font-semibold` was renamed to `$rmd-typography-semi-bold` and changed the
  default value from `600` to `800`
- `host-google-font` was renamed to `rmd-typography-host-google-font`
- `host-material-icons` was renamed to `rmd-icon-host-google-icons` but is now
  part of the [@react-md/icon] package

#### Removed SCSS Variables and Mixins

- removed `$md-typography-extended` since global namespace is no longer touched
- removed `$md-typography-include-text-container` since it is always created now
  for the `TextContainer` component
- removed `$md-typography-include-utilities` since there are no longer any
  utilities
- removed the `$md-font-name` variable
- removed the `$md-html-min-width` variable
- removed all the old typography variables for the new naming conventions:
  - `$md-display-4-font-size`
  - `$md-display-4-line-height`
  - `$md-display-3-font-size`
  - `$md-display-3-line-height`
  - `$md-display-2-font-size`
  - `$md-display-2-line-height`
  - `$md-display-1-font-size`
  - `$md-display-1-line-height`
  - `$md-headline-font-size`
  - `$md-headline-line-height`
  - `$md-title-font-size`
  - `$md-title-line-height`
  - `$md-subheading-mobile-font-size`
  - `$md-subheading-desktop-font-size:`
  - `$md-subheading-2-line-height`
  - `$md-subheading-1-line-height`
  - `$md-body-mobile-font-size`
  - `$md-body-desktop-font-size`
  - `$md-body-2-line-height`
  - `$md-body-1-line-height`
  - `$md-caption-font-size`
- removed `$md-font-size-base` and `$md-line-height` variables
- removed the `react-md-typography-mobile`, `react-md-typography-desktop`, and
  `react-md-typography-media` mixins since the typography no longer changes
  based on device size
- removed the `react-md-theme-typography` mixin

[@react-md/icon]: https://github.com/mlaursen/react-md/tree/master/packages/icon
[@react-md/utils]:
  https://github.com/mlaursen/react-md/tree/master/packages/utils
