"use client";

import { SpinButton } from "@react-md/core/spinbutton/SpinButton";
import { type SpinButtonValue } from "@react-md/core/spinbutton/types";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useState } from "react";

export default function ControllingTheValueExample(): ReactElement {
  const [value, setValue] = useState<SpinButtonValue>(null);
  return (
    <>
      <SpinButton
        aria-label="Example"
        value={value}
        min={0}
        max={10}
        minDigits={2}
        onValueChange={({ value }) => setValue(value)}
      />
      <Typography>Current value: {`"${value}"`}</Typography>
    </>
  );
}
