# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.6](https://github.com/mlaursen/react-md/compare/v5.1.5...v5.1.6) (2023-12-11)

**Note:** Version bump only for package @react-md/layout





## [5.1.4](https://github.com/mlaursen/react-md/compare/v5.1.3...v5.1.4) (2022-06-16)

**Note:** Version bump only for package @react-md/layout





## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Bug Fixes

* **@react-md/layout:** fix spelling of `DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES` ([2d20a2e](https://github.com/mlaursen/react-md/commit/2d20a2ee503f511127704984b29899de42c5e055))


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)


### Other Internal Changes

* **@react-md/layout:** Update snapshots after updating tree component ([ec84800](https://github.com/mlaursen/react-md/commit/ec8480078c37f56f65250dd46d77b3ffe41280ac))






## [5.1.1](https://github.com/mlaursen/react-md/compare/v5.1.0...v5.1.1) (2022-04-01)

**Note:** Version bump only for package @react-md/layout





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Other Internal Changes

* feat!(menu): Implemented new Menu API ([c27bf55](https://github.com/mlaursen/react-md/commit/c27bf558a950bf2938811a98b2b168efca4055cc))


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

* Update tests to use jest.mocked ([4bb25fb](https://github.com/mlaursen/react-md/commit/4bb25fb3f1c74a6df643aff5e6fc28fa33cff29e))
* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.2](https://github.com/mlaursen/react-md/compare/v4.0.1...v4.0.2) (2021-11-30)

**Note:** Version bump only for package @react-md/layout





## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Bug Fixes

* **@react-md/layout:** Added fixes required for Concurrent Rendering ([c0b29a8](https://github.com/mlaursen/react-md/commit/c0b29a82d5c59acc87ebcd22530fcf093d445705))


### Other Internal Changes

* Updated imports to use `import type` when possible ([ba96bb6](https://github.com/mlaursen/react-md/commit/ba96bb62eeddcc0879f6d584aa670850203561e6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
* **@react-md/typography:** Renamed Text to `Typography` ([30cf056](https://github.com/mlaursen/react-md/commit/30cf056fbaf0e3d28e04dd03f1fd37929967f7ab))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* Updated remaining docs and tests for `react-router-dom` v6 ([e012ef9](https://github.com/mlaursen/react-md/commit/e012ef961b21d2583fe6d34114e36ee31ac042a6))
* **react-md:** Remove prop-types package and usage ([2637a6f](https://github.com/mlaursen/react-md/commit/2637a6f43d681a06054e3a4518f692cf51baf997))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **@react-md/typography:** The Text component has been renamed to Typography to
help with auto-imports conflicting with the Text element that exists in
`lib.d.ts`
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


### Other Internal Changes

* **@react-md/tooltip:** removed TooltipHoverModeConfig component ([664ec30](https://github.com/mlaursen/react-md/commit/664ec300b76f7f1c611e9744e6c5eb06ee595ef6))
* **@react-md/utils:** removed InteractionModeListener alias ([216c8ef](https://github.com/mlaursen/react-md/commit/216c8efe62a12e031414d94c17f97cb4c12c4b8e))


### Breaking Changes

* **@react-md/utils:** Removed `InteractionModeListener` since it was an alias for `UserInteractionModeListener`
* **@react-md/tooltip:** Removed `TooltipHoverModeConfig` component






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Bug Fixes

* **@react-md/layout:** Do not unmount children when swapping to non-fixed appbar mini layouts ([64103c8](https://github.com/mlaursen/react-md/commit/64103c8f3cc87cd5684cc354f4976d6034262ee4)), closes [#1207](https://github.com/mlaursen/react-md/issues/1207)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)


### Bug Fixes

* **@react-md/layout:** `useLayoutNavigation` possible perf fix ([3d65e4e](https://github.com/mlaursen/react-md/commit/3d65e4eb3aec446d1d821fc9d86896d9758ab4fc))


### Other Internal Changes

* **@react-md/layout:** Added additional test coverage ([7c123ef](https://github.com/mlaursen/react-md/commit/7c123ef14e76e0bd74eab32c38a7c2cb58ae0c02))






## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)

**Note:** Version bump only for package @react-md/layout





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Other Internal Changes

* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Bug Fixes

* **@react-md/layout:** Added fixedAppBar flag into the `useLayoutConfig` ([14e6587](https://github.com/mlaursen/react-md/commit/14e65875b295a1143587908ac170983e277269b5))
* **@react-md/layout:** Mini Layouts Align Icons with Hamburger `Menu` in Dense Mode ([abbe9a9](https://github.com/mlaursen/react-md/commit/abbe9a9fb407cac8407abba978a35bbaa15adf72))
* **@react-md/layout:** non-fixed `AppBar` mini layouts ([84313fc](https://github.com/mlaursen/react-md/commit/84313fc20f9ffb46314573fc62fa54925fe6c631)), closes [#1101](https://github.com/mlaursen/react-md/issues/1101)
* **@react-md/layout:** Offset for temporary mini layouts ([86e75bf](https://github.com/mlaursen/react-md/commit/86e75bf9abb8c5b09ad8bdd81f27642f622a8168))


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/layout





## [2.8.1](https://github.com/mlaursen/react-md/compare/v2.8.0...v2.8.1) (2021-04-23)

**Note:** Version bump only for package @react-md/layout





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **@react-md/layout:** Updated `Configuration` to use new `HoverModeProvider` ([357f2bf](https://github.com/mlaursen/react-md/commit/357f2bf35a1c2749aa5767bf124ad2d3521ebdb2))
* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Other Internal Changes

* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Features

* **@react-md/layout:** added support for mini layouts ([36b3cbc](https://github.com/mlaursen/react-md/commit/36b3cbc02a059cae20d7495ff369570003bc0a47))


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))
* **tsdoc:** updated \@since annotations ([c62027e](https://github.com/mlaursen/react-md/commit/c62027ebf2223167a2fde0378882e4b934d61971))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)


### Bug Fixes

* **@react-md/layout:** floating layout has correct color in dark theme ([7fa6b0c](https://github.com/mlaursen/react-md/commit/7fa6b0c415b87aade6296b7c5083abe1e75abf24))
* **@react-md/layout:** toggleable layout title now aligns with persistent layouts ([8b8efb2](https://github.com/mlaursen/react-md/commit/8b8efb2ac6176975e4f3898956916350526487fa))


### Features

* **@react-md/layout:** added prop to control toggleable layouts default visibility ([6e4a06d](https://github.com/mlaursen/react-md/commit/6e4a06db83d079bf67f75a1625e4375effd159b0)), closes [#1066](https://github.com/mlaursen/react-md/issues/1066)


### Other Internal Changes

* **@react-md/utils:** refactored UserInteractionMode hooks and components ([af72791](https://github.com/mlaursen/react-md/commit/af7279154bf8d5b4d4c8ee83e8e0815354e5eee0))






## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.5.3](https://github.com/mlaursen/react-md/compare/v2.5.2...v2.5.3) (2021-01-12)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.5.2](https://github.com/mlaursen/react-md/compare/v2.5.1...v2.5.2) (2021-01-12)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.5.1](https://github.com/mlaursen/react-md/compare/v2.5.0...v2.5.1) (2020-12-16)

**Note:** Version bump only for package [@react-md/layout](../layout)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.4.3](https://github.com/mlaursen/react-md/compare/v2.4.2...v2.4.3) (2020-11-14)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/layout](../layout)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))
- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.3.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/layout](../layout)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Features

- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/layout](../layout)

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/layout](../layout)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/layout](../layout)

## [2.0.4](https://github.com/mlaursen/react-md/compare/v2.0.3...v2.0.4) (2020-07-10)

### Bug Fixes

- Added [@react-md/form](../form) as a dependency to
  [@react-md/layout](../layout)
  ([e83b296](https://github.com/mlaursen/react-md/commit/e83b2969b38e012d27eac27b69fce506497aa79b))

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

This package is kind of a replacement for the `NavigationDrawer` component that
also now has a top-level `Configuration` provider for `react-md`.

### New Behavior and Features

- every part of the layout is now completely configurable by exporting multiple
  layout components along with a `<name>Props` configuration object
- better built-in support for rendering navigation trees with the new
  `useLayoutNavigation` hook and `LayoutTree` component
- when the persistent navigation panel toggles in and out of view, the title and
  main content will now correctly use the same animation timing as the panel
- the layout will no longer animate while switching layout types due to resizing
  and instead will update instantly
- a new `useLayoutConfig` hook that allows controlled the layout for additional
  customization
- new exported utils for determining what the current layout type is being
  rendered as
- keyboard focus behavior is now correctly maintained while toggling the
  temporary and persistent layout types
- all the icon buttons now have a default `aria-label` for toggling the
  temporary and persistent layouts
- the `<main>` element will now gain a focus box-shadow while being keyboard
  focused
- the `<main>` element will only gain a `tabIndex={-1}` while in keyboard mode
  so that clicking anywhere in the `<main>` content will not re-focus the main
  element. This is super nice since it allows you to click somewhere within the
  `<main>` element and press `tab` to focus the closest focusable element

### Breaking Changes

Everything is a really a breaking change since the components were re-written
and the API has changed, but here are a few notable points:

- this release does not have a `mini` variant for the temporary and persistent
  layout types. The `mini` variant will be added in a following release once I
  figure out a better way to handle these types along with keyboard movement
- the `Layout` has no functionality for determining your current app size since
  it was moved to the [@react-md/utils] package as `AppSizeListener` and
  `useAppSize`
- removed the static `getCurrentMedia` function from the component
- removed the `DrawerType` and `DrawerTypes` static enums from the component

#### New SCSS Variables, Functions, and Mixins

- `$rmd-layout-enter-duration: $rmd-sheet-enter-duration !default` - the
  duration when the toggleable navigation panel comes into view
- `$rmd-layout-leave-duration: $rmd-sheet-leave-duration !default` - the
  duration when the toggleable navigation panel leaves the view
- `$rmd-layout-main-focus-shadow: $rmd-states-focus-shadow !default` - the
  box-shadow to use when the `<main>` element has been keyboard focused
- `$rmd-layout-main-focus-z-index: 999 !default` - the z-index for the `<main>`
  element when it has been keyboard focused
- `$rmd-layout-navigation-z-index: $rmd-dialog-z-index !default` - the z-index
  for the navigation pane
- `$rmd-layout-navigation-width: $rmd-sheet-static-width !default` - the width
  to use for the desktop persistent navigation panel
- `$rmd-layout-mini-navigation-width: 4.5rem !default` - the width to use for
  the mini navigation tree. **Note: currently not implemented**
- `@function rmd-layout-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-layout-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-layout-theme-update-var` - updates one of the theme values as a
  css variable

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-navigation-drawer-enforce-height` since it is no longer used
- removed `$md-navigation-drawer-use-view-height` since it lead to a lot of
  problems
- removed `$md-navigation-drawer-include-cross-fade`,
  `$md-cross-fade-transition-time`, and `$md-cross-fade-distance` since this is
  now part of the [@react-md/transition] package
- removed `$md-navigation-drawer-title-offset` since this is automatically
  calculated with CSS variables

[@react-md/transition]:
  https://github.com/mlaursen/react-md/tree/main/packages/transition
[@react-md/utils]: https://github.com/mlaursen/react-md/tree/main/packages/utils
