import { Box, Checkbox, Form, useCheckboxGroup } from "@react-md/core";
import type { ReactElement } from "react";

const themes = ["none", "underline", "filled", "outline"] as const;

export function IndeterminateCheckboxes(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    name: "themes",
    values: themes,
  });

  return (
    <Form>
      <Box stacked align="start">
        <Checkbox {...getIndeterminateProps()} label="All" />
        {themes.map((theme) => (
          <Checkbox {...getCheckboxProps(theme)} key={theme} label={theme} />
        ))}
      </Box>
    </Form>
  );
}
