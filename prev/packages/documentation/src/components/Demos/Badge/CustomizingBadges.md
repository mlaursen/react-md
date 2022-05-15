Badges do not need to always be rendered with a `Button` and can be used as
supplementary text for any other element. To create a custom badge, you can use
the `BadgeContainer` and `Badge` components directly instead of the
`BadgedButton`.

The `BadgeContainer` is just a simple wrapper that will add
`display: inline-flex` and `position: relative` so that the `Badge` can be
displayed relative to the other children. You can also update some of the css
variables for the badge to add additional offset to the container element or
increase the font-size as needed.

> You don't need custom components for updating the theme. It just tied together
> with the custom components section so it was added here. The custom theme can
> be applied by adding a new `className` to the `BadgedButton` and using the
> `rmd-badge-theme-update-var` `mixin` as well.
