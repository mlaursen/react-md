import { Box, Typography } from "@react-md/core";
import { Checkbox, Form, useCheckboxGroup } from "@react-md/form";
import type { ReactElement } from "react";
import { Resettable } from "src/components/Resettable";

const themes = ["none", "underline", "filled", "outline"] as const;

function IndeterminateExample(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    name: "themes",
    values: themes,
  });
  return (
    <>
      <Checkbox {...getIndeterminateProps()} label="All" />
      {themes.map((theme) => (
        <Checkbox {...getCheckboxProps(theme)} key={theme} label={theme} />
      ))}
    </>
  );
}

export default function CheckboxPage(): ReactElement {
  return (
    <Resettable>
      <Form>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top">
            Checkboxes
          </Typography>
          <Checkbox label="Label" />
          <Checkbox label="Label" defaultChecked />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled" disabled defaultChecked />
          <Checkbox label="Read Only" readOnly />
          <Checkbox label="Read Only" readOnly defaultChecked />
        </Box>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top">
            Different Sizes
          </Typography>
          <Checkbox label="Small" size="small" />
          <Checkbox label="Dense" size="dense" />
          <Checkbox label="Normal" size="normal" />
          <Checkbox label="Large" size="large" />
          <Checkbox label="Custom" size="auto" style={{ fontSize: "4.5rem" }} />
        </Box>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top">
            Indeterminate Checkbox Group
          </Typography>
          <IndeterminateExample />
        </Box>
      </Form>
    </Resettable>
  );
}
