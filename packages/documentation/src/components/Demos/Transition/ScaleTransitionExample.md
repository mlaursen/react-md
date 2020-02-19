Another built-in transition is a simple scale transition that can either be

- `scale(0)` -> `scale(1)` (enter)
- `scale(1)` -> `scale(0)` (exit)
- `scaleY(0)` -> `scaleY(1)` (enter)
- `scaleY(1)` -> `scaleY(0)` (exit)

This is generally used for temporary material instead of the collapse transition
since it is slightly more performant and that it will not move other items
within the DOM while transitioning.

This transition can be used with the `ScaleTransition` component or a custom
usage with the `useCSSTransition` hook. The default transition will transition
both the x and y values, but enabling the `vertical` prop will change it to only
be the y value change.

> Note: You can also set your own `transform-origin` to modify these transitions
> even more.
