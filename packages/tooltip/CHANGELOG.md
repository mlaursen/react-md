# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package @react-md/tooltip

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

Tooltips were completely re-written for the v2 release to help fix the missing
accessibility issues from v1. One of the most "exciting" things that was added
during the re-write is that tooltips will now automatically determine the "best"
location to render itself within the viewport instead of manually needing to
change the `position` yourself! Woo hoo!

Starting from v2, you'll probably just want to use the `Tooltipped` component as
it'll handle all the functionality of a tooltip for you and ensuring that
correct props are added to the element being tooltipped.

### New Features / Behavior

- tooltips now automatically position themselves within the viewport.
- tooltips no longer require being within a `position: relative` container
- tooltips now require a unique `id` to help with accessibility concerns and the
  tooltipped element gains a `aria-describedby` pointing to the tooltip's id.
- tooltips can now be portalled in the DOM to help with weird overflow issues.
- tooltips now support line wrapping by just enabling the `lineWrap` prop
  instead of having to write all the custom CSS yourself.
- a new "hover mode" behavior was added to tooltips so that once a tooltip has
  become visible by hover, all other tooltips will become visible immediately
  instead of needing to wait for the initial show delay.
- the tooltip will have a static size on all browser sizes unless the `dense`
  prop is enabled or the `$rmd-utils-auto-dense` variable is enabled.
- tooltips now have a `border-radius`
- tooltips no longer have an opacity applied to themselves to create clearer
  text and will no longer be slightly transparent.
- the text color can now be configured for tooltips
- the majority of the tooltip's theme can be changed with CSS variables

### Breaking Changes

- the `injectTooltip` higher order component was removed
- the `TooltipContainer` component was removed

#### New SCSS Variables, Functions, and Mixins

- `$rmd-toolip-line-height: 1.5rem !default` - The line height to use for the
  tooltip text.
- `$rmd-tooltip-line-wrap-vertical-padding: 0.5625rem !default` - The amount of
  padding to apply to the top and bottom of the tooltip when line wrapping is
  enabled.
- `$rmd-tooltip-border-radius: 0.25rem !default` - The new border radius applied
  to tooltips
- `$rmd-tooltip-transition-distance: 0.5rem !default` - The distance that the
  tooltip should animate while appearing and hiding.
- `$rmd-tooltip-color` - The text color to use for tooltips that will
  automatically be adjusted to be contrast compliant relative to the
  `$rmd-tooltip-background-color`. Can be overridden manually.
- `$rmd-tooltip-max-width: 15rem !default` - The max width to use for tooltips.
  This is mostly to help with the new line wrapping functionality.
- `$rmd-tooltip-enter-duration: $rmd-transition-standard-time !default` - The
  tooltip's enter transition duration.
- `$rmd-tooltip-exit-duration: $rmd-transition-standard-time !default` - The
  tooltip's exit transition duration.
- `$rmd-tooltip-z-index: 100 !default` - The `z-index` to apply to tooltips
- `@function rmd-tooltip-theme` - gets one of the theme values and validates
  that the theme name is valid
- `@function rmd-tooltip-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-tooltip-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-tooltip-theme-update-var` - updates one of the theme values as a
  css variable
- `@mixin rmd-tooltip-dense-theme` - updates all the tooltip theme styles via
  CSS variables to use the dense theme (automatically handled from
  [@react-md/utils] if the `$rmd-utils-auto-dense` variable has been enabled).

#### Renamed SCSS Variables, Functions, and Mixins

- `$md-tooltip-mobile-font-size` was renamed to `$rmd-tooltip-font-size` and
  changed the default value from `14px` to `1rem`
- `$md-tooltip-mobile-tile-height` was renamed to `$rmd-tooltip-min-height` and
  changed the default value from `32px` to `2rem`
- `$md-tooltip-mobile-lr-padding` was renamed to
  `$rmd-tooltip-horizontal-padding` and changed the default value from `16px` to
  `1rem`
- `$md-tooltip-mobile-top-margin` was renamed to `$md-tooltip-spacing` and
  changed the default value from `24px` to `1.5rem`
- `$md-tooltip-desktop-font-size` was renamed to `$rmd-tooltip-dense-font-size`
  and changed the default value from `10px` to `0.625rem`
- `$md-tooltip-desktop-tile-height` was renamed to
  `$rmd-tooltip-dense-min-height` and changed the default value from `22px` to
  `1.375rem`
- `$md-tooltip-desktop-lr-padding` was renamed to
  `$rmd-tooltip-dense-horizontal-padding` and changed the default value from
  `8px` to `0.5rem`
- `$md-tooltip-desktop-top-margin` was renamed to `$md-tooltip-dense-spacing`
  and changed the default value from `14px` to `0.875rem`

#### Removed SCSS Variables and Mixins

- `$md-tooltip-mobile-tb-padding` was removed since there is new line wrap
  functionality and variables
- `$md-tooltip-desktop-tb-padding` was removed since there is new line wrap
  functionality and variables

[@react-md/utils]:
  https://github.com/mlaursen/react-md/tree/master/packages/utils
