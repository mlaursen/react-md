Since it can be a bit annoying having to set the `dense` prop via js for all
these different app bars, it's possible to create an auto-dense theme using
media queries and the provided mixins from `@react-md/app-bar`. This example
will automatically set the `AppBar` and the related actions to `dense` when the
viewport size is considered "desktop".
