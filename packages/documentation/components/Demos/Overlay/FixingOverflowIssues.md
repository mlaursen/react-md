If you attempt to render an overlay within a fixed element or a container that
has `overflow` set to the non-default value, the overlay might be contained
within that element and not cover the entire page. To work around this, the
`Overlay` component has also been updated to work with the #portal component it
can be portaled out of this container element and still cover the entire page.

The example below is a very simple version of something that might happen within
your app where you have some fixed container and another overlay within it.
Until the portal is enabled, the overlay will only cover 50% of the screen
instead of the entire page and some elements will not be correctly covered due
to z-indexing. Once the portal is enabled, it will cover the entire page again
correctly.
