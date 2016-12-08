## December 2016
### General Website Changes

SassDoc pages are now searchable and filterable while on that page itself. I found that using the main search
to attempt to keep finding variables on the same page was a bit annoying. The SassDoc page can now be quick navigated
by clicking the visible FAB and clicking any items in the new Drawer.

### v1.0.0-beta Released

This release fixed up a couple more bugs (listed below) and now the main focus will be figuring out if there are any
production-breaking bugs remaining.

- Fixed the Avatar colors changing [#161](https://github.com/mlaursen/react-md/issues/161)
- Updated EditDialogColumn to interact correctly with keyboard focus and touch devices
- Fixed the `Dialog` to remove the prevent scroll className when unmounting
- Updated the `Drawer.getCurrentMedia` function to use the `Drawer.defaultProps` as the default value of the `props` parameter.
- Updated the `Drawer` to allow for a _persistent_ temporary Drawer on desktop devices.
- Fixed the `AccessibleFakeButton` to no longer use the space key as an enter keypress.
- Fixed a weird warning on inks if the `waitForInkTransition` prop was enabled and the click event eventually
unmounted the inked component.
- Updated the Menu to correctly remove the window click event on unmount.
- Added correct deprecation notices to the `SelectField` and fixed the keyboard accessibility when using a `SelectField.Positions.BELOW` position.
- Fixed the duplication of the `md-background--primary-hover` and `md-background--secondary-hover`.
- Fixed the duplication of `md-background--primary-hover` and renamed the second one to `md-background--secondary-hover`.
- Minor CSS Fixes



## November 2016
### General Website Changes

With the upcoming `v1.0.0` release, the website has been remade to allow quicker navigation, searching, and finding
related documentation.
- A [Theme Builder](/customization/themes?tab=1) has also been added that allows you to pick and
choose a theme on your website.
- Examples and Prop Types have been separated into different tabs to help separate content a bit more.
- Most SassDoc can be viewed with the related component in a new SassDoc tab.
- The main search now includes sass placeholders, variables, functions, and mixins that will either redirect you to
the correct sassdoc tab, or to the [SassDoc Page](/sassdoc).

### v1.0.0.alpha.4 Released

The main focus of this release was adding a `JumpToContent` link for the `NavigationDrawer` for keyboard accessibility. When you use
the `NavigationDrawer` (or specifically use the `JumpToContentLink` component), the first `tab` press on the page will show a link that
will allow a user to focus the main content of the page instead of having to go through every navigation item.

Some bugfixes were:
- Fixed some color variables that I had mistyped/miscopied...
- Fixed the spelling of `discreet -> discrete`
- Fixed the `Sliders` when using touch devices. [#144](https://github.com/mlaursen/react-md/issues/164)
- Fixed the `YearPicker` after the name change from `initialYearsDisplayed` to `yearsDisplayed`. [#165](https://github.com/mlaursen/react-md/issues/165)
- Added `onTabFocus` and `tabbedClassName` to the `AccessibleFakeButton`. [#160](https://github.com/mlaursen/react-md/issues/160)

### v1.0.0.alpha.3 Released

This release was focused on having a more consistent naming convention. Boolean props are now `adjective` instead of
`isAdjective` and any prop that was `initiallyProp` was renamed `defaultProp` to match how React handles the base html
tag defaults. This also included some small bugfixes as well as updating the Portal component to stop using the undocumented
`CSSPropertyOperations` since it crashed in React 15.4.0.

The `SelectField` was also updated to no longer use the `TextField` component internally and behave more like [the html select](https://github.com/mlaursen/react-md/issues/144).

### v1.0.0.alpha.2 Released

Fixed the UMD build so that the `default` was not needed from the browser for `ReactMD.COMPONENT`.

### v1.0.0.alpha.1 Released

I found out I messed up the naming with a `.` instead of `-` so the future releases are messed up. Whoops. But this change basically
added the old v0.3.7 styles back into the `dist` folder for UMD.


### v1.0.0-alpha Released

Whew. This was a big change. This was a complete rewrite from nested CSS priority to using my first attempt at BEM (so it definitely
isn't perfect). The SASS also changed to an _opt-in_ `mixin` framework. Styles will no longer be included when importing the `scss` files.
The styles can be created by using `react-md-everything` or `react-md-COMPONENTs`. This allows for access to variables by one import instead
of having to specify multiple. Also, the dark theme was finally finished! Woo! Exciting! See the [upgrade guide](/discover-more/upgrade-guides/v1.0.0#now-vs-previous-versions)
for more information.

Some other under-the-hood changes are that as many components as possible use the `PureComponent` instead of the `PureRenderMixin`
with a `Component`. This release also changed my goals from this project. This project's goal is now to be a completely accessible React/Sass UI
framework for material design.

Finally, a material design [Grid System](/customization/grids) was created so positioning is even easier than before.
