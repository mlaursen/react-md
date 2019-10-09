Most grid systems define a static number of columns that should appear on each
row and have each cell have a percentage width based on how many columns they
should span. One of the most well-known ones is the
[bootstrap grid system](https://getbootstrap.com/docs/4.1/layout/grid/) that
defines a 12 column grid system. This is nice for a lot of cases, but it is a
bit restrictive since you'll need to test **every single viewport width** to
ensure that each cell shows up nicely and add additional breakpoints to increase
cell width as needed. What if you just want to say:

"I don't care how many columns there are at a time, but each cell should **grow
up to `X`px** and columns should be added as needed"?"

This is where the `GridList` component comes in handy since that's exactly what
it does. This component will try to show as many columns as possible by trying
to render as many "full width" cells as possible until it reaches the
container's width. If there is still some leftover room, each cell will shrink
and a new column will be added.

The example below will allow you to configure:

- the number of cells
- each cell's margin (optional prop) that gets applied to the `top`, `right`,
  `bottom`, and `left` of each cell
- each cell's max-width (optional prop)
- the container's padding (optional prop)

> The `containerPadding` prop is a bit weird as it is really the total number of
> pixels to subtract from the `container.offsetWidth` since `padding` and
> `border` widths are included. The `GridList` will automatically subtract the
> current visible scrollbar width (if the OS renders them inline with content),
> but there isn't anything built in at this time to subtract padding and border
> for performance concerns. It's much easier to just update this value if you
> change the padding or add a border to this component.
