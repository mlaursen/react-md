The `useHoverMode` hook can also be updated to implement a "sticky" spec that
allows the user to click the element to toggle the visibility state. Once the
element has been clicked, the `onMouseEnter` and `onMouseLeave` behavior will be
disabled until the visibility is set to `false` once more.
