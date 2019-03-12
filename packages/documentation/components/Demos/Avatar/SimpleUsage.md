Avatars are a great way to represent people or specific objects within your app.
They can render as:

- an image
- text content
- icon

When you supply a `src` prop, the avatar will be be rendered with an `<img>` tag
and some additional styles applied. For accessibility, you should also supply
the `alt` prop. The image will also be updated to have `role="presentataion"`
since screen readers normally don't need to be notified for these sort of things
and can become a nuisance when there is a giant list of avatars.
