# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/media





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)

**Note:** Version bump only for package @react-md/media





## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/media





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)

**Note:** Version bump only for package @react-md/media





# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/media





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/media](../media)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/media](../media)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.3.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/media](../media)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/media](../media)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/media](../media)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/media](../media)

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

The media package contains some helper components to help create responsive
media like images and videos and optionally enforcing an aspect ratio.

### New Behavior and Features

- Enforcing an aspect ratio now works by providing a `height` and `width`
  instead of using the `forceAspect` and `aspectRatio` props.
- Added new positioning options for the `MediaOverlay` component

### Breaking Changes

- the `Media` component was renamed to `MediaContainer` to hopefully describe
  the purpose of the component better
- the `forceAspect`, `aspectRatio`, and `component` props are no longer
  available

#### New SCSS Variables, Functions, and Mixins

- `$rmd-media-default-aspect-ratio: percentage(16 / 9) !default` - the default
  aspect ratio to use for media in the `MediaContainer`
- `$rmd-media-overlay-padding: 1rem !default` - the padding to apply to the
  `MediaOverlay` component
- `$rmd-media-overlay-horizontal-width: 30% !default` - the width for the
  overlay when the position is set to `left`, `center`, or `right`
- `$rmd-media-overlay-positions: (top right bottom left middle center absolute-center) !default` -
  the available positions for the media overlay
- `@mixin rmd-media-aspect-ratio-contianer` - a new mixin that can be used to
  update any element to force a specific aspect ratio for media items
- `@mixin rmd-media-forced-aspect-ratio-item` - a new mixin that should be used
  alongside the `rmd-media-aspect-ratio-container` mixin to force a specific
  aspect ratio for a media item

#### Renamed SCSS Variables, Functions, and Mixins

- `$md-media-overlay-color` was renamed to `$rmd-media-overlay-background-color`
- `$md-media-aspect-ratios` was renamed to `$rmd-media-default-aspect-ratios`
  and changed the default value from a list of strings to a Map
- `$md-media-embedded-selectors` was renamed to `$rmd-media-selectors` and
  changed the default value to `(img '>svg' iframe video embed object)`
- `@mixin react-md-media-aspect-ratio` was renamed to
  `@mixin rmd-media-aspect-ratio` and changed the behavior to no longer generate
  a class name. It should now be used within a selector

#### Removed SCSS Variables and Mixins

- removed `$md-media-include-overlay` since overlays are always included
- removed `$md-media-include-embedded` since this functionality was removed and
  unneeded
- removed the `%md-media-embedded` placeholder
- removed `@mixin react-md-media-embedded`
