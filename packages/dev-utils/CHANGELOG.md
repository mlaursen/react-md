# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-alpha.0](https://github.com/mlaursen/react-md/compare/v2.9.1...v3.0.0-alpha.0) (2021-08-11)


### Bug Fixes

* **sass:** drop node-sass in favor of `sass` since it's deprecated ([1f2a1b0](https://github.com/mlaursen/react-md/commit/1f2a1b04238f1a3b5547995d0022b19c30d1cb04))


### Other Internal Changes

* **@react-md/dev-utils:** Added simple sass-migrator command ([68cd615](https://github.com/mlaursen/react-md/commit/68cd615593cbbdf9063fed98e57fd6e46b3f61b7))
* **@react-md/dev-utils:** autoConfirm flag passed to initBlog ([dec09b8](https://github.com/mlaursen/react-md/commit/dec09b88312eccdfd824c8525afd5539d39c7f4c))
* **@react-md/dev-utils:** Combine all scss files into `react-md/dist/_everything.scss` ([1ec6b3e](https://github.com/mlaursen/react-md/commit/1ec6b3ec5ab6e380c68918d97ca6e550210ff329))
* **@react-md/dev-utils:** Examples correctly override variables ([67ac5fb](https://github.com/mlaursen/react-md/commit/67ac5fb79981f62fad83b0f306e5098fe8adcf14))
* **@react-md/dev-utils:** fixed `eslint` error ([ec30900](https://github.com/mlaursen/react-md/commit/ec30900813f30b285ae0659e3655aaa1f854eead))
* **@react-md/dev-utils:** Update release script to hopefully work with prereleases ([07d837e](https://github.com/mlaursen/react-md/commit/07d837e0c612ebd874ca45d095c834efc6ce3847))
* **@react-md/dev-utils:** updated `sassdoc` and variables to use everything.scss ([4fbb9c8](https://github.com/mlaursen/react-md/commit/4fbb9c863d6765e159f6da5aa5bee179a2701066))
* **@react-md/dev-utils:** updated variables command to work with `sass` ([d95f55a](https://github.com/mlaursen/react-md/commit/d95f55a78846726debe9f4ac4daeaefd6036c8d8))
* **@react-md/typography:** fixed invalid font-family at compile time ([3ef77a1](https://github.com/mlaursen/react-md/commit/3ef77a1c3ef4bf6549e7628622a30a09c004157a))
* **react-md.dev:** updated sandboxes to use root `react-md` ([78a81a5](https://github.com/mlaursen/react-md/commit/78a81a53543858eae06f85a834a6f0f35df97d94))


### BREAKING CHANGES

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
