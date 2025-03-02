import { type ReactElement } from "react";
import { Button, Form, TextFieldWithMessage, useTextField } from "react-md";

export function FullTextFieldHook(): ReactElement {
  const {
    value,
    fieldProps: textFieldProps,
    ...actions
  } = useTextField({
    name: "field",
  });
  const { setState, reset } = actions;

  const {
    value: value2,
    fieldProps: textFieldProps2,
    reset: reset2,
    setState: setState2
  } = useTextField({
    name: "field2",
  });

  const {
    fieldProps: textFieldProps3
  } = useTextField({ name: "field3" });

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
