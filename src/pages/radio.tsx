import { Button } from "@react-md/button";
import { Box, Typography } from "@react-md/core";
import { Form, Radio, useRadioGroup } from "@react-md/form";
import type { ReactElement } from "react";
import { Resettable } from "src/components/Resettable";

function RadioGroup(): ReactElement {
  const { getRadioProps } = useRadioGroup({
    name: "radio-group",
  });

  return (
    <>
      <Radio {...getRadioProps("a")} label="First" />
      <Radio {...getRadioProps("b")} label="Second" />
      <Radio {...getRadioProps("c")} label="Third" />
      <Radio {...getRadioProps("d")} label="Forth" />
    </>
  );
}

function Validation(): ReactElement {
  const { getRadioProps } = useRadioGroup({
    name: "radio-group",
    required: true,
  });

  return (
    <Form>
      <Box stacked align="start">
        <Typography type="headline-4" margin="top">
          Validation
        </Typography>
        <Radio {...getRadioProps("a")} label="First" />
        <Radio {...getRadioProps("b")} label="Second" />
        <Radio {...getRadioProps("c")} label="Third" />
        <Radio {...getRadioProps("d")} label="Forth" />
      </Box>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default function RadioPage(): ReactElement {
  return (
    <Resettable>
      <Form>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top">
            Radios
          </Typography>
          <Radio label="Label" />
          <Radio label="Label" defaultChecked />
          <Radio label="Disabled" disabled />
          <Radio label="Disabled" disabled defaultChecked />
          <Radio label="Read Only" readOnly />
          <Radio label="Read Only" readOnly defaultChecked />
        </Box>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top">
            Different Sizes
          </Typography>
          <Radio label="Small" size="small" />
          <Radio label="Dense" size="dense" />
          <Radio label="Normal" size="normal" />
          <Radio label="Large" size="large" />
          <Radio label="Custom" size="auto" style={{ fontSize: "4.5rem" }} />
        </Box>
        <Box stacked align="start">
          <Typography type="headline-4" margin="top">
            Radio Group
          </Typography>
          <RadioGroup />
        </Box>
      </Form>
      <Validation />
    </Resettable>
  );
}
