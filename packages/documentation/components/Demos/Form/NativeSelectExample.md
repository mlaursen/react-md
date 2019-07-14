The `NativeSelect` component is a simple wrapper for the `<select>` element with
`TextField` styles. Just like native `<select>` elements, this wrapper **does
not support**:

- placeholder text
- enabling `readOnly`

That being said, the demo below will show you some patterns you can use to fake
placeholder text using the floating label and an empty `<option>` element as
well as a read-only view by disabling all `<option>`s.
