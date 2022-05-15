The `NativeSelect` component is a simple wrapper for the `<select>` element with
`TextField` styles. Just like native `<select>` elements, this wrapper **does
not support**:

- placeholder text
- enabling `readOnly` (it can almost manually be done by disabling each option
  yourself, but it'll make it impossible to close on mobile devices if it there
  are so many options that it covers the entire viewport)
