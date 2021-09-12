# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
