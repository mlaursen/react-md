One of the most useful things that can be applied to large tables is to apply
sticky headers so that the user can still view what a column type is while they
scroll through a large data set. `react-md` has implemented this functionality
with the `position: sticky` implementation and should work for all your
use-cases if you don't need to support IE11 (which isn't a supported browser for
this library anyways). If you aren't familiar with the sticky position behavior,
it's recommended to read over the sticky positioning documentation on the
[Mozilla Developer site](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning)
but I'll also provide a quick summary next.

When an element has `position: sticky` set, it will be fixed within the
**closest scroll container** based on the `top`, `right`, `bottom`, and `left`
properties. If there are no parent elements that have set the `overflow`
property to `scroll` or `auto`, the sticky elements can be positioned relative
to the entire document's scroll position within the viewport. This is actually
one of the reasons why the `Table` component is not responsive by default and
automatically wrapping itself in the `TableContainer` component for scroll
behavior. Since the scroll container is opt-in, the sticky elements can fixed to
the `top`, `right`, `bottom`, and `left` of the **viewport**! Super exciting. I
know.

Now that the quick summary is over it's time to get into some examples of how
this is used within `react-md`. To create sticky headers, all that is required
is to enable the `sticky` prop on the `TableHeader` component which will update
every `TableCell` child to use `position: sticky` with `top: 0`. If the `Table`
has been wrapped in the `TableContainer` or another element with `overflow` set,
the headers will be fixed to the top of the scroll area once the user has
scrolled a bit.

To start off, the example below will use the `TableContainer` component with a
`max-height` to show how this functionality works. If you would like to see a
viewport based approach, skip to [Part 2](#sticky-columns-part-2) of the sticky
columns examples.
