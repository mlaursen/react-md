"use client";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { useState, type ReactElement } from "react";

export default function SelectedIconExample(): ReactElement {
  const [value, setValue] = useState("a");

  return (
    <SegmentedButtonContainer disableFullWidth>
      <SegmentedButton
        onClick={() => setValue("a")}
        selected={value === "a"}
        selectedIcon={<FavoriteIcon />}
      >
        Custom Icon
      </SegmentedButton>
      <SegmentedButton
        onClick={() => setValue("b")}
        selected={value === "b"}
        selectedIcon={null}
      >
        Null Icon
      </SegmentedButton>
      <SegmentedButton
        onClick={() => setValue("c")}
        selected={value === "c"}
        disableSelectedIcon
      >
        Disabled Icon
      </SegmentedButton>
    </SegmentedButtonContainer>
  );
}
