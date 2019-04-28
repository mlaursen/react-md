A dialog is used to show important content above all other elements within the
page. This is normally used for alerts, confirmations, or just temporary
content. The dialog within react-md also has the additional features for
accessibility:

- automatically focus the dialog on mount for keyboard users
- prevent elements outside of the dialog to be focused
- close via the escape key (see the [modal example below](#modal-dialog-example)
  for more info)
- prevent the page outside of the dialog from being scrolled

To complete the dialog accessibility requirements, every dialog **must** provide
an `id` and either an `aria-label` describing the dialog or an `aria-labelledby`
id that points to an element describing this dialog.
