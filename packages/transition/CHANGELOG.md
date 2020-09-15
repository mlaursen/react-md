# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
