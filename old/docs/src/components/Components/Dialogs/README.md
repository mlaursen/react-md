Dialogs contain text and UI controls focused on a specific task. They inform
users about critical information, require users to make decisions, or involve
multiple tasks.

When a dialog is opened, it will attempt to focus the first focusable element in
it's content and it will trap keyboard focus within the dialog while opened.
When the dialog is closed, the previously focused element will be focused again.
These additions have been added base on the
[Using the dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role)
specs.
