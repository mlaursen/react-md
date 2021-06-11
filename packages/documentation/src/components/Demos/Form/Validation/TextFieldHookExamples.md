Form validation is pretty difficult and there's a lot of parts involved. If you
looked over the
[Simple Help and Error Messages](#simple-help-and-error-messages) example you
can see that it still isn't entirely "simple".

> Note: You should check out the [With React Hook Form](#with-react-hook-form)
> example if you want to build truly complex forms instead of this example.

Starting with `@react-md/form@2.5.0`, there are a few new helper components to
simplify this process as well as a new `useTextField` hook to control the value
for text-like components. Here's a list of components to use:

- `TextFieldWithMessage` instead of `TextField`
- `TextAreaWithMessage` instead of `TextArea`
- `PasswordWithMessage` instead of `Password`

Check out the example below to see some of the default behavior and how to
create a form with some validation.
