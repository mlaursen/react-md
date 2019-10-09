If the example above you might have noticed that if you spammed the "Add
Message" button, the same toast would be shown repeatedly by hiding and
reappearing. This is the default behavior out of the box but it can be updated
so that duplicates will be prevented entirely or that the timer will be
restarted if the same message is added to the queue while it is currently
visible.

> Note: Updating the behavior to `"restart"` will also prevent duplicates from
> being added even if the current message is not being shown.

When you change this behavior, you'll need to start adding a `messageId`
property to each message to uniquely identify each message. This works great if
you are using an internationalization library since you can just use the message
keys as a unique identifier. Otherwise, you can just create an enum of message
ids or a record of messages to display and reference those instead.
