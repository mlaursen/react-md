## Upgrading to 1.1.0
### DataTables
The unique id generation for EditDialogColumn and SelectFieldColumn have been updated to also include the current cell index.
```
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
import { Dialog } from window.ReactMD; // UMD

// After
import { DialogContainer as Dialog } from 'react-md';
import { DialogContainer as Dialog } from window.ReactMD; // UMD
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
The Menu component was redone to stay within the viewport. It also has a lot of other nicities built in now. If you were using
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
