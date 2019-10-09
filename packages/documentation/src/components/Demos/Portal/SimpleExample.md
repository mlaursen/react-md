A really good example for portals is the
[fixing overflow issues](/packages/overlay/demos#fixing-overflow-issues) example
in the overlay package. I'll add another example blow for using the portal, but
the fix is really only valid on iOS devices.

This example will implement an example of a dropdown menu from the #menu
package, but with a lot of the functionality not implemented. When you set
`overflow: auto` or any non-default value, iOS devices might not actually render
it if the element has `position: fixed`. In these cases, you can use the
`Portal` component to render your fixed element outside of the scroll container
to ensure it is rendered.
