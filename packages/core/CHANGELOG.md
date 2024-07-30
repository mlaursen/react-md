# @react-md/core

## 1.0.0-next.16

### Patch Changes

- This release is mostly around adding codemods for v5 to v6, but also:

  - reduced the installation size for react-md packages by excluding non-critical files
    - i.e. Ignore test files, mocks, files that aren't required for source maps, etc
  - fixed documentation
  - removed the invalid server component comments since they aren't server components. they are just components that do not require client side js
  - split the expansion panel, list, sheet styles into separate files so that the style utility classes can be used without client size js
  - fixed the inline icon styles to be `vertical-align: middle` instead of `vertical-align: bottom` to work with more font sizes
  - renamed `TreeItemDefaultIds` to `TreeDefaultIds` to match naming conventions
  - fixed some vertical tabs and scroll button styles
  - added more convenience pass-through props to the `useTabs` hook options
  - added the `TreeItemRenderer` utility type

## 1.0.0-next.15

### Patch Changes

- This release focused on starting to create the codemods for v5 to v6, which helped me find and fix:

  - Fixed the surface colors when `$color-scheme: light`
  - `CardSubtitle` can now remove the secondary text color like v5 using the `textColor` `Typography` prop
  - Moved the sticky styles behavior for tables into `StickyTableSection` instead of `TableHeader`/`TableFooter`
  - Moved more table types into the `types.ts` file
  - Re-ran the material icons script to fix the types for `MaterialSymbol` and `MaterialIcon`
  - Updated documentation for components and changes between v5

## 1.0.0-next.14

### Patch Changes

- Added the first implementation for the new `Autocomplete` component and API which made me
  realize I need to modify it a bit more. The next release should include better behavior
  to mimic react-select and material ui where it supports working as a select element,
  mutliselect options, and creating chips with values.

  Breaking Changes

  - The `useAsyncAction` was renamed to `useAsyncFunction` to mimic the other `use*Function` hooks.
  - Removed the `children` prop from the `TextField` component

  Features

  - Added the `clear` icon to support the `Autocomplete` clear button behavior
  - Updated the text field padding to be easier to style with CSS custom properties
  - Added the `useTextFieldContainerAddons` hook to dynamically update the padding based on addon size with the `TextFieldContainer`
  - Added the `useMutationObserver` hook

  Bug Fixes

  - Fixed adding some `@use` statements for the Sass standard library
  - Fixed the `useDraggable` range behavior
  - Fixed the cross fade transition behavior

## 1.0.0-next.13

### Patch Changes

- Breaking Changes:

  - `@react-md/core` no longer supports a single entrypoint and is ESM only

  Features:

  - `react-md` package is now a convenience package for the `@react-md/core` single entrypoint
  - New `@react-md/code` package for most of the code functionality within the documentation stie
  - `Box` now sets the `--rmd-box-columns` variable to the `columns` prop when it is a number
  - New `Navigation` components
  - The `useExpandableLayout` and `useResizableLayout` hooks support `"static"` full height navigation
  - The `useExpandableLayout` and `useResizableLayout` hooks support conditionally rendering the `"static"` layouts while being SSR safe
  - New `useActiveHeadingId` hook to help re-create the Table of Contents behavior in the documentation stie

  Bug fixes:

  - The `box-custom-grid` mixin should no longer error
  - The `LayoutAppBar` no longer causes layout shifts after rehydrating
  - The `ToastManager` handles repeated pause and resumes correctly

  Other changes

  - Documentation site overhaul to allow editing SCSS modules and showing the generated output
  - Simplified the @since tags in tsdoc
  - Simplified tsdoc examples

## 1.0.0-next.12

### Patch Changes

- Trying a different way to handle package.json exports.

## 1.0.0-next.11

### Patch Changes

- Experimental support for package.json exports and updated material icons.

## 1.0.0-next.10

### Minor Changes

- Fixed styling issues, added additional configuration props, and added support for non-barrel file behavior

#### Features

- Added support for non-barrel files for `@react-md/core` to improve build performance in bundlers
  - i.e. `import { Button } from "@react-md/core/button/Button"` and `import { useToggle } from "@react-md/core/useToggle"`
- Added a new `MenuItemCircularProgress` component
- Added a `useFuzzyMatch` hook to increase the performance around fuzzy matching in large lists
- `useListboxContext` will now throw an error if a parent `ListboxProvider` does not exist
- Updated the `TableRow` hover state to no longer require the `InteractionModeProvider`
- Updated the `useDebouncedFunction` and `useThrottledFunction` hooks to support manually cancelling timeouts

#### Fixes

- `Label` supports `pointer-events` while floating
- `Select` no longer displays the soft keyboard on mobile devices
- `TextArea` allows the `containerProps` like the `TextField` and added some fixes for the resizing behavior
- `Snackbar` supports absolute positioning

#### Documentation

- Updated the documentation around using the mocked `ResizeObserver` in tests so that the example is on the `setupResizeObserverMock` instead of `ResizeObserverMock.resizeElement`

## 1.0.0-next.9

### Patch Changes

- Added a RootHtml component for Next.js apps and a lot of changes to the Select
  component. The Select _should_ be able to be autofilled by the browser and
  password managers now if I remember correctly. There's also a lot of work into
  getting started with the new Autocomplete API.

## 1.0.0-next.8

### Patch Changes

- Fixed a bunch of styling issues, being unable to disable styles, being unable to remove styles, and missing types for the MenuItemInputToggle components.

## 1.0.0-next.7

### Patch Changes

- Fixed form layer application

## 1.0.0-next.6

### Patch Changes

- Fixed missing use client directives, styling issues in labels and expansion panels, and removing unused layers.

## 1.0.0-next.5

### Patch Changes

- Fixed compile output directory by reverting to @swc/cli@0.1.63

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
