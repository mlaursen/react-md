# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

### Features

- [@react-md/avatar](../avatar): Added ability to pass props to `<img>`
  ([11848ee](https://github.com/mlaursen/react-md/commit/11848ee80b5aca0416ea3e0f4812746dd47d90b7)),
  closes [#908](https://github.com/mlaursen/react-md/issues/908)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/avatar](../avatar)

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

The avatar component should be fairly similar to the v1 version except for a few
behavior changes.

### New Behavior and Features

- the `Avatar` is now rendered as a `<span>` instead of a `<div>`
- the `ref` is correctly forwarded to the `<span>` element
- the `children` no longer needs to be wrapped in an additional `<div>` for
  styling
- the `alt` tag will be defaulted to the empty string if the `src` tag is
  provided for convenience

### Breaking Changes

- no longer supports and `icon` prop since icons should just be rendered as the
  `children` for the `Avatar`
- no longer supports the `random` and `suffixes` props since it did not work for
  SSR
- the `suffix` prop was renamed to `color`
- the `iconSized` prop was removed since the new CSS variable theming API should
  be used instead
- the `contentStyle` and `contentClassName` props were removed since they are no
  longer required

#### New SCSS Variables, Functions, and Mixins

- `$rmd-avatar-colors` - a map of all the colors to generate by default that
  have been updated to support minimal contrast ratio accessibility checks.
- `$rmd-avatar-font-size: 1.5rem !default` - the font size to apply to avatars
  when displaying text
- `$rmd-avatar-line-height: rmd-typography-value(subtitle-1, line-height) !default` -
  the line-height to apply to avatars when displaying text
- `@function rmd-avatar-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-avatar-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-avatar-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-avatar-theme-update-var` - updates one of the theme values as a
  css variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-avatar-default-background` to `$rmd-avatar-background-color`
- renamed `$md-avatar-default-color` to `$rmd-avatar-color`
- renamed `$md-avatar-border-color` to `$rmd-avatar-border-color` and changed
  the default value from `null` to
  `rgba(if(rmd-theme-tone($rmd-theme-background) == light, $rmd-black-base, $rmd-white-base), 0.12)`
- renamed `$md-avatar-size` to `$rmd-avatar-size` and changed the default value
  from `40px` to `2.5rem`

#### Removed SCSS Variables Placeholders, and Mixins

- `$md-avatar-icon-sized` was removed since it is no longer required
- removed `$md-avatar-include-suffixes` and `$md-avatar-colors` since the colors
  are now handled by the `$rmd-avatar-colors` variable
- removed `react-md-theme-avatars` and `react-md-theme-vatar` since they are no
  longer required
- removed `react-md-avatar-media` since avatars no longer automatically updated
  based on media queries and instead are updated through CSS Variables
