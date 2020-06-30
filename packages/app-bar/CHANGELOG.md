# v2.0.1

No changes.

# v2.0.0

This package is a replacement of the old `Toolbar` component in `v1` that has
now been separated into multiple components for additional customization.

Now exports:

- `AppBar`
- `AppBarTitle`
- `AppBarNav`
- `AppBarAction`

## New Behavior and Features

- now exports multiple components for rendering an `AppBar`
- now supports right-to-left languages out of the box to update margin and
  padding as needed
- can now be rendered at the bottom of the page
- better support for prominent sizing with nested `AppBar`s for rows
- slightly better support for automatic color inherit logic for `AppBar`
  specific components (means other components won't inherit the color
  automatically by default)
- the height no longer changes on mobile and tablet devices depending on if its
  orientation
- automatically updates the theme colors to have accessible text
- now supports multiple themes: `"primary"`, `"secondary"`, and `"default"`

## Breaking Changes

- the sizing behavior was updated to use a `height` prop instead of multiple
  boolean flags
- the `AppBar` no longer supports the `nav`, `title` `actions`, `actionLeft`,
  and `actionRight` props since they are new components that should be used as
  `children` of the `AppBar`
- no longer supports the `titleMenu` props since it is no longer required

### New SCSS Variables, Functions, and Mixins

- `$rmd-app-bar-fixed-elevation: 2 !default` - the material design elevation
  (box-shadow) to apply when an `AppBar` is fixed to the top or bottom of the
  page
- `$rmd-app-bar-height: 3.5rem !default` - the default height for the app bar
- `$rmd-app-bar-dense-height: 3rem !default` - the dense height for the app bar
- `$rmd-app-bar-prominent-height: $rmd-app-bar-height * 2 !default` - the
  prominent height for the app bar
- `$rmd-app-bar-prominent-dense-height: $rmd-app-bar-dense-height * 2 !default` -
  the prominent and dense height for the app bar
- `$rmd-app-bar-nav-margin: $rmd-app-bar-keyline - (($rmd-button-icon-size - $rmd-icon-size) / 2)` -
  the amount of margin to apply to the `AppBarNav``
- `$rmd-app-bar-keyline: 1rem !default` - the default keyline to use for either
  the `AppBarNav` or `AppBarTitle` to align with other content on the page
- `$rmd-app-bar-lr-margin: 0.25rem !default` - the amount of margin to apply to
  the first and last elements in the `AppBar`
- `$rmd-app-bar-primary-background-color: rmd-theme-var(primary) !default` - the
  "primary" theme background-color
- `$rmd-app-bar-primary-color: rmd-theme-var(on-primary) !default` - the
  "primary" theme text color
- `$rmd-app-bar-secondary-background-color: rmd-theme-var(secondary) !default` -
  the "secondary" theme background-color
- `$rmd-app-bar-secondary-color: rmd-theme-var(on-secondary) !default` - the
  "secondary" theme text color
- `$rmd-app-bar-default-light-theme-background-color: $rmd-grey-100 !default` -
  the background color to use for the "default" theme on light themed apps
- `$rmd-app-bar-default-light-theme-color: if(rmd-theme-tone($rmd-app-bar-default-light-theme-background-color) == light, $rmd-black-base, $rmd-white-base) !default` -
  the text color to use for the "default" theme on light themed apps
- `$rmd-app-bar-default-dark-theme-background-color: $rmd-grey-900 !default` -
  the background color to use for the "default" theme on dark themed apps
- `$rmd-app-bar-default-dark-theme-color: if(rmd-theme-tone($rmd-app-bar-default-dark-theme-background-color) == light, $rmd-black-base, $rmd-white-base) !default` -
  the background color to use for the "default" theme on dark themed apps
- `$rmd-app-bar-default-background-color: if(rmd-theme-tone($rmd-theme-background) == light, $rmd-app-bar-default-light-theme-background-color, $rmd-app-bar-default-dark-theme-background-color) !default` -
  the background color to use for the "default" theme
- `$rmd-app-bar-default-color: if(rmd-theme-tone($rmd-app-bar-default-background-color) == light, $rmd-app-bar-default-light-theme-color, $rmd-app-bar-default-dark-theme-color) !default` -
  the text color to use for the "default" theme
- `@function rmd-app-bar-theme` - gets one of the theme values and validates
  that the theme name is valid
- `@function rmd-app-bar-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-app-bar-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-app-bar-theme-update-var` - updates one of the theme values as a
  css variable
- `@mixin rmd-app-bar-offset($property: padding-top, $height-type: height)` - a
  mixin that can be used to apply one of the app bar's height types as a css
  property

### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-toolbar-z-index` to `$rmd-app-bar-z-index` and changed the
  default value from `15` to `10`
- renamed `$md-toolbar-title-keyline` to `$rmd-app-bar-title-keyline` and
  changed the default value from `null` to `4.5rem`

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-toolbar-include-themed` since it is no longer required
- removed `$md-toolbar-include-prominent` since it is no longer required
- removed `$md-toolbar-include-btn-text`, `$md-toolbar-btn-keyline`,
  `md-toolbar-mobile-btn-keyline`, `md-toolbar-tablet-btn-keyline`, and
  `md-toolbar-desktop-btn-keyline` since they are no longer required
- removed `$md-toolbar-include-text-fields` since it is no longer required
- removed `$md-toolbar-include-autocomplete` since it is no longer required
- removed `$md-toolbar-include-select-field`, `$md-toolbar-select-field-margin`,
  `$md-toolbar-mobile-select-field-margin`,
  `$md-toolbar-tablet-select-field-margin`,
  `$md-toolbar-tablet-landscape-select-field-margin`, and
  `$md-toolbar-desktop-select-field-margin` since they are no longer required
- removed `$m-toolbar-relative-padding` and
  `$md-toolbar-include-relative-padding-class-names` since the functionality was
  changed
- removed `$md-toolbar-inset-margin` since it is no longer required
- removed `$md-toolbar-mobile-title-keyline`,
  `$md-toolbar-tablet-title-keyline`, and `$md-toolbar-desktop-title-keyline`
  since they are no longer required
- removed `$md-toolbar-prominent-title-font-size` since it is no longer
  supported
- removed the `$md-toolbar-mobile-portrait-height`,
  `$md-toolbar-mobile-landscape-height`, `$md-toolbar-mobile-prominent-height`,
  `$md-toolbar-tablet-height`, `$md-toolbar-tablet-prominent-height`,
  `$md-toolbar-desktop-height`, `$md-toolbar-desktop-prominent-height`,
  `$md-toolbar-height`, and `$md-toolbar-prominent-height` in favor of the new
  height variables
