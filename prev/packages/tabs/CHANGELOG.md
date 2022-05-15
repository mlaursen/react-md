# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)


### Bug Fixes

* **@react-md/tabs:** Scroll tabs correctly in RTL mode ([a23d708](https://github.com/mlaursen/react-md/commit/a23d7089e9ec58a3dc903b202b01628b9908e3d6)), closes [#1356](https://github.com/mlaursen/react-md/issues/1356)






# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)

**Note:** Version bump only for package @react-md/tabs





## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)

**Note:** Version bump only for package @react-md/tabs





# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
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






## [3.1.1](https://github.com/mlaursen/react-md/compare/v3.1.0...v3.1.1) (2021-09-12)


### Bug Fixes

* **typescript:** added missing readonly prefix to `TabsManager` tabs prop ([45d9458](https://github.com/mlaursen/react-md/commit/45d9458ad01e30be1364357f2f78c1aa4c685dfd))






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Bug Fixes

* **typescript:** updated all array types to be readonly ([8f71bcb](https://github.com/mlaursen/react-md/commit/8f71bcbde12928434975c6836079c3dda7c6ab1f))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Bug Fixes

* Updated peerDependencies to fix yarn berry peer requirements ([250efcd](https://github.com/mlaursen/react-md/commit/250efcdd81ea39c06b08eb30109589c89d9b8e0f)), closes [#1224](https://github.com/mlaursen/react-md/issues/1224)






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)

**Note:** Version bump only for package @react-md/tabs





## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

**Note:** Version bump only for package @react-md/tabs





## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)

**Note:** Version bump only for package @react-md/tabs





## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Other Internal Changes

* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/tabs





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)

**Note:** Version bump only for package @react-md/tabs





# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))
* **tsdoc:** updated \@since annotations ([c62027e](https://github.com/mlaursen/react-md/commit/c62027ebf2223167a2fde0378882e4b934d61971))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/tabs





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Features

- [@react-md/tabs](../tabs): updated tabs to use the new resize observer API
  ([052b3f2](https://github.com/mlaursen/react-md/commit/052b3f25db47077c53091bd1fb63f3e0b56a7fee))
- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Features

- [@react-md/tabs](../tabs): updated tabs to use the new resize observer API
  ([052b3f2](https://github.com/mlaursen/react-md/commit/052b3f25db47077c53091bd1fb63f3e0b56a7fee))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package [@react-md/tabs](../tabs)

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

Tabs were completely re-written for the v2 release to help fix the missing
accessibility issues from v1. The API was changed a lot to hopefully make
working with tabs a bit easier by no longer doing weird things under the hood
like cloning props into each tab and content.

Starting with v2, the tabs will be created by initializing a `TabsManager`
component with a DOM id prefix to use for each tab as well as an ordered list
tabs that can either be a renderable element or a configuration object for each
tab. To render the tabs, just render the `Tabs` component as a child of the
`TabsManager`. The "tricky" part with the new API is that

```tsx
const tabs = ["Tab 1", "Tab 2", "Tab 3"];

const Example = () => (
  <TabsManager tabs={tabs} tabsId="basic-usage-tabs">
    <Tabs />
    <TabPanels>
      <TabPanel>
        <Typography type="headline-4">Panel 1</Typography>
      </TabPanel>
      <TabPanel>
        <Typography type="headline-4">Panel 2</Typography>
      </TabPanel>
      <TabPanel>
        <Typography type="headline-4">Panel 3</Typography>
      </TabPanel>
    </TabPanels>
  </TabsManager>
);
```

### New Features / Behavior

- the new `TabsManager` allows for the `Tabs` and `TabPanel` to be as a child at
  any depth of the `TabsManager` since the tabs configuration and state is now
  managed with React context
- the `TabPanel`s now support lazy-loading/dynamic rendering or being persistent
  within the DOM
- fixed the accessibility issues for the tabs and correctly implement the tab
  widget specifications
- the tab indicator color can now be configured with SCSS variables

### Breaking Changes

- removed the built-in (somewhat broken) support for swiping on mobile devices
  to change tabs
- removed the built-in (completely broken) support for switching to a dropdown
  menu on desktop for additional tabs
- removed the `MenuTab` component
- removed the `TabsContainer` component
- dropped support for multiline text tabs

#### New SCSS Variables, Functions, and Mixins

- `$rmd-tab-veritcal-padding: 0.75rem !default` - the amount of padding to apply
  to the top and bottom of the tab's content
- `$rmd-tab-indicator-color: rmd-theme-var(primary) !default` - The background
  color for the active tab indicator
- `$rmd-tab-active-color: rmd-theme-var(text-primary-on-background) !default` -
  The text color to use for an active tab
- `$rmd-tab-inactive-color: rmd-theme-var(text-secondary-on-background) !default` -
  The text color to use for an inactive tab
- `$rmd-tab-disabled-color: rmd-theme(text-disabled-on-background) !default` -
  The text color to use for a disabled tab
- `$rmd-tabs-scrollable-padding: 3.25rem !default` - The amount of padding tp
  use before the first tab when the `scrollable` prop is enabled on the `Tabs`
  component
- `@function rmd-tabs-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-tabs-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-tabs-theme` - applies one of the theme values to a css property as
  a css variable
- `@mixin rmd-tabs-theme-update-var` - updates one of the theme values as a css
  variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-tab-height` to `$rmd-tab-height` and changed the default value
  from `48px` to `3rem`
- renamed `$md-tab-icon-height` to `$rmd-tab-stacked-height` and changed the
  default value from `72px` to `4.5rem`
- renamed `$md-tab-mobile-min-width` to `$rmd-tab-min-width` and changed the
  default value from `72px` to `5.625rem`
- renamed `$md-tab-max-width` to `$rmd-tab-max-width` and changed the default
  value from `264px` to `20rem`
- renamed `$md-tab-indicator-height` to `rmd-tab-active-indicator-height` and
  changed the default value from `2px` to `0.125rem`
- renamed `$md-tab-padding` to `$rmd-tab-horizontal-padding` and changed the
  default value from `12px` to `1rem`

#### Removed SCSS Variables and Mixins

- removed `$md-tab-include-icons` since the styles are always included
- removed `$md-tab-include-toolbars` and `$md-tab-include-prominent-toolbars`
  since this is no longer required and should work automatically with the new
  [@react-md/app-bar]
- removed `$md-tab-include-pagination-overflow` since it never worked to begin
  with and is no longer supported
- removed `$md-tab-include-menu-overflow` since it never worked to begin with
  and is no longer supported
- removed `$md-tab-include-swipeable` since swiping is no longer supported
- removed `$md-tab-multiline-font-size` since multiline text tabs aren't
  supported
- removed `$md-tab-single-line-padding-bottom` since there multiline text tabs
  aren't supported
- removed `$md-tab-desktop-font-size`, `$md-tab-desktop-min-width`, and
  `$md-tab-desktop-padding` since the size no longer changes between mobile and
  desktop
- removed `$md-tab-icon-padding-bottom` and `$md-tab-icon-margin-bottom` since
  the icon spacing comes from the [@react-md/icon] package's
  `$rmd-text-icon-spacing` variable

[@react-md/app-bar]:
  https://github.com/mlaursen/react-md/tree/main/packages/app-bar
[@react-md/icon]: https://github.com/mlaursen/react-md/tree/main/packages/icon
