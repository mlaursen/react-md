You can also use the `AsyncSwitch` component that will update the behavior of
the `Switch`. When the `loading` prop is enabled, the `Switch` will gain a
circular progress indicator and prevent the switch from being toggled again
until the `loading` prop is set to `false` . This sort of switch is useful if
you are trying to send an API request to update some behavior, but it fails due
to some error.
