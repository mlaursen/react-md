import { Box, Form, Radio } from "@react-md/core";
import type { ReactElement } from "react";

export function DifferentSizes(): ReactElement {
  return (
    <Form>
      <Box stacked align="start">
        <Radio name="radioSizes" label="Small" size="small" />
        <Radio name="radioSizes" label="Dense" size="dense" />
        <Radio name="radioSizes" label="Normal" size="normal" />
        <Radio name="radioSizes" label="Large" size="large" />
        <Radio
          name="radioSizes"
          label="Custom"
          size="auto"
          style={{ fontSize: "3.5rem" }}
        />
      </Box>
    </Form>
  );
}
