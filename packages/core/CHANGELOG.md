# @react-md/core

## 7.0.0

### Major Changes

- e56a973: BREAKING CHANGE: v7 dropped support for React < 19. Upgrade to react 19 or continue using v6.x.x

## 6.5.2

### Patch Changes

- 1e0d118: Fixed material symbols not correctly applying the `fill` customization

## 6.5.1

### Patch Changes

- f83cf31: Fixed the optional-css-module sass util to work with turbopack
- b0306dd: Updated code for new eslint rules which mostly changed usage of `window` to `globalThis`. This should generally not require any changes on your end.

## 6.5.0

### Minor Changes

- c9efa12: Updated the `Select` component to have a new `getSelectedOptionChildren` prop to dynamically configure the selected option display children for additional customization. #1470

### Patch Changes

- 01c4e0a: Fixed the filled text field theme styling for floating labels
- 81a0b0e: Allow the selectedOptionProps.children to override the Select display value
- 7a98aec: Updated the floating label transform behavior to make positioning calculations easiser
- 16dc984: Fixed the Sass circular dependency for divider
- fc2cd20: Fixed the floating legend styles for underline and filled themes
- 99fe90c: Updated all Sass files for the new [if function behavior](https://sass-lang.com/documentation/breaking-changes/if-function/). This might require updating `sass-embedded` or `sass` to the latest version

## 6.4.0

### Minor Changes

- 12affc4: Added a new `MEDIA_QUERY_CONFIG` mutable object to allow global media query changes - 931ce93
- 12affc4: The `Legend` is now able to act as a floating label within a `Fieldset`
- 12affc4: Updated the WindowSplitter component so it can have a custom background color while inactive - 224dcfa
- 12affc4: Added more CSS variables for the text field component: `base-height`, `label-height`, `dense-height`, `dense-label-height`, `border-radius`, `outlined-border-radius`

### Patch Changes

- 12affc4: Typography no longer inherit overflow by default since it causes clipping in header elements - b7315e0
- 12affc4: The `useNumberField` hook should now hopefully work correctly in React 19 (29b1b5b)
- 12affc4: Updated the layout package to add an error when the `temporaryUntil` value does not match CSS to help debug issues - d85581c
- 12affc4: Started implementing the datetime package by adding a new SpinButton component

## 6.3.4

### Patch Changes

- Bug fixes:
  - The `ProvidedTextFieldProps` correctly sets the `TextFieldChangeHandlers` to `Required`
  - The `Box` correctly applies the default `auto-fit` or `auto-fill` to columns for undefined media queries

## 6.3.3

### Patch Changes

- Bug fixes:
  - typo for `GetRangeSliderTestElementsOptions` type name
  - stop using deprecated `clip` css property
  - add jest@30 to peer dependencies range

  Other changes:
  - Bump dependencies to latest

## 6.3.2

### Patch Changes

- Bug fixes:
  - The `useFocusContainer` hook correctly merges `onEnter` and `onExit`
    - Nested dialogs only show the top-most overlay animation
    - Menus correctly merge `onEnter` and `onExit`

  Other changes:
  - Updated examples to use the latest templates (`vite` has some new deps and tsconfigs)
  - bumped safe dependencies to latest
  - `CreateHoverModeContextOptions` provides docs for the `defaultActiveId`

## 6.3.1

### Patch Changes

- - Fixed the Button icon-square border-radius
  - Added the missing custom properties to the CSSProperties interface
  - Fixed the NativeSelect base styles
  - Fixed the TextArea and NativeSelect addon position styles
  - Bumped safe dependencies to latest

## 6.3.0

### Minor Changes

- This release focused on some form improvements as I work towards the full date,
  time, and datetime component implementations.
  - The `useTextField` and `useNumberField` automatically reset on a form reset event
  - The `FormMessageContainer` can now be rendered inline
  - Added `useDateField` and `NativeDateField` component for simple date behavior
  - Added `useTimeField` and `NativeTimeField` component for simple time behavior
  - Refactored movement behavior to provide actions allowing for more reuse in complex widgets
  - Increased test coverage

## 6.2.1

### Patch Changes

- Fixed the Select component not showing the focus outline behavior after splitting form styles into separate files.

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

## 6.0.2

### Patch Changes

- - do not allow clear button to be clickable while hidden
  - update controllable hooks/components to show the correct prop name instead of only showing `value`
  - update source comments to use `https://react-md.dev` instead of `https://next.react-md.dev`

## 6.0.1

### Patch Changes

- Fixed the media-queries using map.nth instead of map.get after switching from list.nth.

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

### Minor Changes

- bc90f77: Fixed styling issues, added additional configuration props, and added support for non-barrel file behavior

  ## Features
  - Added support for non-barrel files for `@react-md/core` to improve build performance in bundlers
    - i.e. `import { Button } from "@react-md/core/button/Button"` and `import { useToggle } from "@react-md/core/useToggle"`
  - Added a new `MenuItemCircularProgress` component
  - Added a `useFuzzyMatch` hook to increase the performance around fuzzy matching in large lists
  - `useListboxContext` will now throw an error if a parent `ListboxProvider` does not exist
  - Updated the `TableRow` hover state to no longer require the `InteractionModeProvider`
  - Updated the `useDebouncedFunction` and `useThrottledFunction` hooks to support manually cancelling timeouts

  ## Fixes
  - `Label` supports `pointer-events` while floating
  - `Select` no longer displays the soft keyboard on mobile devices
  - `TextArea` allows the `containerProps` like the `TextField` and added some fixes for the resizing behavior
  - `Snackbar` supports absolute positioning

  ## Documentation
  - Updated the documentation around using the mocked `ResizeObserver` in tests so that the example is on the `setupResizeObserverMock` instead of `ResizeObserverMock.resizeElement`

### Patch Changes

- aaedc49: Fixed form layer application
- 3b18106: Trying a different way to handle package.json exports.
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

- 70f92fd: Fixed missing use client directives, styling issues in labels and expansion panels, and removing unused layers.
- 6e8e77e: Fixed TextField styling
- c42ad14: This release was focused around the `Autocomplete` and the "better" API for it. There's a lot more functionality built
  in by default and should behave much more like other libraries. I might add a few more features in before calling it complete, but not sure yet.

  Check out the <https://next.react-md.dev/components/autocomplete> page to see the latest demos.

  Fixes:
  - Updated all styles to fix issues around the new [Sass Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/)
  - Updated most function declarations on interfaces to be arrow functions instead of methods to prevent `this` pollution
  - No longer unmount the dialog component when switching between full-page and other dialog types
  - Updated the nested Dialog behavior when a full-page dialog is included
  - Fixed some missing accessibility props for the `Navigation` components

  Features:
  - Updated the `Navigation` components to be controlled for the collapsed state and added a `useNavigationExpansion` hook to help control the state
  - Added the `objectFit` utility class generator
  - Added `isColorScheme` and `isColorSchemeMode` type assertion helpers
  - Added support for `Dialog` widths
  - Only apply base styles to the `body` element instead of `html`
  - Updated the `Card` component to extend the `Box` component
  - Added support to `disableRipple` on the component level instead of global only
  - Added `useReadonlySet` hook
  - Added `disabled` support to the `useFixedPositioning` hook and related components
  - Added the missing `--rmd-scrollbar-size` type definition to the `CSSProperties` interface
  - Added a simple `debounce` helper for usage outside of react components

  Other changes:
  - Updated `.mouse-mode`, `.keyboard-mode`, and `.touch-mode` to be prefixed with `rmd-` like all other classes
  - Started adding SCSS documentation back since I'm working on the sassdoc-parser/sass-lsp
  - Renamed `ResponsiveItemContainer` to `ResponsiveItem`
  - Split some files so they they don't all need to be considered client components
  - Updated the `NativeSelect` styling to match other components that use the `TextFieldContainer` and `FormMessageContainer` components
  - Fixed the height for nested Menu Item Dropdowns
  - Stopped using deprecated browser APIs
  - Renamed `useImmediateRaf` to `testImmediateRaf` so it isn't considered a hook

  Documentation:
  - Added Dark Mode docs
  - Added Breakpoints docs
  - Added Color Palette docs
  - Added additional `Dialog` demos
  - Added `Form` docs
  - Added `WindowSplitter` docs
  - Added `ResponsiveItem` docs

  Internal:
  - Updated to use `eslint@9.x.x`

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

- 31b0fa5: Experimental support for package.json exports and updated material icons.
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

- e475d03: Added a RootHtml component for Next.js apps and a lot of changes to the Select
  component. The Select _should_ be able to be autofilled by the browser and
  password managers now if I remember correctly. There's also a lot of work into
  getting started with the new Autocomplete API.
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

- e37cc8d: Fixed Sass variable issues and other CSS tweaks.
- ae417ce: - The `constrast-color` mixin no longer throws an error with some colors due to `color.channel` not returning an int
  - Fixed some type definitions for the React 19 release
  - Disable line wrapping for the current selected option in the `Select` component
  - Updated docs for lots of hooks and components
  - Added docs for testing with Jest

- d5d7d5a: Added the first implementation for the new `Autocomplete` component and API which made me
  realize I need to modify it a bit more. The next release should include better behavior
  to mimic react-select and material ui where it supports working as a select element,
  mutliselect options, and creating chips with values.

  Breaking Changes
  - The `useAsyncAction` was renamed to `useAsyncFunction` to mimic the other `use*Function` hooks.
  - Removed the `children` prop from the `TextField` component

  Features
  - Added the `clear` icon to support the `Autocomplete` clear button behavior
  - Updated the text field padding to be easier to style with CSS custom properties
  - Added the `useTextFieldContainerAddons` hook to dynamically update the padding based on addon size with the `TextFieldContainer`
  - Added the `useMutationObserver` hook

  Bug Fixes
  - Fixed adding some `@use` statements for the Sass standard library
  - Fixed the `useDraggable` range behavior
  - Fixed the cross fade transition behavior

- 54f99e9: Fixed a bunch of styling issues, being unable to disable styles, being unable to remove styles, and missing types for the MenuItemInputToggle components.
- 91ea1f8: Fixed compile output directory by reverting to @swc/cli@0.1.63

## 1.0.0-next.21

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

## 1.0.0-next.20

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

## 1.0.0-next.19

### Patch Changes

- Fixed TextField styling

## 1.0.0-next.18

### Patch Changes

- - The `constrast-color` mixin no longer throws an error with some colors due to `color.channel` not returning an int
  - Fixed some type definitions for the React 19 release
  - Disable line wrapping for the current selected option in the `Select` component
  - Updated docs for lots of hooks and components
  - Added docs for testing with Jest

## 1.0.0-next.17

### Patch Changes

- This release was focused around the `Autocomplete` and the "better" API for it. There's a lot more functionality built
  in by default and should behave much more like other libraries. I might add a few more features in before calling it complete, but not sure yet.

  Check out the <https://react-md.dev/components/autocomplete> page to see the latest demos.

  Fixes:
  - Updated all styles to fix issues around the new [Sass Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/)
  - Updated most function declarations on interfaces to be arrow functions instead of methods to prevent `this` pollution
  - No longer unmount the dialog component when switching between full-page and other dialog types
  - Updated the nested Dialog behavior when a full-page dialog is included
  - Fixed some missing accessibility props for the `Navigation` components

  Features:
  - Updated the `Navigation` components to be controlled for the collapsed state and added a `useNavigationExpansion` hook to help control the state
  - Added the `objectFit` utility class generator
  - Added `isColorScheme` and `isColorSchemeMode` type assertion helpers
  - Added support for `Dialog` widths
  - Only apply base styles to the `body` element instead of `html`
  - Updated the `Card` component to extend the `Box` component
  - Added support to `disableRipple` on the component level instead of global only
  - Added `useReadonlySet` hook
  - Added `disabled` support to the `useFixedPositioning` hook and related components
  - Added the missing `--rmd-scrollbar-size` type definition to the `CSSProperties` interface
  - Added a simple `debounce` helper for usage outside of react components

  Other changes:
  - Updated `.mouse-mode`, `.keyboard-mode`, and `.touch-mode` to be prefixed with `rmd-` like all other classes
  - Started adding SCSS documentation back since I'm working on the sassdoc-parser/sass-lsp
  - Renamed `ResponsiveItemContainer` to `ResponsiveItem`
  - Split some files so they they don't all need to be considered client components
  - Updated the `NativeSelect` styling to match other components that use the `TextFieldContainer` and `FormMessageContainer` components
  - Fixed the height for nested Menu Item Dropdowns
  - Stopped using deprecated browser APIs
  - Renamed `useImmediateRaf` to `testImmediateRaf` so it isn't considered a hook

  Documentation:
  - Added Dark Mode docs
  - Added Breakpoints docs
  - Added Color Palette docs
  - Added additional `Dialog` demos
  - Added `Form` docs
  - Added `WindowSplitter` docs
  - Added `ResponsiveItem` docs

  Internal:
  - Updated to use `eslint@9.x.x`

## 1.0.0-next.16

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

## 1.0.0-next.15

### Patch Changes

- This release focused on starting to create the codemods for v5 to v6, which helped me find and fix:
  - Fixed the surface colors when `$color-scheme: light`
  - `CardSubtitle` can now remove the secondary text color like v5 using the `textColor` `Typography` prop
  - Moved the sticky styles behavior for tables into `StickyTableSection` instead of `TableHeader`/`TableFooter`
  - Moved more table types into the `types.ts` file
  - Re-ran the material icons script to fix the types for `MaterialSymbol` and `MaterialIcon`
  - Updated documentation for components and changes between v5

## 1.0.0-next.14

### Patch Changes

- Added the first implementation for the new `Autocomplete` component and API which made me
  realize I need to modify it a bit more. The next release should include better behavior
  to mimic react-select and material ui where it supports working as a select element,
  mutliselect options, and creating chips with values.

  Breaking Changes
  - The `useAsyncAction` was renamed to `useAsyncFunction` to mimic the other `use*Function` hooks.
  - Removed the `children` prop from the `TextField` component

  Features
  - Added the `clear` icon to support the `Autocomplete` clear button behavior
  - Updated the text field padding to be easier to style with CSS custom properties
  - Added the `useTextFieldContainerAddons` hook to dynamically update the padding based on addon size with the `TextFieldContainer`
  - Added the `useMutationObserver` hook

  Bug Fixes
  - Fixed adding some `@use` statements for the Sass standard library
  - Fixed the `useDraggable` range behavior
  - Fixed the cross fade transition behavior

## 1.0.0-next.13

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

## 1.0.0-next.12

### Patch Changes

- Trying a different way to handle package.json exports.

## 1.0.0-next.11

### Patch Changes

- Experimental support for package.json exports and updated material icons.

## 1.0.0-next.10

### Minor Changes

- Fixed styling issues, added additional configuration props, and added support for non-barrel file behavior

#### Features

- Added support for non-barrel files for `@react-md/core` to improve build performance in bundlers
  - i.e. `import { Button } from "@react-md/core/button/Button"` and `import { useToggle } from "@react-md/core/useToggle"`
- Added a new `MenuItemCircularProgress` component
- Added a `useFuzzyMatch` hook to increase the performance around fuzzy matching in large lists
- `useListboxContext` will now throw an error if a parent `ListboxProvider` does not exist
- Updated the `TableRow` hover state to no longer require the `InteractionModeProvider`
- Updated the `useDebouncedFunction` and `useThrottledFunction` hooks to support manually cancelling timeouts

#### Fixes

- `Label` supports `pointer-events` while floating
- `Select` no longer displays the soft keyboard on mobile devices
- `TextArea` allows the `containerProps` like the `TextField` and added some fixes for the resizing behavior
- `Snackbar` supports absolute positioning

#### Documentation

- Updated the documentation around using the mocked `ResizeObserver` in tests so that the example is on the `setupResizeObserverMock` instead of `ResizeObserverMock.resizeElement`

## 1.0.0-next.9

### Patch Changes

- Added a RootHtml component for Next.js apps and a lot of changes to the Select
  component. The Select _should_ be able to be autofilled by the browser and
  password managers now if I remember correctly. There's also a lot of work into
  getting started with the new Autocomplete API.

## 1.0.0-next.8

### Patch Changes

- Fixed a bunch of styling issues, being unable to disable styles, being unable to remove styles, and missing types for the MenuItemInputToggle components.

## 1.0.0-next.7

### Patch Changes

- Fixed form layer application

## 1.0.0-next.6

### Patch Changes

- Fixed missing use client directives, styling issues in labels and expansion panels, and removing unused layers.

## 1.0.0-next.5

### Patch Changes

- Fixed compile output directory by reverting to @swc/cli@0.1.63

## 1.0.0-next.4

### Patch Changes

- Fixed Sass variable issues and other CSS tweaks.

## 1.0.0-next.3

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

## 1.0.0-next.2

### Major Changes

- Updated custom properties to require a defined value instead of always providing a fallback. This decreases the bundle size by a good amount.

  Also updated the `Snackbar` so that it no longer has a `role="status"` to fix accessibility. Instead, each toast will have `role="status"` or `role="alert"`.

## 1.0.0-next.1

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

## 1.0.0-next.0

### Major Changes

- Initial v6 release test
