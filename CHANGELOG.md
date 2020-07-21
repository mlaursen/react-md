# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

### Bug Fixes

- **theme:** Fixed `rmd-theme-get-swatch` to loop over all `rmd-theme-colors`
  instead of the primaries only
  ([353de23](https://github.com/mlaursen/react-md/commit/353de2368f9aad74add60559bb6489692b1e2c62)),
  closes [#884](https://github.com/mlaursen/react-md/issues/884)

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Bug Fixes

- `AppBar` text color now defaults to
  `rmd-theme-var(text-primary-on-background)`
  ([2c3ea5e](https://github.com/mlaursen/react-md/commit/2c3ea5e984b033b05098d01499a41a24790b639c))
- Booleans in dist/scssVariables
  ([f6d43a3](https://github.com/mlaursen/react-md/commit/f6d43a31a13647e0b92c256975652913fb8bb34e))
- ListItem disabled states
  ([7b37292](https://github.com/mlaursen/react-md/commit/7b372926289d0c1cdab76dbea9cb298e7594dfa9))
- Scroll active element into view while focusing
  ([a9a0902](https://github.com/mlaursen/react-md/commit/a9a090268f8aecb8b7478dc3fb6c06eec346c62a))
- Tree focused index after expanding all with asterisk
  ([8547629](https://github.com/mlaursen/react-md/commit/854762991dfab43a89191ee29cd2acc7e43ec236))
- Tree keyboard movement for child items that are expanded
  ([fadddc7](https://github.com/mlaursen/react-md/commit/fadddc7798be9179a9db8a937455b9d989e38c79))
- Tree scrolling elements into view
  ([eef48dc](https://github.com/mlaursen/react-md/commit/eef48dcc547dae6146a3b2fd04c7a2ad13043036))

### Features

- Added new mixin for optional css-modules
  ([28ba828](https://github.com/mlaursen/react-md/commit/28ba8281489ddfa794a61749cb32817a9bd64311))
- Exported the `useAutoComplete` hook
  ([cac5cd1](https://github.com/mlaursen/react-md/commit/cac5cd16a1452130ba600833c8ad1180d7ec4918))
- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)
- Render non-searchable items in AutoComplete
  ([e7a82ac](https://github.com/mlaursen/react-md/commit/e7a82acf874f46b56e8427cdb389ff1f18f12927))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/mlaursen/react-md/compare/v2.0.3...v2.0.4) (2020-07-10)

### Bug Fixes

- Added @react-md/form as a dependency to @react-md/layout
  ([e83b296](https://github.com/mlaursen/react-md/commit/e83b2969b38e012d27eac27b69fce506497aa79b))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/mlaursen/react-md/compare/v2.0.2...v2.0.3) (2020-07-07)

### Bug Fixes

- **form:** Select disabled styling
  ([d79d007](https://github.com/mlaursen/react-md/commit/d79d0079307ccc735ebac0730d1d45aabe1419bd))
- **form:** TextArea disabled styles
  ([ef118bf](https://github.com/mlaursen/react-md/commit/ef118bf325e68e9ae8c988f9f93a1e19e1468084))
- **form:** TextField and Select disabled behavior
  ([e8f2c57](https://github.com/mlaursen/react-md/commit/e8f2c579a1ee502674bfddbcc10713d4b50d7cc4))

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- Main README Layout example
  ([bcc8405](https://github.com/mlaursen/react-md/commit/bcc84056351821fb55cc21327de191f65fe7958a))
- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added sideEffects field to package.json
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- Added unpkg url for base react-md package
  ([d0efc59](https://github.com/mlaursen/react-md/commit/d0efc59aed0b0ccaa9acadb4e8cf8037bad1f3b3))
- sideEffects formatting
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
