Navigation drawers have 7 types:

```js
const {
  FULL_HEIGHT,
  CLIPPED,
  FLOATING,
  PERSISTENT,
  PERSISTENT_MINI,
  TEMPORARY,
  TEMPORARY_MINI,
} = NavigationDrawer.DrawerType;
```

The `TEMPORARY` or `TEMPORARY_MINI` *must* be used for mobile devices. The
default media queries will already handle this for you. If the `drawerType`
is set to anything except for `PERSISTENT_MINI`, the mobile version of the
drawer will automatically be `TEMPORARY`. If the `drawerType` is set to
`PERSISTENT_MINI`, then the mobile version will be `TEMPORARY_MINI`.

If you would like a consistent `drawerType` between all devices, you can
always set the `drawerType` to `TEMPORARY` or `TEMPORARY_MINI`.
