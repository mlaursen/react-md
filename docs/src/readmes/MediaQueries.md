# Media Queries
Some components require different styles for mobile devices and desktop screens.
The default [_media-queries.scss](https://github.com/mlaursen/react-md/blob/master/src/scss/_media-queries.scss)
is included by default.

The initial breakpoints are just at `600px`. If you want to define your own media queries
or only use a few components, you can use the `md-COMPONENT-mobile` or `md-COMPONENT-desktop`.
There are also some components that are different on mobile for landscape or portrait. They will
be defined as `md-COMPONENT-portrait` or `md-COMPONENT-landscape`.  Check out the mixins in the
[sassdoc](/sassdoc) for full details.

#### Limited Components and Media Queries
Here is an example application that only uses `DatePickers`, `Buttons`, `TextFields`, and `Cards`.

```scss
@import '~react-md/src/scss/helpers/all';
@import '~react-md/src/scss/utils';
@import '~react-md/src/scss/typography';
@import '~react-md/src/scss/components/buttons';
@import '~react-md/src/scss/components/cards';
@import '~react-md/src/scss/components/inks';
@import '~react-md/src/scss/components/pickers';
@import '~react-md/src/scss/components/text-fields';

@media screen and (orientation: portrait) and (max-width: 599px) {
  @include md-pickers-portrait();
}

@media screen and (orientation: portrait) and (max-width: 599px) {
  @include md-pickers-landscape();
}

@media screen and (min-width: 0) and (max-width: 599px) {
  @include md-lists-desktop();
  @include md-text-field-mobile();
}

@media screen and (min-width: 600px) {
  @include md-lists-desktop();
  @include md-text-field-desktop();
  @include md-pickers-landscape();
}
```

This will not include all the other `react-md` components and update
the component styles at the given breakpoints.
