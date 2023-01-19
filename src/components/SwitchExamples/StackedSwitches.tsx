import { Box, Form, Switch } from "@react-md/core";
import type { ReactElement } from "react";

export function StackedSwitches(): ReactElement {
  return (
    <Form>
      <Box>
        <Switch label="Switch" stacked />
        <Switch label="Switch" stacked defaultChecked />
        <Switch label="Switch" stacked disabled />
        <Switch label="Switch" stacked disabled defaultChecked />
        <Switch label="Switch" stacked iconAfter />
        <Switch label="Switch" stacked iconAfter defaultChecked />
        <Switch label="Switch" stacked iconAfter disabled />
        <Switch label="Switch" stacked iconAfter disabled defaultChecked />
      </Box>
    </Form>
  );
}
