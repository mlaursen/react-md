import { Box, Checkbox, Form } from "@react-md/core";
import type { ReactElement } from "react";

export function DifferentSizes(): ReactElement {
  return (
    <Form>
      <Box stacked align="start">
        <Checkbox label="Small" size="small" />
        <Checkbox label="Dense" size="dense" />
        <Checkbox label="Normal" size="normal" />
        <Checkbox label="Large" size="large" />
        <Checkbox label="Custom" size="auto" style={{ fontSize: "3.5rem" }} />
      </Box>
    </Form>
  );
}
