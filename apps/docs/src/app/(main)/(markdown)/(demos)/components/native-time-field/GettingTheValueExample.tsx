"use client";

import { box } from "@react-md/core/box/styles";
import { NativeTimeField } from "@react-md/core/datetime/NativeTimeField";
import { Form } from "@react-md/core/form/Form";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useState } from "react";

export default function GettingTheValueExample(): ReactElement {
  const [value1, setValue1] = useState("15:30");
  const [value2, setValue2] = useState("");
  return (
    <Form
      className={box({ fullWidth: true, disablePadding: true, align: "start" })}
    >
      <Typography margin="none">{`The current value is: ${value1}`}</Typography>
      <NativeTimeField
        label="Time"
        name="time"
        defaultValue="15:30"
        onChange={(event) => {
          setValue1(event.currentTarget.value);
        }}
      />
      <Typography margin="top">{`The current value is: ${value2}`}</Typography>
      <NativeTimeField
        label="Time"
        name="time"
        onChange={(event) => {
          setValue2(event.currentTarget.value);
        }}
      />
    </Form>
  );
}
