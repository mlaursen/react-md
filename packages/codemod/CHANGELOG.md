# @react-md/codemod

## 6.0.0

### Major Changes

- 64071b7: The next preview of v6.0.0.

  Breaking Changes:

  - An accessible label is now required for `CircularProgress` and `LinearProgress`
    - Updated `AsyncButton` to pass props to the progress component and other
      accessibility teaks
    - Updated `CircularProgressSuspense` to default the `aria-label` to `"Loading"`
  - Removed the `VerticalDivider` component
  - Rename `hoverTime`/`leaveTime` to `hoverTimeout`/`leaveTimeout` for hover mode
  - Removed the `forceSize`/`forceFontSize` props from the `FontIcon`
  - Removed the `useOverflowTooltip` and instead integrate it into the
    `useTooltip` hook. It's cheaper to check on the start event instead of having
    a resize observer always active
  - Removed the `LinkProvider` since it was only used for the `Tree` component and
    it's easier to pass the custom link component down

  Features:

  - Added `TRANSITION_CONFIG` so transitions can be disabled
    - Updated the `@react-md/test-utils/jest-setup` to always disable transitions
      in tests
  - Added `MATERIAL_CONFIG` to override defaults instead of using context
  - Adding support for including `data-testid` in all HTMLAttributes by including
    `@react-md/test-utils/data-testid` somewhere (normally `setupTests.ts`)
  - Added `theme` to `Avatar`
  - Update `Dialog` to be an `alertdialog` by default when `modal` is enabled and
    added `aria-modal` when `modal` is enabled
  - Add additional props to `Slider` to customize the tooltip
  - Updated all table styling utility functions to be in separate files so they
    aren't forced as client code
  - Added `iconRotatorProps` for the `TableCell`
  - Updated `isStickyActive` to provide the `isInTableContainer` boolean and
    export `isTableFooterStickyActive` default function
  - Add support for `stickyActiveClassName`
  - Added support for `TableRadio` component
  - Updated `DropdownMenu` to support controlling the visibility

  Bug Fixes:

  - Improved performance for multiple transitions by no longer causing layout
    shifts
  - Add some missing custom properties to inline styles for Typescript
  - Update `Tooltip` to default to temporary again. There's no need to create 1000
    nodes in large apps on startup
  - Fixed styles for `MenuItemCheckbox`, `MenuItemRadio`, and `MenuItemSwitch`
  - Fix `Slider` marks when the min value is not `0`
  - Fixed the default anchor for the `Menu` component when using a floating action
    button
  - Update `Tooltip` to use `textOverflow` instead of `disableLineWrap`
  - Update `Switch` to no longer be a client component
  - Update `Switch` to support rendering components within the ball

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

- 64071b7: Initial v6 release test
- d8f185b: Updated custom properties to require a defined value instead of always providing a fallback. This decreases the bundle size by a good amount.

  Also updated the `Snackbar` so that it no longer has a `role="status"` to fix accessibility. Instead, each toast will have `role="status"` or `role="alert"`.

### Patch Changes

