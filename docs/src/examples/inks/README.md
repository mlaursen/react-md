Material design Ink is used to show that an element has been touched or has focus. You
can add ink to any component by extending `%md-ink-item` (it just adds a relative position
and hides overflow) from your scss and using the `Higher Order Component`: `injectInk`.

`injectInk` will update your component with keyboard, mouse, and touch listeners to automatically
add ink when the item has been interacted with. It will also pass a prop named `ink` which you should
add to your component. It is required to add all the event listeners to your component as well.
I recommend just adding `{...this.props}` for simplicity. The table below lists all the required
event listeners.

> Just a reminder that you should not have a clickable element inside of another clickable element.
