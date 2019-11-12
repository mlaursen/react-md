The example below will show how you can use the `MediaContainer` component to
create responsive images that are based on the current size of the
`MediaContainer`'s width. The `MediaContainer` will automatically make any:

- \<img>
- \<video>
- \<iframe>
- \<embed>
- \<object>

element responsive by default. `<svg>`s will only be responsive if they are a
direct child of the `MediaContainer` so that you can use the `MediaOverlay`
component (example below) to include SVG Icons as normal.
