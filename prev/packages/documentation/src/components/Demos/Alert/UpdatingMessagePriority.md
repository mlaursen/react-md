Whenever you call the `addMessage` the new message will be added to the end of
the queue. This is great for most use cases, but what about important
notifications that need to be shown immediately such as online/offline status?
When you create a message, you can also add a `messagePriority` property that
will update the message's insertion point in the queue. The default behavior is
to always add the new message at the end of the queue, but there is also support
for:

- `"normal"` - the default behavior or adding the message to the end of the
  queue
- `"next"` - the message will be shown immediately if there are no messages in
  the queue or will be shifted to the next position in the queue so it will be
  shown once the current message is dismissed or auto-hidden.
- `"immediate"` - triggers the exit animation for the current message (if there
  is one) and shows this message instead. When this message is hidden, the
  previous message will be shown again
- `"replace"` - immediately swaps out the current message with the new one while
  restarting the display timer. The previous message will never appear again
  unless triggered manually
