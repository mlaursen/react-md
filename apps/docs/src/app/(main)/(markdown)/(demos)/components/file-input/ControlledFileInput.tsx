"use client";
import { box } from "@react-md/core/box/styles";
import { FileInput } from "@react-md/core/form/FileInput";
import { Form } from "@react-md/core/form/Form";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

export default function ControlledFileInput(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <Form className={box({ stacked: true, align: "start", fullWidth: true })}>
      <FileInput
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Typography margin="top">The current value is:</Typography>
      <Typography as="code" margin="none">
        {value || "No File Selected"}
      </Typography>
    </Form>
  );
}
