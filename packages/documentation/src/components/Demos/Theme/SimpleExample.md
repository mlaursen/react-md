##### If you have not done so already, you should read the #defining-a-theme documentation before continuing on in this page. The demos within the page will be more about updating existing themes instead of creating them.

This example will show how you can use the provided mixins to update the theme
for some custom components. The `@react-md/theme` package exports some useful
Sass functions and mixins for using and modifying your theme:

- [rmd-theme](/packages/theme/sassdoc#mixin-rmd-theme) - Mixin for applying one
  of the theme values to a css property.
- [rmd-theme-update-var](/packages/theme/sassdoc#mixin-rmd-theme-update-var) -
  Mixin for updating one of the theme CSS variables with a new value.
