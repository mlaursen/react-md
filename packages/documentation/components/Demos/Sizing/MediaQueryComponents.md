This package also exports some helper components that allow you to render
specific parts only when the `AppSize` matches specific devices. Since I want to
try to keep the app size minimal, the default helper components are:

- `PhoneOnly`
- `TabletOnly`
- `DesktopOnly`
- `MobileOnly`

You can always hook into the `AppSizeContext` and implement more specific
implementations if the need arises in your app.

This package also exposes some mixins that allow you to apply styles at specific
breakpoints as well:

- `rmd-sizing-phone-media`
- `rmd-sizing-tablet-only-media`
- `rmd-sizing-tablet-media`
- `rmd-sizing-desktop-media`
- `rmd-sizing-large-desktop-media`

The `rmd-sizing-phone-media` and `rmd-sizing-tablet-only-media` will be the only
mixins that allow for the breakpoints to prevent styles in large screen sizes
while the `rmd-sizing-tablet-media`, `rmd-sizing-desktop-media` and
`rmd-sizing-large-desktop-media` will work by using the `min-width` of the
specific media matcher.

The example below will showcase the `*Only` components and render text when the
app size matches as well as a few examples of using the mixins to add dynamic
styles based on the screen size.
