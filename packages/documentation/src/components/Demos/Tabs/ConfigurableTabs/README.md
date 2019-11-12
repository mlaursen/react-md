Unlike most of the components within `react-md`, tabs actually done have their
own theme. This is really because tabs are generally rendered in `AppBar`s or
inline with other content on the page. If you want to apply your own theme, it's
as simple as adding a `background-color` and optionally updating the indicator's
background color of the `primary` theme color is not visible on the new
background.

This example below will allow you to configure the tabs with a few different
options as well as show how you can define your own custom theme and updating
the indicator color with `rmd-tabs-theme-update-var` mixin.
