# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- **grid:** added hook to access grid list size
  ([a448816](https://github.com/mlaursen/react-md/commit/a44881602de57447e9cb5ba720f5f2c031936863))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](../utils): added `useGridList` hook
  ([56ecc19](https://github.com/mlaursen/react-md/commit/56ecc19d748e3c63b6d27180ceedb385364fba43))
- [@react-md/utils](../utils): added useIsomorphicLayoutEffect from react-redux
  ([deacf1c](https://github.com/mlaursen/react-md/commit/deacf1c01f62adebbfbfbb3f0d5709cdab0cc537))
- [@react-md/utils](../utils): created a new useResizeObserver implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](../utils): more verbose useAppSize usage error message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- **grid:** added hook to access grid list size
  ([a448816](https://github.com/mlaursen/react-md/commit/a44881602de57447e9cb5ba720f5f2c031936863))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](../utils): added `useGridList` hook
  ([56ecc19](https://github.com/mlaursen/react-md/commit/56ecc19d748e3c63b6d27180ceedb385364fba43))
- [@react-md/utils](../utils): added useIsomorphicLayoutEffect from react-redux
  ([deacf1c](https://github.com/mlaursen/react-md/commit/deacf1c01f62adebbfbfbb3f0d5709cdab0cc537))
- [@react-md/utils](../utils): created a new useResizeObserver implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](../utils): more verbose useAppSize usage error message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/utils](../utils)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/utils](../utils)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- Booleans in `dist/scssVariables`
  ([f6d43a3](https://github.com/mlaursen/react-md/commit/f6d43a31a13647e0b92c256975652913fb8bb34e))
- Scroll active element into view while focusing
  ([a9a0902](https://github.com/mlaursen/react-md/commit/a9a090268f8aecb8b7478dc3fb6c06eec346c62a))

### Features

- Added new mixin for optional css-modules
  ([28ba828](https://github.com/mlaursen/react-md/commit/28ba8281489ddfa794a61749cb32817a9bd64311))

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

This package is pretty new for `react-md`, but might be seen as a replacement
for the old grid, helpers, and utils.

### New Behavior and Features

- automatically update styles for right to left languages (opt-out)
- static sizing across all screen sizes with opt-in support for an auto-dense
  theme if desired
- better keyboard focus behavior for temporary elements so that keyboard focus
  is not lost after traversing between multiple menus, dialogs, sheets, etc
- better keyboard movement with `aria-activedescendant` behavior or focus
  behavior
- built-in **keyboard search** for DOM elements that require it
- built-in support for determining the current app size based on media queries
  with both mixins and hooks
- lots of additional utility mixins for common styling patterns
- the default grid system now uses css grid instead of flexbox for layout
- a second grid system that creates dynamic number of columns based on a max
  width provided
- the grid system no longer uses its own breakpoints and uses the phone, tablet,
  and desktop breakpoints
- simplified css reset touching as few html tags as possible: `html` and `body`
  only. still applies `box-sizing: border-box` to all elements though
- "feature detection" utility mixin to only include styles for installed scoped
  `react-md` packages with `react-md-utils`

### Breaking Changes

- removed `react-md-helpers-everything`
- removed `.md-full-width`, `.md-inline-block`, and `.md-block-centered` helper
  classes
- changed the media query behavior and device detection
- grid system now uses grid instead of flexbox and no longer supports a custom
  max-width through the scss variables with a container
- `FocusContainer` renamed all of the props
- renamed/removed all remaining scss variables, functions, mixins, and
  placeholders

#### New Components, Hooks, and Utils

This package contains many useful utilities for internal use, but also exports
some components and hooks that might be useful externally.

- `AppSizeListener` and `useAppSize` are used to determine the current app size
  based on media queries. Multiple components within `react-md` rely on this
  behavior
- `ResizeListener` is a component that can be used to trigger a callback on
  throttled window resize events and a `useResizeListener` hook version
- `ResizeObserver` is a component that is used to use the [ResizeObserverAPI] to
  track a specific element resizing as well as a `useResizeObserver` hook
  version
- `PhoneOnly`, `MobileOnly`, `TabletOnly`, and `DesktopOnly` components can be
  used to conditionally render content only when one of the media types are
  active
- `UserInteractionModeListener`, `useUserInterationMode`, and
  `useIsUserInteractionMode` are used to determine how the current user is
  interacting with your app with either: touch, mouse, or keyboard
- `Grid` and `GridCell` can be used to create a CSS Grid layout using the
  material design grid layout or a static number of columns
- `GridList` and `GridListCell` can be used to create a flex based layout where
  each cell grows up to the specified max width and tries to fit as many cells
  as possible based on the `GridList`'s width
- `useTabFocusWrap` hook for containing focus within an element if the
  `FocusContainer` does not suit your needs
- `useFocusOnMount` hook if you'd like to focus a specific element when a
  component mounts if the `FocusContainer` does not suit your needs
- `usePreviousFocus` hook if you'd like to focus the previously focused element
  in the DOM before this component mounted once this component unmounts
- `useScrollLock` hook to temporarily disable scrollbars within the app for
  temporary elements
- `useCloseOnOutsideClick` hook if a callback should be fired once an element
  outside of a container element has been clicked

##### Honorable Mentions

- `isContrastCompliant` - utility function to check if two hex colors meet a
  minimal contrast ratio compliance for accessibility
- `bem` - if you like using [BEM] for class name convention, helps dynamically
  apply classes as needed
- `caseInsensitiveFilter` and `fuzzyFilter` utils for filtering a list of data
- `findIgnoreCase` - utility to find the first match within a list
- `useKeyboardSearch` - accessibility hook to allow a list of to be keyboard
  searchable within the DOM
- `useKeyboardFocusMovement` and `useActiveDescendantMovement` for handling
  custom keyboard movement of DOM elements
- `getFixedPosition` - utility to generate styles for an element so it is fixed
  within the viewport. However, you most likely are looking for the
  `useFixedPositioning` hook in [@react-md/transition]

#### New SCSS Variables, Functions, and Mixins

- `$rmd-utils-phone-max-width: 47.9375em !default` - the max width to still be
  considered a phone while in portrait or landscape mode
- `$rmd-utils-tablet-max-width: 64em !default` - the max width to still be
  considered a tablet while in portrait or landscape mode
- `$rmd-utils-large-desktop-min-width: 80em !default` - a new min-width for a
  large desktop screen (normally for 1440p or 4k monitors)
- `$rmd-grid-padding: 1rem !default` - the static padding for a grid
- `$rmd-grid-cell-margin: 1rem !default` - the static amount of margin for each
  grid cell
- `$rmd-grid-golumns: null !default` - a new variable that allows you to
  configure a static number of columns across all screen sizes instead of using
  the 4, 8, and 12 grid system from material design
- `$rmd-grid-large-desktop-columns: $rmd-grid-desktop-columns !default` - a new
  variable for if you want to configure the number of columns in the grid system
  for large desktop screens
- `$rmd-grid-list-padding: 0.5rem !default` - the amount of to use for the
  flex-based grid approach
- `$rmd-grid-list-cell-margin: 0.5rem !default` - the amount of margin to use
  for the flex-based grid approach for each cell
- `$rmd-grid-list-cell-max-size: 0.375rem !default` - the default max-size that
  each cell within the flex-based grid apporach can be before the DOM has loaded
- `@function rmd-utils-negate-var` - a utility function that can be used to
  negate a css variable
- `@mixin rmd-utils-map-to-styles` - a utility mixin to convert a Map into
  styles
- `@mixin rmd-utils-rtl` - a utility mixin to apply styles only for right to
  left languages
- `@mixin rmd-utils-rtl-auto` - a utility mixin that can automatically swap some
  styles to an inversed value for right to left languages
- `@mixin rmd-utils-block-centered` - a utility mixin to style an element
  centered horizontally within a non-flex container
- `@mixin rmd-utils-absolute-centered` - a utility mixin to style an element
  centered horizontally and vertically using `position: absolute`
- `@mixin rmd-utils-scroll` - a utility mixin to allow scrolling with fixing
  scroll momentum on iOS
- `@mixin rmd-utils-hide-focus-outline` - utility mixin to hide the default
  browser focus styles for an element and fixing the firefox custom focus rings
- `@mixin rmd-utils-full-screen` - a utility mixin for making an element full
  screen or the same size as the parent element
- `@mixin rmd-utils-pseudo-element` - a utility mixin to create a pseudo element
  that won't be interactable. generally used for focus behavior
- `@mixin rmd-utils-sr-only-focusable` - a utility mixin to make an element
  visible only while being focused by a screen reader
- `@mixin rmd-utils-sr-only` - a utility mixin to make an element visible for
  screen readers only
- `@mixin rmd-utils-hide-scrollbar` - a utility mixin to hide the scrollbar for
  an element while still allowing it to be scrollable
- `@mixin rmd-utils-phone-media` - a utility mixin to apply styles only for
  phone devices
- `@mixin rmd-utils-tablet-media` - a utility mixin to apply styles when the
  tablet min-width is reached
- `@mixin rmd-utils-tablet-only-media` - a utility mixin to apply styles only
  for tablets based on min and max width
- `@mixin rmd-utils-desktop-media` - a utility mixin to apply styles when the
  desktop min width is reached
- `@mixin rmd-utils-large-desktop-media` - a utility mixin to apply styles when
  the large desktop min width is reached
- `@mixin rmd-utils-touch-only` - a utility mixin to apply styles only while the
  app is being interacted by touch
- `@mixin rmd-utils-keyboard-only` - a utility mixin to apply styles only while
  the app is being interacted with a keyboard
- `@mixin rmd-utils-mouse-only` - a utility mixin to apply styles only while the
  app is being interacted with a mouse

#### Renamed SCSS Variables and Values

- renamed `$md-tablet-min-width` to `$rmd-utils-tablet-min-width` and changed
  the default value from `768px` to `48em`
- renamed `$md-desktop-min-width` to `$rmd-desktop-min-width` and changed the
  default value from `1025px` to `64.0625rem`
- renamed `$md-grid-phone-columns` to `$rmd-grid-phone-columns`
- renamed `$md-grid-tablet-columns` to `$rmd-grid-tablet-columns`
- renamed `$md-grid-desktop-columns` to `$rmd-grid-desktop-columns`

#### Removed SCSS Variables, Functions, and Mixins

- removed `$md-mobile-min-width` since the media queries will use `max-width`
  for phones instead
- removed `$md-portrait-media` and `$md-landscape-media` since they are no
  longer used
- removed `$md-mobile-media`, `$md-mobile-portrait-media` and
  `$md-mobile-landscape-media` since the `rmd-utils-mobile-media` mixin should
  be used instead
- removed `$md-tablet-media`, `$md-tablet-portrait-media`, and
  `$md-tablet-landscape-media` since the `rmd-utils-tablet-media` and
  `rmd-utils-tablet-only-media` mixins should be used instead
- removed `$md-media-included` since the `rmd-utils-dense` mixin should be used
  instead if you want to automatically create a dense theme on desktops
- removed `$md-tablet-breakpoint` and `$md-desktop-breakpoint` since the grid
  uses the same breakpoints as all other components now
- removed `$md-grid-phone-margin`, `$md-grid-phone-gutter`,
  `$md-grid-tablet-margin`, `$md-grid-tablet-gutter`, `$md-grid-desktop-margin`,
  and `$md-grid-desktop-gutter` since there is now a static size across all app
  sizes
- removed all the old grid mixins: `react-md-grid`,
  `react-md-make-grid-container`, `react-md-grid-mobile`,
  `react-md-grid-tablet`, `react-md-grid-desktop`, `react-md-make-custom-grid`,
  `react-md-make-grid`, `react-md-make-cells`, `react-md-grid-media`,
  `react-md-cell-size`, `react-md-grid-full`, and `react-md-cell-offset` since
  the new grid system doesn't need styling in this manner

[bem]: https://getbem.com
[resizeobserverapi]:
  https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
[@react-md/transition]:
  https://github.com/mlaursen/react-md/tree/master/packages/transition
