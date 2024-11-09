# react-md

## 6.0.0-next.5

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.17

## 6.0.0-next.4

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
  - @react-md/core@1.0.0-next.16

## 6.0.0-next.3

### Patch Changes

- This release focused on starting to create the codemods for v5 to v6, which helped me find and fix:

  - Fixed the surface colors when `$color-scheme: light`
  - `CardSubtitle` can now remove the secondary text color like v5 using the `textColor` `Typography` prop
  - Moved the sticky styles behavior for tables into `StickyTableSection` instead of `TableHeader`/`TableFooter`
  - Moved more table types into the `types.ts` file
  - Re-ran the material icons script to fix the types for `MaterialSymbol` and `MaterialIcon`
  - Updated documentation for components and changes between v5

- Updated dependencies
  - @react-md/core@1.0.0-next.15

## 6.0.0-next.2

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.14

## 6.0.0-next.1

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.13
