This example will be fairly simple and show some example messages you can send
using the `addMessage` API. The messages are fairly customizable out of the box
and it can render:

- a single line of text
- two lines of text
- an optional action button
- two lines of text stacked above an action button
- any renderable content

The basic requirements for a message is to contain a `children` property that
will be used as the main text within the `Toast`. This should normally be a
short string, but it can be any renderable React node as well. Here's a quick
example:

```tsx
addMessage({ children: "This is an example message" });
addMessage({
  children: <span className="custom-style">This is another message</span>,
});
```

When you want to add an action button to the message, you can provide a new
property named `action`. This should either be a string, a renderable React
node, or an object of button props. The action button will be defaulted to:

- gain the `"flat"` style
- gain the `"secondary"` theme color
- have an id of `actionProps.id`, `${toastId}-toast`, `${toastId}-toast`, or
  `undefined` if none of the preceding ids are available
- immediately hiding the toast when clicked
