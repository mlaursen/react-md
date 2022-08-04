# Documentation Updates

- allow the user to modify the whole layout and theme for the website
  - probably want a sheet for this where they can also configure RTL, color preference, JS/TS, preferred package manager (npm, yarn, pnpm), scoped packages or simple import (simple is default)
- a theme builder for each package with a live preview
  - this should allow customizing all the SCSS variables and providing a code sample of how to change it
  - should live preview the changes
  - maybe allow saving?
- show how to decrease bundle size by disabling feature flags in SCSS

# Surfaces and Dark Elevation

The new implementation is pretty cool. The way it works is that i use a combination of css variables for it:

- `--rmd-surface-color`
- `--rmd-dark-elevation-color-#{$z-value}` - `$z-value` is 0 - 24

To create a new surface, just call `@include core.box-shadow($z-value)` which will:

- set the `--rmd-surface-color` to `var(--rmd-dark-elevation-color-#{$z-value})`
- set the `background-color` to `var(--rmd-surface-color)`
- set the `color` to `var(--rmd-text-primary-color)`

So how does this work with the `light`, `dark`, and `system` color scheme? Check out
[\_theme.scss](./packages/core/src/theme/_theme.scss) and the `colors` mixin.

When the `$color-scheme` is set to `light`, all the `--rmd-dark-elevation-color-#{$z-value}` variables
will be unset so the default `$light-theme-surface-color` will automatically be used.

When the `$color-scheme` is set to `dark`, it will initialize all the `--rmd-dark-elevation-color-#{$z-value}` variables
with the correct `background-color` in `$dark-elevation-colors`.

When the `$color-scheme` is set to `system`, it defaults to the `light` behavior since the `dark` theme
will be applied in the `prefers-color-scheme: dark` media query and the `use-dark-theme` mixin.

The `use-light-theme` and `use-dark-theme` mixins are also used to allow you to switch between
light and dark while still using dark elevation without needing to override all styles on components.
The `use-light-theme` will reset all the `--rmd-dark-elevation-color-#{$z-value}` to the `$light-theme-surface-color`
when the `$color-scheme` was not initially `light` to keep the bundle smaller. The `use-dark-theme`
will do the reverse and set all the `--rmd-dark-elevation-color-#{$z-value}` variables which activates
the dark elevation mode.

## TODO

<!-- - combine `@react-md/app-bar`, `@react-md/link`, `@react-md/layout` into `@react-md/navigation` -->
<!--   - or some other name -->
<!--   - these components heavily rely on each other and don't seem useful as standalone packages -->

<!-- - update `useScrollLock` to no longer set `overflow: hidden` -->
<!--   - this causes layout shifting which isn't desired and perf issues if using resize observers -->
<!--   - instead, https://stackoverflow.com/a/4770179 -->
<!--     - need to make sure it only affects the document.body or window -->

- update fixed app bars to be offset by the scrollbar size? The `Header.module.scss` does this atm
- do not use folders for material icons
  - this makes imports much easier
  - filled should be default. the others should be `{{ICON_NAME}}{{ICON_TYPE}}Icon`
  - makes it a bit harder for the material icons page
- create skeleton loaders
- might be better to not use active descendant movement behavior for tree and copy what I did at FWI.
  - having to manually sort is going yucky
  - i can get all the required references now by building the lookups while rendering

## Breaking Changes

- removed `forceAddonWrap` from `ListItemChildren` in favor of `leftAddonForceWrap` and `rightAddonForceWrap`

## Features

- new shared portal node instead of document.body
- support for conditional SSR
  - dialogs, overlays: if `visible` is true on the server, they will be rendered without portaling
    - once they are no longer visible, they will start to portal into the new portal node
- Color Scheme behavior (light, dark, system)
- default `alphaNumericSort`
- skeleton placeholder loaders
