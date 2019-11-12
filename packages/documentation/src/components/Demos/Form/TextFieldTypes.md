The `TextField` component also has some limited support for rendering as other
text input tyes:

- `password`
- `number`
- `tel`
- `email`
- `date`
- `time`
- `datetime-local`
- `month`
- `week`
- `url`

When you set the `type` prop to one of these values, no additional functionality
or validation will be built in. The only support out of the box is to be styled
correctly with some of the different types.

The `"password"` type is sort of an exception for this as there is a helper
component: `Password` that allows the user to conditionally show the password in
plain text.
