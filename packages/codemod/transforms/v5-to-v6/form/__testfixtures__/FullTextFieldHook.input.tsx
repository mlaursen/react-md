import { type ReactElement } from "react";
import { Button, Form, TextFieldWithMessage, useTextField } from "react-md";

export function FullTextFieldHook(): ReactElement {
  const [value, textFieldProps, actions] = useTextField({
    name: "field",
  });
  const { setState, reset } = actions;

  const [value2, textFieldProps2, { reset: reset2, setState: setState2 }] =
    useTextField({
      name: "field2",
    });

  const [, textFieldProps3] = useTextField({ name: "field3" });

  return (
    <Form
      onReset={reset}
      onSubmit={() => {
        setState({ error: null, errorMessage: "", value: "" });
      }}
    >
      <TextFieldWithMessage {...textFieldProps} />
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
