"use client";

import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

type Value = "a" | "b" | "c" | "d";

export default function ControllingRadios(): ReactElement {
  const { getRadioProps, value } = useRadioGroup<Value>({
    name: "radioGroup",
    defaultValue: "a",
  });

  return (
    <Form className={box({ stacked: true, align: "start" })}>
      <Radio {...getRadioProps("a")} label="First" />
      <Radio {...getRadioProps("b")} label="Second" />
      <Radio {...getRadioProps("c")} label="Third" />
      <Radio {...getRadioProps("d")} label="Forth" />
      <Typography>
        The current value is: <code>{value}</code>
      </Typography>
    </Form>
  );
}
