When using a tooltip, you can set the position manually by providing a
`position` prop. One of the downsides to this is that if the container element
is near the edge of the viewport and the tooltip is too big, the tooltip will
not fit in the page! This is where auto positioning tooltips come in.

To use this feature, just remove the `position` prop or define a custom
`defaultPosition`. The tooltip will now automatically determine the "best"
location to render itself within the viewport relative to the container element.
Sounds too good to be true, right? The way that it'll work is that if the
position will swap between the same types:

- horizontal: `"left" | "right"`
- vertical: `"above" | "below"`

So here's a general flow:

- `defaultPosition="below"`
- tooltip show event is triggered
  - the tooltip container element's position within the viewport is checked. If
    it's within the lower bounds of the viewport (25% default), it'll swap the
    position to `"top"`
- the tooltip animation starts
  - the tooltip's size is now added to the positioning calculation. If it wasn't
    swapped and it is now too big, it'll swap positions.
- the tooltip is still too big?
  - this is a really uncommon case since tooltips should be fairly short, but if
    the tooltip can't be positioned within the viewport because it is larger
    than the viewport size, it'll be set to span the entire viewport with some
    margin instead.

This same flow will be applied to all positions and seems to work fairly nicely.
