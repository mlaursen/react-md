The `Collapse` component is used to transition a child element in and out of
view by animating it's `max-height`. This means that the child must either be an
`HTMLElement` or a component that forwards the `ref` to an `HTMLElement` and
applies the `style`, `className`, and `hidden` props to an `HTMLElement`.

This transition should hopefully be familiar to you by now since it is used in
the #expansion-panel and #tree packages.

> Note: This component **should not be used for `position: absolute` or
> `position: fixed` elements**. Instead, the `ScaleTransition` or just a simple
> `transform` transition should be used instead. Animating `max-height`,
> `padding-top`, and `padding-bottom` is much less performant than `transform`
> transition since it forces DOM repaints.
