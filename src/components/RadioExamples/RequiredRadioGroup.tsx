import { Box, Button } from "@react-md/core";
import { Form, Radio, useRadioGroup } from "@react-md/form";
import type { ReactElement } from "react";

export function RequiredRadioGroup(): ReactElement {
  const { getRadioProps, reset } = useRadioGroup({
    name: "radio-group",
    required: true,
  });

  return (
    <Form onReset={reset}>
      <Box stacked align="start">
        <Radio {...getRadioProps("a")} label="First" />
        <Radio {...getRadioProps("b")} label="Second" />
        <Radio {...getRadioProps("c")} label="Third" />
        <Radio {...getRadioProps("d")} label="Forth" />
      </Box>
      <Box>
        <Button type="submit" theme="primary">
          Submit
        </Button>
        <Button type="reset" theme="warning">
          Reset
        </Button>
      </Box>
    </Form>
  );
}
