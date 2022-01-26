Custom context menus can be created using the `useContextMenu` hook with the
`Menu` component. The `useContextMenu` will provide a `onContextMenu` event
handler that should be passed to an element to control the context menu
visibility.

Just like normal `DropdownMenu` and `Menu` components, the context menu is fully
keyboard navigable and will return focus to the focusable element that triggered
the context menu when it is closed since it is possible to open a context menu
with the special
[menu key](https://www.google.com/search?q=context+menu+key&sxsrf=ACYBGNS6E8_5PVqngtUAl-9IJyCuWuqfkw:1580496680215&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi2mMX5wK7nAhUGZc0KHaNeD7MQ_AUoAXoECA8QAw&biw=1440&bih=821&dpr=2)
for Windows and Linux operating systems. Mac does not have a similar way to
trigger context menus from the keyboard, but it's possible to enable custom
accessibility options to create a context menu from the current pointer
location.
