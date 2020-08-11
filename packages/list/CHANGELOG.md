# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package @react-md/list

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/list

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/list

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- ListItem disabled states
  ([7b37292](https://github.com/mlaursen/react-md/commit/7b372926289d0c1cdab76dbea9cb298e7594dfa9))

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

This package has a lot of changes from the v1 API that should hopefully make it
easier to use. There are also new components to help with styling and
positioning of addons that can be used without a `ListItem`/`List` component.

### New Behavior and Features

- all components now correctly forward the `ref` to the DOM element
- introduced a new `dense` spec instead of using `mobile`/`desktop` which is
  enabled by default once desktop media matches but can be disabled by setting
  `$rmd-utils-auto-dense: false`
- added a `ListItemChildren` component that allows you to get all the styling of
  the children within a `ListItem` without requiring the use of the `ListItem`
- added a `ListItemAddon` component that can be used to add spacing between the
  `children` and an addon with the `ListItem` spacing styles
- added a `SimpleListItem` component if you don't want to create a clickable
  `ListItem` but honestly shouldn't be used too much due to how screen readers
  read `<li>` elements
- added a `ListItemText` component that allows you to render the primary and
  optional secondary text that is normally stacked
- added a `ListItemLink` component that allows you to render a link with the
  `ListItem` styles
- the `ListItem` no longer renders as an `AccessibleFakeButton` and has a
  simpler HTML structure
- the `ListItem` now supports rendering images with two different sizes
- the `ListItem` now renders children to the left and/or right of the
  text/children with the new `leftAddon`, `leftAddonType`, `rightAddon`, and
  `rightAddonType` props
- the `ListItem` now supports rendering the addons in different vertical
  positions by default with the `leftAddonPosition` and `rightAddonPosition`
  props
- the `ListItem` now supports rendering the `children` as the `primaryText` when
  enabling the `textChildren` prop
- added built-in support for right-to-left languages with the list item addons
- the `Subheader` component was renamed to `ListSubheader`
- the `ListSubheader` now renders `children` instead of using a `primaryText`
  prop
- updated all of the sizing and padding values of the list item to be
  configurable with CSS variables along with the new theming API available
  through mixins

### Breaking Changes

- removed the `ListItemControl` component and built-in functionality for
  rendering checkbox, radio, or switch elements within a `ListItem`
- the `List` component renamed the `inline` prop to `horizontal`
- the `List` component now renders with `role="none"` by default
- the `ListSubheader` component no longer supports styling text with the primary
  theme color out of the box
- removed the ability to render nested list items but added a new
  `@react-md/tree` to handle those use-cases
- basically everything about the `ListItem` component is a breaking change

#### New SCSS Variables, Functions, and Mixins

- `$rmd-list-dense-horizontal-padding: 0 !default` - a new variable if you want
  to add left/right padding to the `List` component
- `$rmd-list-dense-horizontal-padding: $rmd-list-horizontal-padding !default` -
  a new variable if you want to add left/right padding to the `List` component
  when using the dense spec
- `$rmd-list-item-vertical-padding: 0.5rem !default` - the amount of padding to
  add to the top and bottom of each list item
- `$rmd-list-item-horizontal-padding: 1rem !default` - the amount of padding to
  add to the left and right of each list item
- `$rmd-list-item-extra-large-height: 4.5rem !default` - the height for a list
  item that has a single line of text with an image or two lines of text with an
  addon that is not an image
- `$rmd-list-item-dense-extra-large-height: 4.5rem !default` - the height for a
  list item that has a single line of text with an image or two lines of text
  with an addon that is not an image when using the dense spec
- `$rmd-list-item-secondary-text-line-height: 1.42857 !default` - the
  `line-height` to use for the secondary text within a list item
- `$rmd-list-item-secondary-text-three-line-max-height: 3rem !default` - the max
  height allowed for a list item's secondary text so that the line-clamp
  functionality works correctly
- `$rmd-list-item-dense-secondary-text-three-line-max-height: 2.25rem !default`
  -the max height allowed for a list item's secondary text so that the
  line-clamp functionality works correctly with the dense spec
- `$rmd-list-item-media-size: 3.5rem !default` - the horizontal size to use for
  a media item within a list item
- `$rmd-list-item-media-large-size: 6.25rem !default` - the horizontal size to
  use for a large media item within a list item
- `$rmd-list-item-media-spacing: 1rem !default` - the amount of spacing to place
  between a media addon and the main content within a list item
- `@function rmd-list-theme` - gets one of the list's theme values
- `@function rmd-list-theme-var` - gets one of the list's theme values as a css
  variable
- `@mixin rmd-list-theme` - applies one of the list's theme values as a css
  property
- `@mixin rmd-list-theme-update-var` - updates one of the list's theme css
  variables
- `@mixin rmd-list-unstyled` - a new mixin that can be used to disable the list
  styles quickly
- `@mixin rmd-list-dense-theme` - applies styles to implement a dense theme for
  the `List` component
- `@mixin rmd-list-item-dense-theme` - applies styles to implement a dense theme
  for the `ListItem` component

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-list-mobile-padding` to `$rmd-list-vertical-padding` and changed
  the default value from `8px` to `0.5rem`
- renamed `$md-list-mobile-primary-font-size` to `$rmd-list-font-size` and
  changed the default value from `16px` to `1rem`
- renamed `$md-list-mobile-height` to `$rmd-list-item-height` and changed the
  default value from `48px` to `3rem`
- renamed `$md-list-mobile-avatar-height` to `$rmd-list-item-medium-height` and
  changed the default value from `56px` to `3.5rem`
- renamed `$md-list-mobile-two-lines-height` to `$rmd-list-item-large-height`
  and changed the default value from `72px` to `4rem`
- renamed `$md-list-mobile-three-lines-height` to
  `$rmd-list-item-three-line-height` and changed the default value from `88px`
  to `5.5rem`
- renamed `$md-list-desktop-padding` to `$rmd-list-dense-vertical-padding` and
  changed the default value from `4px` to `0.25rem`
- renamed `$md-list-desktop-primary-font-size` to `$rmd-list-dense-font-size`
  and changed the default value from `13px` to `0.8125rem`
- renamed `$md-list-desktop-height` to `$rmd-list-item-dense-height` and changed
  the default value from `40px` to `2.5rem`
- renamed `$md-list-desktop-avatar-height` to
  `$rmd-list-item-dense-medium-height` and changed the default value from `48px`
  to `3rem`
- renamed `$md-list-desktop-two-lines-height` to
  `$rmd-list-item-dense-large-height` and changed the default value from `60px`
  to `3.5rem`
- renamed `$md-list-desktop-three-lines-height` to
  `$rmd-list-item-dense-three-line-height` and changed the default value from
  `76px` to `5rem`
- renamed `$md-list-left-padding` to `$rmd-list-item-text-keyline` and changed
  the default value from `72px` to `4.5rem`

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-list-inline-padding`
- removed `$md-list-include-icon`, `$md-list-include-avatar`,
  `md-list-include-two-lines`, `$md-list-include-three-lines`,
  `$md-list-include-controls`, `$md-list-include-inline`, and
  `$md-list-include-unstyled-class-name` variables
- removed `$md-list-divider-margin` since it is no longer needed
- removed the `$md-list-nested-items-depth`, `$md-list-nested-items-increment`,
  and `$md-list-nested-items-initial-padding` variables since the functionality
  for nested items was removed
- removed `$md-list-desktop-secondary-font-size`, `$md-list-padding`,
  `$md-list-primary-font-size`, `$md-list-secondary-font-size`,
  `$md-list-height`, `$md-list-avatar-height`, `$md-list-two-lines-height`,
  `$md-list-three-lines-height`, and `$md-list-three-lines-addon-margin-top`
  since primary and secondary text now have the same font size by default
- removed `$md-list-addon-line-height`,
  `$md-list-mobile-three-lines-addon-margin-top`,
  `$md-list-desktop-three-lines-addon-margin-top` since it is no longer needed
- removed `%md-list-unstyled` placeholder since placeholders are considered bad
  practice
- removed the `react-md-theme-lists` mixin since the background colors now are
  inherited with the `--rmd-theme-background`/`--rmd-theme-surface` css
  variables
