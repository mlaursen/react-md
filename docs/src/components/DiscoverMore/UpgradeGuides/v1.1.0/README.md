## Changelog
### New Components
- 🎉 Created a [Layover](/components/helpers/layovers) to keep elements fixed within the viewport and a lot of other
magic. Any component that uses the `Menu` behind the scenes can hook into this API.
- 🎉 Created a [Badge](/components/badges) component for displaying notifications. [issues-220]
- 🎉 Implemented [SVGIcon](/components/svg-icons)s and updated all components to natively support them. [issues-253]
- 🎉 Created a [DropdownMenu](/components/menus#dropdown-menu-examples) when the `MenuButton` isn't flexible enough.
- 🎉 Created [DropdownMenuColumn](/components/data-tables?tab=1#dropdown-menu-column-proptypes) and
[MenuButtonColumn](/components/data-tables?tab=1#menu-button-column-proptypes) components to help with positioning menus
within `DataTable`s. [issues-310]
- 🎉 Created `TableFooter` component.
- 🎉 Created a [Tooltipped](/components/tooltips#tooltipped-examples) component for easily adding tooltips to a child component.
([@gamtiq] - [pull-477] and [pull-473])


### Component Updates
- 🐛 `Autocomplete`s will now correctly trigger the `onBlur` event. [issues-266]
- ✨ `Autocomplete`s can now send the label instead of the value when autocompleted.
[autocompleteWithLabel](/components/autocompletes?tab=1#autocomplete-proptypes-autocomplete-with-label)
- ✨ `Autocomplete`s can also support nodes  for the suggestion's label. This allows for some cool
[autocomplete styling](/components/autocompletes#toolbar-search).
- ✨ `Autocomplete`s have additional props for styling the inline suggestion.
- ✨ `Autocomplete`s have additional accessibility support when there are paginated results. Check out the
[Paginated/Lazy Loading Results](/components/autocompletes#paginated-lazy-loading-results) example for some more details. [commit-3e8437]
- ✨  `Autocomplete`s now add the `aria-autocomplete` attribute. [commit-75f1cf]
- ✨ `Button`s no longer prefer the `label` prop. It is preferred to render any icons or text as `children` in the `Button` instead. Look at the
newer [Button examples](/components/buttons). [issues-254]
- 🎉 `Button`s now have a consistent size between enabled and disabled states. [issues-295]
- ✨ `Button`s can now have a consistent size across media sizes.
  - [md-btn-text-height](/components/buttons?tab=2#variable-md-btn-text-height)
  - [md-btn-text-font-size](/components/buttons?tab=2#variable-md-btn-font-size)
  - [md-btn-floating-margin](/components/buttons?tab=2#variable-md-btn-floating-margin)
- ✨ `Button`s have more theming abilities for text and background. [issues-296]
- 🐛 `CardTitle` updated line wrapping logic for large titles. [issues-199]
- ✨ `Collapse` can now disable the animation. [issues-219]
- ✨ `DataTable`s have more control over the "plain" styles and injecting checkboxes into each row. [issues-195#issuecomment-268865697]
- 🎉 `DataTable`s have an option to have fixed headers and footers. I'd still recommend using something like [react-virtualised](https://github.com/bvaughn/react-virtualized)
instead. [issues-197] and [pull-318]
- ✨ The `DataTable`'s `TableRow` provides the native `rowIndex` so it is no longer off-by-one. [issues-243]
- ✨ `DataTable`s now support indeterminate checkboxes. [issues-256]
- 🎉 `DataTable`s now support displaying only a single row of `EditDialogColumn`. [issues-394]
- 🎉 `DataTable`s can now correctly show menus and buttons. [Check out the examples](/components/data-tables#tables-with-menus)
- 🐛 `DataTable`s added more accessibility for the built-in checkboxes by providing labels. [commit-5368c9]
  - [checkboxHeaderLabel](/components/data-tables?tab=1#data-table-proptypes-checkbox-header-label)
  - [checkboxLabelTemplate](/components/data-tables?tab=1#data-table-proptypes-checkbox-label-template)
- ✨ `DataTable`s support `SVGIcon`s, so the `checkedIconChildren`, `checkedIconClassName`, `uncheckedIconChildren`, and `uncheckedIconClassName` props have been
deprecated in favor of `checkedIcon` and `uncheckedIcon`.
- 🎉 `DataTable` performance boost by no longer attempting to grow and adjust columns. [issues-252]
- ✨ `TableColumn`s now add the `aria-sort` attribute correctly when they are `sortable`. [commit-5368c9].
- ✨ `TableColumn`s now provide the `scope` attribute correctly. [commit-3d1054]
- ✨ `EditDialogColumn`s now support a mode to not automatically [open when tab-focused](/components/data-tables#edit-dialog-examples).
- 🐛 `TablePagination`s now have a bit better support for smaller devices. [issues-489]
- ✨ `Dialog`s have exposed both a `DialogContainer` and `Dialog` component.
- 🐛 `Drawer`s deprecated the `closeOnNavItemClick` prop since it was a duplicate of `autoclose`. [issues-207]
- 🎉 `ExpansionPanel` exposed more props to control the footer. [issues-306]
- 🐛 `ExpansionPanel` now has better support for displaying smaller devices. [issues-479]
- 🎉 `FileInput`s (and `FileUpload`s) have been updated to support selecting the same file multiple times in a row.
- 🎉 `FontIcon`s and `SVGIcon`s support the dense spec. [issues-217]
- ✨ `Grid`s now support stacked directions.
- ✨ `Ink` is now disable-able on every component or at an application level. [Disabling ink example](/components/inks#disabling-ink)
- 🐛 `Ink`s **no longer pulse** by default and **expand the entire container width**.
- ✨ `List`s can now be displayed horizontally with the `inline` prop.
- ✨ `ListItem` can now be rendered as any element so it doesn't need to be a direct descendant of `List` anymore. [issues-213]
- ✨ `ListItem` can now display the expander icon to the left of the text instead of only to the right. [issues-264]
- ✨ `List`s and `ListItem`s can now have consistent sizing across all media sizes.
  - [md-list-padding](/components/lists?tab=2#variable-md-list-padding)
  - [md-list-primary-font-size](/components/lists?tab=2#variable-md-list-primary-font-size)
  - [md-list-secondary-font-size](/components/lists?tab=2#variable-md-list-secondary-font-size)
  - [md-list-height](/components/lists?tab=2#variable-md-list-height)
  - [md-list-avatar-height](/components/lists?tab=2#variable-md-list-avatar-height)
  - [md-list-two-lines-height](/components/lists?tab=2#variable-md-list-two-lines-height)
  - [md-list-three-lines-height](/components/lists?tab=2#variable-md-list-three-lines-height)
  - [md-list-three-lines-addon-margin-top](/components/lists?tab=2#variable-md-list-three-lines-addon-margin-top)
- ✨ `Media` added more defaults for the embedded selectors.
- 🎉 `Menu`s can now automatically position themselves within the viewport (this is disabled by default for backwards compatibility)
- 🐛 `Menu`s can now correctly render only one `ListItem`. [issues-259]
- 🎉 `Menu`s can now correctly display context menus and cascading menus. Check out the [Google Docs Clone](/components/menus#google-docs-clone)
example for more information.
- ✨ `Menu`s can have consitent max-width/max-height across all media sizes.
- 🐛 `NavigationDrawer` small bugfix for IE11 displaying weird.
- 🎉 The `Portal` component is no longer used by default since it causes many issues. [issues-230]
- ✨ `DatePicker` now supports setting the correct start of day according to the locales prop. [issues-326]
- ✨ `DatePicker` now supports disabling the weekends from the calendar. ([@snkhubcom] - [pull-485])
- ✨ `TimePicker` now supports a `hoverMode`. ([@JonathanIlk] - [pull-231])
- ✨ `TabsContainer` exposed a new prop to control the `SwipeableViews` component. [issues-203]
- ✨ `Toolbar` styles now support a `padding` version of `.md-toolbar-relative`. [issues-225]
- ✨ `Toolbar` styles now support keeping consistent sizes across all media sizes.
  - [md-toolbar-height](/components/toolbars?tab=2#variable-md-toolbar-height)
  - [md-toolbar-prominent-height](/components/toolbars?tab=2#variable-md-toolbar-prominent-height)
  - [md-toolbar-title-keyline](/components/toolbars?tab=2#variable-md-toolbar-prominent-height)
  - [md-toolbar-btn-keyline](/components/toolbars?tab=2#variable-md-toolbar-prominent-height)
  - [md-toolbar-select-field-margin](/components/toolbars?tab=2#variable-md-toolbar-prominent-height)

#### General Changes
- ✨ All form controls support getting the value from refs. [commit-7e6585]
- 🎉 All Sass variables are `!default` for easier customization. [issues-226]
- 🎉 Automatic `id` generation is now `kebab-cased` instead of `camelCased` by default. [issues-279]
- 🎉 Stopped using `delete` for unused prop types. [issues-212]
- ✨ `line-height` is now only applied to the `body` and `p` tags by default. [issues-242]
- 🐛 Fixed a bug with invalid checksums from server side render components that use the `Portal`. [issues-236]
- 🎉 Created a global error color class name instead of limiting it only to text fields. [issues-251]
- 🐛 Changed the default portrait and landscape media queries to use min/max aspect ratio instead of orientation. See the
[SassDoc](/customization/media-queries?tab=1#variable-md-portrait-media) for more information.
- 🐛 Fixed the misspelling of "deceleration".
- 🐛 Applied a new `md-html-min-width` to the `<html>` to fix weird resizing issues when `Dialog`s appear.
- 🐛 Changed all the `outline: none` to `outline-style: none` so that the outlines can be added back easily by just applying
`outline-style: auto`.
- 🎉 Updated the `displayName` of components that were using higher order components behind the scenes. [commit-7107ef]

## Upgrading to 1.1.0
A lot of components had their props renamed to follow a more consistent naming scheme between all components. There were a couple
of components that still used `isOpen`, `defaultOpen`, or `onSOMETHINGToggle` (`onVisibilityToggle`). They have now been renamed to `visible`, `defaultVisible`,
and `onSOMETHINGChange` (`onVisibilityChange`). This _should_ not break any functionality in your app, but it will display helpful
migration messages for you.

To help combat the weird resizing of content when a `Dialog` is opened, the `html` has been modified to gain a
`min-width: 100%`. This can be changed by the [md-html-min-width](/customization/typography?tab=1#variable-md-html-min-width) variable.

## Buttons
Buttons have added deprecation warnings for using the `label` prop. Instead of using the label, it is always preferred to use
the `children` to render any content in the button. There is backwards compatibility built in so this should not be a breaking
change but just a helpful migration warning.

In addition with these changes, it is preferred to use the new `iconEl` instead of the `iconChildren` and `iconClassName` props. There is
some better SVG support when using this prop.

## DataTables
The unique id generation for EditDialogColumn and SelectFieldColumn have been updated to also include the current cell index.
```js
// Before
const id = `${baseId}-${rowIndex}-edit-dialog`;
const id = `${baseId}-${rowIndex}-select`;

// After
const id = `${baseId}-${rowIndex}-${colIndex}-edit-dialog-field`;
const id = `${baseId}-${rowIndex}-${colIndex}-select-field`;
```

### DataTable
If you were using the callbacks for when a row or checkbox was clicked, the number will probably be off now. Please see
the [issue for more details](#issues-243).

The behavior of the `style` and `className` props have been changed based on the `responsive` prop. Before this release,
it was impossible to apply `style` and `className` to the surrounding responsive container for the tables. The behavior
of the `DataTable` component will now apply `style` and `className` to the responsive container and `tableStyle`/`tableClassName`
to the `<table>` when `responsive` is enabled. If `responsive` is disabled, the `style` and `className` will be applied to the
`<table>` and `tableStyle`/`tableClassName` are invalid.

With the new support for `SVGIcon`s, the `checkedIconChildren`, `checkedIconClassName`, `uncheckedIconChildren` and `uncheckedIconClassName`
props have been deprecated. Please use the `checkedIcon` and `uncheckedIcon` props instead.

### TableRow
The `autoAdjust` prop has now been deprecated for performance reasons. Please enable the `grow` prop on one of the `TableColumn` in the header
to get the old functionality back.

### TableColumn
The `sortIconChildren` and `sortIconClassName` props have been deprecated. Please use the `sortIcon` prop instead.

#### EditDialogColumn
The `EditDialogColumn` has been updated to automatically stay within the `DataTable`'s responsive container. In addition,
the "Ok" and "Cancel" buttons in a large dialog have been updated to have more styling options.

- `okPrimary` [added](/components/data-tables?tab=1#edit-dialog-column-proptypes-ok-primary).
- `okSecondary` [added](/components/data-tables?tab=1#edit-dialog-column-proptypes-ok-secondary).
- `cancelPrimary` [added](/components/data-tables?tab=1#edit-dialog-column-proptypes-cancel-primary).
- `cancelSecondary` [added](/components/data-tables?tab=1#edit-dialog-column-proptypes-cancel-secondary).
- `enforceMinWidth` deprecated.
- `scrollThreshold` deprecated.
- `transitionDuration` deprecated.
- `inlineIconChildren` and `inlineIconClassName` props have been deprecated. Use the `inlineIcon` prop instead.
- `noIcon` deprecated. Just set the `inlineIcon` prop to `null` to remove any icons.

### SelectFieldColumn
The `SelectFieldColumn` was also updated to automatically stay within the `DataTable`'s responsive container. With the new
changes, it also does not require an additional wrapper to get the menu to overflow correctly.

- `wrapperStyle` deprecated.
- `wrapperClassname` deprecated.

### Dialogs
If you were using the UMD build or specifying `import { Dialog } from 'react-md'`, your app will probably now
be broken. One of the changes that was made in this release was to expose the `Dialog` itself instead of just
the container that displays it.
```js
// Before
import { Dialog } from 'react-md';
const { Dialog } = window.ReactMD; // UMD

// After
import { DialogContainer as Dialog } from 'react-md';
const { DialogContainer: Dialog } = window.ReactMD; // UMD
```

### Drawers
- `closeOnNavItemClick` deprecated. Please use the `autoclose` prop instead. (It existed before)
- `onVisibilityToggle` deprecated. Please use `onVisibilityChange` instead.

### ExpansionPanels
#### ExpansionPanel
- `expandIconChildren` and `expandIconClassName` deprecated. Please use the `expanderIcon` prop instead.

### FileInputs
- `iconChildren` and `iconClassName` deprecated. Please use the `icon` prop instead.

### FontIcons
Since there was a dense spec for icons disabled, you might want to set
```scss
$md-font-icon-include-dense: false;
```
if you were used to the look and feel without dense icons. It really changes the size of icons to be `20px`
on desktop screens instead of the normal `24px`.

### Lists
#### ListItem
- `isOpen` deprecated - Use `visible` instead.
- `defaultOpen` deprecated - Use `defaultVisible` instead.
- `expanderIconChildren` and `expanderIconClassName` deprecated. Please use the `expanderIcon` prop instead.

### Menus
The Menu component was redone to stay within the viewport. It also has a lot of other niceties built in now. If you were using
the `Menu.Positions.CONTEXT` before, it has been deprecated. To create a context menu now, all you need to do is provide a
`onContextMenu` prop. The component will now automatically set the positioning of the context menu for you as well.

- `isOpen` deprecated. Please use the `visible` prop instead.
- `contained` deprecated. Please use the `sameWidth` prop instead.
- `Menu.Positions.CONTEXT` deprecated. To create context menus, just provide the `onContextMenu` callback prop instead.

#### MenuButton
The `MenuButton` was updated to move the list of items to be the `menuItems` prop instead of the `children`.

- `buttonChildren` deprecated. But any children for the button in the children of the `MenuButton` itself.
- `onMenuToggle` deprecated. Please use the `onVisibilityChange` prop instead.
- `isOpen` deprecated. Please use the `visible` prop instead.
- `defaultOpen` deprecated. Please use the `defaultVisible` prop instead.
- `menuItems` - This should be the list of `number`, `string`, `object`, or `ListItem` used to render the list.

### NavigationDrawers
- `onVisibilityToggle` deprecated. Please use the `onVisibilityChange` prop instead.
- `temporaryIconClassName` and `temporaryIconChildren` deprecated. Please use the `temporaryIcon` prop instead.
- `persistentIconClassName` and `persistentIconChildren` deprecated. Please use the `persistentIcon` prop instead.

### Pickers
### Date Pickers
- `previousIconChildren` and `previousIconClassName` deprecated. Please use the `previousIcon` prop instead.
- `nextIconChildren` and `nextIconClassName` deprecated. Please use the `nextIcon` prop instead.
- `initialCalendarDate` deprecated. Please use `defaultCalendarDate` instead.

### Portals
All the components that were using the `Portal` component in the previous release are *not* using it by default now.
The `Portal` ended up being too much of a hassle when dealing with server side rendering since it renders in a new
subtree once the DOM is available. Components affected:

- `BottomNavigation`
- `Dialog`
- `Drawer`
- `NavigationDrawer`
- `Snackbar`
- `DatePicker`/`TimePicker`

If it is still desired to have the `Portal` subtree rendering enabled for these components, just enable `portal` as
a prop.

> The Drawer/NavigationDrawer will still render the overlay for temporary drawers in a new subtree. If the Drawer
starts out as `defaultVisible` from the server, there _might_ be a server side rendering error message still.

### SelectFields
- `iconChildren` and `iconClassName` disabled. Please use the `dropdownIcon` prop instead.
- `isOpen` deprecated. Please use the `visibile` prop instead.
- `defaultOpen` deprecated. Please use the `defaultVisible` prop instead.
- `onMenuToggle` deprecated. Please use the `onVisibilityChange` prop instead.
- `stretchList` deprecated. Maybe use `sameWidth` instead. Might not need any real changes.

### SelectionControls
#### SelectionControl
- `checkedCheckboxIconChildren`, `checkedCheckboxIconClassName`, `uncheckedCheckboxIconChildren` and `uncheckedCheckboxIconClassName` deprecated.
Please use the `checkedCheckboxIcon` and `checkedCheckboxIcon` props instead.
- `checkedRadioIconChildren`, `checkedRadioIconClassName`, `uncheckedRadioIconChildren` and `uncheckedRadioIconClassName` deprecated.
Please use the `checkedRadioIcon` and `checkedRadioIcon` props instead.

#### Checkbox/Radio
- `checkedIconChildren` and `checkedIconClassName` deprecated. Please use the `checkedIcon` prop instead.
- `uncheckedIconChildren` and `uncheckedIconClassName` deprecated. Please use the `uncheckedIcon` prop instead.

### TextFields
- `passwordIconChildren` and `passwordIconClassName` deprecated. Please use `passwordIcon` instead.
