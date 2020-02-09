One use-case for chips is to be used for displaying filter behavior in a compact
form when checkboxes or dropdowns are not desired. A filter styled chip can be
created by setting the `selected` prop to `false` or `true`. The default
behavior will be to animate a check icon in and out of view while the selected
prop changes unless the `disableIconTransition` prop is enabled.

To help out with accessibility, the chip will also be updated to match the
[toggle button specs](https://www.w3.org/TR/wai-aria-practices/#button) by
setting the `aria-pressed` prop once the `selected` prop is enabled.
