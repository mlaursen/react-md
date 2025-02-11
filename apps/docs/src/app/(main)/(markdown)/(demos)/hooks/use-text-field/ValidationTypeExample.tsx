"use client";

import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { useTextField } from "@react-md/core/form/useTextField";
import { type ReactElement } from "react";

export default function ValidationTypeExample(): ReactElement {
  const { fieldProps, reset } = useTextField({
    name: "example",
    pattern: "^[A-Za-z,! ]+$",
    counter: true,
    required: true,
    maxLength: 20,
    validationType: "change",
    disableMaxLength: true,
  });

  return (
    <Form
      className={box({ stacked: true, fullWidth: true })}
      onReset={() => {
        reset();
      }}
    >
      <TextField {...fieldProps} label="Example" />
      <Box justify="end" fullWidth disablePadding>
        <Button type="reset" theme="warning" themeType="outline">
          Reset
        </Button>
        <Button type="submit" theme="primary" themeType="contained">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