- 68f0920: The next v6 alpha release.

  # Changes

  ## AppBar

  - Updated `AppBar` to use the `Box` component and additional `cssUtils`
  - Added a `$nav-keyline` variable for the `AppBarTitle` offset

  ## Avatar

  - Fixed the `color` prop definition

  ## Badge

  - Simplified the offset variables

  ## Button

  - Added a `TooltippedButton` component

  ## Card

  - Added a `ClickableCard` component
  - Fixed the `CardSubtitle` color

  ## Dialog

  - Fixed the background colors

  ## Divider

  - Removed the `vertical-sizing` variable and updated the vertical divider to update the same way as a horizontal divider

  ## Expansion Panel

  - Renamed `preventAllClosed` to `preventAllCollapsed` to better match naming schemes

  ## Form

  - Updated `MenuItemInputToggle` to use `multiline` instead of `threeLines`
  - Fixed the `Select` focus behavior when rendering within a `Sheet`

  ## Icon

  - Fixed the styling for the `IconRotator` by setting the default rotate variables
  - Fixed the styling for the `IconSpacing` component when using `above` or `below`

  ## List

  - Renamed `threeLines` to `multiline` and updated the CSS variables to match
  - Fixed some styling by correctly passing all props down
  - Added the ability to disable the spacing for the left addons

  ## Portal

  - Updated `PortalContainerProvider` to support a `RefObject`

  ## Table

  - Fixed the `TableCheckbox` and `TableRadio` components to be client components instead of server components

  ## Tabs

  - Added support for rendering vertically
  - Added support to render a tab as a link instead of a button
  - Renamed the `--rmd-tab-width` to `--rmd-tab-size`

  ## Tooltip

  - Fixed some type definition issues for event handlers

  ## Transition

  - Updated `SkeletonPlaceholder` to `forwardRef`
  - Updated `SkeletonPlaceholder` and `useSkeletonPlaceholder` to support `animation-delay`
  - Added `randomSkeletonPlaceholder` util to generate SSR-only skeletons
  - Fixed the naming of the Sass variables since they weren't prefixed by `transition-`

  ## Tree

  - Fixed the type definitions for the `DefaultTreeItemRenderer` for the `data` prop after switching to `RenderRecursively`
  - Fixed the `Tree` components to start the `--rmd-tree-depth` at `0` instead of `-1`
  - Removed the `--padded` style since it's no longer needed

  ## Typography

  - Updated the base typography to default to `overflow-wrap: break-word`
  - Fixed the `TextContainer` styling to include the padding in the line length

  ## Other

  - Uses `:has` selectors and `:focus-visible` since all major browsers support them now
  - Uses `@media(hover: hover) and (pointer: fine)` for hover states instead of `.mouse-mode`
  - Refactored some draggable utils and fixed bugs around dragging
  - Added a `useElementSize` wrapper for the `useResizeObserver` hook
  - Fixed `useElementSize` to trigger immediately on mount
  - Updated `useWindowSize` to support SSR values

- e37cc8d: Fixed Sass variable issues and other CSS tweaks.

## 6.0.0-next.4

### Patch Changes

- Fixed Sass variable issues and other CSS tweaks.

## 6.0.0-next.3

### Patch Changes

- The next v6 alpha release.

  # Changes

  ## AppBar

  - Updated `AppBar` to use the `Box` component and additional `cssUtils`
  - Added a `$nav-keyline` variable for the `AppBarTitle` offset

  ## Avatar

  - Fixed the `color` prop definition

  ## Badge

  - Simplified the offset variables

  ## Button

  - Added a `TooltippedButton` component

  ## Card

  - Added a `ClickableCard` component
  - Fixed the `CardSubtitle` color

  ## Dialog

  - Fixed the background colors

  ## Divider

  - Removed the `vertical-sizing` variable and updated the vertical divider to update the same way as a horizontal divider

  ## Expansion Panel

  - Renamed `preventAllClosed` to `preventAllCollapsed` to better match naming schemes

  ## Form

  - Updated `MenuItemInputToggle` to use `multiline` instead of `threeLines`
  - Fixed the `Select` focus behavior when rendering within a `Sheet`

  ## Icon

  - Fixed the styling for the `IconRotator` by setting the default rotate variables
  - Fixed the styling for the `IconSpacing` component when using `above` or `below`

  ## List

  - Renamed `threeLines` to `multiline` and updated the CSS variables to match
  - Fixed some styling by correctly passing all props down
  - Added the ability to disable the spacing for the left addons

  ## Portal

  - Updated `PortalContainerProvider` to support a `RefObject`

  ## Table

  - Fixed the `TableCheckbox` and `TableRadio` components to be client components instead of server components

  ## Tabs

  - Added support for rendering vertically
  - Added support to render a tab as a link instead of a button
  - Renamed the `--rmd-tab-width` to `--rmd-tab-size`

  ## Tooltip

  - Fixed some type definition issues for event handlers

  ## Transition

  - Updated `SkeletonPlaceholder` to `forwardRef`
  - Updated `SkeletonPlaceholder` and `useSkeletonPlaceholder` to support `animation-delay`
  - Added `randomSkeletonPlaceholder` util to generate SSR-only skeletons
  - Fixed the naming of the Sass variables since they weren't prefixed by `transition-`

  ## Tree

  - Fixed the type definitions for the `DefaultTreeItemRenderer` for the `data` prop after switching to `RenderRecursively`
  - Fixed the `Tree` components to start the `--rmd-tree-depth` at `0` instead of `-1`
  - Removed the `--padded` style since it's no longer needed

  ## Typography

  - Updated the base typography to default to `overflow-wrap: break-word`
  - Fixed the `TextContainer` styling to include the padding in the line length

  ## Other

  - Uses `:has` selectors and `:focus-visible` since all major browsers support them now
  - Uses `@media(hover: hover) and (pointer: fine)` for hover states instead of `.mouse-mode`
  - Refactored some draggable utils and fixed bugs around dragging
  - Added a `useElementSize` wrapper for the `useResizeObserver` hook
  - Fixed `useElementSize` to trigger immediately on mount
  - Updated `useWindowSize` to support SSR values

