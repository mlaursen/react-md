# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.6](https://github.com/mlaursen/react-md/compare/v5.1.5...v5.1.6) (2023-12-11)


### Bug Fixes

* **select:** port fixed positioning fixes back from v6.0.0 ([feb9ec6](https://github.com/mlaursen/react-md/commit/feb9ec6c32c22665851d6e470aa38637b0d3b32e)), closes [#1461](https://github.com/mlaursen/react-md/issues/1461)






## [5.1.4](https://github.com/mlaursen/react-md/compare/v5.1.3...v5.1.4) (2022-06-16)

### Bug Fixes

* add missing dependencies ([5329812](https://github.com/mlaursen/react-md/commit/532981291e7c30018a151400cb891b693255ed78))





## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)

**Note:** Version bump only for package @react-md/menu





## [5.1.1](https://github.com/mlaursen/react-md/compare/v5.1.0...v5.1.1) (2022-04-01)

**Note:** Version bump only for package @react-md/menu





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Features

* **@react-md/menu:** Provide props for Menu's `List` ([2b5fb23](https://github.com/mlaursen/react-md/commit/2b5fb232be0a41044347acfc0268ab5036b13c33))


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Features

* **@react-md/menu:** Better floating action button default behavior ([0cdeff7](https://github.com/mlaursen/react-md/commit/0cdeff72ac8c6b2f2808714299774fab0d490222))


### Other Internal Changes

* feat!(menu): Implemented new Menu API ([c27bf55](https://github.com/mlaursen/react-md/commit/c27bf558a950bf2938811a98b2b168efca4055cc))
* **@react-md/menu:** Added tests for the new menu API and fixed a few issues ([7202dd0](https://github.com/mlaursen/react-md/commit/7202dd00a2e734dd1a58d29142b551d8a9411b5a))
* **@react-md/menu:** Fixed `MenuBar` visibility for touch devices ([1288be7](https://github.com/mlaursen/react-md/commit/1288be768766b885c16f370b90291922be334696))
* **@react-md/menu:** Fixed keyboard movement in MenuBars with visible menus ([5b2494a](https://github.com/mlaursen/react-md/commit/5b2494a2b2a34f1a53be97d07b1fc959eba8f6c1))


### Breaking Changes

* Menu buttons will no longer open by pressing the
`ArrowUp` or `ArrowDown` keys.
* The `DropdownMenu` component no longer accepts a list
of `items` and instead the `children` should be the `MenuItem`
components.
* The `DropdownMenu` component no longer supports the
`menuRenderer` and `itemRenderer` props. Instead, there is built-in
support for conditionally rendering as a `Sheet` component using the
`renderAsSheet` prop.
* The `DropdownMenu` component now requires a parent
`AppSizeListener` because of the conditional `Sheet` rendering
functionality. This might require updating your tests to either use the
`Configuration` component from `@react-md/layout` (recommended) or
adding the `AppSizeListener` to tests that include `DropdownMenu`s.
* The `DropdownMenuItem` component is no longer required
for nested dropdown menus and is an "internal" component instead that
shouldn't really be used.
* The `MenuItemSeparator` now renders as an `<li>`
instead of an `<hr>` or `<div>`.
* The `useContextMenu` now returns an object instead of an
ordered list.
* Using any of the `MenuItem` components requires the
`<MenuKeyboardFocusProvider>` to be mounted as a parent component which
might affect tests. This will not break anything if you are using the
`DropdownMenu` or `Menu` components.






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Bug Fixes

* **@react-md/menu:** Added fixes required for Concurrent Rendering ([05ec620](https://github.com/mlaursen/react-md/commit/05ec620a4447c904f311e5f98a3580ce56ece35f))


### Other Internal Changes

* Updated imports to use `import type` when possible ([ba96bb6](https://github.com/mlaursen/react-md/commit/ba96bb62eeddcc0879f6d584aa670850203561e6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **@react-md/menu:** `DropdownMenu` and `Menu` portal by default ([98a6a9f](https://github.com/mlaursen/react-md/commit/98a6a9fe4c5c8cf1baf630e5969b760af93e9ad2)), closes [#1264](https://github.com/mlaursen/react-md/issues/1264)
* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* **react-md:** Remove prop-types package and usage ([2637a6f](https://github.com/mlaursen/react-md/commit/2637a6f43d681a06054e3a4518f692cf51baf997))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **@react-md/menu:** The `DropdownMenu` and `Menu` components portal by
default. This should really only affect snapshot tests
* **react-md:** There will no longer be run-time prop validation with
the `prop-types` package.






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Bug Fixes

* **typescript:** updated all array types to be readonly ([8f71bcb](https://github.com/mlaursen/react-md/commit/8f71bcbde12928434975c6836079c3dda7c6ab1f))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Bug Fixes

* Updated peerDependencies to fix yarn berry peer requirements ([250efcd](https://github.com/mlaursen/react-md/commit/250efcdd81ea39c06b08eb30109589c89d9b8e0f)), closes [#1224](https://github.com/mlaursen/react-md/issues/1224)






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)

**Note:** Version bump only for package @react-md/menu





## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/menu





## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)

**Note:** Version bump only for package @react-md/menu





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Other Internal Changes

* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/menu





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Other Internal Changes

* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Bug Fixes

* **@react-md/menu:** fixed menu color when dark theme elevation is enabled ([52c752d](https://github.com/mlaursen/react-md/commit/52c752d05a4a3cb3fb0119e213db7b58218fbfa9)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/menu





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.5.1](https://github.com/mlaursen/react-md/compare/v2.5.0...v2.5.1) (2020-12-16)

**Note:** Version bump only for package [@react-md/menu](../menu)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.4.3](https://github.com/mlaursen/react-md/compare/v2.4.2...v2.4.3) (2020-11-14)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

### Bug Fixes

- [@react-md/menu](../menu): fixed DropdownMenu not being able to provide style
  and className to Menu
  ([7823fea](https://github.com/mlaursen/react-md/commit/7823fea2ff2979792942534b0bc6cf753bd5ac9a)),
  closes [#989](https://github.com/mlaursen/react-md/issues/989)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/menu](../menu)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.3.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/menu](../menu)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/menu](../menu)

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/menu](../menu)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/menu](../menu)

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

The menu package was completely re-written to fix all the accessibility issues
and keyboard focus behavior.

The main exports starting in v2:

- `DropdownMenu`
- `MenuItem`
- `MenuItemLink`
- `MenuItemSeparator`
- `DropdownMenuItem`
- `defaultMenuRenderer`
- `defaultMenuItemRenderer`
- `useContextMenu`

### New Features / Behavior

- the menu will now automatically position itself within the viewport with fixed
  positioning
- implemented custom context menus with a new `useContextMenu` hook
- nested dropdown menus are fully supported along with keyboard movement and
  open/close behavior
- no longer use the `menuItem` props and instead render the `MenuItem` component
  instead within the `DropdownMenu`
- no longer uses the weird `Layover` component

### Breaking Changes

- the visibility for the menus can no longer be controlled externally. this
  functionality will come back in a later release
- the menu no longer supports relative positioning
- the `MenuButton` is no longer a combination of a `Button` and a `Menu` and
  instead is an accessibility helper component

#### New SCSS Variables, Functions, and Mixins

- `$rmd-menu-background-color: rmd-theme-var(surface) !default` - The background
  color to use in menus
- `$rmd-menu-color: rmd-theme-var(on-surface) !default` - The text color to use
  in menus
- `$rmd-menu-elevation: 8 !default` - The elevation/box shadow to use for the
  menu
- `@function rmd-menu-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-menu-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-menu-theme` - applies one of the theme values to a css property as
  a css variable
- `@mixin rmd-menu-theme-update-var` - updates one of the theme values as a css
  variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-menu-z-index` to `$rmd-menu-z-index` and changed the default
  value from `null` (`100` from `Layover`) to `11`
- renamed `$md-menu-min-width` to `$rmd-menu-min-width` and changed the default
  value from `112px` to `7rem`

#### Removed SCSS Variables and Mixins

- removed `$md-menu-include-cascading`, `$md-menu-include-cascading-styles`,
  `$md-menu-cascading-font-size`, `$md-menu-cascading-padding`,
  `$md-cascading-height` and `$md-menu-cascading-list-padding` since the
  cascading/nested menus was completely reworked and no longer needs additional
  styles
- removed all other SCSS variables relating to height and width

#### Accessibility Fixes

The accessibility props were moved from the surrounding `<div>` and instead
applied correctly to the `MenuButton` instead. This also changed the
`aria-haspopup` attribute to be `"menu"` instead of `"true"` and removed the
`aria-controls` since it doesn't really work as expected.

Additional keyboard behavior was also added to both the `MenuButton` and `Menu`
components. When the `MenuButton` is focused, the `ArrowUp` key will open the
menu and focus the last `MenuItem` while the `ArrowDown` key will open the menu
and focus the first `MenuItem`. The user can now also type while the menu is
open to focus specific items that start with the same letters.

The `Menu` now also requires the `aria-label` or `aria-labelledby` props to help
screen readers out as well as applying `role="menu"` and
`aria-orentation="vertical"` (or `"horizontal"`).
