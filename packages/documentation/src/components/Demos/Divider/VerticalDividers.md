It is also possible to create vertical dividers using the `VerticalDivider`
component instead of the base `Divider` component. I would personally recommend
using the [rmd-divider-border](sassdoc#mixin-rmd-divider-border) mixin instead
since it a bit easier when using borders instead of a component, but it is
possible. The `VerticalDivider` will automatically update its own height based
on the parent element's height so that it can be shown.
