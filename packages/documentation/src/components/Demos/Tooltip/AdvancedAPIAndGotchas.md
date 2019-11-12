All the examples above might have seen like "magic" for how the tooltip events
are added to the child component. The way the tooltip works is that it clones
the child element and injects the required accessibility props and event
handlers into it for convenience. This means that if your component doesn't
accept the required event handlers and pass it down to a DOM node or the DOM
node is not focusable, the tooltip won't work!

This normally happens when you create a custom component in your app, add a
tooltip to some `Text` instead of a focusable element, or using `Fragment`s. In
these cases, you can use the "advanced API" of using the `children` renderer
pattern. The examples below will show a few "gotchas" with the tooltips and an
example of the children renderer pattern by printing out the props and adding
the tooltip to a button.
