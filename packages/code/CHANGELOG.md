# @react-md/code

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
