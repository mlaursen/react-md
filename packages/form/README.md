# @react-md/form

Create material design form elements with a lot of customization. This package
exports the following form components:

- `Form` - A simple wrapper for a `<form>` element that just prevents default
  submit behavior for convenience
- `Fieldset` - A simple wrapper for the `<fieldset>` element that removes some
  of the default styles and integrates a `<legend>` that be be conditionally
  rendered for screen readers only
- `Label` - A `<label>` element that is also built-in to the majority of the
  other form controls
- `FileInput` - A wrapper for `<input type="file" />` that gains the
  `<Button />` styles
- `NativeSelect` - A wrapper for the native `<select>` element that updates the
  select to have the same styles as a `TextField`. You are unable to style the
  `<option>`s due to styling restrictions
- `Select` - A component that allows you to create an accessible listbox that
  behaves like a native `<select>` element but also allows for additional
  styling from the `@react-md/list` package
- `TextField` - A styled `<input type="text" />` that supports a few themes as
  well as other input types. Note:
- `Password` - A wrapper for the `TextField` to render as a `type="password"`
  that has built-in functionality to temporarily show the password to the user
  with an inline visibility toggle button
- `TextArea` - A styled `<texxtarea>` that has a few themes and can animate the
  height as the user types
- `Checkbox` - A wrapper for an `<input type="checkbox" />`
- `Radio` - A wrapper for an `<input type="radio" />`
- `Switch` - A wrapper for an `<input type="checkbox" />` that looks like a
  toggleable switch
- `AsyncSwitch` - A wrapper for the `Switch` component that has built-in support
  for displaying a circular progress in the `Switch` during asynchronous actions
- `FormMessage` - A component that can be used to display accessible help and
  error messages along with other form components that will be read out to
  screen readers.

This package also exports the following helper components and hooks:

- `useChecked` - A simple hook that controls the checked state for the
  `Checkbox` or `Switch` components
- `useIndeterminateChecked` - A hook that can be used for checkbox groups with
  an indeterminate state
- `useChoice` - A simple hook that can be used to control the state of a radio
  group or select components while type-casting the value for Typescript users.
  Note: This does not validate the value string
- `useSelectState` - A hook for Typescript users that type-casts the value.
  Note: This does not validate the value string
- `FloatingLabel` - A `<label>` element that can be used to animate a label out
  of an `<input type="text" />` or `<textarea>` if additional customization is
  required
- `Listbox` - A component that implements the
  [listbox widget specifications](https://www.w3.org/TR/wai-aria-practices/#Listbox)
  with keyboard search and movement built-in.
- `Option` - A wrapper for the `SimpleListItem` from `@react-md/list` that
  allows for additional styling and accessibility requirements for an `"option"`
  role
- `TextFieldContainer` - A styled `<div>` that is used for render the different
  themes
- `TextFieldAddon` - A component that might not be used much externally, but it
  can be used to gain the styles for the addons for a `TextArea` and `TextField`
  (built-in)
- `InputToggle` - A component that is used to render either a `"checkbox"` or
  `"radio"` element
- `ToggleCotainer` - A helper component that is used to wrap either a
  `"checkbox"` or `"radio"` for additional styles

## Installation

```sh
npm install --save @react-md/form
```

It is also recommended to install the other packages if you have not done so:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/form/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

It is recommended to check out the documentation site for a better example, but
here's a simple one that you should really not copy:

```tsx
import React, { useState } from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button";
import { Form, TextField, Password, useChecked } from "@react-md/form";
import { EmailSVGIcon, PasswordSVGIcon } from "@react-md/material-icons";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useChecked(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (json.errors) {
      setErrors(errors);
    } else {
      // do something
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormMessage id="errors" role="alert" error disableWrap>
        {errors.length && (
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </FormMessage>
      <TextField
        aria-describedby="errors"
        id="email"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required
        leftAddon={<EmailSVGIcon />}
      />
      <Password
        aria-describedby="errors"
        id="password"
        label="Password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
        leftAddon={<PasswordSVGIcon />}
      />
      <Checkbox
        id="remember-me"
        name="rememberMe"
        label="Remember me?"
        checked={rememberMe}
        onChange={setRememberMe}
      />
      <Button id="submit" type="submit">
        Log in
      </Button>
    </Form>
  );
};

render(<App />, document.getElementById("root"));
```
