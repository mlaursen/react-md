Material design Ink is used to show that an element has been touched, clicked or has focus.

The `injectInk` HOC will update your component with keyboard, mouse, and touch listeners to automatically
add ink when the item has been interacted with. It is required to add all the event listeners to your
component as well.  I recommend just adding `{...this.props}` for simplicity. The table below lists all
the required event listeners.
