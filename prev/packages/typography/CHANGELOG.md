# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)

**Note:** Version bump only for package @react-md/typography





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Bug Fixes

* **@react-md/typography:** Fixed overline class name ([1e544d0](https://github.com/mlaursen/react-md/commit/1e544d021f33bf80e69fa30c3ca5deeda3e2d2c2))






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Other Internal Changes

* Updated imports to use `import type` when possible ([ba96bb6](https://github.com/mlaursen/react-md/commit/ba96bb62eeddcc0879f6d584aa670850203561e6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/typography:** Renamed Text to `Typography` ([30cf056](https://github.com/mlaursen/react-md/commit/30cf056fbaf0e3d28e04dd03f1fd37929967f7ab))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* **@react-md/format:** ran `prettier` after upgrading to v2.4.0 ([06110af](https://github.com/mlaursen/react-md/commit/06110afb20c2b83bb76a187f21e5edcd975d1147))
* **react-md:** Remove prop-types package and usage ([2637a6f](https://github.com/mlaursen/react-md/commit/2637a6f43d681a06054e3a4518f692cf51baf997))
* **stylelint:** Updated to use `stylelint` ([22d1598](https://github.com/mlaursen/react-md/commit/22d15985061df76d827d4ca9319198526e320f11))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **@react-md/typography:** The Text component has been renamed to Typography to
help with auto-imports conflicting with the Text element that exists in
`lib.d.ts`
* **react-md:** There will no longer be run-time prop validation with
the `prop-types` package.






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Features

* **@react-md/typography:** override default typography without globals ([ce89374](https://github.com/mlaursen/react-md/commit/ce893741e3ca950d38c6808f31b1e3549a3f3410)), closes [#1239](https://github.com/mlaursen/react-md/issues/1239)


### Documentation

* **react-md.dev:** updated `sassdoc` for new module system ([4746d26](https://github.com/mlaursen/react-md/commit/4746d265adcc2dcaffb260a565462b9d9c28805e))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Bug Fixes

* **sass:** use math.div instead of division since it's deprecated ([d8c3f12](https://github.com/mlaursen/react-md/commit/d8c3f1299ea35814667c5915880744399e5b2108))


### Other Internal Changes

* Added additional tests to bump test coverage ([4d0371c](https://github.com/mlaursen/react-md/commit/4d0371c9e21ab8449a5036a001d302e14a076b7c))
* **@react-md/dev-utils:** updated `sassdoc` and variables to use everything.scss ([a0f0699](https://github.com/mlaursen/react-md/commit/a0f06996c44ee88e1fc3ba4d24ec11c13f204d88))
* **@react-md/dev-utils:** updated variables command to work with `sass` ([5376be1](https://github.com/mlaursen/react-md/commit/5376be11f3499afafd3ddde363178e1aa270cb9c))






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/typography





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)

**Note:** Version bump only for package @react-md/typography





## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **@react-md/typography:** Added examples for overriding typography styles ([57033bd](https://github.com/mlaursen/react-md/commit/57033bd9e9837a0985c35c66fdbb1f08d74f7c85)), closes [#1147](https://github.com/mlaursen/react-md/issues/1147)
* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/typography





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)

**Note:** Version bump only for package @react-md/typography





# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/typography





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/typography](../typography)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/typography](../typography)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/typography](../typography)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

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

[@react-md/icon]: https://github.com/mlaursen/react-md/tree/main/packages/icon
[@react-md/utils]: https://github.com/mlaursen/react-md/tree/main/packages/utils
