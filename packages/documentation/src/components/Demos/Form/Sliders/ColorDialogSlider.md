As mentioned above, the `useSlider` provides an object of `controls` as the
second argument which is required to update the slider's value. The controls
include the following functions:

- `increment` - increment the `value` by the current `step` amount unless
  already at the `max` value
- `decrement` - decrement the `value` by the current `step` amount unless
  already at the `min` value
- `minimum` - set the `value` to the `min` amount
- `maximum` - set the `value` to the `max` amount
- `setValue` - a `React` "set state dispatcher" which can be used to set the
  value of the slider manually

This example will show how you can use the `controls` provided by the
`useSlider` to link a `TextField` to the `Slider` and render it inline.
