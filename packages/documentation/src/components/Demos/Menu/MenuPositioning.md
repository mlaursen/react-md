If you haven't noticed before, but the `DropdownMenu` component will
automatically try to position itself within the viewport using the
`useFixedPositioning` hook. The default behavior is to "anchor" itself to the
top-right of the `MenuButton` and animate downwards. If there isn't enough room
within the viewport to render the entire menu, it'll swap the horizontal and
vertical positions as needed. There's a great write up on the
[useFixedPositioning example](/packages/transition/demos#use-fixed-positioning-title)
that goes into details about this positioning logic, so feel free to read up on
it there.

The `DropdownMenu` allows you to configure the positioning anchor so that you
can position the menu relative to the `MenuButton` for almost all wanted cases.
The example below will show all the anchor options and how it will automatically
swap or try to remain visible within the viewport if the menu is too big.
