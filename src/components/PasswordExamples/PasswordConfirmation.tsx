import { Button } from "@react-md/button";
import { Box } from "@react-md/core";
import { Form, Password, useTextField } from "@react-md/form";
import type { ReactElement } from "react";

const SPECIAL_CHARACTERS = "!@#$%^&*()_+=-";
const pattern = `^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9${SPECIAL_CHARACTERS}])(.{8,})$`;

export function PasswordConfirmation(): ReactElement {
  // NOT YET IMPLEMENTED
  const { fieldProps: passwordProps } = useTextField({
    name: "password",
    required: true,
    minLength: 8,
    pattern,
    validationType: "change",
  });
  const { fieldProps: confirmProps } = useTextField({
    name: "confirmPassword",
    required: true,
    minLength: 8,
    pattern,
    validationType: "change",
  });
  return (
    <Form style={{ width: "100%", maxWidth: "35rem" }}>
      <Box stacked align="stretch">
        <Password {...passwordProps} label="Password" />
        <Password {...confirmProps} label="Confirm Password" />
        <Button
          type="submit"
          theme="secondary"
          themeType="outline"
          style={{ alignSelf: "start" }}
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
}
