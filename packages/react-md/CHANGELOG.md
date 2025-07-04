# react-md

## 6.2.2

### Patch Changes

- Updated dependencies
  - @react-md/core@6.3.0

## 6.2.1

### Patch Changes

- Updated dependencies
  - @react-md/core@6.2.1

## 6.2.0

### Minor Changes

- # Features

  - All hooks, components, and utils that required a `TextExtractor` now support `item.name` and `item.label` by default
    - `Autocomplete`
    - `alphaNumericSort`
    - `fuzzySearch`
    - `caseInsensitiveSearch`
  - The `Avatar` `color` can now be type-safe with module augmentation and the new `AvatarColorOverrides` interface
  - The `Box` `gridName` can now be type-safe with module augmentation and the new `BoxGridNameOverrides` interface
  - Added missing `circularProgress` and `linearProgress` class name utility functions
  - (internal): Updated the `PropsWithRef` utility type to automatically infer the element type

### Patch Changes

- Updated dependencies
  - @react-md/core@6.2.0

## 6.1.0

### Minor Changes

- # Features

  - prioritize theme and typography variables in dev tools
  - add border-radius and spacing variables to match latest design tokens

  # Internal

  - Throw an error if `parseCssLengthUnit` is not a number unit
  - Update Algolia searching behavior
  - Update examples to latest
  - Update deps to latest

### Patch Changes

- Updated dependencies
  - @react-md/core@6.1.0

## 6.0.2

### Patch Changes

- - do not allow clear button to be clickable while hidden
  - update controllable hooks/components to show the correct prop name instead of only showing `value`
  - update source comments to use `https://react-md.dev` instead of `https://next.react-md.dev`
- Updated dependencies
  - @react-md/core@6.0.2

## 6.0.1

### Patch Changes

- Fixed the media-queries using map.nth instead of map.get after switching from list.nth.
- Updated dependencies
  - @react-md/core@6.0.1

## 6.0.0

### Major Changes

