By default, the `Portal` will render as the last child in the `document.body`.
You can provide either the `into` or `intoId` props to manually select where the
children should be portalled to instead.

The `intoId` prop will attempt to find an element with the provided `id` and
render inside of that element while the `into` prop can either be a query string
for
[document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
or a function that returns a DOM element.
