---
"@react-md/material-icons": patch
"react-md": patch
"@react-md/core": patch
---

This release focused on starting to create the codemods for v5 to v6, which helped me find and fix:

- Fixed the surface colors when `$color-scheme: light`
- `CardSubtitle` can now remove the secondary text color like v5 using the `textColor` `Typography` prop
- Moved the sticky styles behavior for tables into `StickyTableSection` instead of `TableHeader`/`TableFooter`
- Moved more table types into the `types.ts` file
- Re-ran the material icons script to fix the types for `MaterialSymbol` and `MaterialIcon`
- Updated documentation for components and changes between v5
