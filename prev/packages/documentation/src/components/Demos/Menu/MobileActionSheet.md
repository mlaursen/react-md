Starting with `react-md@v5.0.0`, menus can be conditionally rendered as a #sheet
using a new `renderAsSheet` configuration. This is generally helpful for small
devices like phones since there is a lack of screen space. This functionality
can be enabled by either:

- updating the root `Configuration` component from the #layout package to have
  `menuConfiguration: { renderAsSheet: "phone" }` or `{ renderAsSheet: true }`
- wrapping the `DropdownMenu` or `Menu` component in a
  `MenuConfigurationProvider` and setting `renderAsSheet={true}` or
  `renderAsSheet="phone"`
- setting `renderAsSheet={true}` or `renderAsSheet="phone"` directly on the
  `DropdownMenu` or `Menu` component

> Setting `renderAsSheet="phone"` will only render menus as sheets when the
> `AppSize` is `phone`.

You can configure additional sheet behavior in those three places like:

- `sheetHeader` - Normally an `AppBar` or a `DialogHeader` that would appear
  above the list of `MenuItem`
- `sheetFooter` - Normally an `AppBar` or a `DialogFooter` that would appear
  below the list of `MenuItem`
- `sheetPosition` - The sheet's position within the viewport. This defaults to
  `"below"`
- `sheetVerticalSize` - The sheet's vertical size. This defaults to `"touch"`

The example below will allow you to configure the `renderAsSheet` behavior so
you can play around with the default implementation. In addition, this example
will add a custom header and footer to the sheet that can also close the sheet
using the `useMenuVisibility` hook.
