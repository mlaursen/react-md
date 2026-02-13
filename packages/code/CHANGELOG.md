# @react-md/code

## 0.0.19

### Patch Changes

- Updated dependencies [4b7fc3a]
- Updated dependencies [ecb35d3]
- Updated dependencies [017f081]
- Updated dependencies [7daefe7]
- Updated dependencies [9630b94]
  - @react-md/core@7.0.2
  - @react-md/material-icons@7.0.3

## 0.0.18

### Patch Changes

- Updated dependencies [2eeac34]
  - @react-md/material-icons@7.0.2

## 0.0.17

### Patch Changes

- Updated dependencies [168b9d9]
  - @react-md/material-icons@7.0.1
  - @react-md/core@7.0.1

## 0.0.16

### Patch Changes

- Updated dependencies [e56a973]
  - @react-md/core@7.0.0
  - @react-md/material-icons@7.0.0

## 0.0.15

### Patch Changes

- Updated dependencies [1e0d118]
  - @react-md/core@6.5.2
  - @react-md/material-icons@6.2.10

## 0.0.14

### Patch Changes

- Updated dependencies [f83cf31]
- Updated dependencies [b0306dd]
  - @react-md/core@6.5.1
  - @react-md/material-icons@6.2.9

## 0.0.13

### Patch Changes

- Updated dependencies [01c4e0a]
- Updated dependencies [81a0b0e]
- Updated dependencies [7a98aec]
- Updated dependencies [16dc984]
- Updated dependencies [c9efa12]
- Updated dependencies [fc2cd20]
- Updated dependencies [99fe90c]
  - @react-md/core@6.5.0
  - @react-md/material-icons@6.2.8

## 0.0.12

### Patch Changes

- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
- Updated dependencies [12affc4]
  - @react-md/core@6.4.0
  - @react-md/material-icons@6.2.7

## 0.0.11

### Patch Changes

- Updated dependencies
  - @react-md/core@6.3.4
  - @react-md/material-icons@6.2.6

## 0.0.10

### Patch Changes

- Updated dependencies
  - @react-md/core@6.3.3
  - @react-md/material-icons@6.2.5

## 0.0.9

### Patch Changes

- Updated dependencies
  - @react-md/core@6.3.2
  - @react-md/material-icons@6.2.4

## 0.0.8

### Patch Changes

- Updated dependencies
  - @react-md/core@6.3.1
  - @react-md/material-icons@6.2.3

## 0.0.7

### Patch Changes

- Updated dependencies
  - @react-md/core@6.3.0
  - @react-md/material-icons@6.2.2

## 0.0.6

### Patch Changes

- Updated dependencies
  - @react-md/core@6.2.1
  - @react-md/material-icons@6.2.1

## 0.0.5

### Patch Changes

- Updated dependencies
  - @react-md/core@6.2.0
  - @react-md/material-icons@6.2.0

## 0.0.4

### Patch Changes

- Updated dependencies
  - @react-md/core@6.1.0
  - @react-md/material-icons@6.1.0

## 0.0.3

### Patch Changes

- Updated dependencies
  - @react-md/core@6.0.2
  - @react-md/material-icons@6.0.2

## 0.0.2

### Patch Changes

- Updated dependencies
  - @react-md/core@6.0.1
  - @react-md/material-icons@6.0.1

## 0.0.1

### Patch Changes

- 093d3bf: This release is mostly around adding codemods for v5 to v6, but also:
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

- 4b8b394: Breaking Changes:
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

- Updated dependencies [aaedc49]
- Updated dependencies [bdcbd82]
- Updated dependencies [3b18106]
- Updated dependencies [64071b7]
- Updated dependencies [093d3bf]
- Updated dependencies [70f92fd]
- Updated dependencies [6e8e77e]
- Updated dependencies [c42ad14]
- Updated dependencies [a1483f0]
- Updated dependencies [31b0fa5]
- Updated dependencies [a26803b]
- Updated dependencies [1a8cfaf]
- Updated dependencies [68f0920]
- Updated dependencies [e475d03]
- Updated dependencies
- Updated dependencies [64071b7]
- Updated dependencies [4b8b394]
- Updated dependencies [e37cc8d]
- Updated dependencies [ae417ce]
- Updated dependencies [d5d7d5a]
- Updated dependencies [54f99e9]
- Updated dependencies [bc90f77]
- Updated dependencies [91ea1f8]
- Updated dependencies [d8f185b]
  - @react-md/core@6.0.0
  - @react-md/material-icons@6.0.0

## 0.0.1-next.9

### Patch Changes

- Updated dependencies
  - @react-md/material-icons@6.0.0-next.22
  - @react-md/core@1.0.0-next.21

## 0.0.1-next.8

### Patch Changes

- Updated dependencies
  - @react-md/material-icons@6.0.0-next.21
  - @react-md/core@1.0.0-next.20

## 0.0.1-next.7

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.19
  - @react-md/material-icons@6.0.0-next.20

## 0.0.1-next.6

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.18
  - @react-md/material-icons@6.0.0-next.19

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
