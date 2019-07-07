# @react-md/transition

Create CSS transitions using the provided transition timing functions for fluid
animations. Also includes a `Collapse` component to animate height changes.

## Installation

```sh
$ npm install --save @react-md/transition
```

The `rmd-transition-shadow-transition` mixin allows you to "performantly"
transition between two box shadow values using the
[opacity trick](http://tobiasahlin.com/blog/how-to-animate-box-shadow/). This
mixin automatically creates a pseudo `::before` or `::after` element with the
final box shadow and animates the opacity once one of the `$active-selectors`
are triggered. The code below will help explain this part a bit more.
