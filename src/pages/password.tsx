import { Button } from "@react-md/button";
import { Box, Typography } from "@react-md/core";
import { Form, Password, useTextField } from "@react-md/form";
import type { ReactElement } from "react";
import { Resettable } from "src/components/Resettable";

const SPECIAL_CHARACTERS = "!@#$%^&*()_+=-";
const pattern = `^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9${SPECIAL_CHARACTERS}])(.{8,})$`;

function PasswordConfirmation(): ReactElement {
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
    <Box stacked align="start" style={{ width: "18rem" }}>
      <Typography margin="top" type="headline-4" style={{ width: "100%" }}>
        Password Confirmation
      </Typography>
      <Password {...passwordProps} label="Password" />
      <Password {...confirmProps} label="Confirm Password" />
      <Button type="submit" theme="secondary" themeType="outline">
        Submit
      </Button>
    </Box>
  );
}

export default function PasswordPage(): ReactElement {
  return (
    <Resettable>
      <Form>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top" style={{ width: "100%" }}>
            Password
          </Typography>
          <Password placeholder="Placeholder Only" />
          <Password label="Password" placeholder="Placeholder" />
          <Password label="Password" placeholder="Placeholder" error />
          <Password label="Read Only" placeholder="Placeholder" readOnly />
          <Password label="Disabled" placeholder="Placeholder" disabled />
        </Box>
      </Form>
      <Form>
        <PasswordConfirmation />
      </Form>
    </Resettable>
  );
}
