"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { cssUtils } from "@react-md/core/cssUtils";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { useTextField } from "@react-md/core/form/useTextField";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useId } from "react";

export default function FormLevelErrorMessagesExample(): ReactElement {
  const errorId = useId();
  const { fieldProps, reset, error, errorMessage } = useTextField({
    name: "example",
    pattern: "^[A-Za-z,! ]+$",
    required: true,
    maxLength: 20,
    disableMessage: true,
  });

  return (
    <Form
      onReset={() => {
        reset();
      }}
      style={{ width: "100%" }}
    >
      {error && (
        <div role="alert">
          <Typography
            type="headline-4"
            className={cssUtils({ textColor: "error" })}
            margin="none"
          >
            There are errors in this form
          </Typography>
          <Typography as="ul" style={{ marginBottom: "4em" }}>
            <li>
              <a id={errorId} href={`#${fieldProps.id}`}>
                The Example field: {errorMessage}
              </a>
            </li>
          </Typography>
        </div>
      )}
      <Box stacked fullWidth disablePadding>
        <TextField
          {...fieldProps}
          label="Example"
          aria-describedby={(error && errorId) || undefined}
        />
        <Box justify="end" fullWidth disablePadding>
          <Button type="reset" theme="warning" themeType="outline">
            Reset
          </Button>
          <Button type="submit" theme="primary" themeType="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Form>
  );
}
