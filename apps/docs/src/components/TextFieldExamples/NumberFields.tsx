import { Form, TextField, useNumberField } from "@react-md/core";
import type { ReactElement } from "react";

export function NumberFields(): ReactElement {
  const { fieldProps } = useNumberField({
    name: "number",
    // these are optional
    min: 0,
    max: 10,
    step: 1,
  });

  return (
    <Form>
      <TextField {...fieldProps} label="Number" />
    </Form>
  );
}
