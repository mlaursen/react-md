---
"@react-md/material-icons": major
"@react-md/codemod": major
"@react-md/core": major
---

Updated custom properties to require a defined value instead of always providing a fallback. This decreases the bundle size by a good amount.

Also updated the `Snackbar` so that it no longer has a `role="status"` to fix accessibility. Instead, each toast will have `role="status"` or `role="alert"`.
