This package exports an extremely nice component for showing alerts if you are
able to only use the React context API to queue up these alerts named
`MessageQueue`. As the name suggests, this is a queue of messages (toasts) to
display to the user in a `Snackbar` that has built in accessibility so that new
messages will be read out to screen readers.

To use this functionality, you'll normally want to mount the `MessageQueue`
component near the root of your app and then use the `addMessage` function
provided by the `useAddMessage` hook. Whenever the `addMessage` is called, a
message will be pushed onto the queue and automatically shown to the user for 5
seconds before automatically hiding and triggering the next message if one
exists. However, if the browser window loses focus while the message is
displayed, the timeout will be stopped and restarted once focus is returned so
that messages aren't accidentally lost or not shown.

The autohide functionality is configurable to be different times or completely
disabled on a per-message basis.
