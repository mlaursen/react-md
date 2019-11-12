## Upgrading to 0.3.0

### NavigationDrawer

The `NavigationDrawer` component was redone to respond to different device sizes
better.

Some of the required changes:

- `isOpen` - Has been removed. See [onDrawerChange](#ondrawerchange) for new
  functionality.
- `style` - Has been renamed to `drawerStyle` to better match existing naming
  conventions.
- `className` - Has been renamed to `drawerClassName` to better match existing
  naming conventions.
- `containerStyle` - Has been renamed to `style` to better match existing naming
  conventions.
- `containerClassName` - Has been renamed to `className` to better match
  existing naming conventions.
- `title` - Has been renamed to `drawerTitle` to be more specific.
- `openDrawer` - Has been removed. See [onDrawerChange](#ondrawerchange) for new
  functionality.
- `closeDrawer` - Has been removed. See [onDrawerChange](#ondrawerchange) for
  new functionality.
- `drawerType` - Has been removed. See
  [Responsive Drawer Changes](#respnsive-drawer-changes) for new functionality.
- `navHeader` - Has been removed.
- `navHeaderChildren` - Has been renamed to `drawerChildren` for clarity.
- `autoclose` - New boolean prop that will automatically close the drawer on the
  temporary drawer types when a nav item is clicked if this is set to `true`.

#### Responsive Drawer Changes

The `drawerType` prop has been removed so that there is now a specific drawer
type at different media sizes.

Six props: `mobileDrawerType`, `mobileMinWidth`, `tabletDrawerType`,
`tabletMinWidth`, `desktopDrawerType`, and `desktopMinWidth` have been created
to help with the media flows.

The mobile drawer type can only be temporary or temporary mini, while the tablet
and desktop drawer types can be any variant.

The `mobileDrawerType` will be chosen if the `mobileMinWidth` matches in the
media query and the max width is less than `desktopMinWidth - 1`.

The `tabletDrawerType` will be used if the `tabletMinWidth` matches in the media
query and the max width is less than `desktopMinWidth - 1` and the device
orientation is `landscape`. If the device orientation, the `mobileDrawerType`
will be used instead.

The `desktopDrawerType` will be used if the media query matches the
`desktopMinWidth`.

There is also a new prop: `initialDrawerType` that will help with Server Side
Rendering. This should either be `'mobile'`, `'tablet'`, or `'desktop'`. It will
then set the drawer type to the corresponding drawer type on initial render.
(Before it always rendered the desktop until it was fully mounted). This new
prop should be used along with the `initiallyOpen` prop to render the mobile
devices correctly without forcing the menu to open and close initially.

#### onDrawerChange

Definition: `onDrawerChange(isDrawerOpen)`

Since the `openDrawer` and `closeDrawer` props were removed, you can get the
current drawer open state by adding a `onDrawerChange` prop. This function will
give you a boolean for the next open state of the drawer. It will be triggered
when a media resize happens that changes the open state, or when the user
toggles it for a temporary or persistent drawer.
