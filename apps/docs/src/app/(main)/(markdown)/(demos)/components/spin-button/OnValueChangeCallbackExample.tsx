"use client";

import { SpinButton } from "@react-md/core/spinbutton/SpinButton";
import { type SpinButtonValue } from "@react-md/core/spinbutton/types";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useState } from "react";

export default function OnValueChangeCallbackExample(): ReactElement {
  const [value, setValue] = useState<SpinButtonValue>(0);

  return (
    <>
      <Typography>Current value: {`"${value}"`}</Typography>
      <SpinButton
        aria-label="Minutes"
        min={0}
        max={59}
        fallback="MM"
        defaultValue={0}
        onValueChange={(options) => {
          const { reason, value } = options;
          if (reason !== "type") {
            setValue(value);
          }
        }}
      />
    </>
  );
}
