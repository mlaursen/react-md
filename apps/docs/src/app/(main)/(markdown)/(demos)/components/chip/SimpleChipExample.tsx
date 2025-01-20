"use client";

import { Chip } from "@react-md/core/chip/Chip";
import { type ReactElement } from "react";

export default function SimpleChipExample(): ReactElement {
  return (
    <Chip
      onClick={() => {
        // do something
      }}
    >
      Chip
    </Chip>
  );
}