## 6.0.0-next.2

### Major Changes

- Updated custom properties to require a defined value instead of always providing a fallback. This decreases the bundle size by a good amount.

  Also updated the `Snackbar` so that it no longer has a `role="status"` to fix accessibility. Instead, each toast will have `role="status"` or `role="alert"`.

## 6.0.0-next.1

### Major Changes

- 117350ed79: The next preview of v6.0.0.

  Breaking Changes:

  - An accessible label is now required for `CircularProgress` and `LinearProgress`
    - Updated `AsyncButton` to pass props to the progress component and other
      accessibility teaks
    - Updated `CircularProgressSuspense` to default the `aria-label` to `"Loading"`
  - Removed the `VerticalDivider` component
  - Rename `hoverTime`/`leaveTime` to `hoverTimeout`/`leaveTimeout` for hover mode
  - Removed the `forceSize`/`forceFontSize` props from the `FontIcon`
  - Removed the `useOverflowTooltip` and instead integrate it into the
    `useTooltip` hook. It's cheaper to check on the start event instead of having
    a resize observer always active
  - Removed the `LinkProvider` since it was only used for the `Tree` component and
    it's easier to pass the custom link component down

  Features:

  - Added `TRANSITION_CONFIG` so transitions can be disabled
    - Updated the `@react-md/test-utils/jest-setup` to always disable transitions
      in tests
  - Added `MATERIAL_CONFIG` to override defaults instead of using context
  - Adding support for including `data-testid` in all HTMLAttributes by including
    `@react-md/test-utils/data-testid` somewhere (normally `setupTests.ts`)
  - Added `theme` to `Avatar`
  - Update `Dialog` to be an `alertdialog` by default when `modal` is enabled and
    added `aria-modal` when `modal` is enabled
  - Add additional props to `Slider` to customize the tooltip
  - Updated all table styling utility functions to be in separate files so they
    aren't forced as client code
  - Added `iconRotatorProps` for the `TableCell`
  - Updated `isStickyActive` to provide the `isInTableContainer` boolean and
    export `isTableFooterStickyActive` default function
  - Add support for `stickyActiveClassName`
  - Added support for `TableRadio` component
  - Updated `DropdownMenu` to support controlling the visibility

  Bug Fixes:

  - Improved performance for multiple transitions by no longer causing layout
    shifts
  - Add some missing custom properties to inline styles for Typescript
  - Update `Tooltip` to default to temporary again. There's no need to create 1000
    nodes in large apps on startup
  - Fixed styles for `MenuItemCheckbox`, `MenuItemRadio`, and `MenuItemSwitch`
  - Fix `Slider` marks when the min value is not `0`
  - Fixed the default anchor for the `Menu` component when using a floating action
    button
  - Update `Tooltip` to use `textOverflow` instead of `disableLineWrap`
  - Update `Switch` to no longer be a client component
  - Update `Switch` to support rendering components within the ball

## 6.0.0-next.0

### Major Changes

- Initial v6 release test
