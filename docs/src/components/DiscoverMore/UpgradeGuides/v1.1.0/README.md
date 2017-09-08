## Upgrading to 1.1.0
A lot of components had their props renamed to follow a more consistent naming scheme between all components. There were a couple
of components that still used `isOpen`, `defaultOpen`, or `onSOMETHINGToggle` (`onVisibilityToggle`). They have now been renamed to `visible`, `defaultVisible`,
and `onSOMETHINGChange` (`onVisibilityChange`). This _should_ not break any functionality in your app, but it will display helpful
migration messages for you.

To help combat the weird resizing of content when a `Dialog` is opened, the `html` has been modified to gain a
`min-width: 100%`. This can be changed by the [md-html-min-width](/customization/typography?tab=1#variable-md-html-min-width) variable.

### DataTables
The unique id generation for EditDialogColumn and SelectFieldColumn have been updated to also include the current cell index.
```js
// Before
const id = `${baseId}-${rowIndex}-edit-dialog`;
const id = `${baseId}-${rowIndex}-select`;

// After
const id = `${baseId}-${rowIndex}-${colIndex}-edit-dialog-field`;
const id = `${baseId}-${rowIndex}-${colIndex}-select-field`;
```


#### DataTable
If you were using the callbacks for when a row or checkbox was clicked, the number will probably be off now. Please see
the [issue for more details](#issues-243).

The behavior of the `style` and `className` props have been changed based on the `responsive` prop. Before this release,
it was impossible to apply `style` and `className` to the surrounding responsive container for the tables. The behavior
of the `DataTable` component will now apply `style` and `className` to the responsive container and `tableStyle`/`tableClassName`
to the `<table>` when `responsive` is enabled. If `responsive` is disabled, the `style` and `className` will be applied to the
`<table>` and `tableStyle`/`tableClassName` are invalid.

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

### Drawers/NavigationDrawers
- `onVisibilityToggle` deprecated - Use `onVisibilityChange` instead.

### FontIcons
Since there was a dense spec for icons disabled, you might want to set
```scss
$md-font-icon-include-dense: false;
```
if you were used to the look and feel without dense icons. It really changes the size of icons to be `20px`
on desktop screens instead of the normal `24px`.

### Lists
#### List
The list is now able to be displayed inline instead of vertically. Just enable the `inline` prop for this change.

#### ListItem
The `ListItem` has now exposed an `itemProps` prop which can be used to supply any other valid React props to the surrounding
`li` component.

- `isOpen` deprecated - Use `visible` instead.
- `defaultOpen` deprecated - Use `defaultVisible` instead.
- `expanderLeft` added. This allows for the expander icon to appear as the left icon instead of only as the right.

### Menus
The Menu component was redone to stay within the viewport. It also has a lot of other niceties built in now. If you were using
the `Menu.Positions.CONTEXT` before, it has been deprecated. To create a context menu now, all you need to do is provide a
`onContextMenu` prop. The component will now automatically set the positioning of the context menu for you as well.

#### MenuButton
The `MenuButton` was updated to move the list of items to be the `menuItems` prop instead of the `children`.

- `buttonChildren` deprecated. But any children for the button in the children of the `MenuButton` itself.
- `menuItems` - This should be the list of `number`, `string`, `object`, or `ListItem` used to render the list.

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
- `onMenuToggle` deprecated - Use `onVisibilityChange` instead.
- `isOpen` deprecated - Use `visibile` instead.
- `defaultOpen` deprecated - Use `defaultVisible` instead.
- `stripActiveItem` [added](/components/select-fields?tab=1#select-field-proptypes-strip-active-item).

### Toolbars
The `$md-toolbar-mobile-prominent-height` has been switched to `null` by default and been replaced by `$md-toolbar-prominent-height`.
The toolbar's title can now also gain an id.

## Changelog
You can see the [milestone for this release](https://github.com/mlaursen/react-md/issues?utf8=%E2%9C%93&q=milestone%3Av1.1.0) to see what went in it.
There were also some undocumented changes that might appear in the list below.

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
- Ink is now disable-able at an application level. [#176](#issues-176)
- Buttons, Lists, and Toolbars can now have a consistent size across all devices. [#226](#issues-226)
- Most components no longer use the Portal component since it lead to a lot of issues. [#230](#issues-230)
- TextFields can now [auto resize](#commit-10e54d3269d8941480ec2019861dcc492458fd22).
- Keeping Menus within the viewport. Giant change. [#303](#pull-303)
