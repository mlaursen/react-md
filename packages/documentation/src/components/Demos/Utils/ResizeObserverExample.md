The `useResizeObserver` hook is useful when you want to watch a specific element
resize when it can't be handled just by an entire page resize listener. The
`ResizeObserver` is useful when you want to watch a specific element resizing
when it can't be handled just by an entire page resize listener. This hook
returns an ordered list containing a `ref` object containing the current element
if you need access to that element and a `refHandler` that should be passed to
the target element.

The example below will animating between different max heights and max widths
once the "Start" button is pressed and show the current `height` and `width`
values within the table.
