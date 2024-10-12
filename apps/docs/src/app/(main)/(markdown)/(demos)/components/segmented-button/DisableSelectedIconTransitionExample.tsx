"use client";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { useState, type ReactElement } from "react";

export default function DisableSelectedIconTransitionExample(): ReactElement {
  const [value, setValue] = useState("a");

  return (
    <SegmentedButtonContainer disableFullWidth>
      <SegmentedButton
        onClick={() => {
          setValue("a");
        }}
        selected={value === "a"}
        disableSelectedTransition
      >
        First
      </SegmentedButton>
      <SegmentedButton
        onClick={() => {
          setValue("b");
        }}
        selected={value === "b"}
        disableSelectedTransition
      >
        Second
      </SegmentedButton>
    </SegmentedButtonContainer>
  );
}
