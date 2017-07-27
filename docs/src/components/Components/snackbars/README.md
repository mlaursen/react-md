Snackbars provide lightweight feedback about an operation by showing a brief message
at the bottom of the screen. Snackbars can contain an action.

The most effective way to use the `Snackbar` component is to have a global
snackbar that gets toasts pushed to it through some state framework (such as
Redux).

> NOTE: The snackbar does a shallow compare of the `toasts` prop and will dismiss/hide
toasts based on if it is not shallow equal. Defining the toasts on the component or in
the render might have unexpected results of duplicate toasts.

The `Snackbar` will have an an `alert` role when no action is specified and an `alertdialog`
role when an action has been provided to the toast. These roles have been added to help
screen readers get notified of the alerts. More info: [alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)
