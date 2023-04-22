import { Box, Form, Password } from "@react-md/core";
import type { ReactElement } from "react";

export function SimplePasswords(): ReactElement {
  return (
    <Form>
      <Box stacked>
        <Password placeholder="Placeholder Only" />
        <Password label="Password" placeholder="Placeholder" />
        <Password label="Password" placeholder="Placeholder" error />
        <Password label="Read Only" placeholder="Placeholder" readOnly />
        <Password label="Disabled" placeholder="Placeholder" disabled />
      </Box>
    </Form>
  );
}
