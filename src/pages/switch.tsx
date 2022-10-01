import { Button } from "@react-md/button";
import { Box, Typography } from "@react-md/core";
import { Form, Switch } from "@react-md/form";
import type { ReactElement } from "react";
import { Resettable } from "src/components/Resettable";

export default function SwitchPage(): ReactElement {
  return (
    <Resettable>
      <Form>
        <Box align="start" stacked>
          <Typography type="headline-4" margin="top">
            Switches
          </Typography>
          <Switch label="Switch" />
          <Switch label="Switch" defaultChecked />
          <Switch label="Switch" disabled />
          <Switch label="Switch" disabled defaultChecked />
          <Switch label="Switch" iconAfter />
          <Switch label="Switch" iconAfter defaultChecked />
          <Switch label="Switch" iconAfter disabled />
          <Switch label="Switch" iconAfter disabled defaultChecked />
        </Box>
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
        <Box align="start" stacked>
          <Typography type="headline-4" margin="top">
            Custom Size
          </Typography>
          <Switch label="Switch" style={{ fontSize: "3rem" }} />
        </Box>
      </Form>
    </Resettable>
  );
}
