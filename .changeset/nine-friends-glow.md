---
"@react-md/material-icons": patch
"react-md": patch
"@react-md/core": patch
---

This release focused on documentation but had a few new features:

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
