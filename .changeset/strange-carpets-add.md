---
"@react-md/core": patch
---

Added the first implementation for the new `Autocomplete` component and API which made me
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
