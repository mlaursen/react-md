The main purpose of the `Layover` is to attempt to keep a child component fixed to a
parent and stay within the viewport only once the child has become "visible" on the page.
This should probably only be used as an internal component that is used behind the scenes
in the [Menu](/components/menus), but it was helpful to create a documentation page for testing
and future documentation.

The `Layover` will attempt to automatically make the child component initially render within the
viewport once the visibility has been toggled to `true`. This is super helpful since it will
make components that would appear off screen due to scrolling too much fully visible. If the user
attempts to scroll, the child can either automatically hide or attempt to move itself to stay within
the viewport. When the user scrolls too far down, it will flip the child so that it now appears
over the parent instead of below. If the user still scrolls down, the child will disappear. The
same logic is applied if the user scrolls upwards (flip to be from above to below).

Some additional features is that the `Layover` can attempt to make the child span the entire viewport.
This "feature" really only works well on Android devices since iOS does not include the soft keyboard
as part of this calculation and there is no way to detect keyboard visibility or size reliably.
