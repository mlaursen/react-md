# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)

**Note:** Version bump only for package @react-md/icon





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Other Internal Changes

* chore!(icon): Renamed the download icon to upload ([2752a98](https://github.com/mlaursen/react-md/commit/2752a981fe4021636de66f8576fdd8842a7e90af))






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Bug Fixes

* **@react-md/icon:** `FileInput` default icon changed from `file_download` to `file_upload` ([174d1c1](https://github.com/mlaursen/react-md/commit/174d1c1511387f316b832f3d4e43ac7f53848cbe)), closes [#1325](https://github.com/mlaursen/react-md/issues/1325)


### Other Internal Changes

* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)

**Note:** Version bump only for package @react-md/icon





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






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Other Internal Changes

* **react-md.dev:** updated examples to work with `sass` instead of node-sass ([d8ddf51](https://github.com/mlaursen/react-md/commit/d8ddf517eb5d5a5b83388da2cf72a61b51c74556))






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/icon





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)

**Note:** Version bump only for package @react-md/icon





## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/icon





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Other Internal Changes

* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))
* **tsdoc:** updated \@since annotations ([c62027e](https://github.com/mlaursen/react-md/commit/c62027ebf2223167a2fde0378882e4b934d61971))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/icon





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/icon](../icon)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/icon](../icon)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

### Features

- [@react-md/icon](../icon): added an error icon to the IconProvider Component
  and useIcon Hook
  ([4dfd50a](https://github.com/mlaursen/react-md/commit/4dfd50a3c41d450b88ff2f417b27113724813bb3))
- [@react-md/icon](../icon): added flexReverse prop to TextIconSpacing
  ([c4ee05b](https://github.com/mlaursen/react-md/commit/c4ee05b1d0f8b8f6ed4de51f904dce2995787b81))

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/icon](../icon)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/icon](../icon)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.3.0...v2.3.1) (2020-09-15)

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
