# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Bug Fixes

* **@react-md/card:** fix spelling of raisable and deprecate raiseable prop ([453023b](https://github.com/mlaursen/react-md/commit/453023b2bcb635b0d0348f35d270fbb996297a5b))


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)

**Note:** Version bump only for package @react-md/card





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)

**Note:** Version bump only for package @react-md/card





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


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Bug Fixes

* Updated peerDependencies to fix yarn berry peer requirements ([250efcd](https://github.com/mlaursen/react-md/commit/250efcdd81ea39c06b08eb30109589c89d9b8e0f)), closes [#1224](https://github.com/mlaursen/react-md/issues/1224)






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Other Internal Changes

* **@react-md/card:** removed deprecated $rmd-card-dark-elevation-bordered-background-color variable ([01c9350](https://github.com/mlaursen/react-md/commit/01c9350e32ad75804996e40aed4d23c1e9fe8d5e))


### Breaking Changes

* **@react-md/card:** Removed deprecated `$rmd-card-dark-elevation-bordered-background-color` variable






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/card





## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)

**Note:** Version bump only for package @react-md/card





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)

**Note:** Version bump only for package @react-md/card





## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/card





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)

**Note:** Version bump only for package @react-md/card





# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Bug Fixes

* **@react-md/card:** fixed card color when dark theme elevation is enabled ([e5da5f5](https://github.com/mlaursen/react-md/commit/e5da5f55de9b6fdd669b03157fbae38dd7f223cc)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/card





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

### Bug Fixes

- [@react-md/card](../card): fixed the bordered background color when the dark
  elevation flag is enabled
  ([a9dd552](https://github.com/mlaursen/react-md/commit/a9dd5521d7eb58442bfc6110686d8f039b525e72)),
  closes [#1053](https://github.com/mlaursen/react-md/issues/1053)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/card](../card)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/card](../card)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/card](../card)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/card](../card)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Features

- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)

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

The card package was re-written from the ground up for the v2 release which
should allow for additional customization and styling behavior. Almost
everything is a breaking change.

### New Behavior and Features

- all the card components now correctly forward the `ref` to the DOM element
- the card's title component has been separated into three components for
  additional customization and styling: `CardHeader`, `CardTitle`, and
  `CardSubtitle`
- a new `CardContent` component was added for general styles around the main
  content
- built-in support for right-to-left languages
- a new theming API to update all the colors for a card through SCSS mixins
- cards now have a default border radius

### Breaking Changes

- The `Card` component no longer handles anything with expanding child items and
  must now be done manually
- The `CardMedia` and `CardActionOverlay` components were removed since the new
  `MediaContainer` and `MediaOverlay` components from the `@react-md/media`
  package should be used instead
- The `CardText` component was removed since the new `CardContent` component is
  recommended instead

#### New SCSS Variables, Functions, and Mixins

- `$rmd-card-background-color: rmd-theme-var(surface) !default` - The background
  colors to use for cards
- `$rmd-card-color: rmd-theme-var(on-surface) !default` - The text color to use
  for cards
- `$rmd-card-secondary-color: if(rmd-theme-tone($rmd-theme-surface) == light, rmd-theme-var(text-primary-on-light), rmd-theme-var(text-primary-on-dark)) !default` -
  The secondary text color to use for cards
- `$rmd-card-elevation: 2 !default` - The elevation to use for cards that are
  not raisable
- `$rmd-card-base-elevation: 1 !default` - The starting elevation for a raisable
  card
- `$rmd-card-raised-elevation: 8 !default` - The ending elevation for a raisable
  card
- `$rmd-card-border-radius: 0.25rem !default` - The border radius to apply to
  cards
- `$rmd-card-header-padding: 1rem !default` - The default padding to apply to
  the `CardHeader` component
- `$rmd-card-header-padding-top: 1.5rem !default` - Any extra amount of padding
  to apply to the top of the `CardHeader` component since it normally looks a
  bit nicer with additional padding.
- `$rmd-card-content-padding: 1rem !default` - The amount of padding to apply to
  the `CardContent` component
- `$rmd-card-content-padding-extra: 1.5rem !default` - An additional amount of
  padding-bottom to apply to the `CardContent` component when it is the last
  child in a `Card`
- `$rmd-card-actions-padding: 0.5rem !default` - The amount of padding to apply
  to the `CardActions` component
- `$rmd-card-border-color: rmd-divider-theme-var(background-color) !default` -
  The border color for a card
- `$rmd-card-border-width: $rmd-divider-size !default` - The border width for a
  card
- `@function rmd-card-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-card-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-card-theme` - applies one of the theme values to a css property as
  a css variable
- `@mixin rmd-card-theme-update-var` - updates one of the theme values as a css
  variable

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-card-include-text` since it is no longer required
- removed `$md-card-include-title` since it is no longer required
- removed `$md-card-include-title-avatar` since it is no longer required
- removed `$md-card-include-actions` since it is no longer required
- removed `$md-card-include-tables` since there is no longer built-in table
  support
- removed `$md-card-padding-extra` since the new `$rmd-card-content-padding` and
  `$rmd-card-content-padding-extra` variables replace this functionality
- removed `$md-card-text-font-size` since this is no longer configurable with a
  SCSS variable
- removed `$md-card-title-font-size` since this is no longer configurable with a
  SCSS variable
- removed `$md-card-title-large-font-size` since this is no longer configurable
  with a SCSS variable
