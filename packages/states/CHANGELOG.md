# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

### Bug Fixes

- [@react-md/states](../states): fixed usedPressStates to pass onClick like
  other state hooks
  ([82cd676](https://github.com/mlaursen/react-md/commit/82cd67695c2ecd6e9a710d5fbfce97ae4dfeda80))

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Bug Fixes

- [@react-md/states](../states): fixed usedPressStates to pass onClick like
  other state hooks
  ([82cd676](https://github.com/mlaursen/react-md/commit/82cd67695c2ecd6e9a710d5fbfce97ae4dfeda80))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/states](../states)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/states](../states)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/states](../states)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/states](../states)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/states](../states)

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

This package is kind of new for the v2 release but the closest thing within v1
is the `injectInk` and "ink" effects. The ink effect has been renamed to a
ripple effect and there are some other additional goodies included now.

This release has one of the most exciting new features that has been requested a
lot by designers: **focus states are only applied when the user is interacting
with a keyboard**. If you are unfamiliar with this, clicking a focusable element
in the DOM actually triggers a `focus` event on that element as well. This means
that any `:focus` styles will be applied which is usually not what we want.

The v2 release has introduced three interaction modes to help prevent this sort
of thing where styles can be added only for `touch`, `mouse`, or `keyboard`.
Super exciting stuff; I know.

### New Features / Behavior

- the material design ripple effect can now be disabled with React context
- added a new optional "pressed" state that can be used instead of ripples for a
  simpler interaction state when being clicked/touched
- able to apply styles based on the current user interaction mode with simple
  mixins
- adds a custom focus box shadow while interacting in keyboard mode to improve
  the visibility of the current focused item (can be opted-out, but not
  recommended for accessibility)

### Breaking Changes

- `injectInk` higher order component no longer exists with no alternative
- the material design ripple has no "pulsing" effect anymore (this was defaulted
  to `false` in v1 anyways)

#### New SCSS Variables, Functions, and Mixins

- `$rmd-states-use-ripple: true !default` - boolean if the ripple effect should
  be used when a user clicks or touches an interactable element such as buttons
- `$rmd-states-use-pressed-states-fallback: true !default` - Boolean if the
  small amount of styles for the background color changes for the "pressed"
  states should also be included if not using the ripple effect
- `$rmd-states-use-focus-shadow: true !default` - Boolean if the blue focus
  shadow should be used while an element is focused in keyboard mode
- `$rmd-states-focus-shadow-width: 0.125rem !default` - The width for the focus
  box-shadow
- `$rmd-states-focus-shadow-color: $rmd-blue-500 !default` - The color for the
  focus box-shadow
- `$rmd-states-light-theme-background-color: $rmd-black-base !default` - the
  base background color to use in the light theme for applying different states
  to elements
- `$rmd-states-focus-shadow: inset 0 0 0 $rmd-states-focus-shadow-width $rmd-states-focus-shadow-color !default` -
  The focus box-shadow used
- `$rmd-states-light-theme-hover-color: rgba($rmd-states-light-theme-background-color, 0.08) !default` -
  The hover color for light themed background
- `$rmd-states-light-theme-focus-color: rgba($rmd-states-light-theme-background-color, 0.24) !default` -
  The focus color for light themed background
- `$rmd-states-light-theme-pressed-color: rgba( $rmd-states-light-theme-background-color, 0.32) !default` -
  The selected color to use for light themed background
- `$rmd-states-light-theme-selected-color: rgba( $rmd-states-light-theme-background-color, 0.16) !default` -
  The selected color to use for light themed background
- `$rmd-states-light-theme-ripple-background-color: rgba($rmd-black-base, 0.08) !default` -
  The ripple's background color when using the light theme
- `$rmd-states-dark-theme-background-color: $rmd-black-base !default` - the base
  background color to use in the dark theme for applying different states to
  elements
- `$rmd-states-dark-theme-hover-color: rgba($rmd-states-dark-theme-background-color, 0.04) !default` -
  The hover color to use for dark themed backgrounds
- `$rmd-states-dark-theme-focus-color: rgba($rmd-states-dark-theme-background-color, 0.12) !default` -
  The focus color to use for dark themed backgrounds
- `$rmd-states-dark-theme-pressed-color: rgba($rmd-states-dark-theme-background-color, 0.16) !default` -
  The pressed color to use for dark themed backgrounds
- `$rmd-states-dark-theme-selected-color: rgba($rmd-states-dark-theme-background-color, 0.12) !default` -
  The selected color to use for dark themed backgrounds
- `$rmd-states-dark-theme-ripple-background-color: rgba($rmd-black-base, 0.08) !default` -
  The ripple's background color when using the dark theme
- `@function rmd-states-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-states-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-states-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-states-theme-update-var` - updates one of the theme values as a
  css variable
- `@mixin rmd-states-surface-base` - base styles to add interaction states to a
  new component
- `@mixin rmd-states-pressed-styles` - applies styles only when the component
  has the pressed class name
- `@mixin rmd-states-focus-shadow` - applies the new focus box-shadow to an
  element
- `@mixin rmd-states-surface` - the new main mixin that will apply all the
  interaction states to a new component

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-ink-enter-transition-time` to
  `$rmd-states-ripple-transform-duration`
- renamed `$md-ink-leave-transition-time` to
  `$rmd-states-ripple-opacity-duration`

#### Removed SCSS Variables and Mixins

- removed `$md-ink-pulse-time`, `$md-ink-expanded-scale`, and
  `$md-ink-border-radius` since it's no longer configurable
- removed `@mixin react-md-theme-inks` since it is now done with the new theming
  API and mixins
