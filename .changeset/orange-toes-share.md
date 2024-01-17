---
"@react-md/material-icons": patch
"@react-md/codemod": patch
"@react-md/core": patch
---

The next v6 alpha release.

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