- This is a major rework release for react-md with lots of features, breaking
  changes, and bugfixes. There were over 1200 commits, so I won't really list
  everything here.

  Check out the [release notes](https://react-md.dev/blog/react-md-v6-released)
  or a small summary below:

  This is probably one of the most useful components to be added to react-md. The
  [Box](https://react-md.dev/components/box) component is a wrapper around the CSS box model for
  `display: flex` and `display: grid` and can be used to implement most of the
  DOM structure or layout without custom styling.

  With the introduction of the `Box` component, the
  [Grid](https://v5.react-md.dev/packages/utils/demos#material-grid-example),
  `GridCell`,
  [GridList](https://v5.react-md.dev/packages/utils/demos#simple-grid-list), and
  `GridListCell` components have been removed. See the
  [Material Grid Example](https://react-md.dev/components/box#material-grid-example) for an example
  using the `Box` component.

  > !Info! All the available icons can be found using the new
  > [Material Icons and Symbols](https://react-md.dev/components/material-icons-and-symbols) page.

  The `@react-md/material-icons` package has been updated to support the latest
  material icons but only through SVG icons. To continue using font icons, either
  use the new `MaterialIcon` component or the `FontIcon` component.

  Material symbols can be used through the new `MaterialSymbol` component
  that supports customizing the weight, grade, and optical size globally,
  for a section of the app, or one offs.

  If you've used react-md in the past, you'll probably know that the
  `Autocomplete` "worked" but wasn't user friendly or useful. With this version
  of react-md, the `Autocomplete` has been remade to improve the user experience
  by acting more like an editable `Select` component. So the `Autocomplete`
  is more in line with the [react-select](https://react-select.com) and the
  [material-ui Autocomplete](https://mui.com/material-ui/react-autocomplete/).

  Here's a quick summary of the new changes:

  - The default behavior requires a valid option to be selected and will reset to
    the last valid option or an empty string
  - Multiple values are now supported with optional inline chips or checkboxes
  - Circular progress bars are now supported
  - The selected option and input value can both be controlled
  - The component API should hopefully make more sense without the
    `getResultLabel`, `getResultValue`, ... whatever I was doing before
  - More type safety

  > !Info! Check out the new [Autocomplete](https://react-md.dev/components/autocomplete) demos
  > to see more!

  The toasts and alerts have been updated so toasts can be shown from anywhere
  instead of only within React components with the `useAddToast` hook. Toasts
  can now be created by importing the new `addToast` function.

  ```tsx
  import { Snackbar } from "@react-md/core/snackbar/Snackbar";
  import { addToast } from "@react-md/core/snackbar/ToastManager";
  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";

  import "./index.scss";

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Snackbar />
    </StrictMode>
  );

  // doesn't need to be called from react components!
  window.setTimeout(() => {
    addToast({ children: "Hello, world!" });
  }, 3000);
  ```

  Some other new features for snackbars and toasts are:

  - supports the theme colors
  - allows configuring the visible time on a per-toast basis
  - the toast timeout pauses while the user hovers the toast
  - multiple toasts can be rendered at once
  - new customization through a custom toast renderer prop

  Check out the new [snackbar demos](https://react-md.dev/components/snackbar) to see more!

  The dark mode has been improved so that the interaction states are now visible
  by default when switching to the dark mode. The following images show the
  normal, hover, then focus states for a button with the dark theme enabled.

  Other native elements like the `<select>` should also update based on the dark
  mode color scheme.

  The `Slider` component has been simplified and now only requires a `value` and
  `setValue` to use. Due to these changes, the `RangeSlider` is no longer
  required and has been merged into the `Slider` component.

  In addition, the `Slider` component now supports rendering marks below to help
  show where specific values are within the range.

  Tooltips now support being shown only if there is overflow text. Check out the
  [Overflow Only Tooltip](https://react-md.dev/components/tooltip#overflow-only-tooltip) demo for
  more information!

  A simple [objectFit](https://react-md.dev/utils/object-fit) utility function has been created for
  styling images, videos, and other media types. This should be able to replace
  most of the `MediaContainer` / `ResponsiveItem` usage in your app with better
  styling behavior.

  The `Tab` components have been updated to support:

  - [scrolling with buttons](https://react-md.dev/components/tabs#scrollable-tabs) instead of the
    hidden scrollbar option that existed before
  - [being rendered vertically](https://react-md.dev/components/tabs#vertical-tabs)
  - maintaining a consistent tab panel height using the new
    [useMaxTabPanelHeight](https://react-md.dev/components/tabs#use-max-tab-panel-height) hook

  The `Tree` component has been updated with a few new customization options like
  the [expansionMode](https://react-md.dev/components/tree#expansion-mode) which allows the child
  tree items to only become visible after clicking the icon instead of anywhere
  in the tree item.

  The `CircularProgress` and `LinearProgress` components now support the
  `primary`, `secondary`, `warning`, `success`, `error`, and `current-color`
  themes.

  Most components now expose a class name utility function to provide styles without
  using the component itself. The naming conventions are to use a
  `camelCasedName` instead of `PascalCased`. For example:

  - `button` for the `Button` component
  - `expansionPanel` for the `ExpansionPanel` component
  - `typography` for the `Typography` component

  In addition, a general [cssUtils](https://react-md.dev/utils/css-utils) helper has been created for
  common styling.

  New polyfills and test utils are now provided that integrate with
  [jest](https://jestjs.io/) and [vitest](https://vitest.dev/) to improve
  testing. Check out the [testing quickstart guide](https://react-md.dev/testing/quickstart)
  on how to get started.

  A few new components and hooks have been added:

  - [AsyncButton](https://react-md.dev/components/button#async-button)
  - [CircularProgressSuspense](https://react-md.dev/components/suspense#circular-progress-suspense)
  - [ColorSchemeProvider](https://react-md.dev/components/color-scheme-provider)
  - [ClickableCard](https://react-md.dev/components/card#clickable-card)
  - [ErrorBoundary](https://react-md.dev/components/error-boundary)
  - [HighlighText](https://react-md.dev/components/highlight-text)
  - [Mark](https://react-md.dev/components/mark)
  - [Navigation](https://react-md.dev/components/navigation)
  - [NoSsr](https://react-md.dev/components/no-ssr)
  - [NullSuspense](https://react-md.dev/components/suspense#null-suspense)
  - [RenderRecursively](https://react-md.dev/components/render-recursively)
  - [RootHtml](https://react-md.dev/components/root-html)
  - [SegmentedButton](https://react-md.dev/components/segmented-button)
  - [SkeletonPlaceholder](https://react-md.dev/components/skeleton-placeholder)
  - [Slide](https://react-md.dev/components/slide)
  - [StickyTableSection](https://react-md.dev/components/table#sticky-table)
  - [TooltippedButton](https://react-md.dev/components/tooltip#tooltipped-button)
  - [WindowSplitter](https://react-md.dev/components/window-splitter)
  - [useActiveHeadingId](https://react-md.dev/hooks/use-active-heading-id)
  - [useAsyncFunction](https://react-md.dev/hooks/use-async-function)
  - [useCSSVariables](https://react-md.dev/hooks/use-css-variables)
  - [useInlineCSSVariables](https://react-md.dev/hooks/use-inline-css-variables)
  - [useCarousel](https://react-md.dev/components/carousel)
  - [useColorScheme](https://react-md.dev/hooks/use-color-scheme)
  - [useDebouncedFunction](https://react-md.dev/hooks/use-debounced-function)
  - [useElementSize](https://react-md.dev/hooks/use-element-size)
  - [useHtmlClassName](https://react-md.dev/hooks/use-html-class-name)
  - [useIntersectionObserver](https://react-md.dev/hooks/use-intersection-observer)
  - [useMutationObserver](https://react-md.dev/hooks/use-mutation-observer)
  - [usePrefersDarkTheme](https://react-md.dev/hooks/use-prefers-dark-theme)
  - [useReadonlySet](https://react-md.dev/hooks/use-readonly-set)
  - [useResizableLayout](https://react-md.dev/hooks/use-resizable-layout)
  - [useStorage](https://react-md.dev/hooks/use-storage)
  - [useTableOfContentsHeadings](https://react-md.dev/hooks/use-table-of-contents-headings)
  - [useThrottledFunction](https://react-md.dev/hooks/use-throttled-function)
  - [useWindowSize](https://react-md.dev/hooks/use-window-size)

  The documentation site has been remade to hopefully improve finding information
  with the following changes:

  - Navigation is based on component, hook, or feature instead of package.
  - Examples and demos have been trimmed down to focus on a single feature and
    file at a time. There are a few more complex examples near the end.
  - Most examples and demos can be edited and previewed within the website
    instead of needing to create a codesandbox
  - The code editor theme can be configured in the global settings menu

  The `Checkbox` and `Radio` components no longer use some hacky CSS to overlay
  the checked icon state to show the unchecked state. Instead, both icons are
  rendered and toggled using CSS and the `:checked` state allowing for easier
  customization.

  If a react-md component is imported that uses CSS variables, the variables will now
  become visible and type-checkable with typescript when defining inline styles.

  ```tsx
  import { Avatar } from "@react-md/core/avatar";

  function Example() {
    return (
      <div
        style={{
          // no longer a type error!
          "--rmd-avatar-color": "orange",
          "--rmd-avatar-border-radius": "0.5rem",
        }}
      >
        <Avatar>A</Avatar>
      </div>
    );
  }
  ```

  The new scroll locking behavior prevents layout shifts by calculating the
  current scrollbar size and applying padding to the root element. This can
  drastically improve performance for apps that rely on resize observers to
  position content.

  The styles have been re-written to always have the lowest
  [CSS specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity)
  allowing custom styles to override react-md with ease.

  The `:focus` styles for almost every component now uses `:focus-visible`
  instead of relying on `.keyboard mode &:focus` removing the
  `UserInteractionModeProvider` requirement from these styles. If the previous
  focus behavior is desired, set [$SASSDOC]($disable-focus-visible) to `true`

  All react-md components that required an `id` now default to
  [useId()](https://react.dev/reference/react/useId) and can be omitted.

  By enabling a new `ssr` mode in the
  [CoreProviders](https://react-md.dev/components/core-providers), temporary components like dialogs
  and overlays will remain visible and mounted after being rendered on the server
  until the first time they are unmounted.

  In addition, the general layout has been updated to handle SSR behavior better
  by relying on media queries for switching between layout types instead of only
  requiring javascript. Check out the new [layout documentation](https://react-md.dev/getting-started/layout)
  for more examples.

  Every [StrictMode](react.dev/reference/react/StrictMode) error has been fixed
  and react-md is ready for React 19. The documentation site has been using the
  [React 19 RC](https://react.dev/blog/2024/12/05/react-19) for a long time without
  issue. In addition, it is now possible to prevent the entire app from being
  marked as a client boundary when importing a component from react-md. Each
  component and hook has been correctly marked with the `"use client"` directive
  as needed.

  The [Portal](https://react-md.dev/components/portal) has been updated to render all content within
  a `<div id="rmd-portal-container" />` by default instead of the `document.body`.
  This allows quick access in the dev-tools to inspecting portal elements and
  preventing any issues that might appear for rendering additional nodes in the
  `document.body`.

  With the migration to ESM, the `@react-md/core` package has been created to
  only support importing from specific paths instead of a
  [root barrel file](https://vite.dev/guide/performance#avoid-barrel-files).
  This will improve development speed as bundlers will no longer need to fetch
  all files within react-md to begin compiling.

  The base `react-md` package will still support a root barrel file import if
  this is not a concern.

  ```diff
  -import { Card, CardTitle } from "@react-md/card";
  +import { Card } from "@react-md/core/card/Card";
  +import { CardTitle } from "@react-md/core/card/CardTitle";

   // Γ£à This still works, but will result in slower dev builds
   import { Card, CardTitle } from "react-md";
  ```

  In prior versions of react-md, inspecting CSS variables could be difficult
  because they were split into multiple rules without using `postcss` plugins.
  Starting with react-md@v6, custom properties will automatically be grouped
  together in the devtools.

  The gzipped sizes have decreased slightly with the latest version of react-md:

  - Javascript: 92.51 kB to 82.77 kB
  - SCSS: 18.08 kB to 16.55 kB
    - NOTE: This was the smallest theme bundle with `$primary-color: $grey-500`,
      `$secondary-color: $red-700`, `$color-scheme: light` for both version of react-md

  There were a lot of breaking changes, but a few will be called out here specifically.

  react-md will now only support ESM going forward since most build tools already
  support it. In addition, the legacy `@import` syntax is no longer supported for
  Sass.

  Ready to upgrade to react-md v6? Head to [the v6 migration guide](https://react-md.dev/migration/v5-to-v6) next.

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

- a1483f0: This release focused on documentation but had a few new features:

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

- a26803b: - Updated the `useLocalStorage` hook to be more generic and renamed to `useStorage`

  - Added test support for vitest using `@react-md/core/test-utils/vitest`
    - Moved `jest-globals` to `@react-md/core/test-utils/jest-globals`
  - Added additional test queries to help find `react-md` elements in tests
  - Simplified form sass imports
  - Added `gridAutoRows` behavior to the `Box` component
  - Add the `capture` prop to the `MenuItemFileInput`
  - Updated the `useTextField` hook to support rendering the counter while `disableMessage` is `true`
  - Updated `useTextField` to support the `"valid"` `ValidityState`
  - Fixed the layout navigation not handling scrollbars in RTL mode
  - Added the `useTableOfContentsHeadings` hook to support dynamic table of contents
  - Updated most default transition timeouts and classnames to use `satisfies` to allow better typing
  - Added `SimpleTabPanels` and `SimpleTabPanel` components when the tab panels do not need to animate
  - The vertical `Tab` now display the active tab indicator to the right instead of the left by default
  - The `TabList` component supports full width tabs without truncating
  - The tab components moved more customization to custom CSS properties:
    - `min-height`
    - `min-width`
    - `max-width`
    - `stacked-height`
    - `stacked-width`
    - `padding`
    - `stacked-padding`
  - A new `useTabPanelMaxHeight` hook has been added to prevent layout shifts while switching between tabs
  - The `TabList` now supports dynamically adding scroll buttons
  - Hopefully made the color scheme behavior make more sense with some renaming
  - Added `DEFAULT_COLLATOR_OPTIONS` if they should be used for new `alphaNumericSort` comparators
  - `bem` util now allows `styles().base` to get the base class name
  - Added `touch-action: none` to the draggable components and updated `useDraggable` to
    match that new behavior
  - `ArrowUp` and `ArrowDown` work as expected for vertically draggable components
  - Fixed some re-rendering issues that would happen in React 19 by moving to `useEffect`
  - The progress styles correctly use the `progress` layer instead of `overlay`
  - The progress styles now add `will-change` to increase perf
  - The "scroll right" button in the `TabList` correctly disables
  - The `Tab` will only shrink once the `max-width` has been reached instead of
    if there is not enough room in the container
  - The `useDropzone` hook correctly captures blur events when the user drags
    from the dropzone immediately to the file browser
  - `useMutationObserver` uses the `onUpdate` instead of `onUpdated` to match other `use*Observer` hooks
  - Added most remaining documentation to the website

- 1a8cfaf: This release focused on starting to create the codemods for v5 to v6, which helped me find and fix:

  - Fixed the surface colors when `$color-scheme: light`
  - `CardSubtitle` can now remove the secondary text color like v5 using the `textColor` `Typography` prop
  - Moved the sticky styles behavior for tables into `StickyTableSection` instead of `TableHeader`/`TableFooter`
  - Moved more table types into the `types.ts` file
  - Re-ran the material icons script to fix the types for `MaterialSymbol` and `MaterialIcon`
  - Updated documentation for components and changes between v5

- Updated dependencies [aaedc49]
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

## 6.0.0-next.9

### Patch Changes

- This release focused on documentation but had a few new features:

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

- Updated dependencies
  - @react-md/core@1.0.0-next.21

## 6.0.0-next.8

### Patch Changes

- - Updated the `useLocalStorage` hook to be more generic and renamed to `useStorage`
  - Added test support for vitest using `@react-md/core/test-utils/vitest`
    - Moved `jest-globals` to `@react-md/core/test-utils/jest-globals`
  - Added additional test queries to help find `react-md` elements in tests
  - Simplified form sass imports
  - Added `gridAutoRows` behavior to the `Box` component
  - Add the `capture` prop to the `MenuItemFileInput`
  - Updated the `useTextField` hook to support rendering the counter while `disableMessage` is `true`
  - Updated `useTextField` to support the `"valid"` `ValidityState`
  - Fixed the layout navigation not handling scrollbars in RTL mode
  - Added the `useTableOfContentsHeadings` hook to support dynamic table of contents
  - Updated most default transition timeouts and classnames to use `satisfies` to allow better typing
  - Added `SimpleTabPanels` and `SimpleTabPanel` components when the tab panels do not need to animate
  - The vertical `Tab` now display the active tab indicator to the right instead of the left by default
  - The `TabList` component supports full width tabs without truncating
  - The tab components moved more customization to custom CSS properties:
    - `min-height`
    - `min-width`
    - `max-width`
    - `stacked-height`
    - `stacked-width`
    - `padding`
    - `stacked-padding`
  - A new `useTabPanelMaxHeight` hook has been added to prevent layout shifts while switching between tabs
  - The `TabList` now supports dynamically adding scroll buttons
  - Hopefully made the color scheme behavior make more sense with some renaming
  - Added `DEFAULT_COLLATOR_OPTIONS` if they should be used for new `alphaNumericSort` comparators
  - `bem` util now allows `styles().base` to get the base class name
  - Added `touch-action: none` to the draggable components and updated `useDraggable` to
    match that new behavior
  - `ArrowUp` and `ArrowDown` work as expected for vertically draggable components
  - Fixed some re-rendering issues that would happen in React 19 by moving to `useEffect`
  - The progress styles correctly use the `progress` layer instead of `overlay`
  - The progress styles now add `will-change` to increase perf
  - The "scroll right" button in the `TabList` correctly disables
  - The `Tab` will only shrink once the `max-width` has been reached instead of
    if there is not enough room in the container
  - The `useDropzone` hook correctly captures blur events when the user drags
    from the dropzone immediately to the file browser
  - `useMutationObserver` uses the `onUpdate` instead of `onUpdated` to match other `use*Observer` hooks
  - Added most remaining documentation to the website

- Updated dependencies
  - @react-md/core@1.0.0-next.20

## 6.0.0-next.7

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.19

## 6.0.0-next.6

### Patch Changes

- Updated dependencies
  - @react-md/core@1.0.0-next.18

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
