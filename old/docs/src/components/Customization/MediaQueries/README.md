# Media Queries

A component's media queries will automatically be included by default when the
component's mixin is included. You can change this default behavior by updating
the `$md-media-included` variable to `false`. If it is false, you will have to
manually include each component's media query.

### Example

```scss
@import "~react-md/src/scss/react-md";

$md-media-included: false;
@include react-md-buttons;

@media #{$md-mobile-media} {
  @include react-md-buttons-mobile;
}

@media #{$md-desktop-media} {
  @include react-md-buttons-desktop;
}
```

This might not be the most useful thing in the world, but it gives a lot more
control. If a component has different styles depending on the device size, there
will be a mixin for each media query. The mixin will be named
`react-md-COMPONENT-MEDIA_TYPE`. For example, the drawer has different styles
for mobile, mobile-portrait, mobile-landscape, tablet, and desktop. You can use
access these by one of the following:

```scss
// Required to be placed in correct media queries -- Only outputs styles
@include react-md-drawers-mobile;
@include react-md-drawers-mobile-landscape;
@include react-md-drawers-tablet;
@include react-md-drawers-desktop;

// Places all of the above in the corresponding media queries
@include react-md-drawers-media;
```

The SassDoc tab will list all the media queries available and what the default
breakpoints are.
