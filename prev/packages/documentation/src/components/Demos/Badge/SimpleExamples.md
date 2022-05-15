The most common use-case for a badge is to be displayed on a button indicating
the number of new alerts for a user. This package exports a nice wrapper
component named the `BadgedButton` which will default to rendering as a icon
button with a notification `FontIcon` and an `aria-label="Notifications"`.

The default behavior of the `Badge` is to not render when the children are `0`
or `null` since it normally isn't helpful to display an "empty" badge. This
behavior can be disabled by using the `disableNullOnZero` prop.
