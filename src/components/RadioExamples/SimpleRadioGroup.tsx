import { Box, Form, Radio, Typography, useRadioGroup } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleRadioGroup(): ReactElement {
  const { getRadioProps, value } = useRadioGroup({
    name: "radio-group",
  });
  return (
    <Form>
      <Box stacked align="start">
        <Radio {...getRadioProps("a")} label="First" />
        <Radio {...getRadioProps("b")} label="Second" />
        <Radio {...getRadioProps("c")} label="Third" />
        <Radio {...getRadioProps("d")} label="Forth" />
        <Typography>The current value is: {value}</Typography>
      </Box>
    </Form>
  );
}
