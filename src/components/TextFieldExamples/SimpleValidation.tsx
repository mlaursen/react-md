import { Box, Button } from "@react-md/core";
import { Form, TextField, useTextField } from "@react-md/form";
import type { ReactElement } from "react";

export function SimpleValidation(): ReactElement {
  // NEXT STEPS:
  // - should I care about render optimzation>
  // - how does this work with validating against other fields?
  // - should I create ValidatedTextField/ValidatedTextArea componets that implement this hook?
  //   - this would allow for some internal optimizations around persisting error states when needed
  //   - alos around the value? This hook is only useful if you need the value immmediately
  const { fieldProps: fieldProps1 } = useTextField({
    name: "field1",
    required: true,
    counter: true,
    maxLength: 40,
    minLength: 4,
    disableMessage: true,
    disableMaxLength: true,
  });
  const { fieldProps: fieldProps2 } = useTextField({
    name: "field2",
    required: true,
    counter: true,
    maxLength: 40,
    minLength: 4,
    disableMessage: true,
    disableMaxLength: true,
  });
  const { fieldProps: fieldProps3 } = useTextField({
    name: "field3",
    required: true,
    counter: true,
    maxLength: 40,
    minLength: 4,
    disableMessage: true,
    disableMaxLength: true,
  });

  return (
    <Form>
      <Box stacked align="start">
        <TextField {...fieldProps1} label="Label" />
        <TextField {...fieldProps2} label="Label" />
        <TextField {...fieldProps3} label="Label" />
        <Button type="submit">Submit</Button>
      </Box>
    </Form>
  );
}
