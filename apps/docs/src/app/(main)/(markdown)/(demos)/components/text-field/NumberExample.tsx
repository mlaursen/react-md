/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { useNumberField } from "@react-md/core/form/useNumberField";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

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
