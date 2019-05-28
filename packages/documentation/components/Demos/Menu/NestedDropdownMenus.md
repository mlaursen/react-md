This package also supports creating nested menu items with the same
accessibility features as a single level menu using the `DropdownMenuItem`
component. These sorts of menus are really only used for complex desktop
applications where everything can't be done in a single menu (like Google Docs).

To create the nested menus, all you'll need to do is update the `items` prop in
the main `DropdownMenu` component to include you `DropdownMenuItem` that also
defines its own `items` to render. When you use this component, it'll basically
be the same as the `DropdownMenu` except it'll render as a `MenuItem` and add a
few small changes:

1. The menu can now be opened with the `ArrowLeft` and `ArrowRight` keys which
   will have the same behavior as the `ArrowUp` and `ArrowDown` keys
   respectively. So pressing the `ArrowLeft` key will open the menu and focus
   the last menu item by default while `ArrowRight` will open the menu and focus
   the first menu item
2. The menu can now also be closed by using the `ArrowLeft` key if the
   `MenuItem` that is currently focused is not another nested menu item.
3. The `role` of the `MenuItem` is updated to be `"button"` instead of
   `"menuitem"` for the required accessibility changes
4. **To fix a Safari bug, the nested menus will be portalled**.

The nested menus will be portalled out of the menu due to a weird visual bug
that ocurrs within Safari. For some reason, if you have `overflow` set along
with a parent that has `position` set to something other than static, the
`position: fixed` element will not be visible. To work around this, the nested
menus portal out of the parent menu so they can be displayed. Funilly enough, it
_is_ still rendered and you can click it, but you just can't see anything.

The example below will create an infinitely generating dropdown menu example
that is actually kind of fun to see how the positioning and cascading works. If
you'd like to see the Safari example, you can also toggle the checkbox to
disable the portal behavior.

> Note: if you end up creating a bit more than 7-10 nested dropdowns, it'll take
> a bit for the menus to close when you click outside of this example. You
> should probably never create such a bad interface/so many nested dropdowns in
> a real world app though.
