There are 7 different types of drawers:

```js
const {
  FULL_HEIGHT,
  CLIPPED,
  FLOATING,
  PERSISTENT,
  PERSISTENT_MINI,
  TEMPORARY,
  TEMPORARY_MINI,
} = Drawer.DrawerTypes;
```

The `TEMPORARY` or `TEMPORARY_MINI` type *must* be used for mobile deivces. By default,
a `TEMPORARY` drawer will be used for mobile devices, a `PERSISTENT` drawer for tablets,
and a `FULL_HEIGHT` drawer for desktops.

When a mini drawer is used, it will be unable to expand on its own. Another drawer must be
created that is a non-mini version that gets expanded separately. The only reason for this
is that animating the width for a drawer was sluggish on mobile devices at this time. It is
recommended to use the `NavigationDrawer` component instead since it handles that for you.

### Positioning CSS
To help with positioning components and elements with a drawer, a couple of utility classes have been created.

#### `md-drawer-relative`
This class name will add the correct `margin-left` to drawer's relative so that it matches the current media's
drawer's width. By default, this means it will apply `margin-left: 264px;` on tablet and desktop screens.

#### `md-drawer-relative--mini`
This class name will add the correct `margin-left` to a mini drawer's relative. Use it standalone without the `md-drawer-relative`
class name.

#### `md-list--drawer`
This is a simple utility class that gets applied automatically to the nav items list in the drawer. It basically
sets the height of the list to be `height: calc(100vh - #{$current-toolbar-media-height});`. This will allow the
list to be scrollable.
