# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package @react-md/alert

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/alert

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/alert

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

This package is a new implementation of the `Snackbar` component from `v1`.
There should now be some accessibility fixes and hopefully a better way to queue
messages as well as cancel them but I also feel like I might need to re-work
this again to work without the React context API.

### New Behavior and Features

- requires mounting a `MessageQueue` context provider near the root of your app
- messages are now queued by using the new `useAddMessage` hook
- multiline and stacked behavior is now configurable at a per-message basis with
  the new `useAddMessage` hook
- adding an action button is now configurable at a per-message basis with the
  `useAddDMessage` hook
- supports four message priorities:
  - `"normal"` (default) - add to the end of the queue
  - `"next"` - show immediately if there are no existing messages in the queue
    or show immediately after the current message is hidden
  - `"immediate"` - hide the current message (if exists) to show this message.
    once this message is hidden, show the message that was playing (if there was
    one) and continue the queue
  - `"replace"` - replaces the current message with whatever content is provided
    while maintaining the current timeout duration
- supports additional duplicate behavior:
  - `"allow"` (default) - add any duplicated message as normal
  - `"restart"` - if a message appears with the same `messageId`, restart the
    timer and do not add another message to the end of the queue
  - `"prevent"` - do not add the message to the queue and do not restart the
    timer if there is already a message with the same `messageId` in the queue
- changed from an `alert`/`alertdialog` role into a
  [status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_status_role)
- added better support for an action button
- added a `useQueue` hook if you need to see what messages are currently queued
  and their order

### Breaking Changes

- no longer attempts to update its position if there is a floating action button
  in the app since floating action buttons aren't implemented by default and it
  didn't really work as expected
- no longer attempts to determine if the message is multiline automatically
- the `SnackbarContainer` no longer exists and was replaced by the new
  `MessageQueue`

#### New SCSS Variables, Functions, and Mixins

- `$rmd-toast-enter-duration: $rmd-transition-standard-time !default` - the
  transition time for the toast's enter transition
- `$rmd-toast-exit-duration: $rmd-transition-standard-time !default` - the
  transition time for the toast's exit transition
- `$rmd-toast-action-margin: 0.5rem !default` - the amount of margin to apply to
  the left and right of the action button in a toast
- `$rmd-toast-stacked-action-margin-top: 0.25rem !default` - the amount of
  margin to apply to the top of the action button when the message is stacked
- `$rmd-toast-light-background-color: #323232 !default` - the background color
  for a toast when using the light theme
- `$rmd-toast-light-color: $rmd-white-base !default` - the text color for a
  toast when using the light theme
- `$rmd-toast-dark-background-color: $rmd-toast-light-background-color !default` -
  the background color for a toast when using the dark theme
- `$rmd-toast-dark-color: $rmd-toast-light-color !default` - the text color for
  a toast when using the dark theme
- `$rmd-toast-background-color: if($rmd-theme-light, $rmd-toast-light-background-color, $rmd-toast-dark-background-color) !default` -
  the default toast background color
- `$rmd-toast-color: if($rmd-theme-light, $rmd-toast-theme-color, $rmd-toast-theme-color) !default` -
  the default toast text color
- `$rmd-toast-elevation: 6 !default` - the material design elevation
  (box-shadow) to use for toasts
- `$rmd-toast-min-height: 3rem !default` - the min height for toasts when there
  should be a single line of text
- `$rmd-toast-two-line-min-height: 4.25rem !default` - the min height for toasts
  when there should be two lines of text
- `@function rmd-alert-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-alert-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-alert-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-alert-theme-update-var` - updates one of the theme values as a css
  variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-snackbar-z-index` to `$rmd-snackbar-z-index` and change the
  default value from `20` to `100`
- renamed `$md-snackbar-desktop-border-radius` to `$rmd-toast-border-radius`
  since it was applied to all screen sizes and changed the default value from
  `2px` to `0.25rem`
- renamed `$md-snackbar-desktop-min-width` to `$rmd-toast-min-width` and changed
  the default value from `288px` to `21.5rem`
- renamed `$md-snackbar-vertical-padding` to `$rmd-toast-vertical-padding` and
  changed the default value from `14px` to `0.75rem`
- renamed `$md-snackbar-horizontal-padding` to `$rmd-toast-horizontal-padding`
  and changed the default value from `24px` to `1rem`

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-snackbar-transition-time` since it was replaced by
  `$rmd-toast-enter-duration` and `$rmd-toast-exit-duration`
- removed `$md-snackbar-color` since it was replaced with
  `$rmd-toast-light-background-color`, `$rmd-toast-dark-background-color`, and
  `$rmd-toast-background-color` variables
- removed `$md-snackbar-mobile-height` and
  `$md-snackbar-mobile-multiline-height` for the new `$rmd-toast-min-height` and
  `$rmd-toast-two-line-min-height` variables
- removed `$md-snackbar-desktop-max-width` since the `$rmd-snackbar-margin`
  should be used instead or custom css
- removed `$md-snackbar-vertical-multiline-padding` since it is no longer
  required
- removed `$md-snackbar-mobile-button-left-margin` and
  `$md-snackbar-desktop-button-left-margin` since the new
  `$rmd-toast-action-margin` should be used instead
