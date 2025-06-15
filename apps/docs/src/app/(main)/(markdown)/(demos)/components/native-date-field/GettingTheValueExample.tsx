"use client";

import { box } from "@react-md/core/box/styles";
import { NativeDateField } from "@react-md/core/datetime/NativeDateField";
import { Form } from "@react-md/core/form/Form";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useState } from "react";

export default function GettingTheValueExample(): ReactElement {
  const [value1, setValue1] = useState("2025-06-15");
  const [value2, setValue2] = useState("");
  return (
    <Form
      className={box({ fullWidth: true, disablePadding: true, align: "start" })}
    >
      <Typography margin="none">{`The current value is: ${value1}`}</Typography>
      <NativeDateField
        label="Date"
        name="date1"
        defaultValue="2025-06-15"
        onChange={(event) => {
          setValue1(event.currentTarget.value);
        }}
      />
      <Typography margin="top">{`The current value is: ${value2}`}</Typography>
      <NativeDateField
        label="Date"
        name="date2"
        onChange={(event) => {
          setValue2(event.currentTarget.value);
        }}
      />
    </Form>
  );
}
