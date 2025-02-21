---
"@react-md/material-icons": patch
"react-md": patch
"@react-md/core": patch
---

- Updated the `useLocalStorage` hook to be more generic and renamed to `useStorage`
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
