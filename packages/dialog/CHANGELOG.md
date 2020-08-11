# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/mlaursen/react-md/compare/v2.1.2...v2.2.0) (2020-08-11)

**Note:** Version bump only for package @react-md/dialog

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/mlaursen/react-md/compare/v2.1.1...v2.1.2) (2020-08-01)

**Note:** Version bump only for package @react-md/dialog

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/mlaursen/react-md/compare/v2.1.0...v2.1.1) (2020-07-21)

**Note:** Version bump only for package @react-md/dialog

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

The `Dialog` component was completely re-written in this release and each part
of the dialog has been exported for additional customization. Since the goal of
`react-md@v2` is to be an extension of HTML Elements with additional styling,
all refs will be forwarded on to the component's element instead so you have
access to the DOM nodes.

### New Behavior and Features

- the dialog transition now animates downwards instead of upwards
- all dialog parts are exported as separate components and must be used to
  create a dialog: `Dialog`, `DialogHeader`, `DialogTitle`, `DialogContent`, and
  `DialogFooter`
- added a new `FixedDialog` which can be used to attach a `Dialog` to another
  element in the page
- better support for maintaining keyboard focus when dialogs are closed if they
  were triggered from temporary elements
- buttons no longer have different sizes by default within dialogs
- no longer updates list styles within dialogs by default since this caused many
  bugs
- added support for rendering `AppBar`s within a dialog instead of using the
  `DialogHeader`
- support for nested dialogs with a new `NestedDialogContextProvider`

### Breaking Changes

Basically everything. The `DialogContainer` component no longer exists and all
the old props to generate a dialog were removed. Instead, there are additional
helper components to help structure your dialog for more customization.

- `DialogContainer` component no longer exists and is _kind_ of the new `Dialog`
  component
- The old `Dialog` component no longer exists and is _kind_ of the new
  `FixedDialog` component
- The `DialogFooter` no longer has the ability to automatically check if the
  actions should be stacked
- the `modal` prop **no longer prevents closing the dialog with the escape
  key**. You must use the new `disableEscapeClose` prop instead along with the
  `modal` prop
- `fullPage`, `pageX` and `pageY` were removed in favor of the new `type` prop
- `onHide` was renamed to `onRequestClose`
- `onShow` was removed
- `actions` and `stackedActions` were removed in favor of using the
  `DialogFooter` and `Button` components
- `title` was removed in favor of using the `DialogHeader` and `DialogTitle`
  components
- `dialogStyle` and `dialogClassName` were removed and now are the `style` and
  `className` props
- `titleStyle` and `titleClassName` were removed since you'll be using the
  `DialogHeader` and `DialogTitle` components instead
- `footerStyle` and `footerClassName` were removed since you'll be using the
  `DialogFooter` component instead
- `contentStyle`, `contentClassName`, `contentComponent`, `contentProps`,
  `paddedContent`, `autopadContent`, and `autosizeContent` were removed since
  you'll be using the `DialogContent` component instead
- `component` was removed. The dialog will always be rendered as a `div`
- `additionalFocusKeys` was removed as it no longer exists on the
  `FocusContainer`
- `initialFocus` was renamed to `defaultFocus` for consistent naming conventions
- `focusOnMount` was renamed to `disableFocusOnMount`
- `transitionEnterTimeout` and `transitionLeaveTimeout` were removed and changed
  to the new `timeout` prop
- `closeOnEscape` was renamed to `disableEscapeClose`
- `renderNode` and `lastChild` were removed with the new portal API
- `defaultVisibleTransitionable` was removed
- `disableScrollLocking` was renamed to `disableScrollLock`
- `activeElementFocus` was renamed to `disableFocusOnUnmount`
- `height` and `width` props were removed since it is preferred to use styles
  instead
- `containerX`, `containerY`, `zDepth`, `onOpen`, `onLeave`, and `centered`
  props were removed
- `isOpen`, `transitionName`, `transitionEnter`, `transitionLeave`,
  `actionLeft`, `actionRight`, and `close` props were removed since they were
  deprecated to begin with
- better scroll behavior for the dialog content using new flex positioning
- the animation was changed to animate upwards instead of downwards and the full
  page dialog transition was updated to be the same as other dialog transitions

#### New SCSS Variables, Functions, and Mixins

- `$rmd-dialog-elevation: 16 !default` - the elevation (box-shadow) to use for
  dialogs
- `$rmd-dialog-min-width: 17.5rem !default` - hhe min width for a centered
  dialog
- `$rmd-dialog-header-padding: 1.5rem !default` - the padding to apply to the
  `DialogHeader` component
- `$rmd-dialog-content-padding: 1.5rem !default` - the padding to apply to the
  `DialogContent` component
- `$rmd-dialog-footer-padding: 0.5rem !default` - the padding to apply to the
  `DialogFooter` component
- `@function rmd-dialog-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-dialog-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-dialog-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-dialog-theme-update-var` - updates one of the theme values as a
  css variable

#### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-dialog-overlay-z-index` to `$rmd-dialog-z-index` for better
  clarity and changed the default value from `20` to `$rmd-overlay-z-index + 10`
- renamed `$md-dialog-transition-time` to `$rmd-dialog-enter-duration` and
  `$rmd-dalog-leave-duration` and changed the default value from `.3s` to `0.2s`
  and `0.15s` respectively
- renamed `$md-dialog-translate-distance` to `$rmd-dialog-transition-distance`
  and changed the default value from `-30px` to `1.875rem`
- renamed `$md-dialog-vertical-keyline` to `$rmd-dialog-vertical-margin` for
  clarity and changed the default value from `24px` to `1.5rem`
- renamed `$md-dialog-horizontal-keyline` to `$rmd-dialog-horizontal-margin` for
  clarity and changed the default value from `40px` to `2.5rem`
- renamed `$md-dialog-title-padding-bottom` to
  `$rmd-dialog-header-padding-bottom` and changed the default value from `20px`
  to `1.25rem`

#### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-dialog-use-flex-positioning` since this is now required
- removed `$md-dialog-full-page-z-index` since it is no longer used and caused
  z-index problems when multiple dialogs were rendered at the same time
- removed `$md-dialog-btn-height`, `$md-dialog-btn-min-width`, and
  `$md-dialog-btn-padding` since buttons no longer change size within dialogs
- removed `$md-dialog-padding` since it is now separated into three padding
  variables
- removed `@mixin react-md-dialog-width` since it was pretty worthless

#### Separate Components

After using the dialogs for awhile and needing additional customization, I
learned that following the material design guidelines strictly was a bad way to
go. Instead, all the different parts of the dialog will be exported so you can
pick and choose what's needed to be rendered. This also allows you to create
your own dialog components with common layouts and structures yourself.

The main wrapper will be the `Dialog` component which interacts _almost_ the
same as the `DialogContainer` before. This will no longer generate headers,
content, and footers for you so you can use the `DialogHeader`, `DialogContent`,
and `DialogFooter` components instead.

The `Dialog` component was updated a bit to now `display: flex;` and
`flex-direction: column` to work with the components listed above. There were
some sizing issues before with dynamic dialog content and this new structure
will make it a bit easier to have fixed headers and footers. The `DialogHeader`
and `DialogFooter` components will now have `flex-shrink: 0` while the
`DialogContent` will have `flex-grow: 1` and `flex-shrink: 1` so that it will
fill up all remaining space within the dialog and keep the header and footer
fixed to the top and bottom respectively. Since the `DialogHeader` is just a
simple flex wrapper, you'll also want to use the `DialogTitle` component if your
dialog should have a dialog styled title.

With this new layout, this also means that you can swap out the `DialogHeader`
for an `AppBar` for easy full page modals or reusing some of the existing style
of the `AppBar` and other components.

What if you don't want to have fixed headers and footers but still reuse the
styles from these components? Easy! Just use the `DialogContent` component as
the only children for the `Dialog` and use the `DialogHeader` and `DialogFooter`
within. The whole dialog will now be scrollable.

```tsx
import React from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { Text } from "@react-md/typography";

const App = () => (
  <Dialog {...props}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
      </DialogHeader>
      <Text>Here is some text that should go in the dialog.</Text>
      <DialogFooter>
        <Button id="close-dialog">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
```

#### Different Dialog Types

Dialogs now have a new prop: `type` which allows the dialog to be rendered
`full-page`, `centered`, or `custom`. Just like the previous versions, the
default dialog will be `centered` within the page and cover the reset of the
content with an overlay. Once the type is set to `"full-page"`, it'll cover the
entire screen instead without any overlay.

The new `"custom"` type allows you to position the dialog manually with styles
that couldn't be done with the `"centered"` and `"full-page"` variants. A great
example of this usage is the new `FixedDialog` component which can be read
[below](#fixed-dialogs).

You can also use the `forceContainer` prop to force wrap the dialog in the
`.rmd-dialog-container` element which is generally just used for centering
within the page.

#### Fixed Dialogs

This release also introduces a new component: `FixedDialog` which allows you to
"fix" a dialog to another element within the page (like a popover).

#### Customizing the Overlay

There are some new props to allow additional customization for the overlay
created once a dialog becomes visible. The default behavior is to show an
`Overlay` when the `type` is `centered` or `custom`, but can be fully controlled
by using the `overlay` prop.

#### Fixing Nested Dialogs

There is now a way to handle nested dialogs automatically through `react-md` so
that the overlays do not stack and the escape key will only close the top-most
dialog instead of all of them. To use this new feature, just use the
`NestedDialogContext` component near the root of your app.

### Fixed Accessibility

With the new changes behind the scenes for accessibility, the `Dialog` component
will now be a bit better at re-focusing elements once closed that were in
"temporary" elements (such as Menus). If the dialog became visible due to a menu
item, the dialog will fallback to focusing the menu's button instead.

The dialog was also updated to include the `aria-modal` flag to help screen
readers know that the dialog should be the main focus. In addition, the dialog
now supports the `alertdialog` role.
