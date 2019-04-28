An alert dialog variant should be used when assestive technologies should
immediately bring the user's attention to the dialog. This pattern is normally
used for confirmation dialogs. To create an alert dialog, the only change
required is to add a new prop: `role="alertdialog"`.

Since you most likely want the user to press one of the actions in this dialog
instead of being able to close it by clicking the overlay or the escape key, you
can enable the `modal` prop to disable this behavior. The `modal` prop usually
goes hand-in-hand with updating the `role` to be `"alertdialog"`, but it can be
used with a normal dialog as well.
