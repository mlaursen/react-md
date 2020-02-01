Custom context menus can be created within `react-md` by using the
`useContextMenu` hook along with the `Menu` component. The `useContextMenu` hook
will maintain the same positioning logic so that it will attempt to render
itself within the viewport and update its position to be relative to the pointer
instead of the container element. It also returns the following ordered list:

- an object of props to provide to the `Menu` component to handle its
  visibility, a default id, and positioning options so the menu is rendered from
  the pointer location when needed
- a `onContextMenu` handler that should be added to the element that triggers a
  custom context menu
- a React `setState` function for manually toggling the visibility of the menu
  yourself (probably won't be used much).

The hook has some sensible defaults, but it's possible to provide your own
configuration object that has a custom `id` for the menu, a positioning
`anchor`, as well as custom `classNames` for the menu transition. This object
also allows for a custom `ref` that will be merged with the returned ref from
this hook if you need access to the `Menu`'s DOM node.

Just like normal `DropdownMenu` and `Menu` components, the context menu is fully
keyboard navigable and will return focus to the focusable element that triggered
the context menu when it is closed since it is possible to open a context menu
with the special
<a class="rmd-link" href="https://www.google.com/search?q=context+menu+key&sxsrf=ACYBGNS6E8_5PVqngtUAl-9IJyCuWuqfkw:1580496680215&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi2mMX5wK7nAhUGZc0KHaNeD7MQ_AUoAXoECA8QAw&biw=1440&bih=821&dpr=2" rel="nofollow">context
menu key</a> for Windows and Linux operating systems. Mac does not have a
similar way to trigger context menus from the keyboard, but it's possible to
enable custom accessibility options to create a context menu from the current
pointer location.

The example below will implement some custom context menus for each content item
within the fake Google drive with zero functionality.
