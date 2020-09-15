# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

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
