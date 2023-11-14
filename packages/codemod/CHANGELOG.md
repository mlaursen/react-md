# @react-md/codemod

## 6.0.0-next.1

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

## 6.0.0-next.0

### Major Changes

- Initial v6 release test
