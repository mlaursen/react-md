---
"@react-md/material-icons": patch
"react-md": patch
"@react-md/code": patch
"@react-md/core": patch
---

This release is mostly around adding codemods for v5 to v6, but also:

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
