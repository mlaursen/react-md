The `Collapse` component is used to animate elements appearing and
disappearingfrom view inline with other elements. You've already seen this being
used throughout the app since the main navigation uses this animation to handle
the additional routes being visible. Unlike v1 of `react-md`, the transition
duration **will be fixed** to `250ms` while entering and `200ms` while leaving
by default instead of using a spring animation.

To get the transition to work, you can either use a native DOM element like a
`<div>` or `<span>` as the children, or use a component that passes `style`,
`className`, and a `ref` down to the DOM element. Since `react-md` always pass
these props down and forward all refs, it'll work out of the box for any
component from this library.
