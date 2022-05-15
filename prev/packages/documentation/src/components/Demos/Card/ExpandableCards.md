Another common pattern is to create expandable cards so that the base
information is available at the beginning, but more can be viewed afterwards.
This can be accomplished by using:

- `CardActions` component with a `Button` to handle toggling the visibility and
  base layout
- `Collapse` component from #transition to handle the expand and collapse
  animations
- `useToggle` hook from #utils to handle the visibility state

> If you used `react-md` in the past, you'll notice that this is a lot different
> than the previous behavior of being able to add `expandable` to different
> `Card` parts. It ended up causing a lot of problems and had less flexibility,
> so I am now exposing just the base components and utils so you have all the
> control as needed.
