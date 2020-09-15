# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/icon](../icon)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

**Note:** Version bump only for package [@react-md/icon](../icon)

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/icon](../icon)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/icon](../icon)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/icon](../icon)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/icon](../icon)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- Booleans in `dist/scssVariables`
  ([f6d43a3](https://github.com/mlaursen/react-md/commit/f6d43a31a13647e0b92c256975652913fb8bb34e))

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

### New Behavior and Features

- all refs are now forwarded to the DOM elements
- new theme API that allows for customizing the size and color of icons a lot
  easier with exported `mixin`s
- built-in support for right-to-left languages when spacing text with icons
- added an `IconRotator` component to be able to animate a rotation for an icon
  > This is a new component implementation for the
  > `.md-collapser`/`getCollapserStyles` that existed in v1 but wasn't really
  > documented
- the `TextIconSpacing` component now requires a parent element with
  `display: flex` to work since it renders as a `<Fragment>` instead of a
  `<div>`
- the spacing is now handled with `margin` instead of `padding` with the
  `TextIconSpacing` component
- the icon is now placed before the `children` instead of after by default for
  the `TextIconSpacing` component
- added a new `forceIconWrap` prop to the `TextIconSpacing` component to help
  with custom components that don't accept a `className` prop being cloned in
  for the spacing styles
- added additional props to the `TextIconSpacing` for additional customization
  for the spacing behavior
- simplified svg style precedence to be easier to override (`.rmd-icon--svg`
  instead of `svg.md-icon`)
- changing the size for font icons and svg icons is now the same since they use
  css variables

### Breaking Changes

- all icons were updated to have `aria-hidden="true"` by default.
- all icons no longer support applying theme colors with the `primary`,
  `secondary`, `disabled`, `error`, and `inherit` props and requires custom css
  instead
- the `IconSeparator` has been renamed to `TextIconSpacing` and now renders the
  `children` as the `label` and requires an `icon` prop (the reverse of v1)
- the `SVGIcon` no longer has the `titleAttr`, `title`, and `desc` props since
  they aren't actually helpful with accessibility out of the box since
  `aria-label`/`aria-labelledby` is preferred
- the `SVGIcon` changed the default `role` from `"img"` to `"presentation"`

#### New SCSS Variables, Functions, and Mixins

- `$rmd-icon-material-icons-font: false !default` - boolean if you are using the
  `material-icons` font icon library and automatically fix the dense spec
- `$rmd-icon-use-font-icons: true !default` - boolean if you want to include the
  styles for font icons. You can maybe save a few bytes by disabling this
  variable if you only use svg icons
- `$rmd-icon-use-svg-icons: true !default` - boolean if you want to include the
  styles for svg icons. You can maybe save a few bytes by disabling this
  variable if you only use font icons
- `@function rmd-icon-theme` - gets one of the icon's theme values
- `@function rmd-icon-theme-var` - gets one of the icon's theme values as a css
  variable
- `@mixin rmd-icon-theme` - applies one of the icon's theme values as a css
  property
- `@mixin rmd-icon-theme-update-var` - updates one of the icon's theme css
  variables
- `@mixin rmd-icon-text-spacing` - a mixin that allows you to separate two
  elements

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-font-icon-include-dense` to `$rmd-icon-include-dense`
- renamed `$md-font-icon-size` to `$rmd-icon-size` and changed the default value
  from `24px` to `$1.5rem`
- renamed `$md-font-icon-dense-size` to `$rmd-icon-dense-size` and changed the
  default value from `20px` to `1.25rem`
- renamed `$md-font-icon-separator-padding` to `$rmd-icon-spacing-with-text` and
  changed the default value from `16px` to `0.5rem`
- renamed `@mixin react-md-icons-dense` to `rmd-icon-dense-theme`

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-font-icon-include-separators` since it is always included by
  default
- removed `$md-font-icon-include-dense-material-icons` since it is no longer
  required
- removed `$md-font-icon-light-theme-disabled-color` and
  `$md-font-icon-dark-theme-disabled-color` since they are no longer required
- removed `@mixin react-md-theme-icons` since it is no longer required
- removed `@mixin react-md-icons-media` since it is no longer required
