## May 2018
### v1.3.2 Released
##### Changelog
- Fixed the `required` attribute not being applied to `TextField`s. [issues-741]

### v1.3.1 Released
##### Changelog
- Fixed the `ListItemControl` typescript definition. ([@ripldev] - [pull-735])

## April 2018
### v1.3.0 Released
Unfortunately I had to cut the scope of this release from what was originally targeted due to burn out and other things. I am going
to be remaking my release schedule and planning to help alleviate this going forward and hopefully make bugs and features easier for
contributors to pick up.

This release only contains 2 new features and a change for how the ES6 modules are compiled.

#### Changelog
- Updated the `TimePicker` to also toggle on selecting seconds for a time. ([@abbiecat] - [pull-722])
  - You can check out the example [here](/components/pickers/time#auto-ok-hover-modes-and-showing-seconds) for some small updates.
  - This also updated the default styles of pickers to be a [bit larger](https://github.com/mlaursen/react-md/pull/722/commits/503411fe1229ae11d8fb22a62f4e4502967f463a#diff-9d7699b2e3d791845de32c718e51fb7d).
- Updated the `SelectionControlGroup` component to allow custom control components to be rendered instead of only the `SelectionControl` component. ([@bioslife] - [pull-725])
  - You can check out the example [here](/components/selection-controls#selection-control-group-custom-selection-control-component) for some more details.
- Updated the ES6 modules export so that it correctly compiles to multiple files instead of a single UMD bundle. Unfortunately this did not seem to fix the
[code splitting bug](https://github.com/mlaursen/react-md/issues/587) as there are things I am doing incorrectly in the internal code and will have to be fixed
at another time. [commit-4015310], [commit-ac012b6] and [issues-587]

## March 2018
### v1.2.13 Released
#### Changelog
- Fixed the invalid Scss in the sliders styles. ([@icflorescu] - [pull-712])
  > Also ([@nduc] - [pull-713])

### v1.2.12 Released
This release was a extremely delayed due to the attempted fix of `DatePicker`s displaying incorrectly. This patch _should_
fix the majority of the display errors, but please look over the tickets below for more information especially if you were
using the `timeZone` prop before.

#### Changelog
- Fixed most of the `DatePicker` display errors. [pull-680] and [issues-634]
- Fixed the wrong height calculation for `Tabs`. [issues-662]
- Fixed the `TextField` having the wrong styles on initial mount if using the `resize` prop. [issues-667]
- Fixed the `Slider` crashing when using a label and enabling edit mode. [issues-675]
- Fixed the DOM Exception for `FileUpload` when attempting to use the `value` prop. [issues-676]
  > This also deprecates the `value` prop since it never actually worked or should be supported.
- Fixed the `Collapse` prop type error when changing collapsed state. [issues-672]
- Fixed the `DialogContainer`'s invalid PropType warning when setting `fullPage` to `false` and providing a `title`. [issues-700]
- Correctly exported the `TableCardHeader` Typescript definitions. ([@Laurelin67] - [pull-679])
- Correctly exported the `ResizeObserver` Typescript definitions. ([@domszyn] - [pull-703])

### Documentation Changes
- Updated the README about [styling links](https://github.com/mlaursen/react-md#styling-links).
- Fixed a small documentation typo for avatars. ([@hanayuki] - [pull-701])
- Added [Hostfully](https://hostfully.com) to the [Showcases page](/discover-more/showcases).

## January 2018
### Documentation Changes
- Added a `ColorPreviewer` to all the Sass/Scss examples so that the variables make a bit more sense.
- Publicized the `ColorPreviewer` as a better and more exciting example for `Portal` use cases.
[Check it out here](/components/helpers/portals#advanced-usage-markdown-previewer)!
- Added more documentation about [how to use colors that are not apart of react-md](/customization/themes#creating-a-theme-without-material-design-colors).

### v1.2.11 Released
#### Changelog
- Fixed the `injectInk` HOC's focus function to work when the ink has been disabled. [issues-666]
- Fixed `SelectField`s applying an `undefined` class name when active. [issues-663]
- Reverted changes for attempting to fix the IE/Edge Dialog animation since it broke other stuff. [issues-655] and [issues-664]

### v1.2.10 Released
#### Changelog
- Fixed the `SelectField` `onChange` Typescript definition. ([@matus1997] - [pull-646])
- Correctly exported the `Tooltipped` Typescript definitions. ([@noseglid] - [pull-647])
- Fixed the `ExpansionList` cloning a `0` instead of `false` into each `ExpansionPanel`. [issues-645]
- Fixed context menus for elements that are "contenteditable". ([@erkkaha] - [pull-656])
- Fixed the `DataTable` with fixed headers and footers to display the header checkbox correctly. [issues-657]
- Fixed Dialogs in IE11/Edge to no longer flash when appearing. [issues-655]
- Fixed Dialogs immediately removing the keydown listener so pressing escape multiple times now works. [issues-648]
- Added missing props to style the mini drawer and mini navigation list in the `NavigationDrawer`. [issues-636]
- Added props to help style `Tab`s when not `colored`. [issues-621]
- Fixed the `line-height` for `md-body-1` and `md-body-2`. [issues-622]

### Documentation Changes
- Fixed the `DataTable` example [with fixed headers and footers](/components/data-tables#fixed-headers-footers-and-pagination)
to recalculate on page resize. ([@lepirlouit] - [pull-651])
- Updated the Les Passions de Peronnes [showcase link](/discover-more/showcases). [commit-d5bba4b]

## December 2017
### v1.2.9 Released
#### Changelog
- Correctly added an export for the [ResizeObserver](/components/helpers/resize-observers) for non-UMD builds. [commit-99b688d]
- Added some missing Typescript definitions to the `Drawer` and `NavigationDrawer`. [commit-55c3040]
- Added another fix for the `Menu` Typescript definitions. ([@dave-hillier] - [pull-618])
- Updated the `Autocomplete` Typescript definitions. ([@arlyon] - [pull-638])
- Added some more props to customize the `ListItem`. ([@gamtiq] - [pull-620])
- Added some more props to customize the `SelectField` ([@gamtiq] - [pull-630])
- Added another fix for the `Dialog`'s `autosizeContent` infinitely toggling the `max-height`. [commit-3e45390]

#### Documentation
- Added an example for handling [nested dialogs](/components/dialogs#nested-dialogs).
- Fixed the invalid prop linking for the `SelectField`. [issues-628]
- Fixed the `onOkClick` documentation for the `EditDialogColumn`. [commit-8d50ccb]
- Updated the [examples](https://github.com/mlaursen/react-md/tree/master/examples) to correctly watch
Sass files. [pull-626]

## November 2017
### v1.2.8 Released
- Another fix for the `Dialog`'s `autosizeContent` so that it doesn't infinitely toggle the max-height. [commit-2ccce1a]

### v1.2.7 Released
#### Changelog
- Fixed the `Ink` `TransitionGroup` issues when snapshot testing. [issues-611]
- Fixed the `EditDialogColumn` `TypeError` when setting the `inlineIcon` to `null`. [issues-612]
- Updated the `Dialog`'s `autosizeContent` to work with some more use cases. [commit-9573ef3]

#### Website Changes
With the `v1.2.7` release, I also finally documented the [ResizeObserver](/components/helpers/resize-observers) component
that has been exposed in the `UMD` build for awhile now. I also disabled the service workers to see if that stops the weird
React error whenever I update the website and causes a blank page to appear. Finally, I _should_ have fixed the pages animating
in when coming from server side rendering. It should only animate when changing routes now.

### v1.2.6 Released
#### Changelog
- Removed some `Dialog` code that shouldn't have been included. [commit-fb36c0e]

### v1.2.5 Released
#### Changelog
- Fixed a problem with editable `Slider`s using the wrong ref. [commit-34d26de]
- Fixed `MenuButton`'s not opening with a space keypress. [issues-601]
- Fixed the `overlay` prop on `Drawer` and `NavigationDrawer`. [issues-602]
- Fixed the `DatePicker` for timezone problems. ([@hisapy] - [pull-605])
- Exported the component interface Typescript definitions. ([@noseglid] - [pull-606])
- Fixed the `EditDialogColumn` controlled PropTypes warning. [issues-604]
- Fixed the `MenuButton` not supplying event listeners to the surrounding `DropdownMenu`. [issues-610]
- Fixed the weird `TextField` display bug in newer versions of Chrome. [issues-565]
- Fixed the Sass variables that the icon's color is derived from. [issues-609]

## October 2017
### v1.2.4 Released
#### Changelog
- Updated `GridList` to support false-ish children. [commit-e53e080]
- Fixed `Grid` and `GridList` not applying `style`. [issues-596]
- Fixed `Layover`s that appear in centered dialogs. [issues-580]
- Fixed `TextField` resizing for when icons are added or removed. [commit-d7b5cf0]

### v1.2.3 Released
#### Changelog
- Correctly passed `disableScrollLocking` for `DatePicker` and `TimePicker`. [commit-bc0423e]
- Fixed the React 15 `Portal` support. [issues-589]
- Fixed the `Slider` step behavior where the `min` value is not zero. ([@strickc] -  [issues-585] and [pull-588])
- Updated the `Drawer` and `NavigationDrawer` to be able to apply manual `zDepth`. [issues-590]

#### Website changes
- Fixed the search functionality for: media queries, colors, themes, and typography. [commit-adb8bad]

#### Other Changes
- Updated the [with-create-react-app](https://github.com/mlaursen/react-md/tree/release/1.2.x/examples/with-create-react-app),
[with-react-router-v4](https://github.com/mlaursen/react-md/tree/release/1.2.x/examples/with-react-router-v4), and
[with-typescript](https://github.com/mlaursen/react-md/tree/release/1.2.x/examples/with-typescript) examples.

### v1.2.2 Released
#### Changelog
- Correctly published to `npm` with the Typescript definition files.

### v1.2.1 Released
#### Changelog
- Correctly exported the new `Grid`, `Cell`, and `GridList` for non-ES6 module imports. [commit-27c86e8]

### v1.2.0 Released
This release was focused on making the entire `react-md` library smaller, adding easier imports, and adding React 16
support. If your bundler supports ES6 modules (webpack 3+), you can now do:
```js
import { NavigationDrawer, ...OtherComponents } from 'react-md';
```

without importing the entire library AND reducing the bundle size compared to:

```js
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
```

The initial update changed production UMD build from 705kB to 361kB as well as changing the entire documentation
server size from 8MB to 5.7MB, so it is a pretty nice difference. Check the changelog below for all the information.

#### Changelog
- Added ES6 module support and switch build from webpack to rollup. [pull-566]
  - Related to [issues-510] and [issues-205]
- Fully implemented React 16 support with React 15 fallback. [pull-576]
- Updated components to no longer do `this.setState` in `componentWillUpdate` since React 16 no longer supports it. [commit-a82d314]
- Created three new components: `Grid`, `Cell`, and `GridList` to easily make grids. [pull-573]
  - Related to [issues-507] and [issues-472]. This implemented a "container" system for Grids.
- Update `TableColumn` so the sort icon can appear after the children. ([@cpboone] - [pull-579])
- Added a `Version` so that the current version of react-md can be determined easily. [commit-32ecbc7]

### v1.1.9 Released
#### Changelog
- Fixed the order of the `okProps` and `cancelProps` on the `EditDialogColumn`. [issues-581]

### v1.1.8 Released
#### Changelog
- Fixed the Typescript definitions for `DataTable` checkbox callbacks. ([@domszyn] - [pull-575])
- Removed the unneeded range prop type validation on sliders. [issues-570]
- Updated tooltips to work better in IE11. [issues-574]

### v1.1.7 Released
#### Changelog
- Fixed a Typescript definition for `DatePicker`. ([@noseglid] - [pull-564])

### v1.1.6 Released
This fixed some of the bad markdown linking in my documentation as well as including a few more date picker examples.

#### Changelog
- Fixed the `Slider` when its value is controlled. [issues-561]
- Fixed the `TimePicker` when its value is controlled. [issues-559]
- Added some additional styling props to the `ListItem`. ([@gamtiq] - [pull-553])
- Added ability to see additional days in the `DatePicker`. ([@gamtiq] - [pull-557]) and [commit-8504b7a]
- Exposed additional props for the `EditDialogColumn`'s ok and cancel buttons. [commit-124272b]
- Correctly exported the `Tooltipped` component. [commit-e647877]

## September 2017
### v1.1.5 Released
#### Changelog
- Updated the `SelectionControlGroup` so that it is easier to apply icons through the entire list of controls.
[commit-883e6ee]
- Updated `Button`s to correctly apply `md-text` when they do not have `primary` or `secondary` colors applied.
[commit-2250d91]
- Fixed the `Layover.HorizontalAnchors.RIGHT` not applying the correct styles. [issues-540]
- Fixed a weird case where `Dialog`s can be stuck visible. [issues-539]
- Exposed a lot more style and className props. [commit-f6fa91f]
- Exposed additional ways to style the `LinearProgress`. ([@gamtiq] - [pull-550])
- Updated the `focusable` attribute to be a `string` instead of a `boolean` on `SVGIcon`. [commit-849021a]
- Updated the `TextField` `resize` ability to also account for icons. [commit-a20bab4], [commit-58802eb], and [commit-4a5a55c]
- Fixed the `DataTable`'s `Checkbox` displaying weird if there is little content in a table. [issues-549]
- Updated `Collapse` Typescript definition to have `springConfig` optional. ([@noseglid] - [pull-534])
- Updated `DataTable` Typescript definition to include `fullWidth`. ([@noseglid] - [pull-548])

### General Website Updates
This is one of the other exciting things for me. With the release of 1.1.0, the documentation website
has also been rewritten from the ground up for better SSR, response time, and a first pass at offline
mode. List of new features/functionality:
- Added a page about [how to test](/discover-more/testing) along with react-md.
- Added routing examples for the [BottomNavigation](/discover-more/routing-examples/bottom-navigations),
[Drawer](/discover-more/routing-examples/drawers), and [NavigationDrawer](/discover-more/routing-examples/navigation-drawers)
components that show how you can work in with `react-router`'s `Link` component.
- It is now possible to link directly to an example, a component's prop type section, and a specific
component's prop. This is probably more for me than anything else.
  - Link to Example - [Menu Completion View](/components/autocompletes#menu-completion-view)
  - Link to Component's prop type section - [EditDialogColumn](/components/data-tables?tab=1#edit-dialog-column-proptypes)
  - Link to a specific prop - [SVGIcon#role](/components/svg-icons?tab=1#s-v-g-icon-proptypes-role)
- SassDoc will now redirect correctly when clicking on any Sass variable/mixin/function/placeholder in the "Requires",
"Used By", and "See" sections.
- When using the search functionality on the website, Sass variables will now have their values displayed in the autocomplete
list.
- It is now possible to search for specific examples from the main search bar.

### v1.1.4 Released
#### Changelog
- Fixed `FocusContainer`s so that they can trap focus with only one focusable element. [commit-e04ec5c]
- Added a small fix so that `TextField`s can display icons a bit nicer when `block`-ed. [commit-1b9d911]
- Updated `Dialog`s so that the content will automatically be scrollable when there is a lot of content. [issues-431]
- Added a small fix so that `Layover`s can position better in `Dialog`s. [commit-fecd695]
- Added a missing Typescript prop to the `Autocomplete`. ([@noseglid] - [pull-532])
- Updated `SelectionControl` so that one of `label`, `aria-label`, or `aria-labelledby` is required instead of only
`label` or `aria-label`. [commit-da5dd07]
- `Dialog` actions being stacked can be fully controlled now. [commit-d4e1eea]
- Using a `SelectionControlGroup` of `radio` no longer requires one of the radio to be checked by default. [issues-535]
- Updated the `SelectField` so that it can disable some of the `menuItems` and render any element. [pull-536]
  - Also updated the `Menu` so that clicking on a `disabled` `ListItem` will no longer close the menu.
  - Also fixed the `undefined` `lineDirection` for `SelectField`s
  - Also updated the tab-focus logic for `SelectField`s
  - Also updated keyboard matching logic for `SelectField`s
- Added a little bit better Android support for `Layover`s. [issues-534]
- Updated `Layover` to conditionally reposition on window resize instead of only closing on window resize. [commit-e313ef4]

### v1.1.3 Released
#### Changelog
- Fixed the `Layover` positions in `DataTable`s. [issues-527]
- Updated `SelectionControl` and `Checkbox` to allow `null` icons. [issues-528]
- Fixed the `Layover` not apply the correct styles when `simplified` is enabled. [issues-529]
- Fixed the `Menu` default export Typescript definition. [issues-526]
- Fixed lists that appear as a child of a toolbar's title. [issues-375]
- Fixed the selected state for `DataTable`s. [issues-530]
- Fixed the `DataTable`'s 'hover color being incorrectly applied on mobile devices. [issues-531]

### v1.1.2 Released
This is a couple more Typescript bugfixes.

#### Changelog
- Fixed the `Layover` positions and `Drawer` drawer type Typescript definitions. ([@noseglid] - [pull-520])
- Added `colSpan` and `rowSpan` to the `TableColumn` for Typescript definitions. ([@domszyn] - [pull-523])
- Fixed the `MenuButton` and `MenuButtonColumn` Typescript definitions to include tooltip and ink props. [commit-c7e37f0]
- Updated all components for `import { Component } from 'react-md/lib/Components'` syntax. [issues-524]
- Fixed the `ListItem` not applying the correct styles when using `expanderLeft`. [issues-521]
- Exposed additional style props for `FileInput` and `FileUpload`. [commit-9d2e3a3]
- Updated `NavigationDrawer` to conditionally use `%` instead of `vh`. [commit-2704d15]
- Fixed the `Subheader` to correctly apply `md-text--secondary`. [commit-7fb0d98]
- Updated `TextField` to apply `undefined` into the `leftIcon` or `rightIcon` instead of a boolean when the icons are
not stateful. [commit-f1a720b]


### v1.1.1 Released
This is a couple of Typescript bugfixes thanks to [@stickfigure] and [@noseglid].

#### Changelog
- Updated components that use the `component` prop to allow any key until it gets refactored away. [commit-1c5b17b]
- Added another attempt at fixing Typescript definitions for static component enums. [commit-d8247db]
- Fixed the Typescript definitions for `injectInk` and `injectTooltip`. [commit-7b50871]
- Fixed the `defaultMedia` Typescript definition for the `Drawer` component. ([@noseglid] - [pull-513])
- Fixed the `calendarTitleFormat` Typescript definition. ([@noseglid] - [pull-511])
- Fixed the `Drawer` and `NavigationDrawer` to have `constantType` and `constantDrawerType` Typescript definitions. [commit-065d84b]
- Fixed the `LinearProgress` query Typescript definition. [commit-065d84b]
- Fixed the `SelectFieldColumn`'s `id` Typescript definition. [commit-065d84b]
- Fixed the TextField Typescript definition for `onPaste`. [commit-065d84b]
- Updated the `TablePagination` with some more configuration props. [commit-0cb5aae]
- Fixed an `Autocomplete` bug with opening the menu incorrectly. [commit-a42f8b1]


### v1.1.0 Released
This release **added Typescript support**. It is not completely perfect yet, but it seems to be in a decent
implementation so far. Many thanks to the people who have helped me learn the basics for Typescript definitions
and contributing to fix the missing definitions. ([@peteboothroyd] and [@mctep])

You can see the [milestone for this release](https://github.com/mlaursen/react-md/issues?utf8=%E2%9C%93&q=milestone%3Av1.1.0) to see what went in it.
There are also some undocumented changes that should be covered in the [upgrade guide](/discover-more/upgrade-guides/v1.1.0).

A bit too much went into this *minor* release, and I am planning on doing smaller releases from now on. This one was a bit of a disaster to develop.

### Immediate Release Warnings
#### Dialogs
Just in case you don't read the upgrade guide, your application **will break** if you were using the
UMD build for dialogs.

```js
// Before
import { Dialog } from 'react-md';
const { Dialog } = window.ReactMD; // UMD

// After
import { DialogContainer as Dialog } from 'react-md';
const { DialogContainer: Dialog } = window.ReactMD; // UMD
```

#### Data Tables
If you were using the callbacks for when a row or checkbox was clicked, the number will probably be off now. Please see
the [issue for more details](#issues-243).

In addition, the styles for plain data tables have been simplified which might cause some display issues. [commit-2cc40cd]

#### Menus
If you created a custom version of a `Menu`, you need to make sure that one of the children is one of the following: 
`.md-text-field-container,button,*[role="button"],*[role="listbox"]` otherwise there will be an error.

## August 2017
### v1.0.19 Released
- Fixed the `Autocomplete` no longer firing click events on the list items. [issues-475]
- Updated the UMD build to correctly include the `MenuButton`. [issues-482]
- Fixed an invalid PropType warning for Date and Time pickers. [issues-490]
- Added a little bit more support for tabs with dynamic height changes. [pull-487]
- Added support for semi-bold fonts. [pull-468]

### v1.0.18 Released
##### Changelog
- Fixed the `Autocomplete` firing the `onAutocomplete` callback twice when using the keyboard to select
an item. [issues-466]
- Fixed a `PropType` warning when using the `Dialog` and one of the actions already had a key. [issues-465]
- Fixed the `SelectField` and `TextField` from not floating the label when a `value` (or `label`) had
a value of `0`. [issues-461] and [issues-460]
- Fixed a weird infinite loop in the `FocusContainer` when some of the children are the `AccessibleFakeButton` and the user
pressed `shift+tab`. [issues-458]
- Updated the multiline `TextField` so that it can be correctly snapshotted. [issues-457]
- Fixed the `NavigationDrawer` incorrectly hiding a "permanent" drawer type when `defaultVisible={false}`. [issues-426]
- Fixed some invalid checksum when Server Side Rendering the `NavigationDrawer`. [issues-420]
> this also removed some unneeded transition class names from the `Drawer` when the drawer was "mini" or "permanent".
- Updated the `Drawer` and `NavigationDrawer` components to provide props to style the overlay that gets
created. [issues-389]

## July 2017
### v1.0.17 Released
This patch was mostly about fixing components that needed to be resized after a container height/width
update instead of just a window resize event. In addition, there have been some mobile device performance
and behavior changes. Components that manually added touch events now use passive events when possible and
the user can focus a text field and scroll the page without automatically hiding the keyboard like a native
input element.

##### Changelog
- Fixed the weird page scroll behavior for dialogs when the user closed the dialog by clicking the overlay. [issues-367]
- Updated the ListItem so that you can provide props to the surrounding li node. [issues-439]
- Fixed a weird mobile safari but about using a virtualization library with any form input from react-md. [issues-442]
- Added passive event listeners. [issues-382]
- Updated the Autocomplete to no longer require an automatic TextField re-focus after a suggestion has been selected.
[issues-428]
- Fixed the TextField placeholder to correctly gain the disabled color. [issues-447]
- Fixed the focus behavior of TextFields on mobile devices. [issues-434]
- Fixed the unneeded PropType warning when a "controlled" TextField is disabled. [issues-432]
- Fixed the PropType warning for Tabs. [issues-440]
- Fixed the multiline TextField requiring a flex container to display correctly. It will now display correctly if it is in
just a `display: block` or whatever. [issues-365]
- Fixed the TimePicker changing days when AM/PM was toggled. [issues-446]
- Fixed the TimePicker to remember the last selected time better. [issues-438]
- Fixed the TimePicker's ability to calculate time. [issues-359]
- Fixed multiple components that manually calculate size for container resize events instead of just window resize events.
  - ExpansionPanels and Tabs [issues-448]
  - Multiline TextFields [issues-365]
  - TablePagination [issues-415]


## June 2017
### v1.0.16 Released

##### Changelog
- Updated the slider to no longer call `onChange` or `onDragChange` when dragging and the value
or distance have not been updated. [commit-d588fb4]
- Fixed a small bug with my `handleKeyboardAccessibility` so that spacebar didn't work in autocompletes.
[commit-b13f316]
- Fixed a keyboard accessibility problem with `SelectionControlGroup`. [commit-eb6629d]
- Fixed an error where rendering the `Autocomplete` in a `ListItem` threw an error. [issues-412]
- Updated the default `z-index` for the `Snackbar` so that it appears over the mini `Drawer`. [issues-410]
- Fixed the `DatePicker` so that it can accept a `value` of `null` and the empty string (`""`).
  - [issues-384]
  - [issues-396]
  - [issues-409]
- Fixed the cell offset calculations. [issues-401]
- Fixed non-contained menus. [issues-391]
- Fixed the `onClick` prop for `SelectionControl`. [issues-390]
- Fixed the `Snackbar` not working as intended when the action has an `onClick` function. [issues-385]
- Fixed the slider displaying the wrong value while sliding with touch or mouse. [issues-379]
- Updated `.npmignore` to stop include the `jest-cache` with the published code. [issues-403]
- Small typo fix. [issues-400]


## May 2017
### v1.0.15 Released
General mobile Safari bugfixes and other small changes.

##### Changelog
- Fixed the "stiffness" of scrolling in mobile Safari. [issues-383]
- Fixed the weird bug of requiring two taps in mobile Safari to open a `SelectField`. [issues-381]
- Updated the `Slider` to automatically set the `defaultValue` to the provided `min` value and fixed the discrete slider's
visibility issue. [issues-379]
- Correctly added the `name` attribute to the `FileInput` and `FileUpload` components. [issues-378]
- Fixed the autocomplete not showing suggestions after being autocompleted and getting data via Ajax. [issues-374]
- Fixed the `TablePagination`'s start value to only update when the `page` prop updates (if defined). [issues-372]
- Fixed the `TextField`s not blurring correctly when a touch device scrolls the page after focusing the text field. [issues-366]
- Updated the `ListItem` to allow the `nestedItems` to appear above the text instead of only below. [pull-380]


### v1.0.14 Released
This patch is mostly for keyboard accessibility updates so that the custom components interact the same way
as native form inputs.

##### Changelog
- Updated the menu component so that it correctly closes when a list item is "clicked" with spacebar or enter. [issues-360]
- Fixed the keyboard accessibility for selection controls, pickers, and select field. [issues-371]
  - switch, radio, and checkbox will no longer be toggle-able with the enter key to emulate the native checkbox and radio
  - select fields, date pickers, and time pickers can only be opened by spacebar. The enter key will attempt to submit a form instead.
  - only the currently checked radio button will be tabbable in the `SelectionControlGroup`. Other options can be be selected by pressing
  the up, down, right, or left arrow keys like the native radio.
  - correctly updated the role for the `SelectField` to be a `"listbox"`
- Fixed the `readOnly` state for the date and time pickers [issues-371]
- Fixed the text field display error in Firefox. [issues-368]
- Fixed the `TablePagination` labels when fully controlled. [issues-369]
- Added a final fallback for nested dialogs to render inline if rendered inside of pure components. [issues-229]
- Fixed the scroll locking of dialogs. [issues-361]

### v1.0.13 Released
This patch was about removing the prop type warnings from the new React version and other small bugs.

##### Changelog
- Migrate React.PropTypes to prop-types. [issues-325]
- Allow boolean values in selection controls [issues-350]
- Fixed the picker display bug. [issues-354]
- Fixed the SelectField error state bug. [issues-353]
- Fixed the dialog mounting animation bug. [issues-348]
- Allow a multiline textfield to grow from 1 row to multiple. [issues-347]
- Fixed the AccessibleFakeButton to click when spacebar is pressed. [issues-346]



## April 2017
### Added Showcases
Added a new place to showcase apps that are using react-md. You can view them [here](/discover-more/showcases).

### v1.0.12 Released
This release is mostly about fixing some of the cross-browser support and weird issues in mobile safari.
In addition, an [examples folder](https://github.com/mlaursen/react-md/tree/master/examples) has been added
to hopefully help newer people get a react-md project started up.

In addition, I decided to move the ticket from `v1.1.0` to `v1.0.12` about the annoying delay when a menu/drawer/toast
is closed by a click action.

##### Changelog
- Fixed the annoying delay on multiple components. [issues-210]
- Fixed the `DatePicker`'s next/previous month logic. [issues-315]
- Fixed the `CardActions` not centering correctly. [issues-316]
- Half-ly fixed the hidden content in full page dialogs. [issues-320]
- Updated the `TablePagination`'s `rowsPerPage` logic to reset `page` and `start` when it has been changed. [issues-322]
- Fixed the `Slider`'s bullet position when in a `text-align: center` container. [issues-323]
- Updated props from `string` to `node` for `react-intl` support. [issues-327]
- Fixed the Ajax Autocomplete flashing bug. [issues-330]
- Fixed the `Dialog`'s page layout breaking when it appears. [issues-333]
- Updated the `TableCheckbox` to appear in a `th` component when in the table header. [issues-334]
- Fixed some of the styles for better IE 11 support. [issues-339]
- Fixed the mobile safari click event delegation bug that prevented Menus and other components to be closed when an area outside was clicked.
[issues-340]


## March 2017
### v1.0.11 Released

##### Changelog
- Fixed the `SelectField`'s label disappearing when when the `menuItems` are defined in the `render` and one of its parents
re-renders (... take 2 :( ). [issues-300]
- Fixed the tooltip's unmounting errors. [commit-ba8e734]
- Fixed the SelectionControlGroup disabling persisting the disabled color to the checkboxes/radios. [issues-308]
- Fixed the checkboxes for DataTables when the rows are dynamic. [issues-297]
- Fixed the snackbar's transition bug. [issues-311]

### v1.0.10 Released
The `v1.0.9` tarball was published incorrectly through `yarn`, and was invalid. Republished correctly with `npm`.

### v1.0.9 Released

This was really another patch for drawers. 

##### Changelog
- Fixed the `Drawer` automatically opening when the `type` is set to `TEMPORARY`. [issues-291]
- Fixed the DatePicker's min/max date validation error. [issues-293]
- Fixed the `Drawer`'s `overlay` prop not working on mobile and tablet devices. [issues-298]
- Fixed the `Drawer`'s `overlay` being visible on initial page load when the type is `TEMPORARY` on desktop screens. [issues-299]
- Fixed the `SelectField`'s label disappearing when when the `menuItems` are defined in the `render` and one of its parents
re-renders. [issues-300]

### v1.0.8 Released

##### Changelog
- My initial attempt at the defaultVisible prop not working correctly was incorrect. Updated the behavior as mentioned in
the new ticket. [issues-288]

### v1.0.7 Released

##### Changelog
- Fixed the Drawer's defaultVisible prop not working entirely correctly. [iessues-286]
- Fixed the DateTimeFormat fake mock. [issues-285]
- Fixed the Date/Time pickers to not open when disabled. [issues-281]
- Fixed the prop warning for MenuButton and passed correct props to Menu. [issues-278]
- Fixed the Menu attempting to setState after it had unmounted. [issues-268]

## February 2017
### v1.0.6 Released

##### Changelog
- Fixed DatePicker's calendar Date when controlled. [issues-245]
- Added controlled warnings to pickers. [commit-d46cf4c]
- Allowed non-material design colors to compile without errors. [issues-244]
- FontIcon force size fix. [issues-221]
- Allowed a TableRow to only have a single column.

### v1.0.5 Released

##### Changelog
- Fixed the DatePicker's min/max date validator. [commit-53130fa]
- Fixed the FocusContainer's window focus bug. [commit-1fe1b9b]
  - > Basically using `element.contains(window)` is invalid and throws a 'Node' does not have contains error.
- Automated the nested dialog display error until Portals are updated. [issues-229]
- Fixed the TextField blocked icon positioning. [commit-9115e23]
- Passed text-field related props from pickers. [commit-5daabbb]
- Fixed the TablePagination's onPagination callback to be more accurate. [commit-93d932f]
- Fixed the TableRows's onCheckboxClick callback to match documentation. [commit-69fbdd8]

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
- Fixed active label for SelectField. [pull-235]
- Components that use the `Portal` component pass the `lastChild` and `renderNode` props correctly. [pull-234]

### v1.0.1 Released
Minor bugfixes.

##### Changelog
- Fixed PropTypes of avatar to allow `PropTypes.node` instead of `string` only. [issues-198]
- Fixed the accidental form submission if selecting an item from an `autocomplete` by using the enter key press in
a form. [commit-cf57610]
- Fixed Slider number alidation for floats. [issues-185]
- Fixed the issue where the Switch's onChange prop fires twice when clicking/touching the thumb. [issues-182]
- Fixed the styling issue for password text fields that have a message with the field. [issues-192]
- Fixed the SelectField to allow a 0 based option value. [issues-214]


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
- Fixed the background color bug. [commit-49ce071]
- Fixed the pre-compiled bundles to actually reflect what my documentation said. The pre-compiled bundles
are now formatted as `PRIMARY-COLOR_SECONDARY_COLOR.min.css` instead of `PRIMARY-COLOR-SECONDARY-COLOR.MIN.CSS`.
- Created a mixin to create color class names. [commit-14e19f3]
- Fixed the injectINK HOC for keyboard _clicks_. [commit-59dff18]
- FileInput/FileUpload bugfixes. [commit-2c4e111]
- Updated the password text fields' styles for keyboard accessibility. [commit-807aa2a]
- Updated the TextFieldMessage to not shrink when in a block text field.
- Updated EditDialogColumn for accessibility. [commit-217c425]
- Updated typography to be able to opt out of utility class names. [commit-5c5eaa2]
- Updated SelectField keyboard accessibility. [commit-ffe270b]
- Updated tooltips to no longer rotate along with the `.md-collapser`s.
- Updated tooltips to be created through react components instead of my weird decision of creating it manually myself. [commit-75eb2e0]
- Rewrote SelectFieldColumn. [issues-170]
- Added the `getCurrentMedia` static method to the `NavigationDrawer` as well.
- Updated permanent drawers to no longer use the Portal.
- Updated the `Dialog` component to be able to be closed by pressing the escape key (only if not a `modal`). [commit-b742ed5]
- Updated the Date and Time pickers to have _some_ keyboard accessibility. This still isn't the ideal solution and will be changed in a
future release (maybe?) to actually allow inline date and time selection that will appear in dropdowns. [issues-173]
- Updated `FocusContainer` to be able to enable/disable the focus containment after being fully mounted.

### General Website Changes

SassDoc pages are now searchable and filterable while on that page itself. I found that using the main search
to attempt to keep finding variables on the same page was a bit annoying. The SassDoc page can now be quick navigated
by clicking the visible FAB and clicking any items in the new Drawer.


### v1.0.0-beta Released

This release fixed up a couple more bugs (listed below) and now the main focus will be figuring out if there are any
production-breaking bugs remaining.

##### Changelog
- Fixed the Avatar colors changing. [issues-161]
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
- A [Theme Builder](/customization/theme-builder) has also been added that allows you to pick and
choose a theme on your website.
- Examples and Prop Types have been separated into different tabs to help separate content a bit more.
- Most SassDoc can be viewed with the related component in a new SassDoc tab.
- The main search now includes sass placeholders, variables, functions, and mixins that will either redirect you to
the correct SassDoc tab, or to the [SassDoc Page](/sassdoc).

### v1.0.0.alpha.4 Released

The main focus of this release was adding a `JumpToContent` link for the `NavigationDrawer` for keyboard accessibility. When you use
the `NavigationDrawer` (or specifically use the `JumpToContentLink` component), the first `tab` press on the page will show a link that
will allow a user to focus the main content of the page instead of having to go through every navigation item.

##### Changelog
- Fixed some color variables that I had mistyped...
- Fixed the spelling of `discreet -> discrete`
- Fixed the `Sliders` when using touch devices. [issues-144]
- Fixed the `YearPicker` after the name change from `initialYearsDisplayed` to `yearsDisplayed`. [issues-165]
- Added `onTabFocus` and `tabbedClassName` to the `AccessibleFakeButton`. [issues-160]

### v1.0.0.alpha.3 Released

This release was focused on having a more consistent naming convention. Boolean props are now `adjective` instead of
`isAdjective` and any prop that was `initiallyProp` was renamed `defaultProp` to match how React handles the base html
tag defaults. This also included some small bugfixes as well as updating the Portal component to stop using the undocumented
`CSSPropertyOperations` since it crashed in React 15.4.0.

The `SelectField` was also updated to no longer use the `TextField` component internally and behave more like the html select. [issues-144]

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
