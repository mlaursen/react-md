# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.6](https://github.com/mlaursen/react-md/compare/v5.1.5...v5.1.6) (2023-12-11)


### Bug Fixes

* **select:** port fixed positioning fixes back from v6.0.0 ([feb9ec6](https://github.com/mlaursen/react-md/commit/feb9ec6c32c22665851d6e470aa38637b0d3b32e)), closes [#1461](https://github.com/mlaursen/react-md/issues/1461)






## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)


### Other Internal Changes

* **react-md.dev:** useLayoutEffect for page transitions ([638c8ec](https://github.com/mlaursen/react-md/commit/638c8ecd7c0d3d540f44204aa37f5914078eea7d))






# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Bug Fixes

* **@react-md/transition:** Do not create styles for hidden elements ([6eff8a8](https://github.com/mlaursen/react-md/commit/6eff8a8d6b3845f0a987d448458fa92d78b4d77e))
* **@react-md/utils:** Positioning logic for inner-left/inner-right and vertical anchors ([a38abfb](https://github.com/mlaursen/react-md/commit/a38abfb08b1f5569179ccb83fb6fa1ba7054a0d7))






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Documentation

* **@react-md/transition:** Fix transitionTo documentation to use useEffect ([31a31da](https://github.com/mlaursen/react-md/commit/31a31da733666e225db4a4af11d19761636073b6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
* **@react-md/typography:** Renamed Text to `Typography` ([30cf056](https://github.com/mlaursen/react-md/commit/30cf056fbaf0e3d28e04dd03f1fd37929967f7ab))
* **@react-md/utils:** Export additional positioning types ([b50a04c](https://github.com/mlaursen/react-md/commit/b50a04c3c3c8dd280fde797a135a60dfbaf5bd33))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* Re-ran `prettier` ([9632d82](https://github.com/mlaursen/react-md/commit/9632d8203f7c6fa96718d0bcfd63ac2475a0efc2))
* Updated remaining docs and tests for `react-router-dom` v6 ([e012ef9](https://github.com/mlaursen/react-md/commit/e012ef961b21d2583fe6d34114e36ee31ac042a6))
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

* **react-md.dev:** updated examples to work with `sass` instead of node-sass ([d8ddf51](https://github.com/mlaursen/react-md/commit/d8ddf517eb5d5a5b83388da2cf72a61b51c74556))






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/transition





## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)

**Note:** Version bump only for package @react-md/transition





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Other Internal Changes

* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/transition





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Features

* **@react-md/transition:** Updated `useFixedPositioning` to merge style objects ([1ab84d7](https://github.com/mlaursen/react-md/commit/1ab84d7e86ed911cb263bb1b25e1085fab3fc2e5))
* **@react-md/transition:** updated `useFixedPositioning` to support fixedTo ref ([ced550a](https://github.com/mlaursen/react-md/commit/ced550a6ae8525e02d8ce20dde1cf448454ac9ec))


### Other Internal Changes

* **@react-md/transition:** bump @types/react-transitition-group from v4.2.4 to v4.4.1 ([f3f5c7b](https://github.com/mlaursen/react-md/commit/f3f5c7be571e87a13f67442a673feb2807cb96ba))
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

**Note:** Version bump only for package @react-md/transition





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/transition](../transition)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/transition](../transition)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/transition](../transition)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/transition](../transition)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/transition](../transition)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/transition](../transition)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/transition](../transition)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/transition](../transition)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/transition](../transition)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

### Bug Fixes

- [@react-md/transition](../transition): `useCSSTransition` now correctly
  forwards refs
  ([36f832f](https://github.com/mlaursen/react-md/commit/36f832f82ada222f337d413a7044d055d5a57d58))

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/transition](../transition)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/transition](../transition)

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

Every transition was re-written in this release so it is a pretty big breaking
change. The main differences are upgrading to transition API as well as
shortening most of the transitions throughout `react-md`.

### New Behavior and Features

- The `Collapse` component will have a static transition time instead of being
  based on the size of the content
- The `Collapse` component now supports a `minHeight` to create a partially
  collapsed element
- Added two additional components for default transitions: `CrossFade` and
  `ScaleTransition`
- Added hook versions for all the collapse and cross fade transitions:
  - `useCollase`
  - `useCrossFade`
- Created hook versions of the `react-transition-group` package to handle custom
  transitions with `useTransition` and `useCSSTransition`
- Created a hook to be used with the `react-transition-group` package to fix an
  element to another element within the page. (Similar to the `Layover`
  component)

### Breaking Changes

- The `Collapse` component no longer uses [react-motion] and spring
  configuration.
- Removed the transition placeholders and the transition class names:
  - `%md-transition--sharp`
  - `%md-transition--standard`
  - `%md-transition--acceleration`
  - `%md-transition--deceleration`
  - `.md-transition--sharp`
  - `.md-transition--standard`
  - `.md-transition--acceleration`
  - `.md-transition--deceleration`

#### New SCSS Variables, Functions, and Mixins

- `$rmd-transition-enter-time: 0.2s !default` - The duration for an enter
  transition used for most transitions
- `$rmd-transition-leave-time: 0.15s !default` - The duration for a leave
  transition used for most transitions
- `$rmd-collapse-enter-transition-func: deceleration !default` - A customizable
  variable for the collapse transition that can be one of: `sharp`, `standard`,
  `acceleration`, or `deceleration`
- `$rmd-collapse-leave-transition-func: acceleration !default` - A customizable
  variable for the collapse transition that can be one of: `sharp`, `standard`,
  `acceleration`, or `deceleration`
- `$rmd-transition-scale-enter-duration: $rmd-transition-enter-time !default` -
  The transition duration for the new scaling transition's entering phase.
- `$rmd-transition-scale-leave-duration: $rmd-transition-leave-time !default` -
  The transition duration for the new scaling transition leaving phase.
- `$rmd-transition-scale-y-enter-duration: $rmd-transition-enter-time !default` -
  The transition duration for the new vertical scaling transition's entering
  phase.
- `$rmd-transition-scale-y-leave-duration: $rmd-transition-leave-time !default` -
  The transition duration for the new vertical scaling transition leaving phase.
- `@mixin rmd-transition` - applies the correct transition/animation timing
  function from one of the supported transition types.
- `@mixin rmd-transition-shadow-transition` - adds a performant version of a
  `box-shadow` transition using a pseudo element and opacity changes.

#### Renamed SCSS Variables, Functions, and Mixins

- `$md-transition-sharp` was renamed to `$rmd-transition-sharp`
- `$md-transition-standard` was renamed to `$rmd-transition-standard`
- `$md-transition-acceleration` was renamed to `$rmd-transition-acceleration`
- `$md-transition-deceleration` was renamed to `$rmd-transition-deceleration`
- `$md-transition-time` was renamed to `$rmd-transition-standard-time`
- `$md-cross-fade-transition-time` was renamed to
  `$rmd-cross-fade-transition-duration`
- `$md-cross-fade-distance` was renamed to `$rmd-cross-fade-translate-distance`
  and changed the default value from `16px` to `-1rem`

[react-motion]: https://www.npmjs.com/package/react-motion
