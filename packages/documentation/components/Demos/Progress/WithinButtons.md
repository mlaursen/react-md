Since the progress bars are rendered using `<span>`s, you can also render them
within buttons. They can be placed using the `TextIconSpacing` component or as
an overlay. When using the `CircularProgress` within buttons, you'll want to
update the size as well using the `rmd-progress-theme-update-var` mixin so that
it can fit correctly within a button.

The example below will show how you can use the `CircularProgress` as the icons
within a `Button` as well as using the `LinearProgress` and `CircularProgress`
as an overlay.
