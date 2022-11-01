import { Box } from "@react-md/core";
import { Form, Switch } from "@react-md/form";
import type { ReactElement } from "react";

export function DifferentSizes(): ReactElement {
  return (
    <Form>
      <Box stacked align="start">
        <Switch label="Switch" style={{ fontSize: "0.75rem" }} />
        <Switch label="Switch" style={{ fontSize: "1.25rem" }} />
        <Switch label="Switch" style={{ fontSize: "2rem" }} />
      </Box>
    </Form>
  );
}
