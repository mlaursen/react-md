"use client";
import { Box, Button, Form, Radio, box, useRadioGroup } from "@react-md/core";
import { type ReactElement } from "react";

export default function RequiredRadioGroup(): ReactElement {
  const { getRadioProps, reset } = useRadioGroup({
    name: "requiredGroup",
    required: true,
  });
  return (
    <Form className={box({ stacked: true, align: "start" })} onReset={reset}>
      <Radio {...getRadioProps("a")} label="First" />
      <Radio {...getRadioProps("b")} label="Second" />
      <Radio {...getRadioProps("c")} label="Third" />
      <Radio {...getRadioProps("d")} label="Forth" />

      <Box disablePadding>
        <Button type="reset" theme="warning" themeType="outline">
          Reset
        </Button>
        <Button type="submit" theme="primary" themeType="contained">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
