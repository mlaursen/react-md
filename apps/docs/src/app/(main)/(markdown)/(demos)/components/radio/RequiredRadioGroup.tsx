"use client";
import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
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
