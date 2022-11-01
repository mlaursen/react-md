import { Box } from "@react-md/core";
import { Form, Radio } from "@react-md/form";
import type { ReactElement } from "react";

export function RadioStates(): ReactElement {
  return (
    <Form>
      <Box stacked align="start">
        <Radio name="radioStates" value="a" label="Label" />
        <Radio name="radioStates" value="a" label="Label" />
        <Radio name="radioStates" value="a" label="Label" defaultChecked />
        <Radio name="radioStates" value="a" label="Disabled" disabled />
        <Radio
          name="radioStates"
          value="a"
          label="Disabled"
          disabled
          defaultChecked
        />
      </Box>
    </Form>
  );
}
