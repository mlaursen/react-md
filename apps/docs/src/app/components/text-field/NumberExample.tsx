/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Button,
  Form,
  TextField,
  Typography,
  useNumberField,
} from "@react-md/core";
import type { ReactElement } from "react";

export default function NumberExample(): ReactElement {
  const { value, error, errorMessage, fieldProps, fieldRef, reset, setState } =
    useNumberField({
      name: "numberExample",
    });

  return (
    <Form onReset={reset}>
      <Typography margin="none">The current value is:</Typography>
      <Typography margin="bottom">{`${value}`}</Typography>
      <TextField label="Number" {...fieldProps} />
      <Button type="reset" theme="warning" themeType="outline">
        Reset
      </Button>
    </Form>
  );
}
