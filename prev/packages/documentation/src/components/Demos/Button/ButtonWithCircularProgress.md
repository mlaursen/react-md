If you have the #progress package installed, the `Button` component will
automatically update the size of any child `CircularProgress` to be the same
size as an icon. Since you'll normally want to prevent the button from being
interactable while displaying a loading spinner, you can set the button's
`theme` to `"disabled"` which will make the button look and behave as if it was
disabled without actually enabling the `disabled` attribute so that it is still
keyboard focusable.

This example will show how you can add a `CircularProgress` as a child with the
`TextIconSpacing` component as well as showing the `"disabled"` theme behavior.

> You can also check out the
> [progress bars within buttons demo](/packages/progress/demos#within-buttons)
> for a more complex example as well as using the `LinearProgress` component.
