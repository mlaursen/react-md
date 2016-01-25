### Customization

You can hopefully style anything by checking out the SASS Docs and adjusting variables/using mixins as
necessary.

### Fonts

You can include fonts by linking them in your index.html,
a [webfontloader](https://github.com/typekit/webfontloader),
or locally hosting them.

If you locally host the fonts, there are two mixins for defining the `font-face` required.

See [host-google-font](https://mlaursen.github.io/react-md/sassdoc/#undefined-mixin-host-google-font)
and [host-material-icons](https://mlaursen.github.io/react-md/sassdoc/#undefined-mixin-host-material-icons)
for more information.


### Colors

This project has been set up for using the [Material design color palette](https://www.google.com/design/spec/style/color.html#color-color-palette).
You can access all these colors with a sass function `get-md-color($primary, $hue, $secondary)`. 
There is a good write-up at [the sass documentation](http://mlaursen.github.io/react-md/sassdoc/#undefined-function-get-md-color).

##### tl;dr

`primary` should be one of the colors from the color palette as a color string. ie: indigo
`hue` should be a number from 1-10 for what the hue should be. Defaults to 6 (the -500 suffix).
`secondary` - boolean if this is an accent color, so uses a range of 1-4.

### Theming

The initial theme is the one you see for this documentation website.

```scss
$md-primary-color: indigo !default;
$md-secondary-color: pink !default;
$md-secondary-hue: 2 !default;
```

You can override these variables to style your app very quickly.

If you would like more control, there are mixins with the prefix `md-theme-` that you can use
to specifically style one component. The default theme is created from the
[\_themes.scss](../master/src/scss/_theme.scss).

Some components are joined with the their parent class, while others are not.

#### Default theme

```scss
$primary: get-md-color($md-primary-color);
$secondary: get-md-color($md-secondary-color, $md-secondary-color-hue, true);
$text: $white-base;
$disabled-text: rgba($text, .7);

@include md-theme-text-fields($primary);
@include md-theme-snackbars();
@include md-theme-date-pickers($primary, get-md-color($md-primary-color, 5));
@include md-theme-select-fields($primary);

.md-primary {
  @include md-theme-toolbars($primary, $white-base);
  @include md-theme-buttons($primary);
  @include md-theme-tabs($primary, $secondary, $text, $disabled-text);
}

.md-secondary {
  @include md-theme-buttons($secondary);
  $secondary: get-md-color($md-secondary-color);
  @include md-theme-toolbars($secondary, $white-base);
  @include md-theme-tabs($secondary, $primary, $text, $disabled-text);
}
```

### Media Queries

The sass is currently set up to have very basic media queries to figure out if it is
mobile or desktop. The current breakpoint is just at `600px`.

If there is a component that has different mobile/desktop versions, there is a mixin in the form
of `md-component-name-desktop` or `md-component-name-mobile` that you can use.

#### Default media queries

```scss
@media only screen and (min-width: 0px) and (max-width: 599px) {
  @include md-date-picker-mobile();
  @include md-select-field-mobile();
  @include md-snackbar-mobile();
  @include md-tab-mobile();
  @include md-text-field-mobile();
  @include md-toolbar-mobile();
}

@media only screen and (min-width: 600px) {
  @include md-date-picker-desktop();
  @include md-select-field-desktop();
  @include md-snackbar-desktop();
  @include md-tab-desktop();
  @include md-text-field-desktop();
  @include md-toolbar-desktop();
}
```
