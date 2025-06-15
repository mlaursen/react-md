"use client";

import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement, useState } from "react";

export default function ControllingTheValueExample(): ReactElement {
  const [value, setValue] = useState("08:30");
  return (
    <TextField
      label="Time"
      type="time"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
