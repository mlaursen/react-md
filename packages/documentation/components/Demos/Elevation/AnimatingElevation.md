This package also exports 2 additional mixins that might be useful:

- `rmd-elevation-shadow-transition`
- `rmd-elevation-transition`

The `rmd-elevation-shadow-transition` mixin allows you to "performantly"
transition between two box shadow values using the
[opacity trick](http://tobiasahlin.com/blog/how-to-animate-box-shadow/). This
mixin automatically creates a pseudo `::before` or `::after` element with the
final box shadow and animates the opacity once one of the `$active-selectors`
are triggered. The code below will help explain this part a bit more.

The `rmd-elevation-transition` mixin is just a wrapper for the
`rmd-elevation-shadow-transition` mixin that only works with different
elevations. You'll primarily want to use this mixin unless you want to merge box
shadow values together.
