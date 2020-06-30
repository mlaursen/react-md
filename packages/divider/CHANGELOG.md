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
