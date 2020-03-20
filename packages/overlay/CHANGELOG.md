# v2.0.0

This package is kind of new for the v2 release since the `Overlay` was never
actually a public component but the SCSS variables were public.

## New Features / Behavior

- the `Overlay` can be conditionally portalled
- the `Overlay` can be rendered as an invisible element to capture click
  behavior if desired
- the overlay opacity and background-color can are now themeable

### New SCSS Functions and Mixins

- `@function rmd-overlay-theme` - gets one of the theme values and validates
  that the theme name is valid
- `@function rmd-overlay-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-overlay-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-overlay-theme-update-var` - updates one of the theme values as a
  css variable

### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-overlay-z-index` to `$rmd-overlay-z-index`
- renamed `$md-overay-transition-time` to `$rmd-overlay-transition-duration`
- renamed `$md-overlay-color` to `$rmd-overlay-color`
