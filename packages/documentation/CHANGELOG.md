# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)


### Other Internal Changes

* **react-md.dev:** `useIsomorphicLayoutEffect` to hide SSR warning ([aa0d3cd](https://github.com/mlaursen/react-md/commit/aa0d3cdc5cf2cd28f08d27e15c8b2496b09e7ccd))
* **react-md.dev:** Fix `BadgedButton` documentation ([b147a88](https://github.com/mlaursen/react-md/commit/b147a88118f62466836ea01a296cb5239cc9840f))
* **react-md.dev:** Update Light/Dark Theme Toggle Icons ([60a8825](https://github.com/mlaursen/react-md/commit/60a882553e245483e62e07e58bd41cd544fbafdb))
* **react-md.dev:** useLayoutEffect for page transitions ([638c8ec](https://github.com/mlaursen/react-md/commit/638c8ecd7c0d3d540f44204aa37f5914078eea7d))






## [5.1.1](https://github.com/mlaursen/react-md/compare/v5.1.0...v5.1.1) (2022-04-01)


### Other Internal Changes

* **react-md.dev:** Fix typo for RTL tooltip ([ee9f34c](https://github.com/mlaursen/react-md/commit/ee9f34c2932dd2a8a34d7cbfc04ffc48b264574c))
* **react-md.dev:** re-enable ripples to match `defaults` ([736e3b4](https://github.com/mlaursen/react-md/commit/736e3b40b2d273f99da1e2ae12897aa9fc3df589))






# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Documentation

* **@react-md/tooltip:** Remove documentation around `Tooltipped` component ([1a59190](https://github.com/mlaursen/react-md/commit/1a59190e7b76494b5375809d563f03c4ee0b8b75)), closes [#1367](https://github.com/mlaursen/react-md/issues/1367)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))
* Updated the v5.0.0 release notes ([6106751](https://github.com/mlaursen/react-md/commit/61067511d836a27671741954620087979ffe4698))
* **react-md.dev:** Add demo for rendering DropdownMenus as a `Grid` ([3ac42ef](https://github.com/mlaursen/react-md/commit/3ac42ef7387a9afb5b77a7d3ad30004301d4178e))
* **react-md.dev:** Do not lazy load icons through next/head ([47ccc1d](https://github.com/mlaursen/react-md/commit/47ccc1dc8df292e9da47a63f53918074fb701643))
* **react-md.dev:** Fix 404 page for sandboxes ([4772c88](https://github.com/mlaursen/react-md/commit/4772c8888a0516c9b4c34e618f724a83a55a0509))
* **react-md.dev:** Fix tooltip dense demo ([efc7f8c](https://github.com/mlaursen/react-md/commit/efc7f8c5e9741862c3f19b26a990c5daa1e9520e))
* **react-md.dev:** Fix usage of `useTooltip` when it is conditionally applied ([cfca184](https://github.com/mlaursen/react-md/commit/cfca18448b13e13d95c207a73f6981c2952cbad7))
* **react-md.dev:** Update examples for `useTooltip` disabled option ([f318ecf](https://github.com/mlaursen/react-md/commit/f318ecf2ef642f5d8ba87ea2319f5b65712561a6))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Features

* **@react-md/menu:** Better floating action button default behavior ([0cdeff7](https://github.com/mlaursen/react-md/commit/0cdeff72ac8c6b2f2808714299774fab0d490222))


### Documentation

* Added documentation for using a GitHub template to bootstrap a new project ([aac11ba](https://github.com/mlaursen/react-md/commit/aac11baa99640eafee1cff2b977052bfb202d95b))
* Removed Working with v1 documentation ([8aa71ac](https://github.com/mlaursen/react-md/commit/8aa71ac2bc9eccf261c70f53bbfcd02ee0e8663f))
* **react-md.dev:** Better migration guide search behavior ([9729269](https://github.com/mlaursen/react-md/commit/97292698a649eb38a624ba3e67b85dc89de2765b))
* **react-md.dev:** Disable TOCs in dev mode and use temporary layout ([3203af4](https://github.com/mlaursen/react-md/commit/3203af407452c141e3ab3765f9fdd2fd1a1dd4fc))
* **react-md.dev:** Fixed weird dev error with spreading props and key ([7cd7b8c](https://github.com/mlaursen/react-md/commit/7cd7b8cfb62147b8dc791d2566c090c45be52d19))


### Other Internal Changes

* chore!(utils): useScrollListener no longer accepts an element or options ([74a0274](https://github.com/mlaursen/react-md/commit/74a02744f3b7d5070b3f5c0d7b308842026bec72))
* feat!(menu): Implemented new Menu API ([c27bf55](https://github.com/mlaursen/react-md/commit/c27bf558a950bf2938811a98b2b168efca4055cc))
* feat!(utils): Updated the HoverMode API ([ac60bdb](https://github.com/mlaursen/react-md/commit/ac60bdb0cd8dc3ba55c8ea080f4ad3886b579033))
* chore!(icon): Renamed the download icon to upload ([2752a98](https://github.com/mlaursen/react-md/commit/2752a981fe4021636de66f8576fdd8842a7e90af))
* **@react-md/icon:** Updated docs and examples to use ConfiguredIcons type ([bbfebed](https://github.com/mlaursen/react-md/commit/bbfebedc7902b5f28fca202ba7189b3c1b540f2d))
* **react-md.dev:** Add migration guides for `react-md` major versions ([78b7396](https://github.com/mlaursen/react-md/commit/78b73969916da433f4a64290a13d1888af3b8302))
* **react-md.dev:** Add word-break to headings for markdown pages ([03b1301](https://github.com/mlaursen/react-md/commit/03b13015c5840f7d0964cfe31cb169bd6c4e2208))
* **react-md.dev:** Fixed ids for emulated phones ([10984f5](https://github.com/mlaursen/react-md/commit/10984f55f152642b97c4795e77c4171fbdb13b36))
* **react-md.dev:** Supress hydration for markdown ([8bb4d51](https://github.com/mlaursen/react-md/commit/8bb4d51b954715a600bc28ffa76a43dd8213259a))
* **react-md.dev:** Update HoverableMenus example to not use `TextArea` ([5361825](https://github.com/mlaursen/react-md/commit/536182512924b014e5459b8cb81ce7133a1ee5b5))
* **react-md.dev:** Updated a few menu demos ([c43cd31](https://github.com/mlaursen/react-md/commit/c43cd31b8599a360f9811d03ac1c79587504e54e))


### Breaking Changes

* `DEFAULT_HOVER_MODE_STICKY_EXIT_TIME` has been renamed to
`DEFAULT_HOVER_MODE_EXIT_TIME`.
* Menu buttons will no longer open by pressing the
`ArrowUp` or `ArrowDown` keys.
* The `DropdownMenu` component no longer accepts a list
of `items` and instead the `children` should be the `MenuItem`
components.
* The `DropdownMenu` component no longer supports the
`menuRenderer` and `itemRenderer` props. Instead, there is built-in
support for conditionally rendering as a `Sheet` component using the
`renderAsSheet` prop.
* The `DropdownMenu` component now requires a parent
`AppSizeListener` because of the conditional `Sheet` rendering
functionality. This might require updating your tests to either use the
`Configuration` component from `@react-md/layout` (recommended) or
adding the `AppSizeListener` to tests that include `DropdownMenu`s.
* The `DropdownMenuItem` component is no longer required
for nested dropdown menus and is an "internal" component instead that
shouldn't really be used.
* The `exitVisibilityDelay` always defaults to
`DEFAULT_HOVER_MODE_EXIT_TIME`.
* The `MenuItemSeparator` now renders as an `<li>`
instead of an `<hr>` or `<div>`.
* The `useContextMenu` now returns an object instead of an
ordered list.
* The `useHoverMode` hook no longer accepts an
`HTMLElement` generic and instead the event handlers will automatically
infer the `HTMLElement` based on usage.
* The `useHoverMode` hook no longer returns
`stickyHandlers` and instead returns `hoverHandlers` that only include
`onMouseEnter` and `onMouseLeave`. The `handlers` that are returned now
include `onClick`, `onMouseEnter`, and `onMouseLeave`. This was kind of
what the `stickyHandlers` was before. In addition, clicking an element
no longer disabled the hover mode behavior.
* The following typescript types have been removed:
`HoverModeOnlyOptions`, `HoverModeOnlyReturnValue`
* Using any of the `MenuItem` components requires the
`<MenuKeyboardFocusProvider>` to be mounted as a parent component which
might affect tests. This will not break anything if you are using the
`DropdownMenu` or `Menu` components.






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Bug Fixes

* **@react-md/icon:** `FileInput` default icon changed from `file_download` to `file_upload` ([174d1c1](https://github.com/mlaursen/react-md/commit/174d1c1511387f316b832f3d4e43ac7f53848cbe)), closes [#1325](https://github.com/mlaursen/react-md/issues/1325)


### Other Internal Changes

* Update tests to use jest.mocked ([4bb25fb](https://github.com/mlaursen/react-md/commit/4bb25fb3f1c74a6df643aff5e6fc28fa33cff29e))






## [4.0.2](https://github.com/mlaursen/react-md/compare/v4.0.1...v4.0.2) (2021-11-30)


### Documentation

* **react-md.dev:** Update images/videos for markdown pages ([5e482bb](https://github.com/mlaursen/react-md/commit/5e482bb925fd99f2bb9b9a973327296b586ac18c))






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Other Internal Changes

* **react-md.dev:** Fixed demo styles that included CodeBlock ([1f1a04e](https://github.com/mlaursen/react-md/commit/1f1a04e5c28fa1be2ab068dcdc2f7b51cb229521))
* **react-md.dev:** Fixes for Concurrent Rendering ([5946bd9](https://github.com/mlaursen/react-md/commit/5946bd911a0188348afbdc83ee5760f74d573e97))
* **react-md.dev:** Update order of previous docs links ([87998b9](https://github.com/mlaursen/react-md/commit/87998b93665e2361e6561afcc264365a19d52879))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
* **@react-md/typography:** Renamed Text to `Typography` ([30cf056](https://github.com/mlaursen/react-md/commit/30cf056fbaf0e3d28e04dd03f1fd37929967f7ab))


### Documentation

* Hackily fix codesandbox.io not using `sass` resolutions in package.json ([db22cde](https://github.com/mlaursen/react-md/commit/db22cde8006a4f8700c8b1be04dab63d9f65c591)), closes [#1261](https://github.com/mlaursen/react-md/issues/1261)
* **react-md.dev:** Enable rust compiler by removing custom babelrc ([796efd0](https://github.com/mlaursen/react-md/commit/796efd0ea284294ae9b4ca982f9cfcab9dd71009))
* **react-md.dev:** Fallback code language to markup instead of none ([0efaf9b](https://github.com/mlaursen/react-md/commit/0efaf9bf910a3fbce66da966afb059c3325c2629))
* **react-md.dev:** Removed SwipeableTabs demo since it didn't really work ([2d79f93](https://github.com/mlaursen/react-md/commit/2d79f93efd896aeb89a04a7ab6358e54637bbeec))
* **react-md.dev:** Separate Code and CodeBlock into separate folders ([4c492b3](https://github.com/mlaursen/react-md/commit/4c492b3c2d6077f007ff76aa7025c53b3c84eba8))
* **react-md.dev:** update code components to use css modules ([9bdf6ba](https://github.com/mlaursen/react-md/commit/9bdf6ba48f66b4a94e77bbe814dde7f4fad997ff))
* **react-md.dev:** Use `react-marked-renderer` for markdown stuffs ([93ebaa4](https://github.com/mlaursen/react-md/commit/93ebaa4fee604155a0e15621329470a4ec2eb87c))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* Updated remaining docs and tests for `react-router-dom` v6 ([e012ef9](https://github.com/mlaursen/react-md/commit/e012ef961b21d2583fe6d34114e36ee31ac042a6))
* **@react-md/dev-utils:** Update release for new major versions and legacy docs ([86c5c02](https://github.com/mlaursen/react-md/commit/86c5c02bce268dd1b93437607cfc706b99500fc9))
* **@react-md/format:** ran `prettier` after upgrading to v2.4.0 ([06110af](https://github.com/mlaursen/react-md/commit/06110afb20c2b83bb76a187f21e5edcd975d1147))
* **react-md.dev:** Enable React.StrictMode ([219937e](https://github.com/mlaursen/react-md/commit/219937e989082649317561197368b0852f66c19c))
* **react-md.dev:** Updated some transition documentation ([44bfa20](https://github.com/mlaursen/react-md/commit/44bfa20f54376ac800b16d4691878ed6627e345b))
* **stylelint:** Updated to use `stylelint` ([22d1598](https://github.com/mlaursen/react-md/commit/22d15985061df76d827d4ca9319198526e320f11))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **@react-md/typography:** The Text component has been renamed to Typography to
help with auto-imports conflicting with the Text element that exists in
`lib.d.ts`






## [3.1.1](https://github.com/mlaursen/react-md/compare/v3.1.0...v3.1.1) (2021-09-12)

**Note:** Version bump only for package documentation





# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Bug Fixes

* **typescript:** updated all array types to be readonly ([8f71bcb](https://github.com/mlaursen/react-md/commit/8f71bcbde12928434975c6836079c3dda7c6ab1f))


### Documentation

* **react-md.dev:** updated SortableColumns example to import SortOrder type ([b629e3e](https://github.com/mlaursen/react-md/commit/b629e3e3873ecc34ac334ff560269c4177616afa))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))
* **react-md.dev:** added `sassdoc` hot-reloading ([9d58e09](https://github.com/mlaursen/react-md/commit/9d58e09265216c76352c0d9c4d66aad494b34220))
* **react-md.dev:** updated `sassdoc` examples to be linkable ([9ed096e](https://github.com/mlaursen/react-md/commit/9ed096ed3d4912dc6075472a5bb27038d6bf16a5))
* **react-md.dev:** Updated fonts for latest nextjs build optimizations ([ca9ecbd](https://github.com/mlaursen/react-md/commit/ca9ecbdd03813722fda1fc097676d051329c8539))
* **typescript:** support typescript@v4.4.2 ([5a9dd72](https://github.com/mlaursen/react-md/commit/5a9dd729e1f34df326aee20eca9a7436bb152cd4))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Other Internal Changes

* Fixed link to v3.0.0 PR ([ff221cc](https://github.com/mlaursen/react-md/commit/ff221cc7438ff62dacc36b33356f4464497b4ae5))






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Bug Fixes

* **sass:** drop node-sass in favor of `sass` since it's deprecated ([126fb5a](https://github.com/mlaursen/react-md/commit/126fb5aa1ad53cd12f183d5eaa349b70af4fceb3))


### Documentation

* **react-md.dev:** removed documentation around pre-compiling styles ([29b5d74](https://github.com/mlaursen/react-md/commit/29b5d74aacf973a5cf9cd2197097df4461c459a0))
* **react-md.dev:** Update Sass Documentation for `@use` ([68e8c6b](https://github.com/mlaursen/react-md/commit/68e8c6bb718b3e60c23519cff0dab1c265181379))
* **react-md.dev:** Updated sandboxes for new Sass module system ([095ae97](https://github.com/mlaursen/react-md/commit/095ae97c1d75e152c6fbe1bfce9c809d15cd4985))


### Other Internal Changes

* **@react-md/form:** removed deprecated implementation in `useIndeterminateChecked` ([6b7871f](https://github.com/mlaursen/react-md/commit/6b7871f9f0372916ac9b13cb12b49d6d2b52e564))
* **react-md.dev:** Each package includes a link to `typedoc` API in navigation tree ([c388ba6](https://github.com/mlaursen/react-md/commit/c388ba6f33a7f693562e693351d242a175d5e6e8))
* **react-md.dev:** ran migrator for deprecated division ([98d2c58](https://github.com/mlaursen/react-md/commit/98d2c5878da797d32ff3a05ad4abdbb123b17579))
* **react-md.dev:** removed tilde from imports ([6081e14](https://github.com/mlaursen/react-md/commit/6081e145c13ab4f86c2f84da3dbc1988986ffdd2))
* **react-md.dev:** update all scss files for `@use` imports ([958f34f](https://github.com/mlaursen/react-md/commit/958f34f82152f55803b0693b490cd9a344eb70b3))
* **react-md.dev:** update all styles to use react-md/dist/everything ([2da5033](https://github.com/mlaursen/react-md/commit/2da5033c765286377dfbe735fcd61ba29196e735))
* **react-md.dev:** Update links for previous versions ([2d0a0e6](https://github.com/mlaursen/react-md/commit/2d0a0e62b7c3c3238809f4b76fecb6f272bf1cec))
* **react-md.dev:** updated docs for new rmd-theme-dark-elevation `defaults` ([b2269ff](https://github.com/mlaursen/react-md/commit/b2269ffe2699a9eaf375dc9dd3957796dd313c8e))


### Breaking Changes

* **sass:** `node-sass` is no longer supported and users must switch to `sass`
* **@react-md/form:** The second argument for `useIndeterminateChecked` is now an object of options






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* fixed sass-lint error ([58f614b](https://github.com/mlaursen/react-md/commit/58f614b38b5a7dcca6a84319275320b9863cba87))
* **react-md.dev:** fix links to form demos in blog ([b1626b5](https://github.com/mlaursen/react-md/commit/b1626b5a4ef77a1dda2863bbed9fe1379a0e9513))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)


### Other Internal Changes

* **react-md.dev:** Added an endpoint for uploading files that acts like a /dev/null ([9663ae8](https://github.com/mlaursen/react-md/commit/9663ae8f5524839a2217d4e52bf384b7304d771c))
* **react-md.dev:** Added examples for `useFileUpload` ([8f9002e](https://github.com/mlaursen/react-md/commit/8f9002ea95e2562e0d04291c2acc972953eca09e))
* **react-md.dev:** fix `eslint` error after updating `prettier` ([75a9b0f](https://github.com/mlaursen/react-md/commit/75a9b0f18b533e2037567e932d3cbf8be5f8e9aa))
* **react-md.dev:** Fixed rightAddon for Customizing `Select` Options Demo ([367cc0d](https://github.com/mlaursen/react-md/commit/367cc0d227dcd08e16b3e3893121f2bb57ed79d2))
* **react-md.dev:** Split form demos into separate pages ([8594930](https://github.com/mlaursen/react-md/commit/85949300c8f3c0150812885c44348d09c649e9b0))
* **react-md.dev:** Use temporary layout on desktop in dev mode to get more screen space ([53b20c4](https://github.com/mlaursen/react-md/commit/53b20c43ee4f6a6a11cb84cda51e806a9d333ad1))






## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)


### Bug Fixes

* **@react-md/form:** `useIndeterminateChecked` supports `MenuItemCheckbox` with new option ([9ab67bf](https://github.com/mlaursen/react-md/commit/9ab67bffe5cad01991452bd35fefd2fa0724701e))


### Other Internal Changes

* **react-md.dev:** Updated MenuWithFormControls example for indeterminate checkboxes ([2d20848](https://github.com/mlaursen/react-md/commit/2d208485c75eb9c717b10a771e291b38fd2cd11b))






## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Bug Fixes

* **react-md.dev:** Update `next` and build deps to fix font loading issues ([e528617](https://github.com/mlaursen/react-md/commit/e52861739ca4d1ac5ec8b1c935bab2327391074d))


### Documentation

* **react-md.dev:** Updated general documentation ([9bc8a0d](https://github.com/mlaursen/react-md/commit/9bc8a0dc3a513e4c1131523ee3bc6a10f61fdfed))


### Other Internal Changes

* updated doc tsconfig for better autocompletion ([7fb8b94](https://github.com/mlaursen/react-md/commit/7fb8b94aaf47dffcdd7ae1da7b55b8d98e5b21c1))
* Renamed contrast check function ([97c1ad7](https://github.com/mlaursen/react-md/commit/97c1ad71fb37290d4d5083adc2fe1f4e797cdc1e))
* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **@react-md/layout:** Added demo for non-fixed `AppBar` layouts ([d217ac1](https://github.com/mlaursen/react-md/commit/d217ac1538eb0df6d9a053a16f9e1526aba75837))
* **@react-md/typography:** Added examples for overriding typography styles ([57033bd](https://github.com/mlaursen/react-md/commit/57033bd9e9837a0985c35c66fdbb1f08d74f7c85)), closes [#1147](https://github.com/mlaursen/react-md/issues/1147)
* **react-md.dev:** Added simple API documentation with `typedoc` ([84739af](https://github.com/mlaursen/react-md/commit/84739afe9f727863f2131f374739f3ac94f93e9f))
* **react-md.dev:** Light Theme Code Preview Colors ([c9cc6a7](https://github.com/mlaursen/react-md/commit/c9cc6a722eeb019a7d483d4d2cf7f7a1dabf2757))
* **react-md.dev:** redirect to v1 website ([5d9ee71](https://github.com/mlaursen/react-md/commit/5d9ee71e18494b38e26a7478fd54bf40de49a023))
* **react-md.dev:** small updates after switching to free hosting ([96e2dcd](https://github.com/mlaursen/react-md/commit/96e2dcd9317fe96b1cfad867ac7d13d005b08809))
* **react-md.dev:** update v1 links to new repo and static hosting ([92801bb](https://github.com/mlaursen/react-md/commit/92801bb457c30540551bc3dbfcc0a7f692044d84))
* **react-md.dev:** Fix `typedoc` source links when deployed through vercel ([a4eed1b](https://github.com/mlaursen/react-md/commit/a4eed1b6688dc6a3aa6ee092dc82fcad154b4838))
* **react-md.dev:** Fixed `useLayoutNavigation` hook example in creating a new app ([1cde856](https://github.com/mlaursen/react-md/commit/1cde856d979edbde1578f7837ccc048a94f70fa0))


### Other Internal Changes

* fix anchor link to useFixedPositioning example docs ([eb5a9fc](https://github.com/mlaursen/react-md/commit/eb5a9fc15a558879bac574ebc8e4dc931d2a8427))
* **deployment:** Fixed deploy script ([4072b93](https://github.com/mlaursen/react-md/commit/4072b931d062ded1bdbeefd83a7349c68e202ae1))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package documentation





## [2.8.1](https://github.com/mlaursen/react-md/compare/v2.8.0...v2.8.1) (2021-04-23)

**Note:** Version bump only for package documentation





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Documentation

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
* **@react-md/form:** Updated `MenuItemRadio` usage to be wrapped in a group for a11y ([01caa0b](https://github.com/mlaursen/react-md/commit/01caa0bc95a7e1984f141cad4d435d59dfbb4cf2))
* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Documentation

* **react-md.dev:** fixed build error after upgrading `next` ([1861731](https://github.com/mlaursen/react-md/commit/18617317d79f400865fbd249af23d4ba17e00b49))


### Other Internal Changes

* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* updated Used By/Requires SassDoc to be collapsible ([37a7536](https://github.com/mlaursen/react-md/commit/37a7536f7984ceea0d27244981d7caf01a265707))
* **react-md.dev:** added information about Noninteractable Chips demo ([42e929b](https://github.com/mlaursen/react-md/commit/42e929b27f58432d498cb22d094d4e43433761bc))
* **react-md.dev:** updated layout demos for mini layout support ([1065688](https://github.com/mlaursen/react-md/commit/1065688482a627a7dc0557a8c9bf7b1b69586f82))
* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)


### Features

* **@react-md/chip:** added support for noninteractable chips ([9309985](https://github.com/mlaursen/react-md/commit/9309985a2efaafd731bbfb3e157d8b1443b297de)), closes [#1046](https://github.com/mlaursen/react-md/issues/1046)
* **@react-md/layout:** added prop to control toggleable layouts default visibility ([6e4a06d](https://github.com/mlaursen/react-md/commit/6e4a06db83d079bf67f75a1625e4375effd159b0)), closes [#1066](https://github.com/mlaursen/react-md/issues/1066)


### Documentation

* **react-md.dev:** slightly better search results ([0e3d3f7](https://github.com/mlaursen/react-md/commit/0e3d3f79bf71450f49cc67df88a56af0dde72359))






## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package documentation

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package documentation

## [2.5.3](https://github.com/mlaursen/react-md/compare/v2.5.2...v2.5.3) (2021-01-12)

**Note:** Version bump only for package documentation

## [2.5.2](https://github.com/mlaursen/react-md/compare/v2.5.1...v2.5.2) (2021-01-12)

### Bug Fixes

- **docs:** fixed some a11y issues in documentation site
  ([6fee23c](https://github.com/mlaursen/react-md/commit/6fee23c98fc931ef1d2b913aac6276e25afb0ab3))

## [2.5.1](https://github.com/mlaursen/react-md/compare/v2.5.0...v2.5.1) (2020-12-16)

**Note:** Version bump only for package documentation

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

### Features

- [@react-md/icon](../icon): added an error icon to the IconProvider Component
  and useIcon Hook
  ([4dfd50a](https://github.com/mlaursen/react-md/commit/4dfd50a3c41d450b88ff2f417b27113724813bb3))

## [2.4.3](https://github.com/mlaursen/react-md/compare/v2.4.2...v2.4.3) (2020-11-14)

### Bug Fixes

- **sandbox:** fixed missing versions for sandboxes
  ([09c97ee](https://github.com/mlaursen/react-md/commit/09c97ee835cea7dc4a219d29e58f62457921c9bf))
- **sandbox:** fixed sandboxes that have additional files
  ([f45aab1](https://github.com/mlaursen/react-md/commit/f45aab105eb86f4a328b0438bd26b10cb2593eff))

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package documentation

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

### Bug Fixes

- [@react-md/table](../table): table border color uses hex values to fix chrome
  colSpan rendering issue
  ([#982](https://github.com/mlaursen/react-md/issues/982))
  ([2138284](https://github.com/mlaursen/react-md/commit/213828454b15cee8d257ee82182e5869127f7661)),
  closes [#e0e0e0](https://github.com/mlaursen/react-md/issues/e0e0e0)
  [#2f2f2](https://github.com/mlaursen/react-md/issues/2f2f2)

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- [@react-md/button](../button): added built-in support for rendering
  `CircularProgress`
  ([c6c616b](https://github.com/mlaursen/react-md/commit/c6c616b72866cc1533b7f83c4d9f031354319dfc))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/progress](../progress): added a `small` state to the
  `CircularProgress`
  ([6884a3a](https://github.com/mlaursen/react-md/commit/6884a3ab762216313330dfb01f386c87a5cd5b88))
- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))
- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](../utils): created a new useResizeObserver implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](../utils): more verbose useAppSize usage error message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Bug Fixes

- [@react-md/table](../table): table border color uses hex values to fix chrome
  colSpan rendering issue
  ([#982](https://github.com/mlaursen/react-md/issues/982))
  ([2138284](https://github.com/mlaursen/react-md/commit/213828454b15cee8d257ee82182e5869127f7661))

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- [@react-md/button](../button): added built-in support for rendering
  `CircularProgress`
  ([c6c616b](https://github.com/mlaursen/react-md/commit/c6c616b72866cc1533b7f83c4d9f031354319dfc))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/progress](../progress): added a `small` state to the
  `CircularProgress`
  ([6884a3a](https://github.com/mlaursen/react-md/commit/6884a3ab762216313330dfb01f386c87a5cd5b88))
- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))
- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](../utils): created a new useResizeObserver implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](../utils): more verbose useAppSize usage error message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package documentation

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Features

- **a11y:** improved `LabelRequiredForA11y` type definition
  ([b7aa4fa](https://github.com/mlaursen/react-md/commit/b7aa4fadb7b4f1a23fba4008e42d2f4a4bd47c07))
- [@react-md/button](../button): added built-in support for rendering
  `CircularProgress`
  ([c6c616b](https://github.com/mlaursen/react-md/commit/c6c616b72866cc1533b7f83c4d9f031354319dfc))
- **grid:** added new `cloneStyles` prop so grid styles can be applied to any
  child
  ([ca913e7](https://github.com/mlaursen/react-md/commit/ca913e75926a6d665c6aeed56faa292d201a5287))
- [@react-md/progress](../progress): added a `small` state to the
  `CircularProgress`
  ([6884a3a](https://github.com/mlaursen/react-md/commit/6884a3ab762216313330dfb01f386c87a5cd5b88))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))
- [@react-md/utils](../utils): added `Dir` component to help determine current
  writing direction
  ([a929e04](https://github.com/mlaursen/react-md/commit/a929e04b20bf41c3bff109714d9cf850bac99eb3))
- [@react-md/utils](../utils): created a new useResizeObserver implementation
  ([dc3f4df](https://github.com/mlaursen/react-md/commit/dc3f4df744e4357c21e527986f4b762351345dfe))
- [@react-md/utils](../utils): more verbose useAppSize usage error message
  ([2c81982](https://github.com/mlaursen/react-md/commit/2c81982c6aef1a28c774b5b8263b141a44ab0949))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package documentation

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package documentation

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

### Features

- [@react-md/form](../form): Updated toggle inactive and active colors to be
  configurable
  ([49319e6](https://github.com/mlaursen/react-md/commit/49319e65e7bf29380469b567b893a3cc775b2720))

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package documentation

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package documentation

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- `AppBar` text color now defaults to
  `rmd-theme-var(text-primary-on-background)`
  ([2c3ea5e](https://github.com/mlaursen/react-md/commit/2c3ea5e984b033b05098d01499a41a24790b639c))

### Features

- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)

## [2.0.4](https://github.com/mlaursen/react-md/compare/v2.0.3...v2.0.4) (2020-07-10)

**Note:** Version bump only for package documentation

## [2.0.3](https://github.com/mlaursen/react-md/compare/v2.0.2...v2.0.3) (2020-07-07)

**Note:** Version bump only for package documentation

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
