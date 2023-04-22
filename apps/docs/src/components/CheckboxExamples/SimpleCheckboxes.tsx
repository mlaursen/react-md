import { Box, Checkbox, Form } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleCheckboxes(): ReactElement {
  return (
    <Form>
      <Box stacked align="start">
        <Checkbox label="Label" />
        <Checkbox label="Label" defaultChecked />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled" disabled defaultChecked />
        <Checkbox label="Read Only" readOnly />
        <Checkbox label="Read Only" readOnly defaultChecked />
      </Box>
    </Form>
  );
}
