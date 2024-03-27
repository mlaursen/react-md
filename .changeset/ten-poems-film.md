---
"@react-md/core": minor
---

Fixed styling issues, added additional configuration props, and added support for non-barrel file behavior

## Features

- Added support for non-barrel files for `@react-md/core` to improve build performance in bundlers
  - i.e. `import { Button } from "@react-md/core/button/Button"` and `import { useToggle } from "@react-md/core/useToggle"`
- Added a new `MenuItemCircularProgress` component
- Added a `useFuzzyMatch` hook to increase the performance around fuzzy matching in large lists
- `useListboxContext` will now throw an error if a parent `ListboxProvider` does not exist
- Updated the `TableRow` hover state to no longer require the `InteractionModeProvider`
- Updated the `useDebouncedFunction` and `useThrottledFunction` hooks to support manually cancelling timeouts

## Fixes

- `Label` supports `pointer-events` while floating
- `Select` no longer displays the soft keyboard on mobile devices
- `TextArea` allows the `containerProps` like the `TextField` and added some fixes for the resizing behavior
- `Snackbar` supports absolute positioning

## Documentation

- Updated the documentation around using the mocked `ResizeObserver` in tests so that the example is on the `setupResizeObserverMock` instead of `ResizeObserverMock.resizeElement`
