# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.3](https://github.com/mlaursen/react-md/compare/v4.0.2...v4.0.3) (2021-12-31)


### Other Internal Changes

* **@react-md/dev-utils:** Update watch command for new `sass` modules ([2e7a87a](https://github.com/mlaursen/react-md/commit/2e7a87ae626167f70adec7c00823b6df97824ef6))






# [4.0.0](https://github.com/mlaursen/react-md/compare/v3.1.1...v4.0.0) (2021-11-24)


### Bug Fixes

* **sass:** Do not use legacy global functions ([6159e16](https://github.com/mlaursen/react-md/commit/6159e161af72a6e2d5fe43afb02ef537c3f55c11))


### Features

* Update to use new JSX Transform and latest `eslint` ([8111cd3](https://github.com/mlaursen/react-md/commit/8111cd31e45bf60c1b92509264af1b71dfba5696))
* **@react-md/transition:** No longer use findDOMNode for transitions ([cb952da](https://github.com/mlaursen/react-md/commit/cb952da5b0cd0a67b9650e45d1e29896d66f01e1))
* **codemod:** Created a new @react-md/codemod package to help with new releases ([41c1fa6](https://github.com/mlaursen/react-md/commit/41c1fa66c2bd31b627151922ff387550a1ec66b0))


### Documentation

* **react-md.dev:** Fix alert sandboxes ([8f19297](https://github.com/mlaursen/react-md/commit/8f19297fa1e266dd1d70818babc6528a911cb0dd))
* **react-md.dev:** Try to allow custom Code/CodeBlock in sandboxes ([5d494bf](https://github.com/mlaursen/react-md/commit/5d494bf8c0e1f83c763b72cbd80f7e56cc1731b9))
* **react-md.dev:** update code components to use css modules ([9bdf6ba](https://github.com/mlaursen/react-md/commit/9bdf6ba48f66b4a94e77bbe814dde7f4fad997ff))


### Other Internal Changes

* always skip lib check ([229cef1](https://github.com/mlaursen/react-md/commit/229cef1e3d338ea362c1a2eaac06204c84ff21a6))
* Re-ran `prettier` ([9632d82](https://github.com/mlaursen/react-md/commit/9632d8203f7c6fa96718d0bcfd63ac2475a0efc2))
* Updated remaining docs and tests for `react-router-dom` v6 ([e012ef9](https://github.com/mlaursen/react-md/commit/e012ef961b21d2583fe6d34114e36ee31ac042a6))
* **@react-md/dev-utils:** Added error message for combining styles ([aa5ecfd](https://github.com/mlaursen/react-md/commit/aa5ecfd61d9a9cee759bad0fc69043d7ce651502))
* **@react-md/dev-utils:** match quotation marks for `sass` files ([98ffe40](https://github.com/mlaursen/react-md/commit/98ffe40af28ea3874a455d6c6cc96ea1fcd3832c))
* **@react-md/dev-utils:** Update `sassdoc` to not through uncaught exceptions ([8bdf532](https://github.com/mlaursen/react-md/commit/8bdf532a00044105536e0db69a9e8a372b0e36cf))
* **@react-md/dev-utils:** Update release for new major versions and legacy docs ([86c5c02](https://github.com/mlaursen/react-md/commit/86c5c02bce268dd1b93437607cfc706b99500fc9))


### Breaking Changes

* Minimum React version is now 16.14 instead of 16.8






# [3.1.0](https://github.com/mlaursen/react-md/compare/v3.0.1...v3.1.0) (2021-09-10)


### Bug Fixes

* **typescript:** updated all array types to be readonly ([8f71bcb](https://github.com/mlaursen/react-md/commit/8f71bcbde12928434975c6836079c3dda7c6ab1f))


### Documentation

* **react-md.dev:** updated `sassdoc` for new module system ([4746d26](https://github.com/mlaursen/react-md/commit/4746d265adcc2dcaffb260a565462b9d9c28805e))


### Other Internal Changes

* ran `yarn format` to include new files ([48d3d7f](https://github.com/mlaursen/react-md/commit/48d3d7fddb0435edf7dec9d0ba38cf3f0f251709))
* Simplifying format and covering json and yml files ([#1227](https://github.com/mlaursen/react-md/issues/1227)) ([045ba5e](https://github.com/mlaursen/react-md/commit/045ba5e2ade2b6926af32c5a530c1fc81d739d97))
* **@react-md/dev-utils:** fixed spelling of gzipped ([baad174](https://github.com/mlaursen/react-md/commit/baad1747480e2b11129f7992571e6b72641436e3))
* **typescript:** support typescript@v4.4.2 ([5a9dd72](https://github.com/mlaursen/react-md/commit/5a9dd729e1f34df326aee20eca9a7436bb152cd4))






# [3.0.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0) (2021-08-13)


### Bug Fixes

* **sass:** drop node-sass in favor of `sass` since it's deprecated ([126fb5a](https://github.com/mlaursen/react-md/commit/126fb5aa1ad53cd12f183d5eaa349b70af4fceb3))


### Documentation

* **react-md.dev:** Updated sandboxes for new Sass module system ([095ae97](https://github.com/mlaursen/react-md/commit/095ae97c1d75e152c6fbe1bfce9c809d15cd4985))


### Other Internal Changes

* **@react-md/dev-utils:** Added simple sass-migrator command ([a8e8df3](https://github.com/mlaursen/react-md/commit/a8e8df38a110d3c8b1d62adc4c449b8b9808ab44))
* **@react-md/dev-utils:** autoConfirm flag passed to initBlog ([dec09b8](https://github.com/mlaursen/react-md/commit/dec09b88312eccdfd824c8525afd5539d39c7f4c))
* **@react-md/dev-utils:** Combine all scss files into `react-md/dist/_everything.scss` ([c7177e6](https://github.com/mlaursen/react-md/commit/c7177e6e2f338754a28fbff7dbee13075e2da3f3))
* **@react-md/dev-utils:** Update release script to hopefully work with prereleases ([e0ef881](https://github.com/mlaursen/react-md/commit/e0ef88145765bd1414649ddb60d0662db9549fe5))
* **@react-md/dev-utils:** updated `sassdoc` and variables to use everything.scss ([a0f0699](https://github.com/mlaursen/react-md/commit/a0f06996c44ee88e1fc3ba4d24ec11c13f204d88))
* **@react-md/dev-utils:** updated variables command to work with `sass` ([5376be1](https://github.com/mlaursen/react-md/commit/5376be11f3499afafd3ddde363178e1aa270cb9c))
* **react-md.dev:** updated sandboxes to use root `react-md` ([c0f25f7](https://github.com/mlaursen/react-md/commit/c0f25f7ff314f5e9442e41c865b664e84b62f9de))


### Breaking Changes

* **sass:** `node-sass` is no longer supported and users must switch to `sass`






## [2.9.1](https://github.com/mlaursen/react-md/compare/v2.9.0...v2.9.1) (2021-07-27)


### Other Internal Changes

* **install:** slighly reduce install size by excluding tests in publish ([9d01a44](https://github.com/mlaursen/react-md/commit/9d01a44b81b619d6ac1c4d458005c99838fc6894))






# [2.9.0](https://github.com/mlaursen/react-md/compare/v2.8.5...v2.9.0) (2021-07-18)


### Other Internal Changes

* **react-md.dev:** Split form demos into separate pages ([8594930](https://github.com/mlaursen/react-md/commit/85949300c8f3c0150812885c44348d09c649e9b0))






## [2.8.5](https://github.com/mlaursen/react-md/compare/v2.8.4...v2.8.5) (2021-07-03)


### Other Internal Changes

* **@react-md/dev-utils:** Updated release script to allow custom CHANGELOG updates ([dde151b](https://github.com/mlaursen/react-md/commit/dde151bdaf3f9872bf2c4a33abc03910337da083))






## [2.8.4](https://github.com/mlaursen/react-md/compare/v2.8.3...v2.8.4) (2021-06-10)


### Bug Fixes

* **react-md.dev:** Update `next` and build deps to fix font loading issues ([e528617](https://github.com/mlaursen/react-md/commit/e52861739ca4d1ac5ec8b1c935bab2327391074d))


### Other Internal Changes

* ran `prettier` after upgrading to v2.3.0 ([3ce236a](https://github.com/mlaursen/react-md/commit/3ce236a6008ff3d57f16cf3f6ab8e85fcce1dd4d))






## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** Added simple API documentation with `typedoc` ([84739af](https://github.com/mlaursen/react-md/commit/84739afe9f727863f2131f374739f3ac94f93e9f))
* **react-md.dev:** don't include version for latest `react-md` ([a69359b](https://github.com/mlaursen/react-md/commit/a69359bf28a622571dd001628f3c81822470ba51))
* **react-md.dev:** Fix `typedoc` source links when deployed through vercel ([a4eed1b](https://github.com/mlaursen/react-md/commit/a4eed1b6688dc6a3aa6ee092dc82fcad154b4838))


### Other Internal Changes

* **@react-md/dev-utils:** Removed old `typedoc` WIP ([a7d7429](https://github.com/mlaursen/react-md/commit/a7d742980d59648aad51f28d99a8a34c9f307e9d))






## [2.8.2](https://github.com/mlaursen/react-md/compare/v2.8.1...v2.8.2) (2021-04-23)

**Note:** Version bump only for package @react-md/dev-utils





# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **react-md.dev:** Fixed sandboxes to no longer require @types/classnames ([32f6f0f](https://github.com/mlaursen/react-md/commit/32f6f0f08a6ee7b054fa4ddf767648e2921abd57))
* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






## [2.7.1](https://github.com/mlaursen/react-md/compare/v2.7.0...v2.7.1) (2021-03-23)


### Other Internal Changes

* **@react-md/dev-utils:** GitHub release surrounds libsize in code block ([d3d122a](https://github.com/mlaursen/react-md/commit/d3d122a8c2ab7d4ebb14a09118f071b07601f5c4))
* **react-md.dev:** fixed Demo name replacement ([70e60e1](https://github.com/mlaursen/react-md/commit/70e60e1b64325782abd10e8fbc044dcd2fda3a9b))
* **ts:** stopped using FC type ([c5daa47](https://github.com/mlaursen/react-md/commit/c5daa47d73516e075c036fd745e7228d7f155a62))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed remaining tsdoc syntax warnings ([946f4dd](https://github.com/mlaursen/react-md/commit/946f4dddf380b9f2313fb76d54d969aa2adbff53))
* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))


### Other Internal Changes

* **@react-md/dev-utils:** release script will now automatically create github release ([83c2b65](https://github.com/mlaursen/react-md/commit/83c2b653ebbbf6fd164562c5518d26d2e4abfe12))
* **changelog:** switched to using my custom changelog generator preset ([db1aa30](https://github.com/mlaursen/react-md/commit/db1aa30c354d771e02e5b5bc50523ad8d55ab7e5))






# [2.6.0](https://github.com/mlaursen/react-md/compare/v2.5.5...v2.6.0) (2021-02-13)


### Other Internal Changes

* **changelog:** fixed some more changelog/release behavior ([e11c0ea](https://github.com/mlaursen/react-md/commit/e11c0ea16e59167eb13746ad0160a8d00fb90ef1))






## [2.5.3](https://github.com/mlaursen/react-md/compare/v2.5.2...v2.5.3) (2021-01-12)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

## [2.5.2](https://github.com/mlaursen/react-md/compare/v2.5.1...v2.5.2) (2021-01-12)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

## [2.4.3](https://github.com/mlaursen/react-md/compare/v2.4.2...v2.4.3) (2020-11-14)

### Bug Fixes

- **sandbox:** fixed sandboxes that have additional files
  ([f45aab1](https://github.com/mlaursen/react-md/commit/f45aab105eb86f4a328b0438bd26b10cb2593eff))

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.4.1) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))
- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))

## [2.3.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.1) (2020-09-15)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

# [2.3.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.3.0) (2020-09-10)

### Features

- **themes:** updated sandboxes to use new CDN for pre-compiled themes
  ([e83f47e](https://github.com/mlaursen/react-md/commit/e83f47edb7401a81af6e3669745815cb85f565a8))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package [@react-md/dev-utils](../dev-utils)

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- Booleans in `dist/scssVariables`
  ([f6d43a3](https://github.com/mlaursen/react-md/commit/f6d43a31a13647e0b92c256975652913fb8bb34e))

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
