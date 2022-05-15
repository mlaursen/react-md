You can also create dialogs that are fixed to other elements using the
`FixedDialog` component. This is generally used alongside badges and buttons to
show some additional information that can't be shown in a tooltip.

This dialog will be the same as other dialogs except for:

- the `disableScrollLock` prop is enabled by default
- the `classNames` are updated to be a scaling animation instead of transform
- the overlay will be invisible but still clickable

Since the `disableScrollLock` prop is enabled by default, the dialog will
attempt to stay visible within the viewport while the user scrolls and then
automatically hide once it can no longer stay in the viewport. This is _kind_ of
nice, but the drawback is that the page will scroll back to the `fixedTo`
element due to normal `Dialog` focus behavior.

> Another term for this component might be a `PopoutDialog`.
