The `TextArea` component is a general wrapper for the `<textarea>` element with
most of the same styles as the `TextField`. The `TextArea` will default to have
a minimal starting height and animates as the user types. This behavior can be
updated so that the transition for height changes is disabled and happens
immediately. The default behavior is to allow the textarea to infinitely grow,
but specific limits can be set by using the `maxRows` prop. The textarea will
grow until the row limit and then allow native scrolling behavior within the
textarea.

If this behavior is undesired, the `resize` prop can be changed to allow the
user to manually resize instead with one of:

- `horizontal`
- `vertical`
- `both` (native behavior)
