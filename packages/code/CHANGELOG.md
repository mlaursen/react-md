# @react-md/code

## 0.0.1-next.5

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.17
  - @react-md/material-icons@6.0.0-next.18

## 0.0.1-next.4

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
  - @react-md/material-icons@6.0.0-next.17
  - @react-md/core@1.0.0-next.16

## 0.0.1-next.3

### Patch Changes

- Updated dependencies
  - @react-md/material-icons@6.0.0-next.16
  - @react-md/core@1.0.0-next.15

## 0.0.1-next.2

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.14
  - @react-md/material-icons@6.0.0-next.15

## 0.0.1-next.1

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

- Updated dependencies
  - @react-md/core@1.0.0-next.13
  - @react-md/material-icons@6.0.0-next.14
