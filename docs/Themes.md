# Themes
The application should define a `primary` and `secondary` color. The `primary` color
should be chosen from one of the `'-500'` colors and the `secondary` should be one of
the `'a-'` colors.

The default color palette is defined as:

```scss
$md-primary-color: $md-indigo-500 !default;
$md-primary-color-hue-1: $md-indigo-400 !default;

$md-secondary-color: $md-pink-a-200 !default;
$md-secondary-color-hue-1: $md-pink-a-100 !default;
```

#### Updating/Changing the Theme
The theme can be changed at a global level or at a section level. To override
the theme at a global level, you can do the following:

```scss
@import '~react-md/src/scss/helpers/all';

$md-primary-color: $md-teal-500;
$md-primary-color-hue-1: $md-teal-700;
$md-secondary-color: $md-lime-a-400;
$md-secondary-color-hue-1: $md-lime-a-200;

@import '~react-md/src/scss/react-md';
```

Your application should now be using `teal` as a primary color and `lime` as
a secondary color.

If you would like to do it at a section level, you can use the
[md-theme-most](/sassdoc/#colors-mixin-md-theme-most) mixin.

```scss
@import '~react-md/src/scss/helpers/all';

.alternative-theme {
  @include md-theme-most($md-deep-orange-500, $md-deep-orange-400, $md-light-blue-a-200, $md-light-blue-a-100);
}
```

#### Updating Theme Component at a Time
If you are not using all the components, it is recommended to not import the
entire `rect-md.scss` file. You will then need to include the specific components
and utilities you will be using.

If a component is styled based on the theme, there will be a mixin named `md-theme-COMPONENT`.

```scss
@import '~react-md/src/scss/helpers/all';
@import '~react-md/src/scss/utils';
@import '~react-md/src/scss/typography';
@import '~react-md/src/scss/components/buttons';
@import '~react-md/src/scss/components/inks';
@import '~react-md/src/scss/components/pickers';
@import '~react-md/src/scss/components/text-fields';

$md-primary-color: $md-deep-orange-500;
$md-primary-color-hue-1: $md-deep-orange-a-100;
$md-secondary-color: $md-light-blue-a-400;
$md-secondary-color-hue-1: $md-light-blue-a-200;

@include md-theme-pickers($md-primary-color, $md-primary-color-hue-1);

.md-secondary {
  @include md-theme-buttons($md-primary-color);
}
```
