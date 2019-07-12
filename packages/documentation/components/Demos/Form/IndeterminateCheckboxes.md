The `Checkbox` component also supports an indeterminate state to help indicate
that it controls the checked state for other checkboxes as well. To use this
feature:

- enable the `indeterminate` prop when all the checkboxes are not checked
- set the `aria-checked="mixed"` when at least one checkbox is checked but not
  all
- provide a space-delimited string of all the checkboxes it controls as the
  `aria-controls` attribute

> The `aria-controls` part is a bit iffy since
> [it might not actually do anything for screen readers](https://www.heydonworks.com/article/aria-controls-is-poop).
> and [Lighthouse](https://developers.google.com/web/tools/lighthouse/) might
> also flag it as an invalid `aria-` attribute.
