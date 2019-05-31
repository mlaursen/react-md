App bars are generally great for using in your main layout, so there is also the
ability to fix the app bar at the top of the page. Unfortunately, once the app
bar has been fixed, your main content can be covered by the app bar which isn't
super great. To work around this, you can apply any of the following class names
to your main content element to be correctly offset based off of the app bar's
size:

- `APP_BAR_OFFSET_CLASS_NAME`
- `APP_BAR_OFFSET_DENSE_CLASS_NAME`
- `APP_BAR_OFFSET_PROMINENT_CLASS_NAME`
- `APP_BAR_OFFSET_PROMINENT_DENSE_CLASS_NAME`

An alternative is to also use the
[rmd-app-bar-offset mixin](sassdoc#mixin-rmd-app-bar-offset) which will apply
the correct offset to your custom class implementation. This one allows for a
bit more flexibility and control since you can specify how this offset should be
applied. The class names listed above will only every apply `padding-top`.
