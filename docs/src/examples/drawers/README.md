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
created that is a non-mini version that gets expanded separately. The only reasonf or this
is that animating the width for a drawer was sluggish on mobile devices at this time. It is
recommended to use the `NavigationDrawer` component instead since it handles that for you.
