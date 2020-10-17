# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.4.0) (2020-10-17)

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
