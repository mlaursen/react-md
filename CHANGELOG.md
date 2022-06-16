# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.4](https://github.com/mlaursen/react-md/compare/v5.1.3...v5.1.4) (2022-06-16)

### Bug Fixes

* add missing dependencies ([5329812](https://github.com/mlaursen/react-md/commit/532981291e7c30018a151400cb891b693255ed78))





## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Bug Fixes

* **@react-md/button:** do not shrink in flex containers ([66bf6e0](https://github.com/mlaursen/react-md/commit/66bf6e0f97a744d02c3813f63e841293c68de2ea))
* **@react-md/card:** fix spelling of raisable and deprecate raiseable prop ([453023b](https://github.com/mlaursen/react-md/commit/453023b2bcb635b0d0348f35d270fbb996297a5b))
* **@react-md/form:** fix typo for transparent in disabled toggle hover color ([7346587](https://github.com/mlaursen/react-md/commit/73465874d4223d86b3f98a928b98f45f64f7ff92))
* **@react-md/layout:** fix spelling of `DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES` ([2d20a2e](https://github.com/mlaursen/react-md/commit/2d20a2ee503f511127704984b29899de42c5e055))
* **@react-md/utils:** fix spelling of DropzoneHandlers ([6ba510b](https://github.com/mlaursen/react-md/commit/6ba510bca74401f1b255656c68f4b46fde27aed6))


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))
* **@react-md/form:** Add simple examples for Select/NativeSelect ([05358f5](https://github.com/mlaursen/react-md/commit/05358f51d4bebca812f1c5290914224ebe123885)), closes [#1396](https://github.com/mlaursen/react-md/issues/1396)


### Other Internal Changes

* **@react-md/autocomplete:** fix typos in utils tests ([c0333cc](https://github.com/mlaursen/react-md/commit/c0333cc9e27009f7a15f7981c43f52f578a4d0b4))
* **react-md.dev:** correctly render escaped html in markdown ([8a523cb](https://github.com/mlaursen/react-md/commit/8a523cbf70df091e68203d0d6b90bd358d826582))
* **react-md.dev:** fix text color for animating app bar ([01ec1af](https://github.com/mlaursen/react-md/commit/01ec1afff7f3d527c5c3846718fc305a1073bbd1))
* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)


### Bug Fixes

* **@react-md/tabs:** Scroll tabs correctly in RTL mode ([a23d708](https://github.com/mlaursen/react-md/commit/a23d7089e9ec58a3dc903b202b01628b9908e3d6)), closes [#1356](https://github.com/mlaursen/react-md/issues/1356)


### Other Internal Changes

* **@react-md/layout:** Update snapshots after updating tree component ([ec84800](https://github.com/mlaursen/react-md/commit/ec8480078c37f56f65250dd46d77b3ffe41280ac))
* **@react-md/utils:** Update keyboard movement ([71d1343](https://github.com/mlaursen/react-md/commit/71d1343e2cf1ed1703230ed8f0f544b1200b7f0d))
* **react-md.dev:** `useIsomorphicLayoutEffect` to hide SSR warning ([aa0d3cd](https://github.com/mlaursen/react-md/commit/aa0d3cdc5cf2cd28f08d27e15c8b2496b09e7ccd))
* **react-md.dev:** Fix `BadgedButton` documentation ([b147a88](https://github.com/mlaursen/react-md/commit/b147a88118f62466836ea01a296cb5239cc9840f))
* **react-md.dev:** Update Light/Dark Theme Toggle Icons ([60a8825](https://github.com/mlaursen/react-md/commit/60a882553e245483e62e07e58bd41cd544fbafdb))
* **react-md.dev:** useLayoutEffect for page transitions ([638c8ec](https://github.com/mlaursen/react-md/commit/638c8ecd7c0d3d540f44204aa37f5914078eea7d))






## [5.1.1](https://github.com/mlaursen/react-md/compare/v5.1.0...v5.1.1) (2022-04-01)


### Bug Fixes

* **@react-md/sheet:** Animate correctly in React 18 ([ca27b19](https://github.com/mlaursen/react-md/commit/ca27b195d1029e6a0eff41d952189eb023af6a65))
* **@react-md/tree:** Add missing aria-selected attribute ([e578ea0](https://github.com/mlaursen/react-md/commit/e578ea02f6e0a2a655bbb98366fe96e8de98b68a)), closes [#1388](https://github.com/mlaursen/react-md/issues/1388)


### Other Internal Changes

* **eslint:** Try new precommit eslintrc file for type imports ([fb69a2f](https://github.com/mlaursen/react-md/commit/fb69a2f1b47eb7fe690c59a4a3688b7e50d1c9b7))
* **react-md.dev:** Fix typo for RTL tooltip ([ee9f34c](https://github.com/mlaursen/react-md/commit/ee9f34c2932dd2a8a34d7cbfc04ffc48b264574c))
* **react-md.dev:** re-enable ripples to match `defaults` ([736e3b4](https://github.com/mlaursen/react-md/commit/736e3b40b2d273f99da1e2ae12897aa9fc3df589))






# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Bug Fixes

* **@react-md/app-bar:** `AppBarTitle` now applies `flex: 1 1 auto` ([4a47c92](https://github.com/mlaursen/react-md/commit/4a47c9252db365bd2a1e606d76a56e6b55be0fbc))
* **@react-md/tooltip:** Tooltips stay visible on mobile Firefox ([7039fef](https://github.com/mlaursen/react-md/commit/7039fef0b7003a5288ee855c7710b7a53d4a66d9))


### Features

* **@react-md/menu:** Provide props for Menu's `List` ([2b5fb23](https://github.com/mlaursen/react-md/commit/2b5fb232be0a41044347acfc0268ab5036b13c33))
* **@react-md/tooltip:** `useTooltip` supports new disabled option ([a934ae9](https://github.com/mlaursen/react-md/commit/a934ae931b6e08ab3a32cb688eda728cf98ce7c2))


### Documentation

* **@react-md/tooltip:** Remove documentation around `Tooltipped` component ([1a59190](https://github.com/mlaursen/react-md/commit/1a59190e7b76494b5375809d563f03c4ee0b8b75)), closes [#1367](https://github.com/mlaursen/react-md/issues/1367)


### Other Internal Changes

* removed old `eslint` rules ([88eb2b2](https://github.com/mlaursen/react-md/commit/88eb2b2baadd42d63f67c3be083bf7c5995c68ea))
* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))
* Updated the v5.0.0 release notes ([6106751](https://github.com/mlaursen/react-md/commit/61067511d836a27671741954620087979ffe4698))
* **@react-md/dev-utils:** Fix indexer for consistent-type-imports ([2d2d1e9](https://github.com/mlaursen/react-md/commit/2d2d1e99bb6edcd97f595d4b774f8567c1899fd8))
* **@react-md/form:** bump nanoid from 3.2.0 to 3.3.1 ([e625488](https://github.com/mlaursen/react-md/commit/e625488fb9683865ec4af8ade0a53a0101b2ee17))
* **react-md.dev:** Add demo for rendering DropdownMenus as a `Grid` ([3ac42ef](https://github.com/mlaursen/react-md/commit/3ac42ef7387a9afb5b77a7d3ad30004301d4178e))
* **react-md.dev:** Do not lazy load icons through next/head ([47ccc1d](https://github.com/mlaursen/react-md/commit/47ccc1dc8df292e9da47a63f53918074fb701643))
* **react-md.dev:** Fix 404 page for sandboxes ([4772c88](https://github.com/mlaursen/react-md/commit/4772c8888a0516c9b4c34e618f724a83a55a0509))
* **react-md.dev:** Fix tooltip dense demo ([efc7f8c](https://github.com/mlaursen/react-md/commit/efc7f8c5e9741862c3f19b26a990c5daa1e9520e))
* **react-md.dev:** Fix usage of `useTooltip` when it is conditionally applied ([cfca184](https://github.com/mlaursen/react-md/commit/cfca18448b13e13d95c207a73f6981c2952cbad7))
* **react-md.dev:** Update examples for `useTooltip` disabled option ([f318ecf](https://github.com/mlaursen/react-md/commit/f318ecf2ef642f5d8ba87ea2319f5b65712561a6))
* **stylelint:** bump `stylelint` plugins to latest ([2bb6429](https://github.com/mlaursen/react-md/commit/2bb64294be16297324c93253c062bf6e5bd95cbf))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)

> Check out the [v4 to v5 Migration Guide](https://react-md.dev/migration-guides/v4-to-v5) for more information around updating code to this major version.

This release focused on creating a new `Menu` API that should hopefully make menus easier to use along with some other new features. The main difference is that the `DropdownMenu` no longer accepts a list of `items` that get converted to `MenuItem`s behind the scenes. Instead, the `children` of the `DropdownMenu` should be all the `MenuItem` components that should be used inside the menu. The main reason for this change is to make it easier to create reusable components for different actions within your app and no longer needed to disable the React `eslint` rule around missing `key`s.

Another notable change is that nested dropdown menus no longer require the `DropdownMenuItem` component and instead the `DropdownMenu` automatically renders as a `<li>` if it appears as a child of another `Menu` component.

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

On top of the new API, two major new features have been integrated into this release:

#### Hoverable Menus

Menus can now act like a browser's bookmark folder behavior where the user must click one of the dropdowns before all other menus become immediately visible on hover by using the new `MenuBar` component. This also implements some new keyboard movement behavior matching the [menubar spec](https://www.w3.org/TR/wai-aria-practices/#menu).

If the first-click behavior is undesired, the `MenuBar` also accepts a `hoverTimeout` prop which can be set to `0` to make the menus appear immediately on hover or another time in milliseconds to wait before the "hover mode" behavior should begin.

> Check out the [Hoverable Menus demo](https://react-md.dev/packages/menu/demos/#hoverable-menus) for more information.

#### Conditionally Rendering Menus within a Sheet

Since menus aren't always ideal for small viewports, the `DropdownMenu` has been updated to conditionally rendering the `Menu` within a `Sheet` instead of being positioned relative to the `Button` element. This feature is **opt-in** by either:

- Adding `menuConfiguration={{ renderAsSheet: "phone" }}` on the `Configuration` component from `@react-md/layout`
- Wrapping a `DropdownMenu` in the `MenuConfigurationProvider` and adding a prop `renderAsSheet="phone"`
- Directly on a `DropdownMenu` with the `renderAsSheet="phone"` prop

The `Sheet` will default to rendering at the bottom of the viewport and have a max height that should allow the user to close the menu by clicking the overlay behind the sheet. These defaults can be configured with the `sheetPosition` and `sheetVerticalSize` props.

The `Sheet` can also be configured to have an optional header and footer using the `sheetHeader` and `sheetFooter` props. If all else fails, the `DropdownMenu` accepts `sheetProps` which will be passed to the `Sheet` component.

> Check out the [Mobile Action Sheets demo](https://react-md.dev/packages/menu/demos#mobile-action-sheet) for more information.


### Bug Fixes

* **@react-md/form:** `TextArea` applies custom height style when `resize="none"` ([e77d939](https://github.com/mlaursen/react-md/commit/e77d939263ed34eb8fea78a1f3698788879401bc))
* **@react-md/list:** Pass `disableEnterClick` in `ListItem` ([b5e8b69](https://github.com/mlaursen/react-md/commit/b5e8b69ae606a7956655fb147f4eb4f8609c196c))
* **@react-md/overlay:** Allow for custom onClick behavior ([60dce54](https://github.com/mlaursen/react-md/commit/60dce5482dd39342151eb63f2c64eb39e19b6b45))
* **@react-md/transition:** Do not create styles for hidden elements ([6eff8a8](https://github.com/mlaursen/react-md/commit/6eff8a8d6b3845f0a987d448458fa92d78b4d77e))
* **@react-md/typography:** Fixed overline class name ([1e544d0](https://github.com/mlaursen/react-md/commit/1e544d021f33bf80e69fa30c3ca5deeda3e2d2c2))
* **@react-md/utils:** `useRefCache` returns non-mutable object ([b696b72](https://github.com/mlaursen/react-md/commit/b696b7225d581931008267ff4e385eb756e5ff58))
* **@react-md/utils:** Positioning logic for inner-left/inner-right and vertical anchors ([a38abfb](https://github.com/mlaursen/react-md/commit/a38abfb08b1f5569179ccb83fb6fa1ba7054a0d7))


### Features

* **@react-md/dialog:** Add new `overlayProps` to configure the dialog's overlay ([cfc30f0](https://github.com/mlaursen/react-md/commit/cfc30f0fcf7eeff47ccf4e6d739ae5a6da1d1280))
* **@react-md/divider:** Update `useVerticalDividerHeight` to support any HTMLElement ([edd9287](https://github.com/mlaursen/react-md/commit/edd9287da1d41fb5ec1133b30437a246a6d24c28))
* **@react-md/divider:** Update divider styles for non-hr elements ([7ccd0a6](https://github.com/mlaursen/react-md/commit/7ccd0a6cf61bbcbf01b7f92645bf74dda0d2f6bf))
* **@react-md/form:** Update `TextFieldContainer` to optionally fill all space in flex containers ([2c8e68c](https://github.com/mlaursen/react-md/commit/2c8e68ccb004c9a36da773fd8cd3873df7b4184b))
* **@react-md/list:** Created rmd-list-unstyled utility class from the mixin ([6c9b7f4](https://github.com/mlaursen/react-md/commit/6c9b7f45960888790c32840d2228fdb8bf0220ef))
* **@react-md/menu:** Implemented new Menu API ([c27bf55](https://github.com/mlaursen/react-md/commit/c27bf558a950bf2938811a98b2b168efca4055cc))
* **@react-md/menu:** Better floating action button default behavior ([0cdeff7](https://github.com/mlaursen/react-md/commit/0cdeff72ac8c6b2f2808714299774fab0d490222))
* **@react-md/utils:** export focusable query constants ([f9f7955](https://github.com/mlaursen/react-md/commit/f9f7955d7fecb0d96893d2c5db40f753e7f4953f))
* **@react-md/utils:** Implemented new keyboard focus behavior ([77f0d01](https://github.com/mlaursen/react-md/commit/77f0d012e06b6a00f1b7ee64ef91d43683a703b6))
* **@react-md/utils:** Updated the HoverMode API ([ac60bdb](https://github.com/mlaursen/react-md/commit/ac60bdb0cd8dc3ba55c8ea080f4ad3886b579033))


### Documentation

* Added documentation for using a GitHub template to bootstrap a new project ([aac11ba](https://github.com/mlaursen/react-md/commit/aac11baa99640eafee1cff2b977052bfb202d95b))
* Removed Working with v1 documentation ([8aa71ac](https://github.com/mlaursen/react-md/commit/8aa71ac2bc9eccf261c70f53bbfcd02ee0e8663f))
* **@react-md/sheet:** Move tsdoc around for easier sharing ([83fcaac](https://github.com/mlaursen/react-md/commit/83fcaacfac29dd867b07bd857fbe17faeea371b2))
* **react-md.dev:** Better migration guide search behavior ([9729269](https://github.com/mlaursen/react-md/commit/97292698a649eb38a624ba3e67b85dc89de2765b))
* **react-md.dev:** Disable TOCs in dev mode and use temporary layout ([3203af4](https://github.com/mlaursen/react-md/commit/3203af407452c141e3ab3765f9fdd2fd1a1dd4fc))
* **react-md.dev:** Fixed weird dev error with spreading props and key ([7cd7b8c](https://github.com/mlaursen/react-md/commit/7cd7b8cfb62147b8dc791d2566c090c45be52d19))


### Other Internal Changes

* Removed commitizen since I never use it ([3e738b4](https://github.com/mlaursen/react-md/commit/3e738b4ab14fd7b4aab4f104b0d4120d226b7747))
* **@react-md/form:** Updated `FileInput` snapshots for new icon ([f5e43fe](https://github.com/mlaursen/react-md/commit/f5e43fe4bf7ccc7f0387d66ae183a2190ad294cb))
* **@react-md/icon:** Renamed the download icon to upload ([2752a98](https://github.com/mlaursen/react-md/commit/2752a981fe4021636de66f8576fdd8842a7e90af))
* **@react-md/icon:** Updated docs and examples to use ConfiguredIcons type ([bbfebed](https://github.com/mlaursen/react-md/commit/bbfebedc7902b5f28fca202ba7189b3c1b540f2d))
* **@react-md/menu:** Added tests for the new menu API and fixed a few issues ([7202dd0](https://github.com/mlaursen/react-md/commit/7202dd00a2e734dd1a58d29142b551d8a9411b5a))
* **@react-md/menu:** Fixed `MenuBar` visibility for touch devices ([1288be7](https://github.com/mlaursen/react-md/commit/1288be768766b885c16f370b90291922be334696))
* **@react-md/menu:** Fixed keyboard movement in MenuBars with visible menus ([5b2494a](https://github.com/mlaursen/react-md/commit/5b2494a2b2a34f1a53be97d07b1fc959eba8f6c1))
* **@react-md/utils:** Export `enableScrollLock` and `disableScrollLock` utils ([6a95734](https://github.com/mlaursen/react-md/commit/6a9573474b493fb9bf634063ee19389d1b05c0a9))
* **@react-md/utils:** Remove touch utils and passive events checks ([3597d32](https://github.com/mlaursen/react-md/commit/3597d3289cb4e4f225e978e8134def11ec4ce2bb))
* **@react-md/utils:** useScrollListener no longer accepts an element or options ([74a0274](https://github.com/mlaursen/react-md/commit/74a02744f3b7d5070b3f5c0d7b308842026bec72))
* **examples:** bump `next` from 12.0.7 to 12.0.9 ([04749c6](https://github.com/mlaursen/react-md/commit/04749c6744a5e244e89bb06baf331cc7e7cf9383))
* **examples:** Updated `create-react-app` examples to use v5.0.0 ([f7850b8](https://github.com/mlaursen/react-md/commit/f7850b87919edbdedb04e70702d5f2c4fa1ec71f))
* **examples:** Updated gatsby examples to v4.4.0 ([8a12699](https://github.com/mlaursen/react-md/commit/8a12699a279b8a6db39ff2ed4e6fdea5009a2533))
* **react-md.dev:** Add migration guides for `react-md` major versions ([78b7396](https://github.com/mlaursen/react-md/commit/78b73969916da433f4a64290a13d1888af3b8302))
* **react-md.dev:** Add word-break to headings for markdown pages ([03b1301](https://github.com/mlaursen/react-md/commit/03b13015c5840f7d0964cfe31cb169bd6c4e2208))
* **react-md.dev:** Fixed ids for emulated phones ([10984f5](https://github.com/mlaursen/react-md/commit/10984f55f152642b97c4795e77c4171fbdb13b36))
* **react-md.dev:** Suppress hydration for markdown ([8bb4d51](https://github.com/mlaursen/react-md/commit/8bb4d51b954715a600bc28ffa76a43dd8213259a))
* **react-md.dev:** Update HoverableMenus example to not use `TextArea` ([5361825](https://github.com/mlaursen/react-md/commit/536182512924b014e5459b8cb81ce7133a1ee5b5))
* **react-md.dev:** Updated a few menu demos ([c43cd31](https://github.com/mlaursen/react-md/commit/c43cd31b8599a360f9811d03ac1c79587504e54e))


### Breaking Changes

* `DEFAULT_HOVER_MODE_STICKY_EXIT_TIME` has been renamed to `DEFAULT_HOVER_MODE_EXIT_TIME`.
* Menu buttons will no longer open by pressing the `ArrowUp` or `ArrowDown` keys.
* The `DropdownMenu` component no longer accepts a list of `items` and instead the `children` should be the `MenuItem` components.
* The `DropdownMenu` component no longer supports the `menuRenderer` and `itemRenderer` props. Instead, there is built-in support for conditionally rendering as a `Sheet` component using the `renderAsSheet` prop.
* The `DropdownMenu` component now requires a parent `AppSizeListener` because of the conditional `Sheet` rendering functionality. This might require updating your tests to either use the `Configuration` component from `@react-md/layout` (recommended) or adding the `AppSizeListener` to tests that include `DropdownMenu`s.
* The `DropdownMenuItem` component is no longer required for nested dropdown menus and is an "internal" component instead that shouldn't really be used.
* The `exitVisibilityDelay` always defaults to `DEFAULT_HOVER_MODE_EXIT_TIME`.
* The `MenuItemSeparator` now renders as an `<li>` instead of an `<hr>` or `<div>`.
* The `useContextMenu` now returns an object instead of an ordered list.
* The `useHoverMode` hook no longer accepts an `HTMLElement` generic and instead the event handlers will automatically infer the `HTMLElement` based on usage.
* The `useHoverMode` hook no longer returns `stickyHandlers` and instead returns `hoverHandlers` that only include `onMouseEnter` and `onMouseLeave`. The `handlers` that are returned now include `onClick`, `onMouseEnter`, and `onMouseLeave`. This was kind of what the `stickyHandlers` was before. In addition, clicking an element no longer disabled the hover mode behavior.
* The following typescript types have been removed: `HoverModeOnlyOptions`, `HoverModeOnlyReturnValue`
* Using any of the `MenuItem` components requires the `<MenuKeyboardFocusProvider>` to be mounted as a parent component which might affect tests. This will not break anything if you are using the `DropdownMenu` or `Menu` components.






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Bug Fixes

* **@react-md/icon:** `FileInput` default icon changed from `file_download` to `file_upload` ([174d1c1](https://github.com/mlaursen/react-md/commit/174d1c1511387f316b832f3d4e43ac7f53848cbe)), closes [#1325](https://github.com/mlaursen/react-md/issues/1325)
* **@react-md/table:** Sortable Column Alignment ([e447cc5](https://github.com/mlaursen/react-md/commit/e447cc507e31c2b23fe57f90c536f01f68735999)), closes [#1321](https://github.com/mlaursen/react-md/issues/1321)
* **@react-md/utils:** `useIsUserInteractionMode` get mode via context ([b5f93ae](https://github.com/mlaursen/react-md/commit/b5f93aea772453d77fd35a2aea38923891199653)), closes [#1322](https://github.com/mlaursen/react-md/issues/1322)
* **examples:** Updated `create-react-app` README to use correct start command ([37acdc3](https://github.com/mlaursen/react-md/commit/37acdc3899eb49f08a7be961e5293496937cb0a9))


### Other Internal Changes

* Update tests to use jest.mocked ([4bb25fb](https://github.com/mlaursen/react-md/commit/4bb25fb3f1c74a6df643aff5e6fc28fa33cff29e))
* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)
* **@react-md/dev-utils:** Update watch command for new `sass` modules ([2e7a87a](https://github.com/mlaursen/react-md/commit/2e7a87ae626167f70adec7c00823b6df97824ef6))
* **examples:** Update `next` to latest version ([3521e9b](https://github.com/mlaursen/react-md/commit/3521e9b4feed1e9dbfa50fa8fd4562bc642993b4))






## [4.0.2](https://github.com/mlaursen/react-md/compare/v4.0.1...v4.0.2) (2021-11-30)


### Bug Fixes

* **@react-md/form:** Prevent scrolling while dragging `Slider` on mobile ([7eb6740](https://github.com/mlaursen/react-md/commit/7eb674060bae10950007f6666497d6c16a0f3132))


### Documentation

* **react-md.dev:** Update images/videos for markdown pages ([5e482bb](https://github.com/mlaursen/react-md/commit/5e482bb925fd99f2bb9b9a973327296b586ac18c))


### Other Internal Changes

* **@react-md/utils:** Additional test coverage ([73bc4eb](https://github.com/mlaursen/react-md/commit/73bc4eb93101e2457dfe7b4f3ee47cb2ca5c2a23))






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Bug Fixes

* **@react-md/form:** Added fixes required for Concurrent Rendering ([b4994f4](https://github.com/mlaursen/react-md/commit/b4994f4d927d90c9a5635bdd57464c19ea935100))
* **@react-md/layout:** Added fixes required for Concurrent Rendering ([c0b29a8](https://github.com/mlaursen/react-md/commit/c0b29a82d5c59acc87ebcd22530fcf093d445705))
* **@react-md/menu:** Added fixes required for Concurrent Rendering ([05ec620](https://github.com/mlaursen/react-md/commit/05ec620a4447c904f311e5f98a3580ce56ece35f))
* **@react-md/sheet:** Added fixes required for Concurrent Rendering ([75663e4](https://github.com/mlaursen/react-md/commit/75663e42d135ce450cc5cd5d2915f17f21c92695))
* **@react-md/utils:** Update `getPercentage` to optionally not throw errors ([ff8a1d6](https://github.com/mlaursen/react-md/commit/ff8a1d6bbcf4539e5175987f1570699b06cceb09))


### Documentation

* **@react-md/transition:** Fix transitionTo documentation to use useEffect ([31a31da](https://github.com/mlaursen/react-md/commit/31a31da733666e225db4a4af11d19761636073b6))


### Other Internal Changes

* Updated imports to use `import type` when possible ([ba96bb6](https://github.com/mlaursen/react-md/commit/ba96bb62eeddcc0879f6d584aa670850203561e6))
* **react-md.dev:** Fixed demo styles that included CodeBlock ([1f1a04e](https://github.com/mlaursen/react-md/commit/1f1a04e5c28fa1be2ab068dcdc2f7b51cb229521))
* **react-md.dev:** Fixes for Concurrent Rendering ([5946bd9](https://github.com/mlaursen/react-md/commit/5946bd911a0188348afbdc83ee5760f74d573e97))
* **react-md.dev:** Update order of previous docs links ([87998b9](https://github.com/mlaursen/react-md/commit/87998b93665e2361e6561afcc264365a19d52879))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)

This release focused on updating the `@react-md/transition` package to no longer log errors in `React.StrictMode` because `react-ransition-group` was using `ReactDOM.findDOMNode` to handle transitions.
All `react-md` packages will no longer use `react-transition-group` since all that functionality has been built into `@react-md/transition` with a slightly different API.

This release has also included my first attempt at automating upgrading to new major releases by introducing a new [@react-md/codemod](https://github.com/mlaursen/react-md/tree/98a6a9fe4c5c8cf1baf630e5969b760af93e9ad2/packages/codemod) package that is similar to the [react-codemod package](https://github.com/reactjs/react-codemod). You can automate _some_ of this release by running:

```sh
npx @react-md/codemod v3-to-v4/preset
```

Since I am still learning how to use [jscodeshift](https://github.com/facebook/jscodeshift), it will not be able to migrate everything but should still help with most changes.



### Bug Fixes

* **@react-md/menu:** `DropdownMenu` and `Menu` portal by default ([98a6a9f](https://github.com/mlaursen/react-md/commit/98a6a9fe4c5c8cf1baf630e5969b760af93e9ad2)), closes [#1264](https://github.com/mlaursen/react-md/issues/1264)
* **@react-md/tooltip:** cancel timer when element is clicked ([5416554](https://github.com/mlaursen/react-md/commit/5416554558cc007c31c1510f4bafcf159a3a74d5))
* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/portal:** `ConditionalPortal` supports ReactNode children ([c83d578](https://github.com/mlaursen/react-md/commit/c83d5784de150ccfa8d2605222b115e94baa35c1))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
* **@react-md/typography:** Renamed Text to `Typography` ([30cf056](https://github.com/mlaursen/react-md/commit/30cf056fbaf0e3d28e04dd03f1fd37929967f7ab))
* **@react-md/utils:** Export additional positioning types ([b50a04c](https://github.com/mlaursen/react-md/commit/b50a04c3c3c8dd280fde797a135a60dfbaf5bd33))
* **codemod:** Created a new @react-md/codemod package to help with new releases ([41c1fa6](https://github.com/mlaursen/react-md/commit/41c1fa66c2bd31b627151922ff387550a1ec66b0))


### Documentation

* Hackily fix codesandbox.io not using `sass` resolutions in package.json ([db22cde](https://github.com/mlaursen/react-md/commit/db22cde8006a4f8700c8b1be04dab63d9f65c591)), closes [#1261](https://github.com/mlaursen/react-md/issues/1261)
* **@react-md/form:** Updated hook overrides so documentation appears correctly ([436fbff](https://github.com/mlaursen/react-md/commit/436fbff934ee1ca20a7bc0dc6855e1ffcaad9edf))
* **react-md.dev:** Enable rust compiler by removing custom babelrc ([796efd0](https://github.com/mlaursen/react-md/commit/796efd0ea284294ae9b4ca982f9cfcab9dd71009))
* **react-md.dev:** Fallback code language to markup instead of none ([0efaf9b](https://github.com/mlaursen/react-md/commit/0efaf9bf910a3fbce66da966afb059c3325c2629))
* **react-md.dev:** Fix alert sandboxes ([8f19297](https://github.com/mlaursen/react-md/commit/8f19297fa1e266dd1d70818babc6528a911cb0dd))
* **react-md.dev:** Removed SwipeableTabs demo since it didn't really work ([2d79f93](https://github.com/mlaursen/react-md/commit/2d79f93efd896aeb89a04a7ab6358e54637bbeec))
* **react-md.dev:** Separate Code and CodeBlock into separate folders ([4c492b3](https://github.com/mlaursen/react-md/commit/4c492b3c2d6077f007ff76aa7025c53b3c84eba8))
* **react-md.dev:** Try to allow custom Code/CodeBlock in sandboxes ([5d494bf](https://github.com/mlaursen/react-md/commit/5d494bf8c0e1f83c763b72cbd80f7e56cc1731b9))
* **react-md.dev:** update code components to use css modules ([9bdf6ba](https://github.com/mlaursen/react-md/commit/9bdf6ba48f66b4a94e77bbe814dde7f4fad997ff))
* **react-md.dev:** Use `react-marked-renderer` for markdown stuffs ([93ebaa4](https://github.com/mlaursen/react-md/commit/93ebaa4fee604155a0e15621329470a4ec2eb87c))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* Re-ran `prettier` ([9632d82](https://github.com/mlaursen/react-md/commit/9632d8203f7c6fa96718d0bcfd63ac2475a0efc2))
* update workflows to include node 16 ([f756b92](https://github.com/mlaursen/react-md/commit/f756b928580bb2d8f3e6b97cc47d8686b4f778a6))
* updated branches for build, lint, and test ([b5eeae9](https://github.com/mlaursen/react-md/commit/b5eeae9812cc28726df1dc2a7e049defbceb75ee))
* Updated remaining docs and tests for `react-router-dom` v6 ([e012ef9](https://github.com/mlaursen/react-md/commit/e012ef961b21d2583fe6d34114e36ee31ac042a6))
* **@react-md/dev-utils:** Added error message for combining styles ([aa5ecfd](https://github.com/mlaursen/react-md/commit/aa5ecfd61d9a9cee759bad0fc69043d7ce651502))
* **@react-md/dev-utils:** match quotation marks for `sass` files ([98ffe40](https://github.com/mlaursen/react-md/commit/98ffe40af28ea3874a455d6c6cc96ea1fcd3832c))
* **@react-md/dev-utils:** Update `sassdoc` to not through uncaught exceptions ([8bdf532](https://github.com/mlaursen/react-md/commit/8bdf532a00044105536e0db69a9e8a372b0e36cf))
* **@react-md/dev-utils:** Update release for new major versions and legacy docs ([86c5c02](https://github.com/mlaursen/react-md/commit/86c5c02bce268dd1b93437607cfc706b99500fc9))
* **@react-md/format:** ran `prettier` after upgrading to v2.4.0 ([06110af](https://github.com/mlaursen/react-md/commit/06110afb20c2b83bb76a187f21e5edcd975d1147))
* **codemod:** Added comment about ignoring CodeQL alert ([631d56c](https://github.com/mlaursen/react-md/commit/631d56c6149307445fda852347ec4340ef4a9350))
* **examples:** `enable` strict mode by default for nextjs-typescript ([83e4c44](https://github.com/mlaursen/react-md/commit/83e4c44b26b442042bb1c8b2ffd9244b414fac9c))
* **examples:** added lint command to nextjs examples ([788a8b8](https://github.com/mlaursen/react-md/commit/788a8b8e00372522197f5fafaffd69f9ade59905))
* **examples:** bump nextjs examples from v11.1.2 to v12.0.2 ([be45277](https://github.com/mlaursen/react-md/commit/be45277f9fd6bc92469f704fc7fa305d7a917623))
* **examples:** fixed prefers-color-scheme in examples ([f799d3a](https://github.com/mlaursen/react-md/commit/f799d3a70630387e91f1750d010c76b81b3d8585))
* **examples:** Updated `create-react-app` example to use `react-router-dom` v6 ([3c4d1ea](https://github.com/mlaursen/react-md/commit/3c4d1ea1b135c4798ab4f50e8eae4493e31c6489))
* **examples:** Updated create-react-app-typescript example to use `react-router-dom` v6 ([ae469ef](https://github.com/mlaursen/react-md/commit/ae469ef2c88dcaf29e629865e076f3c34a3d8d98))
* **examples:** Updated examples to no longer import React ([c0b8cb5](https://github.com/mlaursen/react-md/commit/c0b8cb5f0294daf6d4cdc41aedcad038657e036f))
* **react-md:** Remove prop-types package and usage ([2637a6f](https://github.com/mlaursen/react-md/commit/2637a6f43d681a06054e3a4518f692cf51baf997))
* **react-md.dev:** Enable React.StrictMode ([219937e](https://github.com/mlaursen/react-md/commit/219937e989082649317561197368b0852f66c19c))
* **react-md.dev:** Updated some transition documentation ([44bfa20](https://github.com/mlaursen/react-md/commit/44bfa20f54376ac800b16d4691878ed6627e345b))
* **stylelint:** Updated to use `stylelint` ([22d1598](https://github.com/mlaursen/react-md/commit/22d15985061df76d827d4ca9319198526e320f11))
* **test:** Update coverage for watch mode ([74cee51](https://github.com/mlaursen/react-md/commit/74cee51f6230a534ba618a0e47816ad8b24ee9ff))
* **typescript:** Stopped using deprecated HTMLTable(Data|Header)CellElement ([23ba342](https://github.com/mlaursen/react-md/commit/23ba342ca0d461d08cd649513e7d05216647bd17))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **@react-md/menu:** The `DropdownMenu` and `Menu` components portal by
default. This should really only affect snapshot tests
* **@react-md/typography:** The Text component has been renamed to Typography to
help with auto-imports conflicting with the Text element that exists in
`lib.d.ts`
* **react-md:** There will no longer be run-time prop validation with
the `prop-types` package.






## [3.1.1](https://github.com/mlaursen/react-md/compare/v3.1.0...v3.1.1) (2021-09-12)


### Bug Fixes

* **typescript:** added missing readonly prefix to `TabsManager` tabs prop ([45d9458](https://github.com/mlaursen/react-md/commit/45d9458ad01e30be1364357f2f78c1aa4c685dfd))






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Bug Fixes

* **@react-md/dialog:** `DialogFooter` align prop applies correct classes ([644971d](https://github.com/mlaursen/react-md/commit/644971da4f84994028a59f7a1d2518c469a3b71b))
* **@react-md/form:** `TooManyFilesError` is only used if all the other validation has passed ([6ed3f54](https://github.com/mlaursen/react-md/commit/6ed3f545fd292ff9d8dfe0c8d554c1dfe3450a01))
* **@react-md/form:** ensure file names end with a period for `useFileUpload` extensions ([9238140](https://github.com/mlaursen/react-md/commit/9238140311c0f27048cd634971bc98fddd531df2))
* **@react-md/form:** prevent infinite rerenders when calling useFileUpload's reset in useEffect ([b2875b1](https://github.com/mlaursen/react-md/commit/b2875b17634651ec26365268658445260cd675ca))
* **@react-md/utils:** `useDropzone` fix around onDragLeave behavior ([fdff9f2](https://github.com/mlaursen/react-md/commit/fdff9f25f259d02fe8a039cc5f2ae94ed86e82f9))
* **typescript:** updated all array types to be readonly ([8f71bcb](https://github.com/mlaursen/react-md/commit/8f71bcbde12928434975c6836079c3dda7c6ab1f))


### Features

* **@react-md/form:** add `isValidFileName` option to `useFileUpload` ([dbd0375](https://github.com/mlaursen/react-md/commit/dbd03756b1b21c528fc0fdee250672e3f52a5997))
* **@react-md/typography:** override default typography without globals ([ce89374](https://github.com/mlaursen/react-md/commit/ce893741e3ca950d38c6808f31b1e3549a3f3410)), closes [#1239](https://github.com/mlaursen/react-md/issues/1239)


### Documentation

* **react-md.dev:** updated `sassdoc` for new module system ([4746d26](https://github.com/mlaursen/react-md/commit/4746d265adcc2dcaffb260a565462b9d9c28805e))
* **react-md.dev:** updated SortableColumns example to import SortOrder type ([b629e3e](https://github.com/mlaursen/react-md/commit/b629e3e3873ecc34ac334ff560269c4177616afa))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))
* Simplifying format and covering json and yml files ([#1227](https://github.com/mlaursen/react-md/issues/1227)) ([045ba5e](https://github.com/mlaursen/react-md/commit/045ba5e2ade2b6926af32c5a530c1fc81d739d97))
* **@react-md/dev-utils:** fixed spelling of gzipped ([baad174](https://github.com/mlaursen/react-md/commit/baad1747480e2b11129f7992571e6b72641436e3))
* **examples:** updated nextjs examples to latest version of `next` ([b50d745](https://github.com/mlaursen/react-md/commit/b50d7456094ac3aad7b42be5c50a7b04490bed62))
* **react-md.dev:** added `sassdoc` hot-reloading ([9d58e09](https://github.com/mlaursen/react-md/commit/9d58e09265216c76352c0d9c4d66aad494b34220))
* **react-md.dev:** updated `sassdoc` examples to be linkable ([9ed096e](https://github.com/mlaursen/react-md/commit/9ed096ed3d4912dc6075472a5bb27038d6bf16a5))
* **react-md.dev:** Updated fonts for latest nextjs build optimizations ([ca9ecbd](https://github.com/mlaursen/react-md/commit/ca9ecbdd03813722fda1fc097676d051329c8539))
* **typescript:** support typescript@v4.4.2 ([5a9dd72](https://github.com/mlaursen/react-md/commit/5a9dd729e1f34df326aee20eca9a7436bb152cd4))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Bug Fixes

* Updated peerDependencies to fix yarn berry peer requirements ([250efcd](https://github.com/mlaursen/react-md/commit/250efcdd81ea39c06b08eb30109589c89d9b8e0f)), closes [#1224](https://github.com/mlaursen/react-md/issues/1224)


### Other Internal Changes

* Fixed link to v3.0.0 PR ([ff221cc](https://github.com/mlaursen/react-md/commit/ff221cc7438ff62dacc36b33356f4464497b4ae5))






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


This release should be relatively simple for most consumers of this library since the main breaking change is dropping support for `node-sass` and requiring `sass` since [node sass has been deprecated](https://github.com/sass/node-sass#node-sass) as well as removing deprecated variables, hooks, and components.
Most users should be able to run the following commands to upgrade to v3.0.0:

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

In addition, there is now partial support for the [new Sass module system](https://sass-lang.com/blog/the-module-system-is-launched) with the `react-md` package which also simplifies the import usage and has a slight build performance improvement for large projects.
To start using the new module system, update all the `@import` statements as shown below:

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

> Check out the updated [customizing your theme documentation](https://react-md.dev/guides/customizing-your-theme), [#1214](https://github.com/mlaursen/react-md/pull/1214), or [958f34f](https://github.com/mlaursen/react-md/commit/958f34f82152f55803b0693b490cd9a344eb70b3) for more in-depth examples.


### BREAKING CHANGES

* **@react-md/theme:** `$rmd-theme-dark-elevation` now defaults to `true` instead of `false`
* **sass:** `node-sass` is no longer supported and users must switch to `sass`
* **@react-md/utils:** Removed `InteractionModeListener` since it was an alias for `UserInteractionModeListener`
* **@react-md/utils:** Removed `ResizeObserver` component and `useResizeObserverV1` implementation
* **@react-md/tooltip:** Removed `TooltipHoverModeConfig` component
* **@react-md/card:** Removed deprecated `$rmd-card-dark-elevation-bordered-background-color` variable
* **@react-md/tooltip:** Removed deprecated props from `Tooltipped` component
* **@react-md/form:** The second argument for `useIndeterminateChecked` is now an object of options


### Bug Fixes

* **sass:** drop node-sass in favor of `sass` since it's deprecated ([126fb5a](https://github.com/mlaursen/react-md/commit/126fb5aa1ad53cd12f183d5eaa349b70af4fceb3))
* **sass:** use math.div instead of division since it's deprecated ([d8c3f12](https://github.com/mlaursen/react-md/commit/d8c3f1299ea35814667c5915880744399e5b2108))


### Features

* **@react-md/theme:** $rmd-theme-dark-elevation `defaults` to true ([b371337](https://github.com/mlaursen/react-md/commit/b37133778bcd024e91bca4cb9d28d3b723f88293))
* **react-md:** Simplify `sass` usage with: `@use 'react-md';` ([787bfb5](https://github.com/mlaursen/react-md/commit/787bfb51e68d6b5200d43b8658dc33f5fe870584))


### Documentation

* **react-md.dev:** removed documentation around pre-compiling styles ([29b5d74](https://github.com/mlaursen/react-md/commit/29b5d74aacf973a5cf9cd2197097df4461c459a0))
* **react-md.dev:** Update Sass Documentation for `@use` ([68e8c6b](https://github.com/mlaursen/react-md/commit/68e8c6bb718b3e60c23519cff0dab1c265181379))
* **react-md.dev:** Updated sandboxes for new Sass module system ([095ae97](https://github.com/mlaursen/react-md/commit/095ae97c1d75e152c6fbe1bfce9c809d15cd4985))


### Other Internal Changes

* Added additional tests to bump test coverage ([4d0371c](https://github.com/mlaursen/react-md/commit/4d0371c9e21ab8449a5036a001d302e14a076b7c))
* **@react-md/card:** removed deprecated $rmd-card-dark-elevation-bordered-background-color variable ([01c9350](https://github.com/mlaursen/react-md/commit/01c9350e32ad75804996e40aed4d23c1e9fe8d5e))
* **@react-md/dev-utils:** Added simple sass-migrator command ([a8e8df3](https://github.com/mlaursen/react-md/commit/a8e8df38a110d3c8b1d62adc4c449b8b9808ab44))
* **@react-md/dev-utils:** autoConfirm flag passed to initBlog ([dec09b8](https://github.com/mlaursen/react-md/commit/dec09b88312eccdfd824c8525afd5539d39c7f4c))
* **@react-md/dev-utils:** Combine all scss files into `react-md/dist/_everything.scss` ([c7177e6](https://github.com/mlaursen/react-md/commit/c7177e6e2f338754a28fbff7dbee13075e2da3f3))
* **@react-md/dev-utils:** Update release script to hopefully work with prereleases ([e0ef881](https://github.com/mlaursen/react-md/commit/e0ef88145765bd1414649ddb60d0662db9549fe5))
* **@react-md/dev-utils:** updated `sassdoc` and variables to use everything.scss ([a0f0699](https://github.com/mlaursen/react-md/commit/a0f06996c44ee88e1fc3ba4d24ec11c13f204d88))
* **@react-md/dev-utils:** updated variables command to work with `sass` ([5376be1](https://github.com/mlaursen/react-md/commit/5376be11f3499afafd3ddde363178e1aa270cb9c))
* **@react-md/form:** removed deprecated implementation in `useIndeterminateChecked` ([6b7871f](https://github.com/mlaursen/react-md/commit/6b7871f9f0372916ac9b13cb12b49d6d2b52e564))
* **@react-md/tooltip:** removed deprecated props from `Tooltipped` component ([6dca9b1](https://github.com/mlaursen/react-md/commit/6dca9b1de28466754e968a33a173a2ad8d24ec5c))
* **@react-md/tooltip:** removed TooltipHoverModeConfig component ([664ec30](https://github.com/mlaursen/react-md/commit/664ec300b76f7f1c611e9744e6c5eb06ee595ef6))
* **@react-md/utils:** remove ResizeObserver component and useResizeObserverV1 implementation ([6a6b109](https://github.com/mlaursen/react-md/commit/6a6b109cc54257b151dde75f6109faa391c07a76))
* **@react-md/utils:** removed InteractionModeListener alias ([216c8ef](https://github.com/mlaursen/react-md/commit/216c8efe62a12e031414d94c17f97cb4c12c4b8e))
* **examples:** updated examples to latest dependencies ([f2eb07a](https://github.com/mlaursen/react-md/commit/f2eb07aeb3eb328aa546414658cc0db47119041d))
* **react-md.dev:** Each package includes a link to `typedoc` API in navigation tree ([c388ba6](https://github.com/mlaursen/react-md/commit/c388ba6f33a7f693562e693351d242a175d5e6e8))
* **react-md.dev:** ran migrator for deprecated division ([98d2c58](https://github.com/mlaursen/react-md/commit/98d2c5878da797d32ff3a05ad4abdbb123b17579))
* **react-md.dev:** removed tilde from imports ([6081e14](https://github.com/mlaursen/react-md/commit/6081e145c13ab4f86c2f84da3dbc1988986ffdd2))
* **react-md.dev:** update all scss files for `@use` imports ([958f34f](https://github.com/mlaursen/react-md/commit/958f34f82152f55803b0693b490cd9a344eb70b3))
* **react-md.dev:** update all styles to use react-md/dist/everything ([2da5033](https://github.com/mlaursen/react-md/commit/2da5033c765286377dfbe735fcd61ba29196e735))
* **react-md.dev:** Update links for previous versions ([2d0a0e6](https://github.com/mlaursen/react-md/commit/2d0a0e62b7c3c3238809f4b76fecb6f272bf1cec))
* **react-md.dev:** updated docs for new rmd-theme-dark-elevation `defaults` ([b2269ff](https://github.com/mlaursen/react-md/commit/b2269ffe2699a9eaf375dc9dd3957796dd313c8e))
* **react-md.dev:** updated examples to work with `sass` instead of node-sass ([d8ddf51](https://github.com/mlaursen/react-md/commit/d8ddf517eb5d5a5b83388da2cf72a61b51c74556))
* **react-md.dev:** updated sandboxes to use root `react-md` ([c0f25f7](https://github.com/mlaursen/react-md/commit/c0f25f7ff314f5e9442e41c865b664e84b62f9de))






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Bug Fixes

* **@react-md/layout:** Do not unmount children when swapping to non-fixed appbar mini layouts ([64103c8](https://github.com/mlaursen/react-md/commit/64103c8f3cc87cd5684cc354f4976d6034262ee4)), closes [#1207](https://github.com/mlaursen/react-md/issues/1207)
* **@react-md/utils:** `useMediaQuery` uses addEventListener/removeEventListener ([b889a9e](https://github.com/mlaursen/react-md/commit/b889a9e38b311cffda849a33dd6953c49993bcbc))


### Other Internal Changes

* fixed sass-lint error ([58f614b](https://github.com/mlaursen/react-md/commit/58f614b38b5a7dcca6a84319275320b9863cba87))
* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))
* **react-md.dev:** fix links to form demos in blog ([b1626b5](https://github.com/mlaursen/react-md/commit/b1626b5a4ef77a1dda2863bbed9fe1379a0e9513))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)

This release is focused around the `FileInput` component in the `@react-md/form` package and implementing a `useFileUpload` hook to handle uploading/previewing files in the browser. However, there is a notable change in this release for the form documentation since the demos have been split into the following pages:

- [Text Field Demos](https://react-md/dev/packages/form/text-field-demos)
- [Select Field Demos](https://react-md/dev/packages/form/select-field-demos)
- [Selection Control Demos](https://react-md/dev/packages/form/selection-control-demos)
- [File Input Demos](https://react-md/dev/packages/form/file-input-demos)
- [Slider Demos](https://react-md/dev/packages/form/slider-demos)
- [Validation Demos](https://react-md/dev/packages/form/validation-demos)


### Bug Fixes

* **@react-md/form:** `FileInput` correctly center the icon when children aren't provided ([3a6ab33](https://github.com/mlaursen/react-md/commit/3a6ab3361e91879a9ecbdaaa71aa084508414b11))
* **@react-md/layout:** `useLayoutNavigation` possible perf fix ([3d65e4e](https://github.com/mlaursen/react-md/commit/3d65e4eb3aec446d1d821fc9d86896d9758ab4fc))


### Features

* **@react-md/form:** `FileInput` automatically swaps button type to text if children exist ([e5585e1](https://github.com/mlaursen/react-md/commit/e5585e1309d4bde0dcd8ed0afc6b737a12863011))
* **@react-md/form:** `FormMessageCounter` component added to public API ([1508812](https://github.com/mlaursen/react-md/commit/15088122c3607730fdc52ff706d1d9ea56a6e32c))
* **@react-md/form:** Added a `useFileUpload` hook to upload files to the browser ([efb3f2f](https://github.com/mlaursen/react-md/commit/efb3f2f2e3f4b848097c42d58da32e42887c541b)), closes [#1159](https://github.com/mlaursen/react-md/issues/1159)
* **@react-md/utils:** added `useDropzone` hook ([bc07a1f](https://github.com/mlaursen/react-md/commit/bc07a1f56673b14bf4941971cc50ebeb0a298a51))


### Other Internal Changes

* Added CodeQL Workflow for code analysis ([9b4a279](https://github.com/mlaursen/react-md/commit/9b4a279af044ae949bbf1318a9b023e21b076953))
* **@react-md/form:** Added tests for `useFileUpload` ([49ce4d9](https://github.com/mlaursen/react-md/commit/49ce4d9812a3a854a256c36b7e7ef7fcdb696ba4))
* **@react-md/layout:** Added additional test coverage ([7c123ef](https://github.com/mlaursen/react-md/commit/7c123ef14e76e0bd74eab32c38a7c2cb58ae0c02))
* **react-md.dev:** Added an endpoint for uploading files that acts like a /dev/null ([9663ae8](https://github.com/mlaursen/react-md/commit/9663ae8f5524839a2217d4e52bf384b7304d771c))
* **react-md.dev:** Added examples for `useFileUpload` ([8f9002e](https://github.com/mlaursen/react-md/commit/8f9002ea95e2562e0d04291c2acc972953eca09e))
* **react-md.dev:** fix `eslint` error after updating `prettier` ([75a9b0f](https://github.com/mlaursen/react-md/commit/75a9b0f18b533e2037567e932d3cbf8be5f8e9aa))
* **react-md.dev:** Fixed rightAddon for Customizing `Select` Options Demo ([367cc0d](https://github.com/mlaursen/react-md/commit/367cc0d227dcd08e16b3e3893121f2bb57ed79d2))
* **react-md.dev:** Split form demos into separate pages ([8594930](https://github.com/mlaursen/react-md/commit/85949300c8f3c0150812885c44348d09c649e9b0))
* **react-md.dev:** Use temporary layout on desktop in dev mode to get more screen space ([53b20c4](https://github.com/mlaursen/react-md/commit/53b20c43ee4f6a6a11cb84cda51e806a9d333ad1))






## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)


### Bug Fixes

* **@react-md/form:** `MenuItemCheckbox` added missing indeterminate state ([aa2c552](https://github.com/mlaursen/react-md/commit/aa2c55215812de2052b3af691ac16405806f3952)), closes [#1186](https://github.com/mlaursen/react-md/issues/1186)
* **@react-md/form:** `useIndeterminateChecked` correctly uses readonly prefix ([7f69a71](https://github.com/mlaursen/react-md/commit/7f69a719affbe6d15542225b94ba4b0dc5ea5fa4))
* **@react-md/form:** `useIndeterminateChecked` supports `MenuItemCheckbox` with new option ([9ab67bf](https://github.com/mlaursen/react-md/commit/9ab67bffe5cad01991452bd35fefd2fa0724701e))
* **@react-md/form:** `MenuItemCheckbox`, `MenuItemRadio`, and `MenuItemSwitch` styles on light themes ([fc4dcd9](https://github.com/mlaursen/react-md/commit/fc4dcd9a2b687f5cee6a62efefc6ad5d2a87b6cc))


### Documentation

* **@react-md/form:** Updated documentation for `useIndeterminateChecked` ([8646c28](https://github.com/mlaursen/react-md/commit/8646c2819e9c6d03a4635f5813f8f3c93ff6bdd3))


### Other Internal Changes

* **@react-md/dev-utils:** Updated release script to allow custom CHANGELOG updates ([dde151b](https://github.com/mlaursen/react-md/commit/dde151bdaf3f9872bf2c4a33abc03910337da083))
* **@react-md/form:** Added tests for `useIndeterminateChecked` ([cc2a422](https://github.com/mlaursen/react-md/commit/cc2a4220a964fe128c020bdea058316081092a87))
* **react-md.dev:** Updated `MenuWithFormControls` example for indeterminate checkboxes ([2d20848](https://github.com/mlaursen/react-md/commit/2d208485c75eb9c717b10a771e291b38fd2cd11b))






## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Bug Fixes

* **@react-md/form:** Pass checked prop to component ([bffae6f](https://github.com/mlaursen/react-md/commit/bffae6f6186f9bb1a9c219d8c3f728fa469b1471))
* **@react-md/form:** Fixed controlled behavior for `Switch` components ([8c65df6](https://github.com/mlaursen/react-md/commit/8c65df67d72c73df759e1a27d9472d9f708bd81f)), closes [#1175](https://github.com/mlaursen/react-md/issues/1175)
* **@react-md/utils:** `omit` uses readonly prefix for key list ([d3e1ee8](https://github.com/mlaursen/react-md/commit/d3e1ee8659b156b7ff70e373904024bd38cd66b9))
* **@react-md/utils:** Slightly better tooltip behavior after clicking somewhere on the page ([4d3fc16](https://github.com/mlaursen/react-md/commit/4d3fc164cbb24c8d8824f7dcd5794595ac2a6e77))


### Documentation

* **react-md.dev:** Updated general documentation ([9bc8a0d](https://github.com/mlaursen/react-md/commit/9bc8a0dc3a513e4c1131523ee3bc6a10f61fdfed))
* **react-md.dev:** Update `next` and build deps to fix font loading issues ([e528617](https://github.com/mlaursen/react-md/commit/e52861739ca4d1ac5ec8b1c935bab2327391074d))


### Other Internal Changes

* updated doc tsconfig for better autocompletion ([7fb8b94](https://github.com/mlaursen/react-md/commit/7fb8b94aaf47dffcdd7ae1da7b55b8d98e5b21c1))
* Renamed contrast check function ([97c1ad7](https://github.com/mlaursen/react-md/commit/97c1ad71fb37290d4d5083adc2fe1f4e797cdc1e))
* add website alias to changelog config ([d98bf51](https://github.com/mlaursen/react-md/commit/d98bf51c42f2e2ba45e211582546c302f4579fd6))
* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Bug Fixes

* **@react-md/layout:** Added fixedAppBar flag into the `useLayoutConfig` ([14e6587](https://github.com/mlaursen/react-md/commit/14e65875b295a1143587908ac170983e277269b5))
* **@react-md/layout:** Mini Layouts Align Icons with Hamburger `Menu` in Dense Mode ([abbe9a9](https://github.com/mlaursen/react-md/commit/abbe9a9fb407cac8407abba978a35bbaa15adf72))
* **@react-md/layout:** non-fixed `AppBar` mini layouts ([84313fc](https://github.com/mlaursen/react-md/commit/84313fc20f9ffb46314573fc62fa54925fe6c631)), closes [#1101](https://github.com/mlaursen/react-md/issues/1101)
* **@react-md/layout:** Offset for temporary mini layouts ([86e75bf](https://github.com/mlaursen/react-md/commit/86e75bf9abb8c5b09ad8bdd81f27642f622a8168))
* **@react-md/states:** Added missing `classnames` dependency ([a7a2012](https://github.com/mlaursen/react-md/commit/a7a2012d59724ad381109898e9ee64a8b31d81a6)), closes [#1155](https://github.com/mlaursen/react-md/issues/1155)


### Documentation

* **@react-md/layout:** Added demo for non-fixed `AppBar` layouts ([d217ac1](https://github.com/mlaursen/react-md/commit/d217ac1538eb0df6d9a053a16f9e1526aba75837))
* **@react-md/typography:** Added examples for overriding typography styles ([57033bd](https://github.com/mlaursen/react-md/commit/57033bd9e9837a0985c35c66fdbb1f08d74f7c85)), closes [#1147](https://github.com/mlaursen/react-md/issues/1147)
* **react-md.dev:** Added simple API documentation with `typedoc` ([84739af](https://github.com/mlaursen/react-md/commit/84739afe9f727863f2131f374739f3ac94f93e9f))
* **react-md.dev:** don't include version for latest `react-md` ([a69359b](https://github.com/mlaursen/react-md/commit/a69359bf28a622571dd001628f3c81822470ba51))
* **react-md.dev:** Light Theme Code Preview Colors ([c9cc6a7](https://github.com/mlaursen/react-md/commit/c9cc6a722eeb019a7d483d4d2cf7f7a1dabf2757))
* **react-md.dev:** redirect to v1 website ([5d9ee71](https://github.com/mlaursen/react-md/commit/5d9ee71e18494b38e26a7478fd54bf40de49a023))
* **react-md.dev:** small updates after switching to free hosting ([96e2dcd](https://github.com/mlaursen/react-md/commit/96e2dcd9317fe96b1cfad867ac7d13d005b08809))
* **react-md.dev:** update v1 links to new repo and static hosting ([92801bb](https://github.com/mlaursen/react-md/commit/92801bb457c30540551bc3dbfcc0a7f692044d84))
* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))
* **react-md.dev:** Fix `typedoc` source links when deployed through vercel ([a4eed1b](https://github.com/mlaursen/react-md/commit/a4eed1b6688dc6a3aa6ee092dc82fcad154b4838))
* **react-md.dev:** Fixed `useLayoutNavigation` hook example in creating a new app ([1cde856](https://github.com/mlaursen/react-md/commit/1cde856d979edbde1578f7837ccc048a94f70fa0))


### Other Internal Changes

* no longer build,lint,test node 10 since I upgraded some dependencies ([1d3f889](https://github.com/mlaursen/react-md/commit/1d3f8898464e87193dd94236d4110e6da773c014))
* fix anchor link to useFixedPositioning example docs ([eb5a9fc](https://github.com/mlaursen/react-md/commit/eb5a9fc15a558879bac574ebc8e4dc931d2a8427))
* fixed typo ([ef3f9e4](https://github.com/mlaursen/react-md/commit/ef3f9e4e7a09c69ea0439234e95389f9f1a7d19d))
* removed v1 info from README ([b0e8ccb](https://github.com/mlaursen/react-md/commit/b0e8ccbfdb47befb39eacd98804f50ec30ae372e))
* **@react-md/dev-utils:** Removed old `typedoc` WIP ([a7d7429](https://github.com/mlaursen/react-md/commit/a7d742980d59648aad51f28d99a8a34c9f307e9d))
* **deployment:** Fixed deploy script ([4072b93](https://github.com/mlaursen/react-md/commit/4072b931d062ded1bdbeefd83a7349c68e202ae1))
* **workflow:** dropped node 10 since I upgraded some dependencies ([fd81950](https://github.com/mlaursen/react-md/commit/fd81950e4b354da67538830ecd2bb1e0215cb852))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)


### Bug Fixes

* **@react-md/utils:** Cancel hover mode timers on click ([892dc24](https://github.com/mlaursen/react-md/commit/892dc2413ef2811d6aa5ad9d569bcaeaed6d6423))


### Other Internal Changes

* removed engines from root package.json ([1165471](https://github.com/mlaursen/react-md/commit/1165471e233c7b75680ab14487807167c256c8b5))






## [2.8.1](https://github.com/mlaursen/react-md/compare/v2.8.0...v2.8.1) (2021-04-23)


### Bug Fixes

* **@react-md/form:** `MenuItemSwitch` spacing styles ([8ac8299](https://github.com/mlaursen/react-md/commit/8ac82999841c87aef307c56266fd29095e36c868)), closes [#1126](https://github.com/mlaursen/react-md/issues/1126)
* **@react-md/form:** Checkbox, Radio, and `Switch` color ([9315eff](https://github.com/mlaursen/react-md/commit/9315efffa1a6f9b1e4e5d4a7932995467d626bc9))






# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Bug Fixes

* **@react-md/dialog:** `FixedDialog` applies `style` prop ([bb4ad2f](https://github.com/mlaursen/react-md/commit/bb4ad2f8771f4635aa0b99f548573bc16593a569))
* **@react-md/utils:** Click Behavior for Hover Mode ([d0fda80](https://github.com/mlaursen/react-md/commit/d0fda80332406e3323df457d9822d9dd6df3f8da))
* **@react-md/utils:** focusElementsWithin correctly focuses container element as a fallback ([cff46c4](https://github.com/mlaursen/react-md/commit/cff46c4b86c2d6091a7cf7e4326fe2aaa1e1b728))


### Features

* **@react-md/form:** Implemented `Form` `Menu` Item Components ([fed2b9f](https://github.com/mlaursen/react-md/commit/fed2b9f737810ed2d14bc48a291882653ac565c9))
* **@react-md/transition:** Updated `useFixedPositioning` to merge style objects ([1ab84d7](https://github.com/mlaursen/react-md/commit/1ab84d7e86ed911cb263bb1b25e1085fab3fc2e5))
* **@react-md/transition:** updated `useFixedPositioning` to support fixedTo ref ([ced550a](https://github.com/mlaursen/react-md/commit/ced550a6ae8525e02d8ce20dde1cf448454ac9ec))
* **@react-md/utils:** Added `isFocusable` util ([1d92472](https://github.com/mlaursen/react-md/commit/1d92472f688d9fc1f4359a1f0aab60d861b23760))
* **@react-md/utils:** implemented a reusable hover mode API ([4f5ce2f](https://github.com/mlaursen/react-md/commit/4f5ce2fafa9269e3b6627b5166ff76f456a1d681))
* **typescript:** bump `typescript` version to v4.2.3 ([b094b36](https://github.com/mlaursen/react-md/commit/b094b364cb43c4db33a112db3feab6e138a3c41c))


### Documentation

* **@react-md/form:** Updated form menu components for better documentation and examples in code ([d9695b7](https://github.com/mlaursen/react-md/commit/d9695b7f548adf867ad89e069da1459361149bfc))
* **react-md.dev:** Added `Menu` With `Form` Controls Demo ([dbc2d21](https://github.com/mlaursen/react-md/commit/dbc2d21c147c355fcde5c354312cf7cc4ce05111))
* **react-md.dev:** Added `Tooltip` Hook Example ([9783c44](https://github.com/mlaursen/react-md/commit/9783c4412bccbce6ce43b7f59d9167be9bb3ebc1))
* **react-md.dev:** Added a new Hover Mode demo ([1e0e783](https://github.com/mlaursen/react-md/commit/1e0e783bbbf7659a4de4a8803e57366f5681cbd4))
* **react-md.dev:** Added Sticky Hover Mode Example ([1a94a31](https://github.com/mlaursen/react-md/commit/1a94a3174540d0f99029972a2c180fd9015c511b))
* **react-md.dev:** additional `Tooltip` Hook documentation ([5447f64](https://github.com/mlaursen/react-md/commit/5447f64f8944fcc74fadf6e381a3dbdfc984b399))
* **react-md.dev:** fix documentation site deployment ([9588c37](https://github.com/mlaursen/react-md/commit/9588c371d7541dcfafab8e35e697b65b2558ef01))
* **react-md.dev:** removed custom nextjs server ([8389b68](https://github.com/mlaursen/react-md/commit/8389b68325aff0ec79565d86b2cc35414fb755f3))
* **react-md.dev:** Suppress hydration warning for App Size ([c5a08da](https://github.com/mlaursen/react-md/commit/c5a08da7d386eb1e3395b5928457ffa6fb076870))
* **react-md.dev:** Updated documentation site after new tooltip behavior ([5db9a9b](https://github.com/mlaursen/react-md/commit/5db9a9b409535d8d9f2cc4e475a6fade58dc327c))
* **react-md.dev:** Updated documentation site for new `HoverModeProvider` documentation ([f42c65c](https://github.com/mlaursen/react-md/commit/f42c65cea024c6b1c5353fca4790908d3297a82c))
* **seo:** Added missing description meta tag ([3fd9e9f](https://github.com/mlaursen/react-md/commit/3fd9e9fedfdbdf6413e99491a444be1d15669c17))


### Other Internal Changes

* Moved documentation gitignore values to root ([633a586](https://github.com/mlaursen/react-md/commit/633a586d15e4e4b633fca83f5626adb4a08adde6))
* **@react-md/form:** Added new for menu item tests ([5cf4f8a](https://github.com/mlaursen/react-md/commit/5cf4f8a0f8a2f5f097198c20a3caae8615a159bd))
* **@react-md/form:** Created `SwitchTrack` and `InputToggleIcon` components ([d9278b3](https://github.com/mlaursen/react-md/commit/d9278b3d8a92920d5bd58edff573f6d575ef3a25))
* **@react-md/form:** moved some toggle styles into separate mixins ([517f199](https://github.com/mlaursen/react-md/commit/517f199efbb08e96b5aee69526b581453874195c))
* **@react-md/form:** simplified toggle icon styles ([adb6b06](https://github.com/mlaursen/react-md/commit/adb6b0607218520ba5de362f07662b8fbe26a680))
* **@react-md/form:** Updated `MenuItemRadio` usage to be wrapped in a group for a11y ([01caa0b](https://github.com/mlaursen/react-md/commit/01caa0bc95a7e1984f141cad4d435d59dfbb4cf2))
* **@react-md/form:** Updated SliderValue to use non-portalled tooltip for existing test ([b41136f](https://github.com/mlaursen/react-md/commit/b41136f6cf6d4bfc58a2c688b28a38c911cba29d))
* **@react-md/layout:** Updated `Configuration` to use new `HoverModeProvider` ([357f2bf](https://github.com/mlaursen/react-md/commit/357f2bf35a1c2749aa5767bf124ad2d3521ebdb2))
* **@react-md/tooltip:** Cleaned up some `useTooltip` code ([0a6aed9](https://github.com/mlaursen/react-md/commit/0a6aed906f76690f8a6e3e026cd30dbf991ef148))
* **@react-md/tooltip:** Updated `Tooltip` to use new Hover Mode ([386f47b](https://github.com/mlaursen/react-md/commit/386f47ba4e0976a3f5727a714710914bb5968987))
* **@react-md/transition:** bump @types/react-transitition-group from v4.2.4 to v4.4.1 ([f3f5c7b](https://github.com/mlaursen/react-md/commit/f3f5c7be571e87a13f67442a673feb2807cb96ba))
* **@react-md/utils:** added missing since annotation to `useOnUnmount` ([c758982](https://github.com/mlaursen/react-md/commit/c758982c3e4d36f61ac39699f3bcd9efaf9acda4))
* **eslint:** updated eslintignore so I can jump through errors quickly ([7bfe9f3](https://github.com/mlaursen/react-md/commit/7bfe9f3a75b4f5d954c97a2be01162548bf5c29e))
* **react-md.dev:** Fixed sandboxes to no longer require @types/classnames ([32f6f0f](https://github.com/mlaursen/react-md/commit/32f6f0f08a6ee7b054fa4ddf767648e2921abd57))
* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Bug Fixes

* **@react-md/form:** `Select` correctly respects the `readOnly` prop ([d9a0262](https://github.com/mlaursen/react-md/commit/d9a0262d24eaac49127092f2b6df3eb71bdf8843)), closes [#1089](https://github.com/mlaursen/react-md/issues/1089)
* **@react-md/form:** `Select` correctly updates for the `dense` spec ([2930595](https://github.com/mlaursen/react-md/commit/29305959f0a128376895b6106700226856c7b78b)), closes [#1089](https://github.com/mlaursen/react-md/issues/1089)
* **@react-md/utils:** useTabFocusWrap when only one element ([25178d7](https://github.com/mlaursen/react-md/commit/25178d7c691e3e6fbb2ccaf93cf3c96a0e7c5380))
* **umd:** now correctly use production string for UMD bundles ([a9b78ad](https://github.com/mlaursen/react-md/commit/a9b78ad29807c0264b6ab0d99737eb8899501b33))


### Documentation

* **react-md.dev:** fixed build error after upgrading `next` ([1861731](https://github.com/mlaursen/react-md/commit/18617317d79f400865fbd249af23d4ba17e00b49))


### Other Internal Changes

* **@react-md/dev-utils:** GitHub release surrounds libsize in code block ([d3d122a](https://github.com/mlaursen/react-md/commit/d3d122a8c2ab7d4ebb14a09118f071b07601f5c4))
* **@react-md/utils:** Added a simple `useOnUnmount` hook ([96f3cc0](https://github.com/mlaursen/react-md/commit/96f3cc04beacacd3a5ffb64ce50c42646f7e9e7d))
* **react-md.dev:** fixed Demo name replacement ([70e60e1](https://github.com/mlaursen/react-md/commit/70e60e1b64325782abd10e8fbc044dcd2fda3a9b))
* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))
* **workflow:** added develop branch to workflow triggers ([c379ce3](https://github.com/mlaursen/react-md/commit/c379ce3ee13d1108f191e7da1c7760b55cc7d6d6))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Bug Fixes

* **@react-md/alert:** fixed alert color when dark theme elevation is enabled ([99cc271](https://github.com/mlaursen/react-md/commit/99cc2710dbc9618b40595cd903697fed8e5651c0)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)
* **@react-md/card:** fixed card color when dark theme elevation is enabled ([e5da5f5](https://github.com/mlaursen/react-md/commit/e5da5f55de9b6fdd669b03157fbae38dd7f223cc)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)
* **@react-md/dialog:** fixed dialog color when dark theme elevation is enabled ([e79993d](https://github.com/mlaursen/react-md/commit/e79993d3b07072cf1c379677eea3f40b3e149eb7)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)
* **@react-md/form:** fixed listbox color when dark theme elevation is enabled ([b68ac04](https://github.com/mlaursen/react-md/commit/b68ac04e781787269293e5f63cc8032e2a4382f9)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)
* **@react-md/menu:** fixed menu color when dark theme elevation is enabled ([52c752d](https://github.com/mlaursen/react-md/commit/52c752d05a4a3cb3fb0119e213db7b58218fbfa9)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)
* **@react-md/sheet:** fixed sheet color when dark theme elevation is enabled ([0abe05e](https://github.com/mlaursen/react-md/commit/0abe05e8231f3dec3306e23e577b81505b94631f)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)


### Features

* **@react-md/layout:** added support for mini layouts ([36b3cbc](https://github.com/mlaursen/react-md/commit/36b3cbc02a059cae20d7495ff369570003bc0a47))
* **@react-md/utils:** added a low level `RadioGroup` widget for the radiogroup role ([76d6d27](https://github.com/mlaursen/react-md/commit/76d6d27d050b0d85a5dfa8e91fb55b0d0b7283cb))


### Documentation

* updated Used By/Requires SassDoc to be collapsible ([37a7536](https://github.com/mlaursen/react-md/commit/37a7536f7984ceea0d27244981d7caf01a265707))
* **@react-md/theme:** added additional dark-theme-elevation SassDoc examples ([172ee40](https://github.com/mlaursen/react-md/commit/172ee40e60ca687a6a35413afacab64654823ca0))
* **react-md.dev:** added information about Noninteractable Chips demo ([42e929b](https://github.com/mlaursen/react-md/commit/42e929b27f58432d498cb22d094d4e43433761bc))
* **react-md.dev:** updated layout demos for mini layout support ([1065688](https://github.com/mlaursen/react-md/commit/1065688482a627a7dc0557a8c9bf7b1b69586f82))
* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))
* **tsdoc:** updated \@since annotations ([c62027e](https://github.com/mlaursen/react-md/commit/c62027ebf2223167a2fde0378882e4b934d61971))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))
* **@react-md/dev-utils:** release script will now automatically create github release ([83c2b65](https://github.com/mlaursen/react-md/commit/83c2b653ebbbf6fd164562c5518d26d2e4abfe12))
* **@react-md/utils:** added `tryToSubmitRelatedForm` util to help with additional a11y ([0566e14](https://github.com/mlaursen/react-md/commit/0566e1497f2ab6f23f7e5acb86464c37d3ee0d44))
* **@react-md/utils:** updated `loop` util to allow for a specific min value ([51bcf92](https://github.com/mlaursen/react-md/commit/51bcf92ebf0708531ecc4ae2abe42b957f299598))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)


### Bug Fixes

* **@react-md/layout:** floating layout has correct color in dark theme ([7fa6b0c](https://github.com/mlaursen/react-md/commit/7fa6b0c415b87aade6296b7c5083abe1e75abf24))
* **@react-md/layout:** toggleable layout title now aligns with persistent layouts ([8b8efb2](https://github.com/mlaursen/react-md/commit/8b8efb2ac6176975e4f3898956916350526487fa))


### Features

* **@react-md/chip:** added support for noninteractable chips ([9309985](https://github.com/mlaursen/react-md/commit/9309985a2efaafd731bbfb3e157d8b1443b297de)), closes [#1046](https://github.com/mlaursen/react-md/issues/1046)
* **@react-md/layout:** added prop to control toggleable layouts default visibility ([6e4a06d](https://github.com/mlaursen/react-md/commit/6e4a06db83d079bf67f75a1625e4375effd159b0)), closes [#1066](https://github.com/mlaursen/react-md/issues/1066)


### Documentation

* **react-md.dev:** slightly better search results ([0e3d3f7](https://github.com/mlaursen/react-md/commit/0e3d3f79bf71450f49cc67df88a56af0dde72359))


### Other Internal Changes

* **@react-md/divider:** updated test to use the correct act ([a621625](https://github.com/mlaursen/react-md/commit/a621625d7f6229fb91fea91b5c30e82e27a3f45c))
* **@react-md/link:** added new tests for `SkipToMainContent` ([3f6e866](https://github.com/mlaursen/react-md/commit/3f6e866bb0b97ec3a4be08dc9744592e9c8443cb))
* **@react-md/utils:** Added better dev display names for UserInteractionMode context parts ([01f6e3d](https://github.com/mlaursen/react-md/commit/01f6e3dbc91086b2c76099e8ba75f595480c8302))
* **@react-md/utils:** refactored UserInteractionMode hooks and components ([af72791](https://github.com/mlaursen/react-md/commit/af7279154bf8d5b4d4c8ee83e8e0815354e5eee0))
* **changelog:** fixed some more changelog/release behavior ([e11c0ea](https://github.com/mlaursen/react-md/commit/e11c0ea16e59167eb13746ad0160a8d00fb90ef1))
* **coverage:** fixed test coverage to include files without tests ([ba72630](https://github.com/mlaursen/react-md/commit/ba726304c4a9a55d5735b41faee8ad14449c07cb))






## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

### Bug Fixes

- [@react-md/utils](./packages/utils): added missing classnames dependency
  ([8c34790](https://github.com/mlaursen/react-md/commit/8c347901167cd713bce178edf9e24f3c78b72e7e))

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

### Bug Fixes

- [@react-md/card](./packages/card): fixed the bordered background color when
  the dark elevation flag is enabled
  ([a9dd552](https://github.com/mlaursen/react-md/commit/a9dd5521d7eb58442bfc6110686d8f039b525e72)),
  closes [#1053](https://github.com/mlaursen/react-md/issues/1053)

## [2.5.3](https://github.com/mlaursen/react-md/compare/v2.5.2...v2.5.3) (2021-01-12)

### Bug Fixes

- [@react-md/form](./packages/form): fixed floating label behavior for
  `TextArea`
  ([80c22ba](https://github.com/mlaursen/react-md/commit/80c22ba841fc5370165d659a4c9b0e01a0f41017)),
  closes [#1043](https://github.com/mlaursen/react-md/issues/1043)
- [@react-md/layout](./packages/layout): Fixed scrollIntoView behavior for the
  layout tree
  ([4716c76](https://github.com/mlaursen/react-md/commit/4716c76cf98807de77ae7033206ec939230bf806))

## [2.5.2](https://github.com/mlaursen/react-md/compare/v2.5.1...v2.5.2) (2021-01-12)

### Bug Fixes

- **docs:** fixed some a11y issues in documentation site
  ([6fee23c](https://github.com/mlaursen/react-md/commit/6fee23c98fc931ef1d2b913aac6276e25afb0ab3))
- [@react-md/form](./packages/form): Added missing containerProps to `TextArea`
  ([695fd2a](https://github.com/mlaursen/react-md/commit/695fd2a589c0b2c8ebc4f17aa71a20346c4591e1))
- [@react-md/form](./packages/form): Fixed floating state for controlled text
  fields
  ([338d768](https://github.com/mlaursen/react-md/commit/338d76823eea919b3cca3689119306a73002f4f2)),
  closes [#1043](https://github.com/mlaursen/react-md/issues/1043)

## [2.5.1](https://github.com/mlaursen/react-md/compare/v2.5.0...v2.5.1) (2020-12-16)

### Bug Fixes

- [@react-md/list](./packages/list): fixed list icon spacing to work with sass
  ([369c206](https://github.com/mlaursen/react-md/commit/369c2066909176b5c5c8611f211cf129b60912c9)),
  closes [#1015](https://github.com/mlaursen/react-md/issues/1015)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

### Bug Fixes

- [@react-md/form](./packages/form): better blur error cases for
  `useNumberField`
  ([8b927ab](https://github.com/mlaursen/react-md/commit/8b927ab93ddb5256d384c626c048748262a34642))
- [@react-md/form](./packages/form): fixed `FormMessage` counter prop-type
  validation
  ([9ece3e1](https://github.com/mlaursen/react-md/commit/9ece3e1199342a972d7079bd36de7f0ab849fc6c))
- [@react-md/form](./packages/form): fixed `messageProps` error from react when
  `disableMessage` is enabled
  ([e452aff](https://github.com/mlaursen/react-md/commit/e452aff2fd5bd8f8b75769a6a38bbe5378214be6))
- [@react-md/form](./packages/form): Floating Label for controlled value Invalid
  numbers
  ([ef1d764](https://github.com/mlaursen/react-md/commit/ef1d76461047b75ae771c442a3f721286a3542a2))
- [@react-md/form](./packages/form): Maintain Floating Label for Invalid Numbers
  ([2443f9a](https://github.com/mlaursen/react-md/commit/2443f9abb459f9100812c37793d3de2ddbcf36c2))
- [@react-md/form](./packages/form): More fixes for number inputs being
  considered valued
  ([1832e69](https://github.com/mlaursen/react-md/commit/1832e697b1eafddec82a9e2dcccc62acc35c6285))
- [@react-md/form](./packages/form): updated `TextField` `PropTypes` to allow
  for search input type
  ([23d92dd](https://github.com/mlaursen/react-md/commit/23d92dd8449588ba5ea1a2ee99fdbf4de0e7995e))
- [@react-md/utils](./packages/utils): `GridCell` now correctly uses
  `largeDesktop` when desktop is also provided
  ([fd26b8b](https://github.com/mlaursen/react-md/commit/fd26b8b64bc20fd78e3f366208f690b38a2dfa29))
- [@react-md/utils](./packages/utils): nearest ensures min and max range for
  value
  ([48181b3](https://github.com/mlaursen/react-md/commit/48181b3a6b8efa311b97152c1bcf989d7f0a9ba3))
- [@react-md/utils](./packages/utils): updated nearest to support a custom range
  for sliders
  ([6cfc67e](https://github.com/mlaursen/react-md/commit/6cfc67e728059cc36aa71d942f5966f4371125a3))

### Features

- [@react-md/form](./packages/form): added a new `useTextField` hook to validate
  the `TextField` and `TextArea` values
  ([578257c](https://github.com/mlaursen/react-md/commit/578257c6cf0d875a57a8d16fe8f5fcaf4a6cdc2b))
- [@react-md/form](./packages/form): added a number-recommended type for
  validation
  ([18c772e](https://github.com/mlaursen/react-md/commit/18c772e48ff8eedba3d1030a708cb3729afabac7))
- [@react-md/form](./packages/form): added a `PasswordWithMessage` component to
  be used with `useTextField` Hook
  ([f6d84f2](https://github.com/mlaursen/react-md/commit/f6d84f2bf1631b3d0ddf23bbafa6b7845bf892a1))
- [@react-md/form](./packages/form): added a `TextAreaWithMessage` component to
  be used with `useTextField` Hook
  ([e358799](https://github.com/mlaursen/react-md/commit/e358799379f1a0633b3d7643c37035cba81e4885))
- [@react-md/form](./packages/form): added a `TextFieldWithMessage` component to
  be used with `useTextField` Hook
  ([f2d7e5d](https://github.com/mlaursen/react-md/commit/f2d7e5d495fe3f117bca689b25ace095bb600ffe))
- [@react-md/form](./packages/form): added a `useNumberField` hook to control
  number field values
  ([c705f2c](https://github.com/mlaursen/react-md/commit/c705f2c41fa3a6add76a9ef6d3e93f4f9aaeac13))
- [@react-md/form](./packages/form): better defaults for validation
  ([4003a07](https://github.com/mlaursen/react-md/commit/4003a07cb3396f50268bb50ac108a11d50f41a45))
- [@react-md/icon](./packages/icon): added an error icon to the `IconProvider`
  Component and `useIcon` Hook
  ([4dfd50a](https://github.com/mlaursen/react-md/commit/4dfd50a3c41d450b88ff2f417b27113724813bb3))
- [@react-md/icon](./packages/icon): added `flexReverse` prop to
  `TextIconSpacing`
  ([c4ee05b](https://github.com/mlaursen/react-md/commit/c4ee05b1d0f8b8f6ed4de51f904dce2995787b81))
- [@react-md/utils](./packages/utils): added a `withinRange` util for number
  validation
  ([e8fb252](https://github.com/mlaursen/react-md/commit/e8fb2529a63572b1654bd5aa6a12b6fc12d20b50))
- [@react-md/utils](./packages/utils): changed the default `@include` order for
  easier overrides
  ([4705b09](https://github.com/mlaursen/react-md/commit/4705b098ada805c9fb3a48ffa1b6e93ad3bc6fd9))

## [2.4.3](https://github.com/mlaursen/react-md/compare/v2.4.2...v2.4.3) (2020-11-14)

### Bug Fixes

- [@react-md/list](./packages/list): fixed `ListItem` disabled colors to
  optionally include addons
  ([a40b6b3](https://github.com/mlaursen/react-md/commit/a40b6b3f4b25c5c8e714081ebeb147ccf019ac01)),
  closes [#997](https://github.com/mlaursen/react-md/issues/997)
- [@react-md/list](./packages/list): `ListItem` no longer focusable by default
  when disabled
  ([06e91ca](https://github.com/mlaursen/react-md/commit/06e91cafd91a2b666d728acf134c0652696715c9)),
  closes [#997](https://github.com/mlaursen/react-md/issues/997)
- **sandbox:** fixed missing versions for sandboxes
  ([09c97ee](https://github.com/mlaursen/react-md/commit/09c97ee835cea7dc4a219d29e58f62457921c9bf))
- **sandbox:** fixed sandboxes that have additional files
  ([f45aab1](https://github.com/mlaursen/react-md/commit/f45aab105eb86f4a328b0438bd26b10cb2593eff))

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

### Bug Fixes

- [@react-md/menu](./packages/menu): fixed DropdownMenu not being able to
  provide style and className to Menu
  ([7823fea](https://github.com/mlaursen/react-md/commit/7823fea2ff2979792942534b0bc6cf753bd5ac9a)),
  closes [#989](https://github.com/mlaursen/react-md/issues/989)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

- this is a re-release of v2.4.0 to ensure that all the themes are created
  correctly for CDNs

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Bug Fixes

- [@react-md/form](./packages/form): added missing scss variables
  ([ec8d675](https://github.com/mlaursen/react-md/commit/ec8d675c5436e92245ea0a8d07b35345ad30794c))
- [@react-md/states](./packages/states): fixed usedPressStates to pass onClick
  like other state hooks
  ([82cd676](https://github.com/mlaursen/react-md/commit/82cd67695c2ecd6e9a710d5fbfce97ae4dfeda80))
- [@react-md/table](./packages/table): table border color uses hex values to fix
  chrome colSpan rendering issue
  ([#982](https://github.com/mlaursen/react-md/issues/982))
  ([2138284](https://github.com/mlaursen/react-md/commit/213828454b15cee8d257ee82182e5869127f7661))

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- [@react-md/alert](./packages/alert): created and exported the default timeout
  and classnames
  ([32bacc9](https://github.com/mlaursen/react-md/commit/32bacc9000ea7c9633e437ce6eabb27606c7d7f0))
- [@react-md/button](./packages/button): added built-in support for rendering
  `CircularProgress`
  ([c6c616b](https://github.com/mlaursen/react-md/commit/c6c616b72866cc1533b7f83c4d9f031354319dfc))
- [@react-md/button](./packages/button): added support for disabled theme
  without disabling button
  ([6a647e2](https://github.com/mlaursen/react-md/commit/6a647e23831c7b3c97eb12baa47dfd5dd074271a))
- **examples:** added a simple umd example to show CDN usage
  ([ed6b62e](https://github.com/mlaursen/react-md/commit/ed6b62e169fd92ca9870be85cb6794d5e0fea2e5))
- [@react-md/form](./packages/form): updated `TextArea` to use the new
  useResizeObserver API
  ([2c2dd27](https://github.com/mlaursen/react-md/commit/2c2dd27576aeeecb2baba12ef616af45197037db))
- **grid:** added hook to access grid list size
  ([a448816](https://github.com/mlaursen/react-md/commit/a44881602de57447e9cb5ba720f5f2c031936863))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/overlay](./packages/overlay): created and exported the default
  timeout and classnames
  ([48cd9d5](https://github.com/mlaursen/react-md/commit/48cd9d584342d2050ce154755ca7927cd9f90a72))
- [@react-md/progress](./packages/progress): added a `small` state to the
  `CircularProgress`
  ([6884a3a](https://github.com/mlaursen/react-md/commit/6884a3ab762216313330dfb01f386c87a5cd5b88))
- [@react-md/tabs](./packages/tabs): updated tabs to use the new resize observer
  API
  ([052b3f2](https://github.com/mlaursen/react-md/commit/052b3f25db47077c53091bd1fb63f3e0b56a7fee))
- [@react-md/theme](./packages/theme): Better Contrast Colors by Default and
  dev-utils refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))
- [@react-md/tree](./packages/tree): updated defaultTreeItemRenderer for class
  names
  ([3c61f3c](https://github.com/mlaursen/react-md/commit/3c61f3cd77764e32de6e093bc61813a6b9e45c6f)),
  closes [#920](https://github.com/mlaursen/react-md/issues/920)
- [@react-md/utils](./packages/utils): added `Dir` component to help determine
  current writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](./packages/utils): added `useGridList` hook
  ([56ecc19](https://github.com/mlaursen/react-md/commit/56ecc19d748e3c63b6d27180ceedb385364fba43))
- [@react-md/utils](./packages/utils): added useIsomorphicLayoutEffect from
  react-redux
  ([deacf1c](https://github.com/mlaursen/react-md/commit/deacf1c01f62adebbfbfbb3f0d5709cdab0cc537))
- [@react-md/utils](./packages/utils): created a new useResizeObserver
  implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](./packages/utils): more verbose useAppSize usage error
  message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for all packages.

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Bug Fixes

- [@react-md/form](./packages/form): added missing scss variables
  ([ec8d675](https://github.com/mlaursen/react-md/commit/ec8d675c5436e92245ea0a8d07b35345ad30794c))
- [@react-md/states](./packages/states): fixed usedPressStates to pass onClick
  like other state hooks
  ([82cd676](https://github.com/mlaursen/react-md/commit/82cd67695c2ecd6e9a710d5fbfce97ae4dfeda80))

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- [@react-md/alert](./packages/alert): created and exported the default timeout
  and classnames
  ([32bacc9](https://github.com/mlaursen/react-md/commit/32bacc9000ea7c9633e437ce6eabb27606c7d7f0))
- [@react-md/button](./packages/button): added built-in support for rendering
  `CircularProgress`
  ([c6c616b](https://github.com/mlaursen/react-md/commit/c6c616b72866cc1533b7f83c4d9f031354319dfc))
- [@react-md/button](./packages/button): added support for disabled theme
  without disabling button
  ([6a647e2](https://github.com/mlaursen/react-md/commit/6a647e23831c7b3c97eb12baa47dfd5dd074271a))
- **examples:** added a simple umd example to show CDN usage
  ([ed6b62e](https://github.com/mlaursen/react-md/commit/ed6b62e169fd92ca9870be85cb6794d5e0fea2e5))
- [@react-md/form](./packages/form): updated `TextArea` to use the new
  useResizeObserver API
  ([2c2dd27](https://github.com/mlaursen/react-md/commit/2c2dd27576aeeecb2baba12ef616af45197037db))
- **grid:** added hook to access grid list size
  ([a448816](https://github.com/mlaursen/react-md/commit/a44881602de57447e9cb5ba720f5f2c031936863))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/overlay](./packages/overlay): created and exported the default
  timeout and classnames
  ([48cd9d5](https://github.com/mlaursen/react-md/commit/48cd9d584342d2050ce154755ca7927cd9f90a72))
- [@react-md/progress](./packages/progress): added a `small` state to the
  `CircularProgress`
  ([6884a3a](https://github.com/mlaursen/react-md/commit/6884a3ab762216313330dfb01f386c87a5cd5b88))
- [@react-md/tabs](./packages/tabs): updated tabs to use the new resize observer
  API
  ([052b3f2](https://github.com/mlaursen/react-md/commit/052b3f25db47077c53091bd1fb63f3e0b56a7fee))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))
- [@react-md/tree](./packages/tree): updated defaultTreeItemRenderer for class
  names
  ([3c61f3c](https://github.com/mlaursen/react-md/commit/3c61f3cd77764e32de6e093bc61813a6b9e45c6f)),
  closes [#920](https://github.com/mlaursen/react-md/issues/920)
- [@react-md/utils](./packages/utils): added `Dir` component to help determine
  current writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](./packages/utils): added `useGridList` hook
  ([56ecc19](https://github.com/mlaursen/react-md/commit/56ecc19d748e3c63b6d27180ceedb385364fba43))
- [@react-md/utils](./packages/utils): added useIsomorphicLayoutEffect from
  react-redux
  ([deacf1c](https://github.com/mlaursen/react-md/commit/deacf1c01f62adebbfbfbb3f0d5709cdab0cc537))
- [@react-md/utils](./packages/utils): created a new useResizeObserver
  implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](./packages/utils): more verbose useAppSize usage error
  message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package react-md

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package react-md

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

### Bug Fixes

- **listbox:** render `0` as a valid display value
  ([d02b7a9](https://github.com/mlaursen/react-md/commit/d02b7a9042786e4d4c4a46d286b62e6d80afc621))

### Features

- [@react-md/avatar](./packages/avatar): Added ability to pass props to `<img>`
  ([11848ee](https://github.com/mlaursen/react-md/commit/11848ee80b5aca0416ea3e0f4812746dd47d90b7)),
  closes [#908](https://github.com/mlaursen/react-md/issues/908)
- [@react-md/form](./packages/form): Added props to style `Checkbox` and `Radio`
  input element
  ([b6d2318](https://github.com/mlaursen/react-md/commit/b6d23186b7355bacc198d5187d50c10a7186f4ca))
- [@react-md/form](./packages/form): Updated toggle inactive and active colors
  to be configurable
  ([49319e6](https://github.com/mlaursen/react-md/commit/49319e65e7bf29380469b567b893a3cc775b2720))

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

### Bug Fixes

- [@react-md/transition](./packages/transition): `useCSSTransition` now
  correctly forwards refs
  ([36f832f](https://github.com/mlaursen/react-md/commit/36f832f82ada222f337d413a7044d055d5a57d58))

### Reverts

- Revert "chore(deps-dev): bump eslint-plugin-react from 7.20.3 to 7.20.4
  (#893)"
  ([4db7c31](https://github.com/mlaursen/react-md/commit/4db7c317b707e21ac5b170c1eca20c82c8e9b47f)),
  closes [#893](https://github.com/mlaursen/react-md/issues/893)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

### Bug Fixes

- [@react-md/theme](./packages/theme): Fixed `rmd-theme-get-swatch` to loop over
  all `rmd-theme-colors` instead of the primaries only
  ([353de23](https://github.com/mlaursen/react-md/commit/353de2368f9aad74add60559bb6489692b1e2c62)),
  closes [#884](https://github.com/mlaursen/react-md/issues/884)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- `AppBar` text color now defaults to
  `rmd-theme-var(text-primary-on-background)`
  ([2c3ea5e](https://github.com/mlaursen/react-md/commit/2c3ea5e984b033b05098d01499a41a24790b639c))
- Booleans in `dist/scssVariables`
  ([f6d43a3](https://github.com/mlaursen/react-md/commit/f6d43a31a13647e0b92c256975652913fb8bb34e))
- `ListItem` disabled states
  ([7b37292](https://github.com/mlaursen/react-md/commit/7b372926289d0c1cdab76dbea9cb298e7594dfa9))
- Scroll active element into view while focusing
  ([a9a0902](https://github.com/mlaursen/react-md/commit/a9a090268f8aecb8b7478dc3fb6c06eec346c62a))
- `Tree` focused index after expanding all with asterisk
  ([8547629](https://github.com/mlaursen/react-md/commit/854762991dfab43a89191ee29cd2acc7e43ec236))
- `Tree` keyboard movement for child items that are expanded
  ([fadddc7](https://github.com/mlaursen/react-md/commit/fadddc7798be9179a9db8a937455b9d989e38c79))
- `Tree` scrolling elements into view
  ([eef48dc](https://github.com/mlaursen/react-md/commit/eef48dcc547dae6146a3b2fd04c7a2ad13043036))

### Features

- Added new mixin for optional css-modules
  ([28ba828](https://github.com/mlaursen/react-md/commit/28ba8281489ddfa794a61749cb32817a9bd64311))
- Exported the `useAutoComplete` hook
  ([cac5cd1](https://github.com/mlaursen/react-md/commit/cac5cd16a1452130ba600833c8ad1180d7ec4918))
- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)
- Render non-searchable items in `AutoComplete`
  ([e7a82ac](https://github.com/mlaursen/react-md/commit/e7a82acf874f46b56e8427cdb389ff1f18f12927))

## [2.0.4](https://github.com/mlaursen/react-md/compare/v2.0.3...v2.0.4) (2020-07-10)

### Bug Fixes

- Added [@react-md/form](./packages/form) as a dependency to
  [@react-md/layout](./packages/layout)
  ([e83b296](https://github.com/mlaursen/react-md/commit/e83b2969b38e012d27eac27b69fce506497aa79b))

## [2.0.3](https://github.com/mlaursen/react-md/compare/v2.0.2...v2.0.3) (2020-07-07)

### Bug Fixes

- [@react-md/form](./packages/form): `Select` disabled styling
  ([d79d007](https://github.com/mlaursen/react-md/commit/d79d0079307ccc735ebac0730d1d45aabe1419bd))
- [@react-md/form](./packages/form): `TextArea` disabled styles
  ([ef118bf](https://github.com/mlaursen/react-md/commit/ef118bf325e68e9ae8c988f9f93a1e19e1468084))
- [@react-md/form](./packages/form): `TextField` and `Select` disabled behavior
  ([e8f2c57](https://github.com/mlaursen/react-md/commit/e8f2c579a1ee502674bfddbcc10713d4b50d7cc4))

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- Main `README` `Layout` example
  ([bcc8405](https://github.com/mlaursen/react-md/commit/bcc84056351821fb55cc21327de191f65fe7958a))
- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added `sideEffects` field to `package.json`
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- Added unpkg url for base react-md package
  ([d0efc59](https://github.com/mlaursen/react-md/commit/d0efc59aed0b0ccaa9acadb4e8cf8037bad1f3b3))
- `sideEffects` formatting
  ([78a7b6b](https://github.com/mlaursen/react-md/commit/78a7b6b0e40c7daefb749835670705f21bd21720))

The combined changelog for this project is available on the
[documentation site's blog](https://react-md.dev/blog) as well as on the
[GitHub releases page](https://github.com/mlaursen/react-md/releases). However,
since this project uses scoped packages, you can check out each individual
changelog as well which are linked below:

- [@react-md/alert](./packages/alert/CHANGELOG.md)
- [@react-md/app-bar](./packages/app-bar/CHANGELOG.md)
- [@react-md/autocomplete](./packages/autocomplete/CHANGELOG.md)
- [@react-md/avatar](./packages/avatar/CHANGELOG.md)
- [@react-md/badge](./packages/badge/CHANGELOG.md)
- [@react-md/button](./packages/button/CHANGELOG.md)
- [@react-md/card](./packages/card/CHANGELOG.md)
- [@react-md/chip](./packages/chip/CHANGELOG.md)
- [@react-md/dialog](./packages/dialog/CHANGELOG.md)
- [@react-md/divider](./packages/divider/CHANGELOG.md)
- [@react-md/elevation](./packages/elevation/CHANGELOG.md)
- [@react-md/expansion-panel](./packages/expansion-panel/CHANGELOG.md)
- [@react-md/form](./packages/form/CHANGELOG.md)
- [@react-md/icon](./packages/icon/CHANGELOG.md)
- [@react-md/layout](./packages/layout/CHANGELOG.md)
- [@react-md/link](./packages/link/CHANGELOG.md)
- [@react-md/list](./packages/list/CHANGELOG.md)
- [@react-md/material-icons](./packages/material-icons/CHANGELOG.md)
- [@react-md/media](./packages/media/CHANGELOG.md)
- [@react-md/menu](./packages/menu/CHANGELOG.md)
- [@react-md/overlay](./packages/overlay/CHANGELOG.md)
- [@react-md/portal](./packages/portal/CHANGELOG.md)
- [@react-md/progress](./packages/progress/CHANGELOG.md)
- [@react-md/sheet](./packages/sheet/CHANGELOG.md)
- [@react-md/states](./packages/states/CHANGELOG.md)
- [@react-md/table](./packages/table/CHANGELOG.md)
- [@react-md/tabs](./packages/tabs/CHANGELOG.md)
- [@react-md/theme](./packages/theme/CHANGELOG.md)
- [@react-md/tooltip](./packages/tooltip/CHANGELOG.md)
- [@react-md/transition](./packages/transition/CHANGELOG.md)
- [@react-md/tree](./packages/tree/CHANGELOG.md)
- [@react-md/typography](./packages/typography/CHANGELOG.md)
- [@react-md/utils](./packages/utils/CHANGELOG.md)
