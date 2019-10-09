At this time, the `@react-md/elevation` package is a bit different than the
other packages since it only exports utility functions and **does not generate
any styles or expose any React components**.

The main export of this package is the `rmd-elevation` mixin which will allow
you to add box-shadow to any element from any of the 24 available material
design elevation heights. The example below will show all the different
elevations, so you can pick and choose what is needed for your component. I
would recommend toggling the light and dark theme of this app as well to show
how the elevation looks depending on background color.

> This package is used internally for many of the other packages that create
> "temporary" material such as menus and sheets.
