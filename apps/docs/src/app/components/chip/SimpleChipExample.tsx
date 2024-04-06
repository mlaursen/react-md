"use client";
import { Chip } from "react-md";
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
