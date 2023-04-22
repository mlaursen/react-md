import { Box, Form, TextField } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleTextFields(): ReactElement {
  return (
    <Form>
      <Box stacked>
        <TextField label="Label" placeholder="Placeholder" />
        <TextField label="Label" defaultValue="Hello, world!" />
        <TextField
          active
          label="Label (always active)"
          placeholder="Placeholder"
        />
        <TextField
          active
          label="Label (always active)"
          defaultValue="Hello, world!"
        />
        <TextField label="Error State" placeholder="Placeholder" error />
        <TextField
          label="Error State"
          placeholder="Placeholder"
          defaultValue="Default value"
          error
        />
        <TextField label="Read Only" placeholder="Placeholder" readOnly />
        <TextField
          label="Read Only"
          placeholder="Placeholder"
          defaultValue="Default value"
          readOnly
        />
        <TextField label="Disabled" placeholder="Placeholder" disabled />
        <TextField
          label="Disabled"
          placeholder="Placeholder"
          defaultValue="Default value"
          disabled
        />
      </Box>
    </Form>
  );
}
