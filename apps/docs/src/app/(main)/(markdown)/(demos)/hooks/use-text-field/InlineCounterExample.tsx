"use client";

import { TextField } from "@react-md/core/form/TextField";
import { useTextField } from "@react-md/core/form/useTextField";
import { type ReactElement } from "react";

export default function InlineCounterExample(): ReactElement {
  const { fieldProps } = useTextField({
    name: "example",
    counter: true,
    required: true,
    maxLength: 20,
    // this allows the user to type beyond the max length limit and display
    // an error message. omit or set to `false` to enforce the max length instead
    disableMaxLength: true,
  });

  return <TextField {...fieldProps} label="Example" />;
}
