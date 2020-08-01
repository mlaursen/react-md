# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/tabs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/tabs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

**Note:** Version bump only for package @react-md/tabs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added sideEffects field to package.json
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- sideEffects formatting
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
        <Text type="headline-4">Panel 1</Text>
      </TabPanel>
      <TabPanel>
        <Text type="headline-4">Panel 2</Text>
      </TabPanel>
      <TabPanel>
        <Text type="headline-4">Panel 3</Text>
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
  https://github.com/mlaursen/react-md/tree/master/packages/app-bar
[@react-md/icon]: https://github.com/mlaursen/react-md/tree/master/packages/icon
