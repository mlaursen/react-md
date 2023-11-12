"use client";
import { SegmentedButton, SegmentedButtonContainer } from "@react-md/core";
import { useState, type ReactElement } from "react";

export default function SimpleSegmentedButtonGroupExample(): ReactElement {
  const [value, setValue] = useState("a");

  return (
    <SegmentedButtonContainer>
      <SegmentedButton onClick={() => setValue("a")} selected={value === "a"}>
        First
      </SegmentedButton>
      <SegmentedButton onClick={() => setValue("b")} selected={value === "b"}>
        Second
      </SegmentedButton>
      <SegmentedButton onClick={() => setValue("c")} selected={value === "c"}>
        Third
      </SegmentedButton>
    </SegmentedButtonContainer>
  );
}
