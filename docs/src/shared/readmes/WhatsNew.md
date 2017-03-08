### General Website Updates
There were some minor improvements done to the documentation website to hopefully make
finding component documentation or SassDoc easier.

- It is now possible to be redirect to a specific prop type for a component. Ex:
[/components/cards?tab=1#card-proptypes-animate](http://localhost:8080/components/cards?tab=1#card-proptypes-animate)
- SassDoc will now redirect correctly when clicking on any Sass variable/mixin/function/placeholder in the "Requires",
"Used By", and "See" sections.
- When using the search functionality on the website, Sass variables will now have their values displayed in the autocomplete
list.


### react-md@1.1.0 Released
Please see the [upgrade guide](/discover-more/upgrade-guides/v1.1.0) for upgrade help.

#### App Breaking Changes

##### Dialogs
If you were using the UMD build or specifying `import { Dialog } from 'react-md'`, your app will probably now
be broken. One of the changes that was made in this release was to expose the `Dialog` itself instead of just
the container that displays it. The switch will be do specify `import { DialogContainer } from 'react-md'` instead.

##### Tables
If you were using the callbacks for when a row or checkbox was clicked, the number will probably be off now. Please see
the [issue for more details](#issues-243).

##### Changelog
- Deprecated the `closeOnNavItemClick` for drawers - [#207](#issues-207)
- Updated `ListItem` to allow a custom [li wrapper](#commit-13d1235f4ba95039c0ddc2add8252907df45946d).
- Stopped the `waitForInkTransition` on most components by default - [#210](#issues-210)
- Updated the `TabsContainer` component to provide access to the SwipeableViews API - [#203](#issues-203).
- Updated the `CardTitle` for better line-wrapping. - [#199](#issues-199)
- Updated the `DataTable` to optionally hide the checkboxes without needing to use the `plain` prop and keeping the default styles. - [#195](#issues-195)
- Added a hover mode for the `TimePicker` - [#231](#pull-231)
- Updated all Sass variables to now be `!default` - [#226](#issues-226)
- Added `md-toolbar-relative` configuration/alternative to use `padding` instead of `margin` - [#225](#issues-225)
- Updated components that use the `TextField` to have access to the current value in a [ref callback](#commit-7e6585727e47b334ebab9220ee5ebef190bef56b).
- Added the ability to disable the collapse animation - [#219](#issues-219)
- Updated the display name of components that use ink or tooltips to be [withInk(Component) or withTooltip(Component)](#commit-7107ef05ef90ccfd139d3d78357af3cc7ff6005e).
- Added the `aria-autocomplete` to the [Autocomplete](#commit-75f1cf663d5e428a666d294bfda03f4c7cdc1140).
- Added the `aria-sort` to `TableColumn` when they are [sortable](#commit-5368c96bff79dfa43cb3d6256a3eaea779f7c196).
- Updated the `ListItem` to set the correct aria props on the `li` tag instead of the [nested component](#commit-4907f3b62afc1d3578e6398cdeb6eca267466879).
- Updated the `Autocomplete` for [paginated suggestion accessibility](#commit-3e84372ffd34f0b6952efa22bf30cf241ce9b89f).
- Stopped using `delete` for unused props. [#212](#issues-212)
- Documented and Publicized the inner used [Dialog component](#commit-f7db6187741b94caf013a02219ccd1d77c64314b).
- Implemented a `Badge` component. [#220](#issues-220)
- Updated line-height to only be applied to the `body` and `p` tags. [#242](#issues-242)
- Updated the `TableRow` to use the correct `rowIndex` value. [#243](#issues-243)
- Implemented indeterminate `DataTable`s. [#256](#issues-256)
- General accessibility fixes for [selection controls and data tables](#commit-3d10540461f4c552188f22ab25ec5f665c3a00e2).
- Updated the button's label to be `node` and added a `noIcon` prop for buttons. [#261](#pull-261)
- Implemented the dense icon spec. [#217](#issues-217)
- Added initial typescript support. [#175](#issues-175)
- Ink is now disableable at an application level. [#176](#issues-176)
- Buttons, Lists, and Toolbars can now have a consistent size across all devices. [#226](#issues-226)
- Most components no longer use the Portal component since it lead to a lot of issues. [#230](#issues-230)
- TextFields can now [auto resize](#commit-10e54d3269d8941480ec2019861dcc492458fd22).

## February 2017
### v1.0.6 Released

##### Changelog
- Fixed DatePicker's [calendar Date when controlled](#issues-245)
- Added [controlled warnings](#commit-d46cf4c6e356aa69ccbcd8fa7903451c4e20e307) to pickers.
- Allowed non-material design colors to compile [without errors](#issues-244).
- FontIcon force size [fix](#issues-221).
- Allowed a TableRow to only have a single column.

### v1.0.5 Released

##### Changelog
- Fixed the DatePicker's [min/max date validator](#commit-53130fadde13253b403d9ed3fe662ed65f6c70d6).
- Fixed the FocusContainer's [window focus bug](#commit-1fe1b9b763734809a565a7fa5c0f5d52bdf80906).
  - > Basically using `element.contains(window)` is invalid and throws a 'Node' does not have contains error.
- Automated the nested dialog [display error](#issues-229) until Portals are updated.
- Fixed the TextField blocked [icon positioning](#commit-9115e235946942095392306564d37fa439511976).
- Passed text-field related props from [pickers](#commit-5daabbb973330d770cbacae99fc418245807afbc).
- Fixed the [TablePagination](#commit-93d932f91e0e2dcfd664331e3dbd2fd48a6c02df)'s onPagination callback
to be more accurate.
- Fixed the TableRows's [onCheckboxClick callback](#commit-69fbdd8fa8519f652fe0d6c8cce4ce0905a5c4a8) to
match documentation.

> I had a moment and accidentally published 1.0.4 with the same code as 1.0.3

## January 2017
### v1.0.3 Released
Minor bugfixes.

##### Changelog
- Patched the line-height for DataTables so that the columns will be centered.
- Correctly updated the peer-dependencies of `react(-\w+)*` to be 15.3.0.
- Fixed the full-page dialog positioning.

### v1.0.2 Released
Minor bugfixes.

##### Changelog
- Fixed active label for [SelectField](#pull-235).
- Components that use the `Portal` component pass the `lastChild` and `renderNode` [props correctly](#pull-234).

### v1.0.1 Released
Minor bugfixes.

##### Changelog
- Fixed proptypes of avatar to allow [PropTypes.node](#issues-198) instead of `string` only.
- Fixed the [accidental form submission](#commit-cf5761026cb0c793a1848ca19c5fdd8eafe1d792) if
selecting an item from an `autocomplete` by using the enter key press in a form.
- Fixed [Slider number alidation](#issues-184) for floats.
- Fixed the issue where the [Switch's onChange prop](#issues-182) fires twice when clicking/touching
the thumb.
- Fixed the styling issue for [password text fields](#issues-192) that have a message with the field.
- Fixed the SelectField to allow a [0 based option value](#issues-214).


## December 2016
### v1.0.0 Released!

This is the first prod-ready release of react-md. The library still isn't completely perfect, but I think it is close enough.

#### TL;DR
- Opt-in mixin component styles (or `@include react-md-everything;`)
- BEM Styles
- Grid System!
- Not fully backwards compatible.
- Accessibility focused.


##### Changelog
- Fixed the [background color bug](#commit-49ce0717af9a63530c1239b0b18c9bd1941a0914).
- Fixed the precompiled bundles to actually reflect what my documentation said. The precompiled bundles
are now formatted as `PRIMARY-COLOR_SECONDARY_COLOR.min.css` instead of `PRIMARY-COLOR-SECONDARY-COLOR.MIN.CSS`.
- Created a [mixin to create color class names](#commit-14e19f3c767ed9901f94a36ee89da238b36e2a09).
- Fixed the injectINK HOC for [keyboard _clicks_](#commit-59dff18cfd8b5b3923b1fb346ef699d8bad3b302).
- FileInput/FileUpload [bugfixes](#commit-2c4e1111fc53e25df94db67a43b892dfb94c0e50).
- Updated the password text fields' styles for [keyboard accessibility](#commit-807aa2a0540756ae88845e5291bcb47e83c6d075).
- Updated the TextFieldMessage to not shrink when in a block text field.
- Updated EditDialogColumn for [accessibility](#commit-217c42554044bdfda4652c8252c7863798c13b30).
- Updated typography to be able to opt out of [utility class names](#commit-5c5eaa2f7a23fd4a811e58bf59ac73a4dc828e66).
- Updated SelectField [keyboard accessibility](#commit-ffe270be18f2c957f2f257db800e1e602ba00e15).
- Updated tooltips to no longer rotate along with the `.md-collapser`s.
- Updated tooltips to be created through react components instead of my weird decision of creating it manually myself. [75eb2e0](#commit-75eb2e0a6616e6109141fc38cb88b35527d52eff)
- Rewrote SelectFieldColumn. [#170](#issues-170)
- Added the `getCurrentMedia` static method to the `NavigationDrawer` as well.
- Updated permanent drawers to no longer use the Portal.
- Updated the `Dialog` component to be able to be closed by pressing the escape key (only if not a `modal`). [b742ed5c](#commit-b742ed5cedaff0e79c6b812794ffe1bf4d567258)
- Updated the Date and Time pickers to have _some_ [keyboard accessibility](#issues-173). This still isn't the ideal solution
and will be changed in a future release (maybe?) to actually allow inline date and time selection that will appear in dropdowns.
- Updated `FocusContainer` to be able to enable/disable the focus containment after being fully mounted.

### General Website Changes

SassDoc pages are now searchable and filterable while on that page itself. I found that using the main search
to attempt to keep finding variables on the same page was a bit annoying. The SassDoc page can now be quick navigated
by clicking the visible FAB and clicking any items in the new Drawer.


### v1.0.0-beta Released

This release fixed up a couple more bugs (listed below) and now the main focus will be figuring out if there are any
production-breaking bugs remaining.

##### Changelog
- Fixed the Avatar colors changing [#161](#issues-161)
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

##### Changelog
- Fixed some color variables that I had mistyped/miscopied...
- Fixed the spelling of `discreet -> discrete`
- Fixed the `Sliders` when using touch devices. [#144](#issues-164)
- Fixed the `YearPicker` after the name change from `initialYearsDisplayed` to `yearsDisplayed`. [#165](#issues-165)
- Added `onTabFocus` and `tabbedClassName` to the `AccessibleFakeButton`. [#160](#issues-160)

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
isn't perfect). The Sass also changed to an _opt-in_ `mixin` framework. Styles will no longer be included when importing the `scss` files.
The styles can be created by using `react-md-everything` or `react-md-COMPONENTs`. This allows for access to variables by one import instead
of having to specify multiple. Also, the dark theme was finally finished! Woo! Exciting! See the [upgrade guide](/discover-more/upgrade-guides/v1.0.0#now-vs-previous-versions)
for more information.

Some other under-the-hood changes are that as many components as possible use the `PureComponent` instead of the `PureRenderMixin`
with a `Component`. This release also changed my goals from this project. This project's goal is now to be a completely accessible React/Sass UI
framework for material design.

Finally, a material design [Grid System](/customization/grids) was created so positioning is even easier than before.
