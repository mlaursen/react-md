import { Box } from "@react-md/core";
import { Form, TextField } from "@react-md/form";
import type { ReactElement } from "react";

export function PlaceholderOnlyTextFields(): ReactElement {
  return (
    <Form>
      <Box stacked>
        <TextField placeholder="Placeholder only" />
        <TextField
          placeholder="Placeholder only"
          defaultValue="Placeholder default value"
        />
        <TextField placeholder="Placeholder only (active)" active />
        <TextField
          placeholder="Placeholder only (active)"
          defaultValue="Placeholder (active) default value"
          active
        />
        <TextField placeholder="Placeholder only" error />
        <TextField
          placeholder="Placeholder only"
          error
          defaultValue="Placeholder error default value"
        />
        <TextField placeholder="Placeholder only" readOnly />
        <TextField
          placeholder="Placeholder only"
          readOnly
          defaultValue="Placeholder readOnly default value"
        />
        <TextField placeholder="Placeholder only" disabled />
        <TextField
          placeholder="Placeholder only"
          disabled
          defaultValue="Placeholder disabled default value"
        />
      </Box>
    </Form>
  );
}
