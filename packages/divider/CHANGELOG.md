# v2.0.2

### Bug Fixes

- **LICENSE:** Fixed the LICENSE to not have a year range
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added sideEffects field to package.json
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
  and
  ([78a7b6b](https://github.com/mlaursen/react-md/commit/78a7b6b0e40c7daefb749835670705f21bd21720))

# v2.0.1

No changes.

# v2.0.0

The `Divider` component was completely re-written for this release, but it
should not be a breaking change. This package now also has better support for
rendering dividers vertically with the `VerticalDivider` component.

## New Behavior and Features

- the `ref` is now correctly passed to the DOM element
- the `role` has been specifically set to `"separator"` by default
- the vertical divider behavior now has "better" support with a new
  `VerticalDivider` component
- the dividers can now be configured using CSS variables for the
  `background-color`, `size`, `inset`, `spacing`, `vertical-spacing`, and
  `max-size`

## Breaking Changes

- only styling behavior

### New SCSS Variables, Functions, and Mixins

- `$rmd-divider-max-size: 100% !default` - The max size for a divider that can
  be used to make all dividers centered if desired
- `$rmd-divider-spacing: 0.25rem auto !default` - the amount of margin to apply
  to a horizontal divider
- `$rmd-divider-vertical-spacing: auto 0.25rem !default` - the amount of margin
  to apply to a vertical divider
- `$rmd-divider-inset: 4rem !default` - The amount of spacing to use as
  `margin-left` for an inset divider. This will automatically be swapped to
  `margin-right` for right-to-left languages
- `$rmd-divider-background-color-on-light: rgba($rmd-black-base, 0.12) !default` -
  The background color for a divider in light themes
- `$rmd-divider-background-color-on-dark: rgba($rmd-white-base, 0.12) !default` -
  The background color for a divider in dark themes
- `$rmd-divider-background-color: if(rmd-theme-tone($rmd-theme-background) == light, $rmd-divider-background-color-on-light, $rmd-divider-background-color-on-dark) !default` -
  the default background color for dividers
- `@function rmd-divider-theme` - gets one of the theme values and validates
  that the theme name is valid
- `@function rmd-divider-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-divider-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-divider-theme-update-var` - updates one of the theme values as a
  css variable
- `@mixin rmd-divider-border` - creates a divider for an element using border
  styles
- `@mixin rmd-divider` - a mixin to generate all the divider styles for a class
  name selector

### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-divider-height` to `$rmd-divider-size`

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-divider-include-borders` since the border class names are no
  longer included and the new `rmd-divider-border` mixin should be used instead
- removed `react-md-divider-borders` since the border class names are no longer
  provided by default
- removed `react-md-theme-dividers` and `react-md-theme-divider-borders` since
  this is now handled automatically or with the new
  `rmd-divider-theme-update-var` mixin
