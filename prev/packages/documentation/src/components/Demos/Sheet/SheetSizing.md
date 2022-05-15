The `Sheet` updates it size based on whether it is fixed to the `top`/`bottom`
or the `left`/`right` viewport edges. Just for clarity, the `Sheet` will call
the `top`/`bottom` positions the `verticalSize` and the `left`/`right` positions
the `horizontalSize`.

The `verticalSize` support the following behavior:

- `"none"` - the size is based on the content, but is still limited to the
  viewport height. There is no `min-height` applied.
- `"touch"` - the size is based on the content, but is limited to the viewport
  height minus a small recommended "touchable" area that allows the user to
  close the sheet by clicking an overlay. There is no `min-height` applied.
- `"recommended"` (default) - the recommended material design sizing that forces
  a `max-height` of `50vh` and a `min-height` of `3.5rem`.

The `horizontalSize` supports the following behavior:

- `"none"` - the size is based on content, but is still limited to the viewport
  width so that the horizontal scrolling will not occur within the page.
- `"touch"` - the `min-width` is set to be the entire viewport width minus a
  touchable area and `max-width` is set to `20rem` and is normally recommended
  for mobile devices
- `"static"` - the width is set to a static `16rem` and generally used for
  landscape tablets and desktops.
- `"media"` (default) - automatically switches between `"small"` and `"large"`
  once the tablet `min-width` is reached in media queries.
