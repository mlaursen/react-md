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
`100, 200, 400, 700`.

All the colors are shown below:
