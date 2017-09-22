## Color Definitions
Every material design color is available as a sass variable in the form of
`$md-COLOR-HUE` and `$md-COLOR-a-HUE` to get a base color and accent color
respectively. If you waned to style something with a background of blue and
a text color of a green accent, you can use the variables as follows:

```scss
.some-class {
  background: $md-blue-500;
  color: $md-green-a-100;
}
```

All colors will have primary colors with suffixes: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900`
and all colors except for `brown`, `grey` and `blue-grey` will have accent suffixes of
`100, 200, 400, 700`. In addition, the `$md-black-base` and `$md-white-base` variables are available.

To help with getting specific colors, there is a Sass Map of every color and a mixin that will create
two class names for each material design color.

### `$md-color-map` 
This map contains every material design color so that you can quickly access them and optionally use
the [Sass Map functions](http://sass-lang.com/documentation/Sass/Script/Functions.html#map-functions)
to programmatically get colors. This is really just used for the `react-md-color-class-names mixin`.

### `mixin react-md-color-class-names`
This mixin will create two class names for every material design color: one for styling `color` (`--color`) and the
other for styling `background` (`--background`).

For example, if you want to display a warning by styling the background orange, you could apply
`.md-orange--background` to your component.

> By default, these utility class names will not be included with the `react-md-everything mixin`.
They can be included by either manually using the `react-md-color-class-names mixin` or by setting
the `$md-colors-include-class-names` variable to `true` before include the `react-md-everything mixin`;

View the SassDoc tab for more information.

## Available Colors
