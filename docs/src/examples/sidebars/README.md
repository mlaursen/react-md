The sidebar is responsive by default. This means that when it
matches whatever media query you have for mobile, the sidebar
will be displayed with an overlay and the sidebar will be the
top most element on the screen. If does not match the mobile
query, the sidebar will be displayed below a fixed toolbar.

The default behavior can be overridden by setting `fixed={true} overlay={true}`.
This will make the overlay always visible and the sidebar to always be the top most
element on the screen.

Since the sidebar is a fully controlled component, you must pass a function
that closes the sidebar to `onOverlayClick` if you want it to close when
the overlay is clicked.

The content in the sidebar can be created by passing a header, a list of items that
will be used to generate a `List` with `ListItem`/`ListSubheader`/`Divider`,
or by passing in children.
