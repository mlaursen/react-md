# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.6](https://github.com/mlaursen/react-md/compare/v5.1.5...v5.1.6) (2023-12-11)


### Bug Fixes

* **select:** port fixed positioning fixes back from v6.0.0 ([feb9ec6](https://github.com/mlaursen/react-md/commit/feb9ec6c32c22665851d6e470aa38637b0d3b32e)), closes [#1461](https://github.com/mlaursen/react-md/issues/1461)






## [5.1.4](https://github.com/mlaursen/react-md/compare/v5.1.3...v5.1.4) (2022-06-16)

**Note:** Version bump only for package @react-md/form





## [5.1.3](https://github.com/mlaursen/react-md/compare/v5.1.2...v5.1.3) (2022-05-07)


### Bug Fixes

* **@react-md/form:** fix typo for transparent in disabled toggle hover color ([7346587](https://github.com/mlaursen/react-md/commit/73465874d4223d86b3f98a928b98f45f64f7ff92))


### Documentation

* fix typos throughout codebase ([725d1a2](https://github.com/mlaursen/react-md/commit/725d1a252482dba56088dffa2f773b2ea13fb08a))


### Other Internal Changes

* **typos:** fix additional typos throughout repo ([ef20132](https://github.com/mlaursen/react-md/commit/ef2013288ce8649b9fddba9bc23c71df72ea03a1))






## [5.1.2](https://github.com/mlaursen/react-md/compare/v5.1.1...v5.1.2) (2022-04-02)

**Note:** Version bump only for package @react-md/form





## [5.1.1](https://github.com/mlaursen/react-md/compare/v5.1.0...v5.1.1) (2022-04-01)

**Note:** Version bump only for package @react-md/form





# [5.1.0](https://github.com/mlaursen/react-md/compare/v5.0.0...v5.1.0) (2022-03-18)


### Other Internal Changes

* run lint-scripts --fix for consistent-type-imports ([42d839d](https://github.com/mlaursen/react-md/commit/42d839d359922e0a8ee3775a75162b9755a2c2b6))
* **@react-md/form:** bump nanoid from 3.2.0 to 3.3.1 ([e625488](https://github.com/mlaursen/react-md/commit/e625488fb9683865ec4af8ade0a53a0101b2ee17))






# [5.0.0](https://github.com/mlaursen/react-md/compare/v4.0.3...v5.0.0) (2022-01-31)


### Bug Fixes

* **@react-md/form:** `TextArea` applies custom height style when resize="none" ([e77d939](https://github.com/mlaursen/react-md/commit/e77d939263ed34eb8fea78a1f3698788879401bc))


### Features

* **@react-md/form:** Update `TextFieldContainer` to optionally fill all space in flex containers ([2c8e68c](https://github.com/mlaursen/react-md/commit/2c8e68ccb004c9a36da773fd8cd3873df7b4184b))


### Other Internal Changes

* feat!(menu): Implemented new Menu API ([c27bf55](https://github.com/mlaursen/react-md/commit/c27bf558a950bf2938811a98b2b168efca4055cc))
* chore!(icon): Renamed the download icon to upload ([2752a98](https://github.com/mlaursen/react-md/commit/2752a981fe4021636de66f8576fdd8842a7e90af))
* **@react-md/form:** Updated `FileInput` snapshots for new icon ([f5e43fe](https://github.com/mlaursen/react-md/commit/f5e43fe4bf7ccc7f0387d66ae183a2190ad294cb))
* **@react-md/menu:** Added tests for the new menu API and fixed a few issues ([7202dd0](https://github.com/mlaursen/react-md/commit/7202dd00a2e734dd1a58d29142b551d8a9411b5a))


### Breaking Changes

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
* The `MenuItemSeparator` now renders as an `<li>`
instead of an `<hr>` or `<div>`.
* The `useContextMenu` now returns an object instead of an
ordered list.
* Using any of the `MenuItem` components requires the
`<MenuKeyboardFocusProvider>` to be mounted as a parent component which
might affect tests. This will not break anything if you are using the
`DropdownMenu` or `Menu` components.






## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* Update tests to use jest.mocked ([4bb25fb](https://github.com/mlaursen/react-md/commit/4bb25fb3f1c74a6df643aff5e6fc28fa33cff29e))
* Updated all packages' peerDependenciesMeta ([60fcd71](https://github.com/mlaursen/react-md/commit/60fcd719ac785c2f0b9d27cda82baa3c773c0e5a)), closes [#1319](https://github.com/mlaursen/react-md/issues/1319)






## [4.0.2](https://github.com/mlaursen/react-md/compare/v4.0.1...v4.0.2) (2021-11-30)


### Bug Fixes

* **@react-md/form:** Prevent scrolling while dragging `Slider` on mobile ([7eb6740](https://github.com/mlaursen/react-md/commit/7eb674060bae10950007f6666497d6c16a0f3132))






## [4.0.1](https://github.com/mlaursen/react-md/compare/v4.0.0...v4.0.1) (2021-11-27)


### Bug Fixes

* **@react-md/form:** Added fixes required for Concurrent Rendering ([b4994f4](https://github.com/mlaursen/react-md/commit/b4994f4d927d90c9a5635bdd57464c19ea935100))
* **@react-md/utils:** Update `getPercentage` to optionally not throw errors ([ff8a1d6](https://github.com/mlaursen/react-md/commit/ff8a1d6bbcf4539e5175987f1570699b06cceb09))


### Other Internal Changes

* Updated imports to use `import type` when possible ([ba96bb6](https://github.com/mlaursen/react-md/commit/ba96bb62eeddcc0879f6d584aa670850203561e6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
* **@react-md/typography:** Renamed Text to `Typography` ([30cf056](https://github.com/mlaursen/react-md/commit/30cf056fbaf0e3d28e04dd03f1fd37929967f7ab))


### Documentation

* **@react-md/form:** Updated hook overrides so documentation appears correctly ([436fbff](https://github.com/mlaursen/react-md/commit/436fbff934ee1ca20a7bc0dc6855e1ffcaad9edf))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* **react-md:** Remove prop-types package and usage ([2637a6f](https://github.com/mlaursen/react-md/commit/2637a6f43d681a06054e3a4518f692cf51baf997))
* **stylelint:** Updated to use `stylelint` ([22d1598](https://github.com/mlaursen/react-md/commit/22d15985061df76d827d4ca9319198526e320f11))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8
* **@react-md/typography:** The Text component has been renamed to Typography to
help with auto-imports conflicting with the Text element that exists in
`lib.d.ts`
* **react-md:** There will no longer be run-time prop validation with
the `prop-types` package.






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Bug Fixes

* **@react-md/form:** `TooManyFilesError` is only used if all the other validation has passed ([6ed3f54](https://github.com/mlaursen/react-md/commit/6ed3f545fd292ff9d8dfe0c8d554c1dfe3450a01))
* **@react-md/form:** ensure file names end with a period for `useFileUpload` extensions ([9238140](https://github.com/mlaursen/react-md/commit/9238140311c0f27048cd634971bc98fddd531df2))
* **@react-md/form:** prevent infinite rerenders when calling useFileUpload's reset in useEffect ([b2875b1](https://github.com/mlaursen/react-md/commit/b2875b17634651ec26365268658445260cd675ca))
* **typescript:** updated all array types to be readonly ([8f71bcb](https://github.com/mlaursen/react-md/commit/8f71bcbde12928434975c6836079c3dda7c6ab1f))


### Features

* **@react-md/form:** add `isValidFileName` option to `useFileUpload` ([dbd0375](https://github.com/mlaursen/react-md/commit/dbd03756b1b21c528fc0fdee250672e3f52a5997))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))
* **typescript:** support typescript@v4.4.2 ([5a9dd72](https://github.com/mlaursen/react-md/commit/5a9dd729e1f34df326aee20eca9a7436bb152cd4))






## [3.0.1](https://github.com/mlaursen/react-md/compare/v3.0.0...v3.0.1) (2021-08-15)


### Bug Fixes

* Updated peerDependencies to fix yarn berry peer requirements ([250efcd](https://github.com/mlaursen/react-md/commit/250efcdd81ea39c06b08eb30109589c89d9b8e0f)), closes [#1224](https://github.com/mlaursen/react-md/issues/1224)






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Bug Fixes

* **sass:** use math.div instead of division since it's deprecated ([d8c3f12](https://github.com/mlaursen/react-md/commit/d8c3f1299ea35814667c5915880744399e5b2108))


### Other Internal Changes

* **@react-md/dev-utils:** updated variables command to work with `sass` ([5376be1](https://github.com/mlaursen/react-md/commit/5376be11f3499afafd3ddde363178e1aa270cb9c))
* **@react-md/form:** removed deprecated implementation in `useIndeterminateChecked` ([6b7871f](https://github.com/mlaursen/react-md/commit/6b7871f9f0372916ac9b13cb12b49d6d2b52e564))
* **@react-md/utils:** removed InteractionModeListener alias ([216c8ef](https://github.com/mlaursen/react-md/commit/216c8efe62a12e031414d94c17f97cb4c12c4b8e))


### Breaking Changes

* **@react-md/utils:** Removed `InteractionModeListener` since it was an alias for `UserInteractionModeListener`
* **@react-md/form:** The second argument for `useIndeterminateChecked` is now an object of options






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)


### Bug Fixes

* **@react-md/form:** `FileInput` correctly center the icon when children aren't provided ([3a6ab33](https://github.com/mlaursen/react-md/commit/3a6ab3361e91879a9ecbdaaa71aa084508414b11))


### Features

* **@react-md/form:** `FileInput` automatically swaps button type to text if children exist ([e5585e1](https://github.com/mlaursen/react-md/commit/e5585e1309d4bde0dcd8ed0afc6b737a12863011))
* **@react-md/form:** `FormMessageCounter` component added to public API ([1508812](https://github.com/mlaursen/react-md/commit/15088122c3607730fdc52ff706d1d9ea56a6e32c))
* **@react-md/form:** Added a `useFileUpload` hook to upload files to the browser ([efb3f2f](https://github.com/mlaursen/react-md/commit/efb3f2f2e3f4b848097c42d58da32e42887c541b)), closes [#1159](https://github.com/mlaursen/react-md/issues/1159)


### Other Internal Changes

* **@react-md/form:** Added tests for `useFileUpload` ([49ce4d9](https://github.com/mlaursen/react-md/commit/49ce4d9812a3a854a256c36b7e7ef7fcdb696ba4))
* **react-md.dev:** Added examples for `useFileUpload` ([8f9002e](https://github.com/mlaursen/react-md/commit/8f9002ea95e2562e0d04291c2acc972953eca09e))






## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)


### Bug Fixes

* **@react-md/form:** `MenuItemCheckbox` added missing indeterminate state ([aa2c552](https://github.com/mlaursen/react-md/commit/aa2c55215812de2052b3af691ac16405806f3952)), closes [#1186](https://github.com/mlaursen/react-md/issues/1186)
* **@react-md/form:** `useIndeterminateChecked` correctly uses readonly prefix ([7f69a71](https://github.com/mlaursen/react-md/commit/7f69a719affbe6d15542225b94ba4b0dc5ea5fa4))
* **@react-md/form:** `useIndeterminateChecked` supports `MenuItemCheckbox` with new option ([9ab67bf](https://github.com/mlaursen/react-md/commit/9ab67bffe5cad01991452bd35fefd2fa0724701e))
* **@react-md/form:** MenuItemCheckbox, MenuItemRadio, and `MenuItemSwitch` styles on light themes ([fc4dcd9](https://github.com/mlaursen/react-md/commit/fc4dcd9a2b687f5cee6a62efefc6ad5d2a87b6cc))


### Documentation

* **@react-md/form:** Updated documentation for `useIndeterminateChecked` ([8646c28](https://github.com/mlaursen/react-md/commit/8646c2819e9c6d03a4635f5813f8f3c93ff6bdd3))


### Other Internal Changes

* **@react-md/form:** Added tests for `useIndeterminateChecked` ([cc2a422](https://github.com/mlaursen/react-md/commit/cc2a4220a964fe128c020bdea058316081092a87))






## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Bug Fixes

* **@react-md/form:** Pass checked prop to component ([bffae6f](https://github.com/mlaursen/react-md/commit/bffae6f6186f9bb1a9c219d8c3f728fa469b1471))
* **@react-md/form:** Fixed controlled behavior for `Switch` components ([8c65df6](https://github.com/mlaursen/react-md/commit/8c65df67d72c73df759e1a27d9472d9f708bd81f)), closes [#1175](https://github.com/mlaursen/react-md/issues/1175)


### Other Internal Changes

* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/form





## [2.8.1](https://github.com/mlaursen/react-md/compare/v2.8.0...v2.8.1) (2021-04-23)


### Bug Fixes

* **@react-md/form:** `MenuItemSwitch` spacing styles ([8ac8299](https://github.com/mlaursen/react-md/commit/8ac82999841c87aef307c56266fd29095e36c868)), closes [#1126](https://github.com/mlaursen/react-md/issues/1126)
* **@react-md/form:** Checkbox, Radio, and `Switch` color ([9315eff](https://github.com/mlaursen/react-md/commit/9315efffa1a6f9b1e4e5d4a7932995467d626bc9))






# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Features

* **@react-md/form:** Implemented `Form` `Menu` Item Components ([fed2b9f](https://github.com/mlaursen/react-md/commit/fed2b9f737810ed2d14bc48a291882653ac565c9))
* **@react-md/transition:** Updated `useFixedPositioning` to merge style objects ([1ab84d7](https://github.com/mlaursen/react-md/commit/1ab84d7e86ed911cb263bb1b25e1085fab3fc2e5))
* **typescript:** bump `typescript` version to v4.2.3 ([b094b36](https://github.com/mlaursen/react-md/commit/b094b364cb43c4db33a112db3feab6e138a3c41c))


### Documentation

* **@react-md/form:** Updated form menu components for better documentation and examples in code ([d9695b7](https://github.com/mlaursen/react-md/commit/d9695b7f548adf867ad89e069da1459361149bfc))


### Other Internal Changes

* **@react-md/form:** Added new for menu item tests ([5cf4f8a](https://github.com/mlaursen/react-md/commit/5cf4f8a0f8a2f5f097198c20a3caae8615a159bd))
* **@react-md/form:** Created `SwitchTrack` and `InputToggleIcon` components ([d9278b3](https://github.com/mlaursen/react-md/commit/d9278b3d8a92920d5bd58edff573f6d575ef3a25))
* **@react-md/form:** moved some toggle styles into separate mixins ([517f199](https://github.com/mlaursen/react-md/commit/517f199efbb08e96b5aee69526b581453874195c))
* **@react-md/form:** simplified toggle icon styles ([adb6b06](https://github.com/mlaursen/react-md/commit/adb6b0607218520ba5de362f07662b8fbe26a680))
* **@react-md/form:** Updated `MenuItemRadio` usage to be wrapped in a group for a11y ([01caa0b](https://github.com/mlaursen/react-md/commit/01caa0bc95a7e1984f141cad4d435d59dfbb4cf2))
* **@react-md/form:** Updated SliderValue to use non-portalled tooltip for existing test ([b41136f](https://github.com/mlaursen/react-md/commit/b41136f6cf6d4bfc58a2c688b28a38c911cba29d))
* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Bug Fixes

* **@react-md/form:** `Select` correctly respects the `readOnly` prop ([d9a0262](https://github.com/mlaursen/react-md/commit/d9a0262d24eaac49127092f2b6df3eb71bdf8843)), closes [#1089](https://github.com/mlaursen/react-md/issues/1089)
* **@react-md/form:** `Select` correctly updates for the `dense` spec ([2930595](https://github.com/mlaursen/react-md/commit/29305959f0a128376895b6106700226856c7b78b)), closes [#1089](https://github.com/mlaursen/react-md/issues/1089)


### Other Internal Changes

* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Bug Fixes

* **@react-md/form:** fixed listbox color when dark theme elevation is enabled ([b68ac04](https://github.com/mlaursen/react-md/commit/b68ac04e781787269293e5f63cc8032e2a4382f9)), closes [#1075](https://github.com/mlaursen/react-md/issues/1075)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))
* **tsdoc:** updated \@since annotations ([c62027e](https://github.com/mlaursen/react-md/commit/c62027ebf2223167a2fde0378882e4b934d61971))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))
* **@react-md/utils:** added `tryToSubmitRelatedForm` util to help with additional a11y ([0566e14](https://github.com/mlaursen/react-md/commit/0566e1497f2ab6f23f7e5acb86464c37d3ee0d44))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)

**Note:** Version bump only for package @react-md/form





## [2.5.5](https://github.com/mlaursen/react-md/compare/v2.5.4...v2.5.5) (2021-01-30)

**Note:** Version bump only for package [@react-md/form](../form)

## [2.5.4](https://github.com/mlaursen/react-md/compare/v2.5.3...v2.5.4) (2021-01-27)

**Note:** Version bump only for package [@react-md/form](../form)

## [2.5.3](https://github.com/mlaursen/react-md/compare/v2.5.2...v2.5.3) (2021-01-12)

### Bug Fixes

- [@react-md/form](../form): fixed floating label behavior for `TextArea`
  ([80c22ba](https://github.com/mlaursen/react-md/commit/80c22ba841fc5370165d659a4c9b0e01a0f41017)),
  closes [#1043](https://github.com/mlaursen/react-md/issues/1043)

## [2.5.2](https://github.com/mlaursen/react-md/compare/v2.5.1...v2.5.2) (2021-01-12)

### Bug Fixes

- [@react-md/form](../form): Added missing containerProps to `TextArea`
  ([695fd2a](https://github.com/mlaursen/react-md/commit/695fd2a589c0b2c8ebc4f17aa71a20346c4591e1))
- [@react-md/form](../form): Fixed floating state for controlled text fields
  ([338d768](https://github.com/mlaursen/react-md/commit/338d76823eea919b3cca3689119306a73002f4f2)),
  closes [#1043](https://github.com/mlaursen/react-md/issues/1043)

## [2.5.1](https://github.com/mlaursen/react-md/compare/v2.5.0...v2.5.1) (2020-12-16)

**Note:** Version bump only for package [@react-md/form](../form)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

### Bug Fixes

- [@react-md/form](../form): better blur error cases for useNumberField
  ([8b927ab](https://github.com/mlaursen/react-md/commit/8b927ab93ddb5256d384c626c048748262a34642))
- [@react-md/form](../form): fixed FormMessage counter prop-type validation
  ([9ece3e1](https://github.com/mlaursen/react-md/commit/9ece3e1199342a972d7079bd36de7f0ab849fc6c))
- [@react-md/form](../form): fixed messageProps error from react when
  disableMessage is enabled
  ([e452aff](https://github.com/mlaursen/react-md/commit/e452aff2fd5bd8f8b75769a6a38bbe5378214be6))
- [@react-md/form](../form): Floating Label for controlled value Invalid numbers
  ([ef1d764](https://github.com/mlaursen/react-md/commit/ef1d76461047b75ae771c442a3f721286a3542a2))
- [@react-md/form](../form): Maintain Floating Label for Invalid Numbers
  ([2443f9a](https://github.com/mlaursen/react-md/commit/2443f9abb459f9100812c37793d3de2ddbcf36c2))
- [@react-md/form](../form): More fixes for number inputs being considered
  valued
  ([1832e69](https://github.com/mlaursen/react-md/commit/1832e697b1eafddec82a9e2dcccc62acc35c6285))
- [@react-md/form](../form): updated `TextField` PropTypes to allow for search
  input type
  ([23d92dd](https://github.com/mlaursen/react-md/commit/23d92dd8449588ba5ea1a2ee99fdbf4de0e7995e))
- [@react-md/utils](../utils): updated nearest to support a custom range for
  sliders
  ([6cfc67e](https://github.com/mlaursen/react-md/commit/6cfc67e728059cc36aa71d942f5966f4371125a3))

### Features

- [@react-md/form](../form): added a new `useTextField` hook to validate the
  `TextField` and `TextArea` values
  ([578257c](https://github.com/mlaursen/react-md/commit/578257c6cf0d875a57a8d16fe8f5fcaf4a6cdc2b))
- [@react-md/form](../form): added a number-recommended type for validation
  ([18c772e](https://github.com/mlaursen/react-md/commit/18c772e48ff8eedba3d1030a708cb3729afabac7))
- [@react-md/form](../form): added a PasswordWithMessage component to be used
  with use`TextField` Hook
  ([f6d84f2](https://github.com/mlaursen/react-md/commit/f6d84f2bf1631b3d0ddf23bbafa6b7845bf892a1))
- [@react-md/form](../form): added a TextAreaWithMessage component to be used
  with use`TextField` Hook
  ([e358799](https://github.com/mlaursen/react-md/commit/e358799379f1a0633b3d7643c37035cba81e4885))
- [@react-md/form](../form): added a TextFieldWithMessage component to be used
  with use`TextField` Hook
  ([f2d7e5d](https://github.com/mlaursen/react-md/commit/f2d7e5d495fe3f117bca689b25ace095bb600ffe))
- [@react-md/form](../form): added a useNumberField hook to control number field
  values
  ([c705f2c](https://github.com/mlaursen/react-md/commit/c705f2c41fa3a6add76a9ef6d3e93f4f9aaeac13))
- [@react-md/form](../form): better defaults for validation
  ([4003a07](https://github.com/mlaursen/react-md/commit/4003a07cb3396f50268bb50ac108a11d50f41a45))

## [2.4.3](https://github.com/mlaursen/react-md/compare/v2.4.2...v2.4.3) (2020-11-14)

**Note:** Version bump only for package [@react-md/form](../form)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/form](../form)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.4.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/form](../form)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.3.1...v2.4.0) (2020-10-17)

### Bug Fixes

- [@react-md/form](../form): added missing scss variables
  ([ec8d675](https://github.com/mlaursen/react-md/commit/ec8d675c5436e92245ea0a8d07b35345ad30794c))

### Features

- [@react-md/form](../form): updated `TextArea` to use the new useResizeObserver
  API
  ([2c2dd27](https://github.com/mlaursen/react-md/commit/2c2dd27576aeeecb2baba12ef616af45197037db))
- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.3.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/form](../form)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Bug Fixes

- [@react-md/form](../form): added missing scss variables
  ([ec8d675](https://github.com/mlaursen/react-md/commit/ec8d675c5436e92245ea0a8d07b35345ad30794c))

### Features

- [@react-md/form](../form): updated `TextArea` to use the new useResizeObserver
  API
  ([2c2dd27](https://github.com/mlaursen/react-md/commit/2c2dd27576aeeecb2baba12ef616af45197037db))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/form](../form)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/form](../form)

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

### Bug Fixes

- **listbox:** render `0` as a valid display value
  ([d02b7a9](https://github.com/mlaursen/react-md/commit/d02b7a9042786e4d4c4a46d286b62e6d80afc621))

### Features

- [@react-md/form](../form): Added props to style `Checkbox` and `Radio` input
  element
  ([b6d2318](https://github.com/mlaursen/react-md/commit/b6d23186b7355bacc198d5187d50c10a7186f4ca))
- [@react-md/form](../form): Updated toggle inactive and active colors to be
  configurable
  ([49319e6](https://github.com/mlaursen/react-md/commit/49319e65e7bf29380469b567b893a3cc775b2720))

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/form](../form)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/form](../form)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Features

- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)

## [2.0.3](https://github.com/mlaursen/react-md/compare/v2.0.2...v2.0.3) (2020-07-07)

### Bug Fixes

- [@react-md/form](../form): `Select` disabled styling
  ([d79d007](https://github.com/mlaursen/react-md/commit/d79d0079307ccc735ebac0730d1d45aabe1419bd))
- [@react-md/form](../form): `TextArea` disabled styles
  ([ef118bf](https://github.com/mlaursen/react-md/commit/ef118bf325e68e9ae8c988f9f93a1e19e1468084))
- [@react-md/form](../form): `TextField` and `Select` disabled behavior
  ([e8f2c57](https://github.com/mlaursen/react-md/commit/e8f2c579a1ee502674bfddbcc10713d4b50d7cc4))

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added `sideEffects` field to `package.json`
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- `sideEffects` formatting
  ([78a7b6b](https://github.com/mlaursen/react-md/commit/78a7b6b0e40c7daefb749835670705f21bd21720))

## v2.0.1

No changes.

## v2.0.0

Starting with v2 of react-md, all checkbox and radio inputs will now correctly
work like native `<input type="checkbox" />` and `<input type="radio" />`
without any additional wrappers.

### New Behavior and Features

- all components now correctly forward the `ref` to the DOM element
- implemented the new themes for form controls so that there is now a
  `"underline"`, `"filled"`, and `"outline"` state for `TextField` and `Select`
- changed the default theme for to be `"outline"` instead of `"underline"`
- implemented a new theming API for all the form controls utilizing CSS
  variables and provided mixins.
- changed the "focus" styles for all form controls to use a blue focus
  `box-shadow` by default to match other focused elements
- implemented better native keyboard functionality for all form controls
- added a new `NativeSelect` component to render a `<select>` with text field
  styling
- added a `Form` component that renders a `<form>` element that just prevents
  default form submission for easy "enter submit" functionality
- added a `Fieldset` component to group related form elements together with an
  accessible legend that can be conditionally rendered for screen readers only
- updated the `Checkbox` to support an indeterminate state
- hopefully fixed some styling issues for the `Checkbox` and `Radio` components
  so it is easier to provide custom styles and implementations
- added a new hook for handling indeterminate states with
  `useIndeterminateChecked` (need a better name)
- added a `Label` and `FloatingLabel` component for reusable label styles
- all form controls no longer nest the `<input />` element as a child of the
  `<label>`
- the `FileInput` no longer renders the `<label>` as an `AccessibleFakeButton`
  since it never should have
- the `FileInput` no longer renders with a surrounding `<div>` element`
- added a `Listbox` component to be able to create an accessible custom
  `<select>` component
- added an `Option` component to be able to implement a custom `<option>` widget
  if desired
- fixed the keyboard functionality for the `Select` component so that every
  option can now be "keyboard searched"
- updated the `Listbox`/`Select` options to support a `readOnly` view
- fixed some of the accessibility issues with the `Select` component by adding
  the required `aria-*` attributes and rendering the options with
  `role="option"`
- removed some of the built-in functionality for error and warning states to
  simplify the messaging behavior
- added a new `FormMessage` component that should be able to alert screenreaders
  when new errors or messages are displayed in real time
- added a new `Password` component for handling password fields instead of
  having it built-in to the `TextField` component
- added new components for creating a custom `TextField` with the
  `TextFieldContainer` and `TextFieldAddon` components
- added an `AsyncSwitch` component to be able to render a `CircularProgress`
  indicator within a `Switch` while some asynchronous action is waiting
- added a few hooks that might be helpful for the form control states:
  `useChoice`, `useSelectState`, `useChecked` (might change going forward)
- updated the `Select` component to use fixed positioning instead of relative
  positioning by default so that the menu always appears within the viewport

### Breaking Changes

- there is no longer a concept of "selection control" and instead has been
  changed to a "toggle" concept
- the `SelectionControl` and `SelectionControlGroup` components no longer exists
  and is no longer required
- the `FileUpload` component was removed since it didn't seem extremely helpful

#### New SCSS Variables, Functions, and Mixins

- `$rmd-label-padding: 0.25rem !default` - the amount of horizontal padding to
  use for a floating label
- `$rmd-toggle-border-radius: 50% !default` - the border radius for the checkbox
  and radio components
- `$rmd-toggle-inset: 0.3125rem !default` - The distance the background layer
  for the checkbox and radio components should be inset relative to the
  container element
- `$rmd-toggle-dense-inset: 0.25rem !default` - The distance the background
  layer for the checkbox and radio components should be inset relative to the
  container element when the dense spec i enabled
- `$rmd-checkbox-indeterminate-height: 0.15rem !default` - the height for the
  indeterminate checkbox's state line that covers the icon
- `$rmd-checkbox-indeterminate-dense-height: 0.125rem !default` - the height for
  the indeterminate checkbox's state line that covers the icon when the dense
  spec is enabled
- `$rmd-switch-ball-border-radius: 50% !default` - the border radius for the
  switch's ball
- `$rmd-switch-container-vertical-padding: 0.5rem !default` - the vertical
  padding for the switch's container
- `$rmd-switch-container-horizontal-padding: $rmd-switch-ball-size / 2 !default`
  the horizontal padding for the switch's container
- `$rmd-switch-ball-disabled-color: rmd-theme-get-swatch($rmd-theme-secondary, 200, false, darken($rmd-theme-secondary, 5%), rmd-switch-ball-disabled-color) !default` -
  the color to use for the switch's ball when it is toggled on and disabled
- `$rmd-switch-progress-width: 12 !default` - the width for the circular
  progress bar in the `AsyncSwitch`
- `$rmd-switch-progress-background-color: $rmd-white-base !default` - the
  background color to use for the switch's ball while the `AsyncSwitch` is
  loading
- `$rmd-switch-progress-padding: 0.125rem !default` - the amount of padding to
  apply to the `AsyncSwitch`'s progress bar

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-text-field-error-color` to `$rmd-form-error-color`
- renamed `$md-switch-track-height` to `$rmd-switch-track-height` and changed
  the default value from `16px` to `1rem`
- renamed `$md-switch-track-width` to `$rmd-switch-track-width` and changed the
  default value from `40px` to `2.25rem`
- renamed `$md-switch-thumb-size` to `$rmd-switch-ball-size` and changed the
  default value from `24px` to `1.25rem`
- renamed `$md-switch-track-radius` to `$rmd-switch-track-border-radius` and
  changed the default value from `8px` to `0.5rem`
- renamed `$md-switch-thumb-offset` to `$rmd-switch-ball-offset` and changed the
  default value from `4px` to `0.25rem`

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-selection-controls-include-group` since it is no longer required
- removed `$md-selection-controls-include-switches` since they are always
  included
- removed `$md-switch-height` since it is no longer needed
- removed `$md-switch-light-theme-thumb-off`,
  `$md-switch-light-theme-track-off`, `$md-switch-light-theme-thumb-disabled`,
  `$md-switch-light-theme-track-disabled`, `$md-switch-dark-theme-thumb-off`,
  `$md-switch-dark-theme-track-off`, `$md-switch-dark-theme-thumb-disabled`,
  `$md-switch-dark-theme-track-disabled`, `$md-switch-ball-fallback-color` since
  they are no longer required
- removed `$md-text-field-autococompleted-shadow` since it is no longer required
