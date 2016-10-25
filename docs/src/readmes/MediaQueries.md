# Media Queries
A component's media queries will automatically be included by default when the component's mixin
is included. You can change this default behavior by updating the `$md-media-included` variable
to `false`. If it is false, you will have to manually include each component's media query.

### Example

```scss
@import '~react-md/src/scss/react-md';

$md-media-included: false;
@include react-md-buttons;

@media #{$md-mobile-media} {
  @include react-md-buttons-mobile;
}

@media #{$md-desktop-media} {
  @include react-md-buttons-desktop;
}
```

This might not be the most useful thing in the world, but it gives a lot more control.
