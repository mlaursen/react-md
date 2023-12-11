# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.6](https://github.com/mlaursen/react-md/compare/v5.1.5...v5.1.6) (2023-12-11)

**Note:** Version bump only for package @react-md/tooltip





## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)

**Note:** Version bump only for package @react-md/tooltip





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Bug Fixes

* **@react-md/tooltip:** Tooltips stay visible on mobile Firefox ([7039fef](https://github.com/mlaursen/react-md/commit/7039fef0b7003a5288ee855c7710b7a53d4a66d9))


### Features

* **@react-md/tooltip:** `useTooltip` supports new disabled option ([a934ae9](https://github.com/mlaursen/react-md/commit/a934ae931b6e08ab3a32cb688eda728cf98ce7c2))


### Documentation

* **@react-md/tooltip:** Remove documentation around `Tooltipped` component ([1a59190](https://github.com/mlaursen/react-md/commit/1a59190e7b76494b5375809d563f03c4ee0b8b75)), closes [#1367](https://github.com/mlaursen/react-md/issues/1367)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Other Internal Changes

* feat!(utils): Updated the HoverMode API ([ac60bdb](https://github.com/mlaursen/react-md/commit/ac60bdb0cd8dc3ba55c8ea080f4ad3886b579033))


### Breaking Changes

* `DEFAULT_HOVER_MODE_STICKY_EXIT_TIME` has been renamed to
`DEFAULT_HOVER_MODE_EXIT_TIME`.
* The `exitVisibilityDelay` always defaults to
`DEFAULT_HOVER_MODE_EXIT_TIME`.
* The `useHoverMode` hook no longer accepts an
`HTMLElement` generic and instead the event handlers will automatically
infer the `HTMLElement` based on usage.
* The `useHoverMode` hook no longer returns
`stickyHandlers` and instead returns `hoverHandlers` that only include
`onMouseEnter` and `onMouseLeave`. The `handlers` that are returned now
include `onClick`, `onMouseEnter`, and `onMouseLeave`. This was kind of
what the `stickyHandlers` was before. In addition, clicking an element
no longer disabled the hover mode behavior.
* The following typescript types have been removed:
`HoverModeOnlyOptions`, `HoverModeOnlyReturnValue`






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Other Internal Changes

* Updated imports to use `import type` when possible ([ba96bb6](https://github.com/mlaursen/react-md/commit/ba96bb62eeddcc0879f6d584aa670850203561e6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **@react-md/tooltip:** cancel timer when element is clicked ([5416554](https://github.com/mlaursen/react-md/commit/5416554558cc007c31c1510f4bafcf159a3a74d5))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* **react-md:** Remove prop-types package and usage ([2637a6f](https://github.com/mlaursen/react-md/commit/2637a6f43d681a06054e3a4518f692cf51baf997))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **react-md:** There will no longer be run-time prop validation with
the `prop-types` package.






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Bug Fixes

* Updated peerDependencies to fix yarn berry peer requirements ([250efcd](https://github.com/mlaursen/react-md/commit/250efcdd81ea39c06b08eb30109589c89d9b8e0f)), closes [#1224](https://github.com/mlaursen/react-md/issues/1224)






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Other Internal Changes

* **@react-md/tooltip:** removed deprecated props from `Tooltipped` component ([6dca9b1](https://github.com/mlaursen/react-md/commit/6dca9b1de28466754e968a33a173a2ad8d24ec5c))
* **@react-md/tooltip:** removed TooltipHoverModeConfig component ([664ec30](https://github.com/mlaursen/react-md/commit/664ec300b76f7f1c611e9744e6c5eb06ee595ef6))


### Breaking Changes

* **@react-md/tooltip:** Removed `TooltipHoverModeConfig` component
* **@react-md/tooltip:** Removed deprecated props from `Tooltipped` component






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/tooltip





## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)

**Note:** Version bump only for package @react-md/tooltip





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)

**Note:** Version bump only for package @react-md/tooltip





## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/tooltip





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Bug Fixes

* **@react-md/utils:** Click Behavior for Hover Mode ([d0fda80](https://github.com/mlaursen/react-md/commit/d0fda80332406e3323df457d9822d9dd6df3f8da))


### Other Internal Changes

* **@react-md/tooltip:** Cleaned up some `useTooltip` code ([0a6aed9](https://github.com/mlaursen/react-md/commit/0a6aed906f76690f8a6e3e026cd30dbf991ef148))
* **@react-md/tooltip:** Updated `Tooltip` to use new Hover Mode ([386f47b](https://github.com/mlaursen/react-md/commit/386f47ba4e0976a3f5727a714710914bb5968987))
* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Other Internal Changes

* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/tooltip





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/tooltip](../tooltip)

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

[@react-md/utils]: https://github.com/mlaursen/react-md/tree/main/packages/utils
