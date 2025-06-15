"use client";

import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement, useState } from "react";

export default function ControllingTheValueExample(): ReactElement {
  const [value, setValue] = useState("2025-06-15");
  return (
    <TextField
      label="Date"
      type="date"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
