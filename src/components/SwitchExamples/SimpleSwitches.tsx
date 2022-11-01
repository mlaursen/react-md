import { Box } from "@react-md/core";
import { Form, Switch } from "@react-md/form";
import type { ReactElement } from "react";

export function SimpleSwitches(): ReactElement {
  return (
    <Form>
      <Box stacked align="start">
        <Switch label="Switch" />
        <Switch label="Switch" defaultChecked />
        <Switch label="Switch" disabled />
        <Switch label="Switch" disabled defaultChecked />
        <Switch label="Switch" iconAfter />
        <Switch label="Switch" iconAfter defaultChecked />
        <Switch label="Switch" iconAfter disabled />
        <Switch label="Switch" iconAfter disabled defaultChecked />
      </Box>
    </Form>
  );
}
