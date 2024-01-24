# @react-md/core

## 1.0.0-next.4

### Patch Changes

- Fixed Sass variable issues and other CSS tweaks.

## 1.0.0-next.3

### Patch Changes

- The next v6 alpha release.

  # Changes

  ## AppBar

  - Updated `AppBar` to use the `Box` component and additional `cssUtils`
  - Added a `$nav-keyline` variable for the `AppBarTitle` offset

  ## Avatar

  - Fixed the `color` prop definition

  ## Badge

  - Simplified the offset variables

  ## Button

  - Added a `TooltippedButton` component

  ## Card

  - Added a `ClickableCard` component
  - Fixed the `CardSubtitle` color

  ## Dialog

  - Fixed the background colors

  ## Divider

  - Removed the `vertical-sizing` variable and updated the vertical divider to update the same way as a horizontal divider

  ## Expansion Panel

  - Renamed `preventAllClosed` to `preventAllCollapsed` to better match naming schemes

  ## Form

  - Updated `MenuItemInputToggle` to use `multiline` instead of `threeLines`
  - Fixed the `Select` focus behavior when rendering within a `Sheet`

  ## Icon

  - Fixed the styling for the `IconRotator` by setting the default rotate variables
  - Fixed the styling for the `IconSpacing` component when using `above` or `below`

  ## List

  - Renamed `threeLines` to `multiline` and updated the CSS variables to match
  - Fixed some styling by correctly passing all props down
  - Added the ability to disable the spacing for the left addons

  ## Portal

  - Updated `PortalContainerProvider` to support a `RefObject`

  ## Table

  - Fixed the `TableCheckbox` and `TableRadio` components to be client components instead of server components

  ## Tabs

  - Added support for rendering vertically
  - Added support to render a tab as a link instead of a button
  - Renamed the `--rmd-tab-width` to `--rmd-tab-size`

  ## Tooltip

  - Fixed some type definition issues for event handlers

  ## Transition

  - Updated `SkeletonPlaceholder` to `forwardRef`
  - Updated `SkeletonPlaceholder` and `useSkeletonPlaceholder` to support `animation-delay`
  - Added `randomSkeletonPlaceholder` util to generate SSR-only skeletons
  - Fixed the naming of the Sass variables since they weren't prefixed by `transition-`

  ## Tree

  - Fixed the type definitions for the `DefaultTreeItemRenderer` for the `data` prop after switching to `RenderRecursively`
  - Fixed the `Tree` components to start the `--rmd-tree-depth` at `0` instead of `-1`
  - Removed the `--padded` style since it's no longer needed

  ## Typography

  - Updated the base typography to default to `overflow-wrap: break-word`
  - Fixed the `TextContainer` styling to include the padding in the line length

  ## Other

  - Uses `:has` selectors and `:focus-visible` since all major browsers support them now
  - Uses `@media(hover: hover) and (pointer: fine)` for hover states instead of `.mouse-mode`
  - Refactored some draggable utils and fixed bugs around dragging
  - Added a `useElementSize` wrapper for the `useResizeObserver` hook
  - Fixed `useElementSize` to trigger immediately on mount
  - Updated `useWindowSize` to support SSR values

## 1.0.0-next.2

### Major Changes

- Updated custom properties to require a defined value instead of always providing a fallback. This decreases the bundle size by a good amount.

  Also updated the `Snackbar` so that it no longer has a `role="status"` to fix accessibility. Instead, each toast will have `role="status"` or `role="alert"`.

## 1.0.0-next.1

### Major Changes

- 117350ed79: The next preview of v6.0.0.

  Breaking Changes:

  - An accessible label is now required for `CircularProgress` and `LinearProgress`
    - Updated `AsyncButton` to pass props to the progress component and other
      accessibility teaks
    - Updated `CircularProgressSuspense` to default the `aria-label` to `"Loading"`
  - Removed the `VerticalDivider` component
  - Rename `hoverTime`/`leaveTime` to `hoverTimeout`/`leaveTimeout` for hover mode
  - Removed the `forceSize`/`forceFontSize` props from the `FontIcon`
  - Removed the `useOverflowTooltip` and instead integrate it into the
    `useTooltip` hook. It's cheaper to check on the start event instead of having
    a resize observer always active
  - Removed the `LinkProvider` since it was only used for the `Tree` component and
    it's easier to pass the custom link component down

  Features:

  - Added `TRANSITION_CONFIG` so transitions can be disabled
    - Updated the `@react-md/test-utils/jest-setup` to always disable transitions
      in tests
  - Added `MATERIAL_CONFIG` to override defaults instead of using context
  - Adding support for including `data-testid` in all HTMLAttributes by including
    `@react-md/test-utils/data-testid` somewhere (normally `setupTests.ts`)
  - Added `theme` to `Avatar`
  - Update `Dialog` to be an `alertdialog` by default when `modal` is enabled and
    added `aria-modal` when `modal` is enabled
  - Add additional props to `Slider` to customize the tooltip
  - Updated all table styling utility functions to be in separate files so they
    aren't forced as client code
  - Added `iconRotatorProps` for the `TableCell`
  - Updated `isStickyActive` to provide the `isInTableContainer` boolean and
    export `isTableFooterStickyActive` default function
  - Add support for `stickyActiveClassName`
  - Added support for `TableRadio` component
  - Updated `DropdownMenu` to support controlling the visibility

  Bug Fixes:

  - Improved performance for multiple transitions by no longer causing layout
    shifts
  - Add some missing custom properties to inline styles for Typescript
  - Update `Tooltip` to default to temporary again. There's no need to create 1000
    nodes in large apps on startup
  - Fixed styles for `MenuItemCheckbox`, `MenuItemRadio`, and `MenuItemSwitch`
  - Fix `Slider` marks when the min value is not `0`
  - Fixed the default anchor for the `Menu` component when using a floating action
    button
  - Update `Tooltip` to use `textOverflow` instead of `disableLineWrap`
  - Update `Switch` to no longer be a client component
  - Update `Switch` to support rendering components within the ball

## 1.0.0-next.0

### Major Changes

- Initial v6 release test
