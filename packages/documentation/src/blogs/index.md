Title: react-md 5.0.0

Date: 01/30/2022

Summary:

> Check out the [v4 to v5 Migration Guide](/migration-guides/v4-to-v5) for more
> information around updating code to this major version.

This release focused on creating a new `Menu` API that should hopefully make
menus easier to use along with some other new features. The main difference is
that the `DropdownMenu` no longer accepts a list of `items` that get converted
to `MenuItem`s behind the scenes. Instead, the `children` of the `DropdownMenu`
should be all the `MenuItem` components that should be used inside the menu. The
main reason for this change is to make it easier to create reusable components
for different actions within your app and no longer needed to disable the React
`eslint` rule around missing `key`s.

Another notable change is that nested dropdown menus no longer require the
`DropdownMenuItem` component and instead the `DropdownMenu` automatically
renders as a `<li>` if it appears as a child of another `Menu` component.

Here's a quick example of migrating to the new `DropdownMenu` API:

```diff
 import type { ReactElement } from "react";
-import { DropdownMenu, DropdownMenuItem } from "@react-md/menu";
+import { DropdownMenu, MenuItem } from "@react-md/menu";

 export default function Example(): ReactElement (
-  <DropdownMenu
-    id="example-dropdown-menu"
-    items={[
-      { onClick: () => console.log("Clicked Item 1"), children: "Item 1" },
-      { onClick: () => console.log("Clicked Item 2"), children: "Item 2" },
-      { onClick: () => console.log("Clicked Item 3"), children: "Item 3" },
-      <DropdownMenuItem
-        id="nested-dropdown-menu"
-        items={["Subitem 1", "Subitem 2", "Subitem 3"]}
-      >
-        Submenu
-      </DropdownMenuItem>,
-    ]}
-  >
-    Dropdown
+  <DropdownMenu id="example-dropdown-menu" buttonChildren="Dropdown">
+    <MenuItem onClick={() => console.log("Clicked Item 1")}>Item 1</MenuItem>
+    <MenuItem onClick={() => console.log("Clicked Item 2")}>Item 2</MenuItem>
+    <MenuItem onClick={() => console.log("Clicked Item 3")}>Item 3</MenuItem>
+    <DropdownMenu
+      id="nested-dropdown-menu"
+      buttonChildren="Submenu"
+    >
+      <MenuItem>Subitem 1</MenuItem>
+      <MenuItem>Subitem 2</MenuItem>
+      <MenuItem>Subitem 3</MenuItem>
+    </DropdownMenu>
   </DropdownMenu>
 );
```

On top of the new API, two major new features have been integrated into this
release:

#### Hoverable Menus

