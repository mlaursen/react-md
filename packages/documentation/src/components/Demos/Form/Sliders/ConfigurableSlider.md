The `useSlider` (and `useRangeSlider`) support an `updateOn` option that can be
used to make the slider's value only update once the user has blurred the
slider's thumb or completed dragging. This is useful when you don't need to use
the value immediately and can be activated by setting `updateOn: "blur"`.

> There is also an `onChange` callback that can be used along with this updated
> behavior if desired.

This example allows you to configure some of the different props for the
`Slider` component and showcasing the `updateOn` behavior.
