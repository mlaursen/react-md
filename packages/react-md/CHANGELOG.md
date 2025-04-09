# react-md

## 6.0.0-next.9

### Patch Changes

- This release focused on documentation but had a few new features:

  - added `Mark` and `HighlightedText` components
  - added a simple `ErrorBoundary` component
  - the `a11y` sass import can be used in the `@forward` file by using the new `@react-md/core/a11y` import
  - icon styles now include a `--rmd-icon-dense-size` custom property
  - the `Autocomplete` clear button requires less javascript and supports a few visibility modes
  - added an `onEnteredOnce` callback for transitions to handle triggering a callback when transitions are disabled
  - added `getTransitionCallbacks` to help merge transition callbacks

  Bug fixes:

  - the `List` component correctly implements dense mode
  - private files are now excluded from the `@react-md/core` package exports
  - constants and file names were updated to be more consistent
  - separate some code to allow more server/client code splitting

  Documentation updates:

  - now able to search the documentation website
  - all components and hooks should now have a link to the documentation page on the website to navigate from your editor of choice
  - all sass items now have sassdoc and can be viewed on the website
  - all code examples use the correct import path
  - added `vite-ts`, `vite-js`, and `mlaursen-vite` example templates

- Updated dependencies
  - @react-md/core@1.0.0-next.21

## 6.0.0-next.8

### Patch Changes

- - Updated the `useLocalStorage` hook to be more generic and renamed to `useStorage`
  - Added test support for vitest using `@react-md/core/test-utils/vitest`
    - Moved `jest-globals` to `@react-md/core/test-utils/jest-globals`
  - Added additional test queries to help find `react-md` elements in tests
  - Simplified form sass imports
  - Added `gridAutoRows` behavior to the `Box` component
  - Add the `capture` prop to the `MenuItemFileInput`
  - Updated the `useTextField` hook to support rendering the counter while `disableMessage` is `true`
  - Updated `useTextField` to support the `"valid"` `ValidityState`
  - Fixed the layout navigation not handling scrollbars in RTL mode
  - Added the `useTableOfContentsHeadings` hook to support dynamic table of contents
  - Updated most default transition timeouts and classnames to use `satisfies` to allow better typing
  - Added `SimpleTabPanels` and `SimpleTabPanel` components when the tab panels do not need to animate
  - The vertical `Tab` now display the active tab indicator to the right instead of the left by default
  - The `TabList` component supports full width tabs without truncating
  - The tab components moved more customization to custom CSS properties:
    - `min-height`
    - `min-width`
    - `max-width`
    - `stacked-height`
    - `stacked-width`
    - `padding`
    - `stacked-padding`
  - A new `useTabPanelMaxHeight` hook has been added to prevent layout shifts while switching between tabs
  - The `TabList` now supports dynamically adding scroll buttons
  - Hopefully made the color scheme behavior make more sense with some renaming
  - Added `DEFAULT_COLLATOR_OPTIONS` if they should be used for new `alphaNumericSort` comparators
  - `bem` util now allows `styles().base` to get the base class name
  - Added `touch-action: none` to the draggable components and updated `useDraggable` to
    match that new behavior
  - `ArrowUp` and `ArrowDown` work as expected for vertically draggable components
  - Fixed some re-rendering issues that would happen in React 19 by moving to `useEffect`
  - The progress styles correctly use the `progress` layer instead of `overlay`
  - The progress styles now add `will-change` to increase perf
  - The "scroll right" button in the `TabList` correctly disables
  - The `Tab` will only shrink once the `max-width` has been reached instead of
    if there is not enough room in the container
  - The `useDropzone` hook correctly captures blur events when the user drags
    from the dropzone immediately to the file browser
  - `useMutationObserver` uses the `onUpdate` instead of `onUpdated` to match other `use*Observer` hooks
  - Added most remaining documentation to the website

- Updated dependencies
  - @react-md/core@1.0.0-next.20

## 6.0.0-next.7

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.19

## 6.0.0-next.6

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.18

## 6.0.0-next.5

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.17

## 6.0.0-next.4

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

- Updated dependencies
  - @react-md/core@1.0.0-next.16

## 6.0.0-next.3

### Patch Changes

- This release focused on starting to create the codemods for v5 to v6, which helped me find and fix:

  - Fixed the surface colors when `$color-scheme: light`
  - `CardSubtitle` can now remove the secondary text color like v5 using the `textColor` `Typography` prop
  - Moved the sticky styles behavior for tables into `StickyTableSection` instead of `TableHeader`/`TableFooter`
  - Moved more table types into the `types.ts` file
  - Re-ran the material icons script to fix the types for `MaterialSymbol` and `MaterialIcon`
  - Updated documentation for components and changes between v5

- Updated dependencies
  - @react-md/core@1.0.0-next.15

## 6.0.0-next.2

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.14

## 6.0.0-next.1

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.13