Menus can now act like a browser's bookmark folder behavior where the user must
click one of the dropdowns before all other menus become immediately visible on
hover by using the new `MenuBar` component. This also implements some new
keyboard movement behavior matching the
[menubar spec](https://www.w3.org/TR/wai-aria-practices/#menu).

If the first-click behavior is undesired, the `MenuBar` also accepts a
`hoverTimeout` prop which can be set to `0` to make the menus appear immediately
on hover or another time in milliseconds to wait before the "hover mode"
behavior should begin.

> Check out the [Hoverable Menus demo](/packages/menu/demos/#hoverable-menus)
> for more information.

#### Conditionally Rendering Menus within a Sheet

Since menus aren't always ideal for small viewports, the `DropdownMenu` has been
updated to conditionally rendering the `Menu` within a `Sheet` instead of being
positioned relative to the `Button` element. This feature is **opt-in** by
either:

- Adding `menuConfiguration={{ renderAsSheet: "phone" }}` on the `Configuration`
  component from `@react-md/layout`
- Wrapping a `DropdownMenu` in the `MenuConfigurationProvider` and adding a prop
  `renderAsSheet="phone"`
- Directly on a `DropdownMenu` with the `renderAsSheet="phone"` prop

The `Sheet` will default to rendering at the bottom of the viewport and have a
max height that should allow the user to close the menu by clicking the overlay
behind the sheet. These defaults can be configured with the `sheetPosition` and
`sheetVerticalSize` props.

The `Sheet` can also be configured to have an optional header and footer using
the `sheetHeader` and `sheetFooter` props. If all else fails, the `DropdownMenu`
accepts `sheetProps` which will be passed to the `Sheet` component.

> Check out the
> [Mobile Action Sheets demo](/packages/menu/demos#mobile-action-sheet) for more
> information.

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `TextArea` applies custom height style when
  `resize="none"` (e77d939)
- **@react-md/list:** Pass `disableEnterClick` in `ListItem` (b5e8b69)
- **@react-md/overlay:** Allow for custom onClick behavior (60dce54)
- **@react-md/transition:** Do not create styles for hidden elements (6eff8a8)
- **@react-md/typography:** Fixed overline class name (1e544d0)
- **@react-md/utils:** `useRefCache` returns non-mutable object (b696b72)
- **@react-md/utils:** Positioning logic for inner-left/inner-right and vertical
  anchors (a38abfb)

##### Features<!-- no-margin -->

- **@react-md/dialog:** Add new `overlayProps` to configure the dialog's overlay
  (cfc30f0)
- **@react-md/divider:** Update `useVerticalDividerHeight` to support any
  HTMLElement (edd9287)
- **@react-md/divider:** Update divider styles for non-hr elements (7ccd0a6)
- **@react-md/form:** Update `TextFieldContainer` to optionally fill all space
  in flex containers (2c8e68c)
- **@react-md/list:** Created rmd-list-unstyled utility class from the mixin
  (6c9b7f4)
- **@react-md/menu:** Implemented new Menu API (c27bf55)
- **@react-md/menu:** Better floating action button default behavior (0cdeff7)
- **@react-md/utils:** export focusable query constants (f9f7955)
- **@react-md/utils:** Implemented new keyboard focus behavior (77f0d01)
- **@react-md/utils:** Updated the HoverMode API (ac60bdb)

##### Documentation<!-- no-margin -->

- Added documentation for using a GitHub template to bootstrap a new project
  (aac11ba)
- Removed Working with v1 documentation (8aa71ac)
- **@react-md/sheet:** Move tsdoc around for easier sharing (83fcaac)
- **react-md.dev:** Better migration guide search behavior (9729269)
- **react-md.dev:** Disable TOCs in dev mode and use temporary layout (3203af4)
- **react-md.dev:** Fixed weird dev error with spreading props and key (7cd7b8c)

##### Other Internal Changes<!-- no-margin -->

- Removed commitizen since I never use it (3e738b4)
- **@react-md/form:** Updated `FileInput` snapshots for new icon (f5e43fe)
- **@react-md/icon:** Renamed the download icon to upload (2752a98)
- **@react-md/icon:** Updated docs and examples to use ConfiguredIcons type
  (bbfebed)
- **@react-md/menu:** Added tests for the new menu API and fixed a few issues
  (7202dd0)
- **@react-md/menu:** Fixed `MenuBar` visibility for touch devices (1288be7)
- **@react-md/menu:** Fixed keyboard movement in MenuBars with visible menus
  (5b2494a)
- **@react-md/utils:** Export `enableScrollLock` and `disableScrollLock` utils
  (6a95734)
- **@react-md/utils:** Remove touch utils and passive events checks (3597d32)
- **@react-md/utils:** `useScrollListener` no longer accepts an element or
  options (74a0274)
- **examples:** bump `next` from 12.0.7 to 12.0.9 (04749c6)
- **examples:** Updated `create-react-app` examples to use v5.0.0 (f7850b8)
- **examples:** Updated gatsby examples to v4.4.0 (8a12699)
- **react-md.dev:** Add migration guides for `react-md` major versions (78b7396)
- **react-md.dev:** Add word-break to headings for markdown pages (03b1301)
- **react-md.dev:** Fixed ids for emulated phones (10984f5)
- **react-md.dev:** Suppress hydration for markdown (8bb4d51)
- **react-md.dev:** Update HoverableMenus example to not use `TextArea`
  (5361825)
- **react-md.dev:** Updated a few menu demos (c43cd31)

##### Breaking Changes<!-- no-margin -->

- `DEFAULT_HOVER_MODE_STICKY_EXIT_TIME` has been renamed to
  `DEFAULT_HOVER_MODE_EXIT_TIME`.
- Menu buttons will no longer open by pressing the `ArrowUp` or `ArrowDown`
  keys.
- The `DropdownMenu` component no longer accepts a list of `items` and instead
  the `children` should be the `MenuItem` components.
- The `DropdownMenu` component no longer supports the `menuRenderer` and
  `itemRenderer` props. Instead, there is built-in support for conditionally
  rendering as a `Sheet` component using the `renderAsSheet` prop.
- The `DropdownMenu` component now requires a parent `AppSizeListener` because
  of the conditional `Sheet` rendering functionality. This might require
  updating your tests to either use the `Configuration` component from
  `@react-md/layout` (recommended) or adding the `AppSizeListener` to tests that
  include `DropdownMenu`s.
- The `DropdownMenuItem` component is no longer required for nested dropdown
  menus and is an "internal" component instead that shouldn't really be used.
- The `exitVisibilityDelay` always defaults to `DEFAULT_HOVER_MODE_EXIT_TIME`.
- The `MenuItemSeparator` now renders as an `<li>` instead of an `<hr>` or
  `<div>`.
- The `useContextMenu` now returns an object instead of an ordered list.
- The `useHoverMode` hook no longer accepts an `HTMLElement` generic and instead
  the event handlers will automatically infer the `HTMLElement` based on usage.
- The `useHoverMode` hook no longer returns `stickyHandlers` and instead returns
  `hoverHandlers` that only include `onMouseEnter` and `onMouseLeave`. The
  `handlers` that are returned now include `onClick`, `onMouseEnter`, and
  `onMouseLeave`. This was kind of what the `stickyHandlers` was before. In
  addition, clicking an element no longer disabled the hover mode behavior.
- The following typescript types have been removed: `HoverModeOnlyOptions`,
  `HoverModeOnlyReturnValue`
- Using any of the `MenuItem` components requires the
  `<MenuKeyboardFocusProvider>` to be mounted as a parent component which might
  affect tests. This will not break anything if you are using the `DropdownMenu`
  or `Menu` components.

---

Title: react-md 4.0.3

Date: 12/31/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/icon:** `FileInput` default icon changed from `file_download` to
  `file_upload` (174d1c1), closes #1325
- **@react-md/table:** Sortable Column Alignment (e447cc5), closes #1321
- **@react-md/utils:** `useIsUserInteractionMode` get mode via context
  (b5f93ae), closes #1322
- **examples:** Updated `create-react-app` README to use correct start command
  (37acdc3)

##### Other Internal Changes<!-- no-margin -->

- Update tests to use jest.mocked (4bb25fb)
- Updated all packages' peerDependenciesMeta (60fcd71), closes #1319
- **@react-md/dev-utils:** Update watch command for new `sass` modules (2e7a87a)
- **examples:** Update `next` to latest version (3521e9b)

---

Title: react-md 4.0.2

Date: 11/29/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** Prevent scrolling while dragging `Slider` on mobile
  (7eb6740)

##### Documentation<!-- no-margin -->

- **react-md.dev:** Update images/videos for markdown pages (5e482bb)

##### Other Internal Changes<!-- no-margin -->

- **@react-md/utils:** Additional test coverage (73bc4eb)

---

Title: react-md 4.0.1

Date: 11/26/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** Added fixes required for Concurrent Rendering (b4994f4)
- **@react-md/layout:** Added fixes required for Concurrent Rendering (c0b29a8)
- **@react-md/menu:** Added fixes required for Concurrent Rendering (05ec620)
- **@react-md/sheet:** Added fixes required for Concurrent Rendering (75663e4)
- **@react-md/utils:** Update `getPercentage` to optionally not throw errors
  (ff8a1d6)

##### Documentation<!-- no-margin -->

- **@react-md/transition:** Fix transitionTo documentation to use useEffect
  (31a31da)

##### Other Internal Changes<!-- no-margin -->

- Updated imports to use `import type` when possible (ba96bb6)
- **react-md.dev:** Fixed demo styles that included CodeBlock (1f1a04e)
- **react-md.dev:** Fixes for Concurrent Rendering (5946bd9)
- **react-md.dev:** Update order of previous docs links (87998b9)

---

Title: react-md 4.0.0

Date: 11/24/2021

Summary:

This release focused on updating the `@react-md/transition` package to no longer
log errors in `React.StrictMode` because `react-ransition-group` was using
`ReactDOM.findDOMNode` to handle transitions. All `react-md` packages will no
longer use `react-transition-group` since all that functionality has been built
into `@react-md/transition` with a slightly different API.

This release has also included my first attempt at automating upgrading to new
major releases by introducing a new
[@react-md/codemod](https://github.com/mlaursen/react-md/tree/98a6a9fe4c5c8cf1baf630e5969b760af93e9ad2/packages/codemod)
package that is similar to the
[react-codemod package](https://github.com/reactjs/react-codemod). You can
automate _some_ of this release by running:

```sh
npx @react-md/codemod v3-to-v4/preset
```

Since I am still learning how to use
[jscodeshift](https://github.com/facebook/jscodeshift), it will not be able to
migrate everything but should still help with most changes.

##### Bug Fixes<!-- no-margin -->

- **@react-md/menu:** `DropdownMenu` and `Menu` portal by default (98a6a9f),
  closes #1264
- **@react-md/tooltip:** cancel timer when element is clicked (5416554)
- **sass:** Do not use legacy global functions (6159e16)

##### Features<!-- no-margin -->

- Update to use new JSX Transform and latest `eslint` (8111cd3)
- **@react-md/portal:** `ConditionalPortal` supports ReactNode children
  (c83d578)
- **@react-md/transition:** No longer use findDOMNode for transitions (cb952da)
- **@react-md/typography:** Renamed Text to `Typography` (30cf056)
- **@react-md/utils:** Export additional positioning types (b50a04c)
- **codemod:** Created a new @react-md/codemod package to help with new releases
  (41c1fa6)

##### Documentation<!-- no-margin -->

- Hackily fix codesandbox.io not using `sass` resolutions in package.json
  (db22cde), closes #1261
- **@react-md/form:** Updated hook overrides so documentation appears correctly
  (436fbff)
- **react-md.dev:** Enable rust compiler by removing custom babelrc (796efd0)
- **react-md.dev:** Fallback code language to markup instead of none (0efaf9b)
- **react-md.dev:** Fix alert sandboxes (8f19297)
- **react-md.dev:** Removed SwipeableTabs demo since it didn't really work
  (2d79f93)
- **react-md.dev:** Separate Code and CodeBlock into separate folders (4c492b3)
- **react-md.dev:** Try to allow custom Code/CodeBlock in sandboxes (5d494bf)
- **react-md.dev:** update code components to use css modules (9bdf6ba)
- **react-md.dev:** Use `react-marked-renderer` for markdown stuffs (93ebaa4)

##### Other Internal Changes<!-- no-margin -->

- always skip lib check (229cef1)
- Re-ran `prettier` (9632d82)
- update workflows to include node 16 (f756b92)
- updated branches for build, lint, and test (b5eeae9)
- Updated remaining docs and tests for `react-router-dom` v6 (e012ef9)
- **@react-md/dev-utils:** Added error message for combining styles (aa5ecfd)
- **@react-md/dev-utils:** match quotation marks for `sass` files (98ffe40)
- **@react-md/dev-utils:** Update `sassdoc` to not through uncaught exceptions
  (8bdf532)
- **@react-md/dev-utils:** Update release for new major versions and legacy docs
  (86c5c02)
- **@react-md/format:** ran `prettier` after upgrading to v2.4.0 (06110af)
- **codemod:** Added comment about ignoring CodeQL alert (631d56c)
- **examples:** `enable` strict mode by default for nextjs-typescript (83e4c44)
- **examples:** added lint command to nextjs examples (788a8b8)
- **examples:** bump nextjs examples from v11.1.2 to v12.0.2 (be45277)
- **examples:** fixed prefers-color-scheme in examples (f799d3a)
- **examples:** Updated `create-react-app` example to use `react-router-dom` v6
  (3c4d1ea)
- **examples:** Updated create-react-app-typescript example to use
  `react-router-dom` v6 (ae469ef)
- **examples:** Updated examples to no longer import React (c0b8cb5)
- **react-md:** Remove prop-types package and usage (2637a6f)
- **react-md.dev:** Enable React.StrictMode (219937e)
- **react-md.dev:** Updated some transition documentation (44bfa20)
- **stylelint:** Updated to use `stylelint` (22d1598)
- **test:** Update coverage for watch mode (74cee51)
- **typescript:** Stopped using deprecated HTMLTable(Data|Header)CellElement
  (23ba342)

##### Breaking Changes<!-- no-margin -->

- Minimum React version is now 16.14 instead of 16.8
- **@react-md/menu:** The `DropdownMenu` and `Menu` components portal by
  default. This should really only affect snapshot tests
- **@react-md/typography:** The Text component has been renamed to Typography to
  help with auto-imports conflicting with the Text element that exists in
  `lib.d.ts`
- **react-md:** There will no longer be run-time prop validation with the
  `prop-types` package.

---

Title: react-md 3.1.1

Date: 09/11/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **typescript:** added missing readonly prefix to `TabsManager` tabs prop
  (45d9458)

---

Title: react-md 3.1.0

Date: 09/10/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/dialog:** `DialogFooter` align prop applies correct classes
  (644971d)
- **@react-md/form:** `TooManyFilesError` is only used if all the other
  validation has passed (6ed3f54)
- **@react-md/form:** ensure file names end with a period for `useFileUpload`
  extensions (9238140)
- **@react-md/form:** prevent infinite rerenders when calling useFileUpload's
  reset in useEffect (b2875b1)
- **@react-md/utils:** `useDropzone` fix around onDragLeave behavior (fdff9f2)
- **typescript:** updated all array types to be readonly (8f71bcb)

##### Features<!-- no-margin -->

- **@react-md/form:** add `isValidFileName` option to `useFileUpload` (dbd0375)
- **@react-md/typography:** override default typography without globals
  (ce89374), closes #1239

##### Documentation<!-- no-margin -->

- **react-md.dev:** updated `sassdoc` for new module system (4746d26)
- **react-md.dev:** updated SortableColumns example to import SortOrder type
  (b629e3e)

##### Other Internal Changes<!-- no-margin -->

- ran `yarn format` to include new files (48d3d7f)
- Simplifying format and covering json and yml files #1227 (045ba5e)
- **@react-md/dev-utils:** fixed spelling of gzipped (baad174)
- **examples:** updated nextjs examples to latest version of `next` (b50d745)
- **react-md.dev:** added `sassdoc` hot-reloading (9d58e09)
- **react-md.dev:** updated `sassdoc` examples to be linkable (9ed096e)
- **react-md.dev:** Updated fonts for latest nextjs build optimizations
  (ca9ecbd)
- **typescript:** support typescript@v4.4.2 (5a9dd72)

---

Title: react-md 3.0.1

Date: 08/14/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- Updated peerDependencies to fix yarn berry peer requirements (250efcd), closes
  #1224

##### Other Internal Changes<!-- no-margin -->

- Fixed link to v3.0.0 PR (ff221cc)

---

Title: react-md 3.0.0

Date: 08/13/2021

Summary:

This release should be relatively simple for most consumers of this library
since the main breaking change is dropping support for `node-sass` and requiring
`sass` since
[node sass has been deprecated](https://github.com/sass/node-sass#node-sass) as
well as removing deprecated variables, hooks, and components. Most users should
be able to run the following commands to upgrade to v3.0.0:

```sh
npm update react-md
npm uninstall node-sass
npm install sass
```

Or with `yarn`

```sh
yarn add react-md
yarn remove node-sass
yarn add sass
```

In addition, there is now partial support for the
[new Sass module system](https://sass-lang.com/blog/the-module-system-is-launched)
with the `react-md` package which also simplifies the import usage and has a
slight build performance improvement for large projects. To start using the new
module system, update all the `@import` statements as shown below:

```diff
-@import '~@react-md/theme/dist/mixins';
-@import '~@react-md/utils/dist/mixins';
-// other react-md imports
+@use 'react-md' as *;

 // No other changes required!
```

If you override variables within `react-md`:

```diff
-@import '~@react-md/theme/dist/color-palette';
-$rmd-theme-light: false;
-$rmd-theme-primary: $rmd-purple-500;
-$rmd-theme-secondary: $rmd-pink-a-200;
-
-@import '~react-md/dist/styles';
+@use '@react-md/theme/dist/color-palette' as color;
+@use 'react-md' as * with (
+  $rmd-theme-light: false,
+  $rmd-theme-primary: color.$rmd-theme-purple-500,
+  $rmd-theme-secondary: color.$rmd-theme-pink-a-200,
+);
+
+@include react-md-utils;
```

> Check out the updated
> [customizing your theme documentation](/guides/customizing-your-theme),
> (958f34f), or #1214 for more in-depth examples.

##### BREAKING CHANGES<!-- no-margin -->

- **@react-md/theme:** `$rmd-theme-dark-elevation` now defaults to `true`
  instead of `false`
- **sass:** `node-sass` is no longer supported and users must switch to `sass`
- **@react-md/utils:** Removed `InteractionModeListener` since it was an alias
  for `UserInteractionModeListener`
- **@react-md/utils:** Removed `ResizeObserver` component and
  `useResizeObserverV1` implementation
- **@react-md/tooltip:** Removed `TooltipHoverModeConfig` component
- **@react-md/card:** Removed deprecated
  `$rmd-card-dark-elevation-bordered-background-color` variable
- **@react-md/tooltip:** Removed deprecated props from `Tooltipped` component
- **@react-md/form:** The second argument for `useIndeterminateChecked` is now
  an object of options

##### Bug Fixes<!-- no-margin -->

- **sass:** drop node-sass in favor of `sass` since it's deprecated (126fb5a)
- **sass:** use math.div instead of division since it's deprecated (d8c3f12)

##### Features<!-- no-margin -->

- **@react-md/theme:** $rmd-theme-dark-elevation `defaults` to true (b371337)
- **react-md:** Simplify `sass` usage with: `@use 'react-md';` (787bfb5)

##### Documentation<!-- no-margin -->

- **react-md.dev:** removed documentation around pre-compiling styles (29b5d74)
- **react-md.dev:** Update Sass Documentation for `@use` (68e8c6b)
- **react-md.dev:** Updated sandboxes for new Sass module system (095ae97)

##### Other Internal Changes<!-- no-margin -->

- Added additional tests to bump test coverage (4d0371c)
- **@react-md/card:** removed deprecated
  $rmd-card-dark-elevation-bordered-background-color variable (01c9350)
- **@react-md/dev-utils:** Added simple sass-migrator command (a8e8df3)
- **@react-md/dev-utils:** autoConfirm flag passed to initBlog (dec09b8)
- **@react-md/dev-utils:** Combine all scss files into
  `react-md/dist/_everything.scss` (c7177e6)
- **@react-md/dev-utils:** Update release script to hopefully work with
  prereleases (e0ef881)
- **@react-md/dev-utils:** updated `sassdoc` and variables to use
  everything.scss (a0f0699)
- **@react-md/dev-utils:** updated variables command to work with `sass`
  (5376be1)
- **@react-md/form:** removed deprecated implementation in
  `useIndeterminateChecked` (6b7871f)
- **@react-md/tooltip:** removed deprecated props from `Tooltipped` component
  (6dca9b1)
- **@react-md/tooltip:** removed TooltipHoverModeConfig component (664ec30)
- **@react-md/utils:** remove ResizeObserver component and useResizeObserverV1
  implementation (6a6b109)
- **@react-md/utils:** removed InteractionModeListener alias (216c8ef)
- **examples:** updated examples to latest dependencies (f2eb07a)
- **react-md.dev:** Each package includes a link to `typedoc` API in navigation
  tree (c388ba6)
- **react-md.dev:** ran migrator for deprecated division (98d2c58)
- **react-md.dev:** removed tilde from imports (6081e14)
- **react-md.dev:** update all scss files for `@use` imports (958f34f)
- **react-md.dev:** update all styles to use react-md/dist/everything (2da5033)
- **react-md.dev:** Update links for previous versions (2d0a0e6)
- **react-md.dev:** updated docs for new rmd-theme-dark-elevation `defaults`
  (b2269ff)
- **react-md.dev:** updated examples to work with `sass` instead of node-sass
  (d8ddf51)
- **react-md.dev:** updated sandboxes to use root `react-md` (c0f25f7)

---

Title: react-md 2.9.1

Date: 07/26/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/layout:** Do not unmount children when swapping to non-fixed
  appbar mini layouts (64103c8), closes #1207
- **@react-md/utils:** `useMediaQuery` uses addEventListener/removeEventListener
  (b889a9e)

##### Other Internal Changes<!-- no-margin -->

- fixed sass-lint error (58f614b)
- **install:** slighly reduce install size by excluding tests in publish
  (9d01a44)
- **react-md.dev:** fix links to form demos in blog (b1626b5)

---

Title: react-md 2.9.0

Date: 07/17/2021

Summary:

This release is focused around the `FileInput` component in the `@react-md/form`
package and implementing a `useFileUpload` hook to handle uploading/previewing
files in the browser. However, there is a notable change in this release for the
form documentation since the demos have been split into the following pages:

- [Text Field Demos](/packages/form/text-field-demos)
- [Select Field Demos](/packages/form/select-field-demos)
- [Selection Control Demos](/packages/form/selection-control-demos)
- [File Input Demos](/packages/form/file-input-demos)
- [Slider Demos](/packages/form/slider-demos)
- [Validation Demos](/packages/form/validation-demos)

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `FileInput` correctly center the icon when children aren't
  provided (3a6ab33)
- **@react-md/layout:** `useLayoutNavigation` possible perf fix (3d65e4e)

##### Features<!-- no-margin -->

- **@react-md/form:** `FileInput` automatically swaps button type to text if
  children exist (e5585e1)
- **@react-md/form:** `FormMessageCounter` component added to public API
  (1508812)
- **@react-md/form:** Added a `useFileUpload` hook to upload files to the
  browser (efb3f2f), closes #1159
- **@react-md/utils:** added `useDropzone` hook (bc07a1f)

##### Other Internal Changes<!-- no-margin -->

- Added CodeQL Workflow for code analysis (9b4a279)
- **@react-md/form:** Added tests for `useFileUpload` (49ce4d9)
- **@react-md/layout:** Added additional test coverage (7c123ef)
- **react-md.dev:** Added an endpoint for uploading files that acts like a
  /dev/null (9663ae8)
- **react-md.dev:** Added examples for `useFileUpload` (8f9002e)
- **react-md.dev:** fix `eslint` error after updating `prettier` (75a9b0f)
- **react-md.dev:** Fixed rightAddon for Customizing `Select` Options Demo
  (367cc0d)
- **react-md.dev:** Split form demos into separate pages (8594930)
- **react-md.dev:** Use temporary layout on desktop in dev mode to get more
  screen space (53b20c4)

---

Title: react-md 2.8.5

Date: 07/03/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `MenuItemCheckbox` added missing indeterminate state
  (aa2c552), closes #1186
- **@react-md/form:** `useIndeterminateChecked` correctly uses readonly prefix
  (7f69a71)
- **@react-md/form:** `useIndeterminateChecked` supports `MenuItemCheckbox` with
  new option (9ab67bf)
- **@react-md/form:** `MenuItemCheckbox`, `MenuItemRadio`, and `MenuItemSwitch`
  styles on light themes (fc4dcd9)

##### Documentation<!-- no-margin -->

- **@react-md/form:** Updated documentation for `useIndeterminateChecked`
  (8646c28)

##### Other Internal Changes<!-- no-margin -->

- **@react-md/dev-utils:** Updated release script to allow custom CHANGELOG
  updates (dde151b)
- **@react-md/form:** Added tests for `useIndeterminateChecked` (cc2a422)
- **react-md.dev:** Updated `MenuWithFormControls` example for indeterminate
  checkboxes (2d20848)

---

Title: react-md 2.8.4

Date: 06/10/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** Pass checked prop to component
  ([bffae6f](https://github.com/mlaursen/react-md/commit/bffae6f6186f9bb1a9c219d8c3f728fa469b1471))

* **@react-md/form:** Fixed controlled behavior for `Switch` components
  (8c65df6), closes #1175
* **@react-md/utils:** `omit` uses readonly prefix for key list (d3e1ee8)
* **@react-md/utils:** Slightly better tooltip behavior after clicking somewhere
  on the page (4d3fc16)

##### Documentation<!-- no-margin -->

- **react-md.dev:** Updated general documentation (9bc8a0d)
- **react-md.dev:** Update `next` and build deps to fix font loading issues
  (e528617)

##### Other Internal Changes<!-- no-margin -->

- updated doc tsconfig for better autocompletion (7fb8b94)
- Renamed contrast check function (97c1ad7)
- add website alias to changelog config (d98bf51)
- ran `prettier` after upgrading to v2.3.0 (3ce236a)

---

Title: react-md 2.8.3

Date: 05/17/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/layout:** Added fixedAppBar flag into the `useLayoutConfig`
  (14e6587)
- **@react-md/layout:** Mini Layouts Align Icons with Hamburger `Menu` in Dense
  Mode (abbe9a9)
- **@react-md/layout:** non-fixed `AppBar` mini layouts (84313fc), closes #1101
- **@react-md/layout:** Offset for temporary mini layouts (86e75bf)
- **@react-md/states:** Added missing `classnames` dependency (a7a2012), closes
  #1155

##### Documentation<!-- no-margin -->

- **@react-md/layout:** Added demo for non-fixed `AppBar` layouts (d217ac1)
- **@react-md/typography:** Added examples for overriding typography styles
  (57033bd), closes #1147
- **react-md.dev:** Added simple API documentation with `typedoc` (84739af)
- **react-md.dev:** don't include version for latest `react-md` (a69359b)
- **react-md.dev:** Light Theme Code Preview Colors (c9cc6a7)
- **react-md.dev:** redirect to v1 website (5d9ee71)
- **react-md.dev:** small updates after switching to free hosting (96e2dcd)
- **react-md.dev:** update v1 links to new repo and static hosting (92801bb)
- **react-md.dev:** updated tsdoc to work with `typedoc` (cf54c35)
- **react-md.dev:** Fix `typedoc` source links when deployed through vercel
  (a4eed1b)
- **react-md.dev:** Fixed `useLayoutNavigation` hook example in creating a new
  app (1cde856)

##### Other Internal Changes<!-- no-margin -->

- no longer build,lint,test node 10 since I upgraded some dependencies (1d3f889)
- fix anchor link to useFixedPositioning example docs (eb5a9fc)
- fixed typo (ef3f9e4)
- removed v1 info from README (b0e8ccb)
- **@react-md/dev-utils:** Removed old `typedoc` WIP (a7d7429)
- **deployment:** Fixed deploy script (4072b93)
- **workflow:** dropped node 10 since I upgraded some dependencies (fd81950)

---

Title: react-md 2.8.2

Date: 04/22/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/utils:** Cancel hover mode timers on click (892dc24)

##### Other Internal Changes<!-- no-margin -->

- removed engines from root package.json (1165471)

---

Title: react-md 2.8.1

Date: 04/22/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `MenuItemSwitch` spacing styles (8ac8299), closes #1126
- **@react-md/form:** Checkbox, Radio, and `Switch` color (9315eff)

---

Title: react-md 2.8.0

Date: 04/22/2021

Summary:

This release was mostly targeted around exposing the tooltip's "Hover Mode API"
as well as the other tooltip behavior. See #1113 and the new demos for more
information:

- [Hover Mode Example](/packages/utils/demos#hover-mode)
- [Sticky Hover Mode Example](/packages/utils/demos#sticky-hover-mode)
- [Tooltip Hook Example](/packages/tooltip/demos#tooltip-hook-example)

The #form package was also updated to include new components for rendering
checkbox, radio, and switch components within menus. See #1123 and
[Menus with Form Controls Example](/packages/form/demos#menus-with-form-controls)
for more information.

Finally, `react-md` was updated to support `typescript@4.2.3` by removing the
`resize-observer-polyfill` dependency since it has conflicting types with the
now provided type definitions around resize observers. If you are a typescript
user, see #1099 for more information around this change.

##### Bug Fixes<!-- no-margin -->

- **@react-md/dialog:** `FixedDialog` applies `style` prop (bb4ad2f)
- **@react-md/utils:** Click Behavior for Hover Mode (d0fda80)
- **@react-md/utils:** `focusElementsWithin` correctly focuses container element
  as a fallback (cff46c4)

##### Features<!-- no-margin -->

- **@react-md/form:** Implemented Form Menu Item Components (fed2b9f)
- **@react-md/transition:** Updated `useFixedPositioning` to merge style objects
  (1ab84d7)
- **@react-md/transition:** updated `useFixedPositioning` to support fixedTo ref
  (ced550a)
- **@react-md/utils:** Added `isFocusable` util (1d92472)
- **@react-md/utils:** implemented a reusable hover mode API (4f5ce2f)
- **typescript:** bump `typescript` version to v4.2.3 (b094b36)

##### Documentation<!-- no-margin -->

- **@react-md/form:** Updated form menu components for better documentation and
  examples in code (d9695b7)
- **react-md.dev:** Added Menu With Form Controls Demo (dbc2d21)
- **react-md.dev:** Added Tooltip Hook Example (9783c44)
- **react-md.dev:** Added a new Hover Mode demo (1e0e783)
- **react-md.dev:** Added Sticky Hover Mode Example (1a94a31)
- **react-md.dev:** additional Tooltip Hook documentation (5447f64)
- **react-md.dev:** fix documentation site deployment (9588c37)
- **react-md.dev:** removed custom nextjs server (8389b68)
- **react-md.dev:** Suppress hydration warning for App Size (c5a08da)
- **react-md.dev:** Updated documentation site after new tooltip behavior
  (5db9a9b)
- **react-md.dev:** Updated documentation site for new `HoverModeProvider`
  documentation (f42c65c)
- **seo:** Added missing description meta tag (3fd9e9f)

##### Other Internal Changes<!-- no-margin -->

- Moved documentation gitignore values to root (633a586)
- **@react-md/form:** Added new for menu item tests (5cf4f8a)
- **@react-md/form:** Created `SwitchTrack` and `InputToggleIcon` components
  (d9278b3)
- **@react-md/form:** moved some toggle styles into separate mixins (517f199)
- **@react-md/form:** simplified toggle icon styles (adb6b06)
- **@react-md/form:** Updated `MenuItemRadio` usage to be wrapped in a group for
  a11y (01caa0b)
- **@react-md/form:** Updated `SliderValue` to use non-portalled tooltip for
  existing test (b41136f)
- **@react-md/layout:** Updated `Configuration` to use new `HoverModeProvider`
  (357f2bf)
- **@react-md/tooltip:** Cleaned up some `useTooltip` code (0a6aed9)
- **@react-md/tooltip:** Updated `Tooltip` to use new Hover Mode (386f47b)
- **@react-md/transition:** bump `@types/react-transitition-group` from v4.2.4
  to v4.4.1 (f3f5c7b)
- **@react-md/utils:** added missing since annotation to `useOnUnmount`
  (c758982)
- **eslint:** updated eslintignore so I can jump through errors quickly
  (7bfe9f3)
- **react-md.dev:** Fixed sandboxes to no longer require `@types/classnames`
  (32f6f0f)
- **tsconfig:** separate tsconfig by package instead of a single root (b278230)

---

Title: react-md 2.7.1

Date: 03/22/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `Select` correctly respects the `readOnly` prop (d9a0262),
  closes #1089
- **@react-md/form:** `Select` correctly updates for the `dense` spec (2930595),
  closes #1089
- **@react-md/utils:** useTabFocusWrap when only one element (25178d7)
- **umd:** now correctly use production string for UMD bundles (a9b78ad)

##### Documentation<!-- no-margin -->

- **react-md.dev:** fixed build error after upgrading `next` (1861731)

##### Other Internal Changes<!-- no-margin -->

- **@react-md/dev-utils:** GitHub release surrounds libsize in code block
  (d3d122a)
- **@react-md/utils:** Added a simple `useOnUnmount` hook (96f3cc0)
- **react-md.dev:** fixed Demo name replacement (70e60e1)
- **ts:** stopped using FC type (c5daa47)
- **workflow:** added develop branch to workflow triggers (c379ce3)

---

Title: react-md 2.7.0

Date: 02/28/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/alert:** fixed alert color when dark theme elevation is enabled
  (99cc271), closes #1075
- **@react-md/card:** fixed card color when dark theme elevation is enabled
  (e5da5f5), closes #1075
- **@react-md/dialog:** fixed dialog color when dark theme elevation is enabled
  (e79993d), closes #1075
- **@react-md/form:** fixed listbox color when dark theme elevation is enabled
  (b68ac04), closes #1075
- **@react-md/menu:** fixed menu color when dark theme elevation is enabled
  (52c752d), closes #1075
- **@react-md/sheet:** fixed sheet color when dark theme elevation is enabled
  (0abe05e), closes #1075

##### Features<!-- no-margin -->

- **@react-md/layout:** added support for mini layouts (36b3cbc)
- **@react-md/utils:** added a low level `RadioGroup` widget for the radiogroup
  role (76d6d27)

##### Documentation<!-- no-margin -->

- updated Used By/Requires SassDoc to be collapsible (37a7536)
- **@react-md/theme:** added additional dark-theme-elevation SassDoc examples
  (172ee40)
- **react-md.dev:** added information about Noninteractable Chips demo (42e929b)
- **react-md.dev:** updated layout demos for mini layout support (1065688)
- **tsdoc:** fixed remaining tsdoc syntax warnings (946f4dd)
- **tsdoc:** fixed some tsdoc annotations and styling (0449b86)
- **tsdoc:** updated \@since annotations (c62027e)

##### Other Internal Changes<!-- no-margin -->

- updated test coverage to not include conditional component PropTypes (24e5df1)
- **@react-md/dev-utils:** release script will now automatically create github
  release (83c2b65)
- **@react-md/utils:** added `tryToSubmitRelatedForm` util to help with
  additional a11y (0566e14)
- **@react-md/utils:** updated `loop` util to allow for a specific min value
  (51bcf92)

---

Title: react-md 2.6.0

Date: 02/12/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/layout:** floating layout has correct color in dark theme
  (7fa6b0c)
- **@react-md/layout:** toggleable layout title now aligns with persistent
  layouts (8b8efb2)

##### Features<!-- no-margin -->

- **@react-md/chip:** added support for noninteractable chips (9309985), closes
  #1046
- **@react-md/layout:** added prop to control toggleable layouts default
  visibility (6e4a06d), closes #1066

##### Documentation<!-- no-margin -->

- **react-md.dev:** slightly better search results (0e3d3f7)

##### Other Internal Changes<!-- no-margin -->

- **@react-md/divider:** updated test to use the correct act (a621625)
- **@react-md/link:** added new tests for `SkipToMainContent` (3f6e866)
- **@react-md/utils:** Added better dev display names for UserInteractionMode
  context parts (01f6e3d)
- **@react-md/utils:** refactored UserInteractionMode hooks and components
  (af72791)
- **changelog:** fixed some more changelog/release behavior (e11c0ea)
- **coverage:** fixed test coverage to include files without tests (ba72630)

---

Title: react-md 2.5.5

Date: 01/29/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/utils:** added missing `classnames` dependency (8c34790)

---

Title: react-md 2.5.4

Date: 01/26/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/card:** fixed the bordered background color when the dark
  elevation flag is enabled (a9dd552), closes #1053

---

Title: react-md 2.5.3

Date: 01/12/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** fixed floating label behavior for `TextArea` (80c22ba),
  closes #1043
- **@react-md/layout:** Fixed `scrollIntoView` behavior for the layout tree
  (4716c76)

---

Title: react-md 2.5.2

Date: 01/11/2021

Summary:

##### Bug Fixes<!-- no-margin -->

- **docs:** fixed some a11y issues in documentation site (6fee23c)
- **@react-md/form:** Added missing `containerProps` to `TextArea` (695fd2a)
- **@react-md/form:** Fixed floating state for controlled text fields (338d768),
  closes #1043

---

Title: react-md 2.5.1

Date: 12/16/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/list:** fixed list icon spacing to work with `sass` (369c206),
  closes #1015

---

Title: react-md 2.5.0

Date: 12/15/2020

Summary:

This release was mainly focused on the form package and added a lot of new
features. I highly recommend checking out the following PRs for more
information:

- Simple form validation using the Constraint API with `useTextField` #1009
- Better number handling with `useNumberField` #1014
- `Slider` component #1016

##### Features<!-- no margin -->

- **@react-md/form:** added a new `useTextField` hook to validate the
  `TextField` and `TextArea` values (578257c)
- **@react-md/form:** added a number-recommended type for validation (18c772e)
- **@react-md/form:** added a `PasswordWithMessage` component to be used with
  `useTextField` Hook (f6d84f2)
- **@react-md/form:** added a `TextAreaWithMessage` component to be used with
  `useTextField` Hook (e358799)
- **@react-md/form:** added a `TextFieldWithMessage` component to be used with
  `useTextField` Hook (f2d7e5d)
- **@react-md/form:** added a `useNumberField` hook to control number field
  values (c705f2c)
- **@react-md/form:** better defaults for validation (4003a07)
- **@react-md/icon:** added an error icon to the `IconProvider` Component and
  `useIcon` Hook (4dfd50a)
- **@react-md/icon:** added `flexReverse` prop to `TextIconSpacing` (c4ee05b)
- **@react-md/utils:** added a `withinRange` util for number validation
  (e8fb252)
- **@react-md/utils:** changed the default `@include` order for easier overrides
  (4705b09)

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** better blur error cases for `useNumberField` (8b927ab)
- **@react-md/form:** fixed `FormMessage` counter prop-type validation (9ece3e1)
- **@react-md/form:** fixed `messageProps` error from react when
  `disableMessage` is enabled (e452aff)
- **@react-md/form:** Floating Label for controlled value Invalid numbers
  (ef1d764)
- **@react-md/form:** Maintain Floating Label for Invalid Numbers (2443f9a)
- **@react-md/form:** More fixes for number inputs being considered valued
  (1832e69)
- **@react-md/form:** updated `TextField` `PropTypes` to allow for search input
  type (23d92dd)
- **utils:** `GridCell` now correctly uses `largeDesktop` when desktop is also
  provided (fd26b8b)
- **@react-md/utils:** nearest ensures min and max range for value (48181b3)
- **@react-md/utils:** updated nearest to support a custom range for sliders
  (6cfc67e)

---

Title: react-md 2.4.3

Date: 11/13/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/list:** fixed `ListItem` disabled colors to optionally include
  addons (a40b6b3), closes #997
- **@react-md/list:** `ListItem` no longer focusable by default when disabled
  (06e91ca), closes #997

##### Documentation<!-- no-margin -->

- **examples:** updated
  [create-react-app]({{GITHUB_FILE_URL}}/examples/create-react-app) to use
  `react-scripts@4.0.0` (be003a9)
- **examples:** updated
  [create-react-app-typescript]({{GITHUB_FILE_URL}}/examples/create-react-app-typescript)
  to use `react-scripts@4.0.0` (8b7122b)
- **sandbox:** fixed missing versions for sandboxes (09c97ee)
- **sandbox:** fixed sandboxes that have additional files (f45aab1)

---

Title: react-md 2.4.2

Date: 10/23/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/menu:** fixed DropdownMenu not being able to provide style and
  className to Menu (7823fea), closes #989

---

Title: react-md 2.4.1

Date: 10/17/2020

Summary:

Republished the v2.4.0 release to ensure that all 2300 themes are available
through CDNs after upgrading my build script.

---

Title: react-md 2.4.0

Date: 10/17/2020

Summary:

This release implemented better default behavior to ensure that the "better"
contrast ratio is chosen instead of choosing the first color that meets the
minimal contrast ratio. This is enabled by default going forward, but can be
disabled by setting `$rmd-theme-better-contrast-ratios: false`

##### Bug Fixes<!-- no-margin -->

- **@react-md/table:** table border color uses hex values to fix chrome colSpan
  rendering issue #982 (2138284)

##### Features<!-- no-margin -->

- **@react-md/theme:** Better Contrast Colors by Default and dev-utils refactor
  #955 (519b128)

##### Documentation<!-- no-margin -->

- the documentation site now allows for code examples and sandboxes to
  conditionally use JavaScript instead of TypeScript

---

Title: react-md 2.3.1

Date: 09/14/2020

Summary:

I released `v1.18.0` today but didn't realize that npm uses `--tag` while
`lerna` uses `--dist-tag` so `v1.18.0` was released under `latest` instead of
`previous`. This release is only to ensure that `v2` is set to `latest` and has
no other changes.

---

Title: react-md 2.3.0

Date: 09/10/2020

Summary:

This release is kind of a breaking change since the base `react-md` package no
longer has a `dist/css` folder for all the pre-compiled themes due to CDNs and
package managers rejecting this package for being too big. All the pre-compiled
themes will now be available through [jsDelivr](https://cdn.jsdelivr.net)
instead. Check out the [CDN Links](/guides/cdn-links) for more info.

This release also changed the `ResizeObserver` to use a subscription model to
slightly increase performance when multiple `ResizeObserver`s are used on a
single page as well as fix some errors related to the
`ResizeObserver loop has been exceeded`. The `useResizeObserver` has been
updated to use the new API which requires `ref`s, but is still backwards
compatible. Due to this change, the `ResizeObserver` component has been
**deprecated** in favor of the `useResizeObserver` hook implementation.

Otherwise, there were a few new features added to the #button, #progress, and
#tree packages that you can reference below.

##### Documentation<!-- no-margin -->

- created a new example for the `@react-md/form` package to show how to use
  [react-hook-form](https://react-hook-form.com/) with `react-md` for form
  validation. Check out the new example
  [here](/packages/form/demos#with-react-hook-form).
- updated sandboxes to use new CDN for pre-compiled themes (e83f47e)
- added documentation about using [CDN Links](/guides/cdn-links)
- added a simple umd example to show
  [CDN usage]({{GITHUB_FILE_URL}}/examples/umd) (ed6b62e)

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** added missing scss variables (ec8d675)
- **@react-md/states:** fixed `usePressedStates` to pass `onClick` like other
  state hooks (82cd676)

##### Features<!-- no-margin -->

- **@react-md/alert:** created and exported the default timeout and classnames
  (32bacc9)
- **@react-md/button:** added built-in support for rendering `CircularProgress`
  (c6c616b)
- **@react-md/button:** added support for disabled theme without disabling
  button (6a647e2)
- **@react-md/form:** updated `TextArea` to use the new `useResizeObserver` API
  (2c2dd27)
- **@react-md/overlay:** created and exported the default timeout and classnames
  (48cd9d5)
- **@react-md/progress:** added a `small` state to the `CircularProgress`
  (6884a3a)
- **@react-md/tabs:** updated tabs to use the new resize observer API (052b3f2)
- **@react-md/tree:** updated `defaultTreeItemRenderer` for class names
  (3c61f3c), closes #920
- **@react-md/utils:** improved `LabelRequiredForA11y` type definition (b7aa4fa)
- **@react-md/utils:** added `Dir` component to help determine current writing
  direction (a929e04)
- **@react-md/utils:** added `useGridList` hook (56ecc19)
- **@react-md/utils:** added `useIsomorphicLayoutEffect` from `react-redux`
  (deacf1c)
- **@react-md/utils:** created a new `useResizeObserver` implementation
  (dc3f4df)
- **@react-md/utils:** more verbose `useAppSize` usage error message (2c81982)
- **@react-md/utils:** added hook to access grid list size (a448816)
- **@react-md/utils:** added new `cloneStyles` prop so grid styles can be
  applied to any child (ca913e7)

---

Title: react-md 2.2.2

Date: 09/02/2020

Summary:

This release was a re-publish of `v2.2.0` attempting to fix a publishing error.
Unfortunately, the base `react-md` package had to drop support for the
pre-compiled themes and now need use [jsDelivr](https://cdn.jsdelivr.net)
instead.

Check out the new [CDN Links](/guides/cdn-links) for more info.

---

Title: react-md 2.2.1

Date: 09/02/2020

Summary:

This release was just a re-publish of `v2.2.0` to try fixing a publishing error.

---

Title: react-md 2.2.0

Date: 08/11/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **@react-md/form:** `Listbox` render `0` as a valid display value
  ([d02b7a9](https://github.com/mlaursen/react-md/commit/d02b7a9042786e4d4c4a46d286b62e6d80afc621))

##### Features<!-- no-margin -->

- **@react-md/avatar:** Added ability to pass props to `<img>` (11848ee), closes
  #908
- **@react-md/form:** Added props to style `Checkbox` and `Radio` input element
  (b6d2318)
- **@react-md/form:** Updated toggle inactive and active colors to be
  configurable (49319e6)

Note: The `Checkbox` and `Radio` components have updated their default inactive
color to be the `rmd-theme-var(text-secondary-on-background)` instead of
`rmd-theme-var(secondary)` to better match the v1 styles.

See
[\$rmd-toggle-inactive-color](/packages/form/sassdoc#form-variable-rmd-toggle-inactive-color)
and
[\$rmd-toggle-active-color](/packages/form/sassdoc#form-variable-rmd-toggle-active-color).

---

Title: react-md 2.1.2

Date: 08/01/2020

Summary:

This release was mostly internal changes and documentation updates including a
new [Writing Tests guide](/guides/writing-tests), but also fixed the `Layout`
component to allow for the `useCrossFade` hook to transition the `<main>`
content on `pathname` changes.

##### Bug Fixes<!-- no-margin -->

- **@react-md/transition:** useCSSTransition now correctly forwards refs
  (36f832f)

---

Title: Added Examples Folder

Date: 07/28/2020

Summary:

The GitHub repo has been updated to now include an
[examples folder]({{GITHUB_URL}}/tree/main/examples) to show how you can use
`react-md` along with other build tools such as
[Create React App](https://create-react-app.dev/),
[Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org), and others.
These examples can be used to spin up boilerplate projects by following the
following steps:

First download the specific example:

```sh
# replace EXAMPLE_NAME with the specific example you want to use
curl https://codeload.github.com/mlaursen/react-md/tar.gz/main | tar -xz --strip=2 react-md-main/examples/EXAMPLE_NAME
cd EXAMPLE_NAME
```

Next, install any dependencies:

```sh
npm install
# or with yarn
yarn
```

Next, initialize the git repository and add the first commit:

```sh
git init
git add .
git commit -m "Initial commit"
```

Finally, follow any instructions in the `README.md` about how to run the
specific example.

---

Title: react-md 2.1.1

Date: 07/21/2020

Summary:

##### Bug Fixes<!-- no-margin -->

- **theme:** Fixed `rmd-theme-get-swatch` to loop over all `rmd-theme-colors`
  instead of the primaries only (353de23), closes #884

---

Title: react-md 2.1.0

Date: 07/11/2020

Read More: #880

Summary:

This release added a new and improved dark mode that can be used by enabling a
new `$rmd-theme-dark-mode-elevation` variable.

##### Bug Fixes<!-- no-margin -->

- `AppBar` text color now defaults to
  `rmd-theme-var(text-primary-on-background)` (2c3ea5e)
- Booleans in dist/scssVariables (f6d43a3)
- ListItem disabled states (7b37292)
- Scroll active element into view while focusing (a9a0902)
- Tree focused index after expanding all with asterisk (8547629)
- Tree keyboard movement for child items that are expanded (fadddc7)
- Tree scrolling elements into view (eef48dc)

##### Features<!-- no-margin -->

- Added new mixin for optional css-modules (28ba828)
- Exported the `useAutoComplete` hook (cac5cd1)
- Improved Dark Mode using Raising Elevation (547877c), closes #860
- Render non-searchable items in AutoComplete (e7a82ac)

---

Title: react-md 2.0.4

Date: 07/10/2020

Summary:

This is a very small release that just fixed adding #form as a dependency to
#layout (e83b296)

---

Title: react-md 2.0.3

Date: 07/07/2020

Summary:

This release fixed a few styling issues for the #form package and correctly
passing the `disabled` prop to the `TextField`'s `<input>` element:

- **form:** Select disabled styling (d79d007)
- **form:** TextArea disabled styles (ef118bf)
- **form:** TextField and Select disabled behavior (e8f2c57)

---

Title: react-md 2.0.2

Date: 06/30/2020

Read More: #877

Summary:

This release focused on fixing bundle sizes with webpack as well as increasing
build performance with the `sideEffects` field for each `package.json`. For more
information, check out the v2.0.2 release PR #877 which goes into details about
build time and sizing changes.

This release also includes the following changes:

- **LICENSE:** Removed the time range from license since it was incorrect
  (50c9021)
- Added unpkg url for base react-md package (d0efc59)
- Updated the changelogs to be updated by
  [conventional commits](https://www.conventionalcommits.org/) which allows for
  a combined root [CHANGELOG.md]({{GITHUB_FILE_URL}}/CHANGELOG.md) (46f4e26)

---

Title: react-md 2.0.1

Date: 06/17/2020

Summary:

This is _technically_ a breaking change for the UMD bundle since this splits the
material-icon component wrappers into separate bundles to minimize the library's
size. I'm going with a patch bump though since it's only been two days since the
v2 release and it's highly doubtful that consumers of the library have fully
upgraded to v2 or even using the UMD bundle to begin with.

react-md will now be available as these bundles:

- Base `ReactMD` library:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md.production.min.js
- `ReactMD` with `*FontIcon` components:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md-with-font-icons.production.min.js
- `ReactMD` with `*SVGIcon` components:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md-with-svg-icons.production.min.js

The
[advanced installation guide](/guides/advanced-installation#react-md--material-icons-umd-bundle)
and the [library size notes](/about#what39s-the-library-size) have been updated
for this information.

---

Title: react-md 2.0.0

Date: 06/15/2020

Read More: v2-release

Summary:<!-- bullets -->

The v2 release is a complete re-write of react-md to address the majority of
problems encountered while using v1. Unfortunately, this took a **lot** longer
than I had hoped since I ended up using this project to learn
[Typescript](https://www.typescriptlang.org/) as well as the new
[React hooks API](https://reactjs.org/docs/hooks-intro.html). Even though there
are some missing components from v1, I think the new functionality outweighs it
and the components are scoped for a later release.

The 2.0.0 release of react-md features:

- Rewrite to Typescript
- New Behavior for Determining the Current Application Size
- New Theme API
- New Utility SCSS Functions and Mixins
- SCSS Variables and Default Values in JavaScript
- Automatic Color fixes for Accessible Contrast Ratios
- Improved Typography and CSS Reset
- Improved User Interaction States
- Improved Accessibility and Keyboard Movement
- Right to left Language Support
- Convenience Configuration and Context Provider Components
- Around 50 new Components and 40 hooks
- All Material Icons Available as Components
- Scoped Packages
- New Documentation Site
