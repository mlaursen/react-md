# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

### Bug Fixes

- **listbox:** render `0` as a valid display value
  ([d02b7a9](https://github.com/mlaursen/react-md/commit/d02b7a9042786e4d4c4a46d286b62e6d80afc621))

### Features

- **form:** Added props to style Checkbox and Radio input element
  ([b6d2318](https://github.com/mlaursen/react-md/commit/b6d23186b7355bacc198d5187d50c10a7186f4ca))
- **form:** Updated toggle inactive and active colors to be configurable
  ([49319e6](https://github.com/mlaursen/react-md/commit/49319e65e7bf29380469b567b893a3cc775b2720))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/form

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/form

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/mlaursen/react-md/compare/v2.0.4...v2.1.0) (2020-07-12)

### Features

- Improved Dark Mode using Raising Elevation
  ([547877c](https://github.com/mlaursen/react-md/commit/547877c51217a544fdaad9c77e2469a45f30336e)),
  closes [#860](https://github.com/mlaursen/react-md/issues/860)

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

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added sideEffects field to package.json
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- sideEffects formatting
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
