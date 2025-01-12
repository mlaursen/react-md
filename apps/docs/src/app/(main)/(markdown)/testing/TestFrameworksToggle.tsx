"use client";
import { SegmentedButtons } from "@/components/SegmentedButtons.jsx";
import { type ReactElement } from "react";
import { TEST_FRAMEWORKS } from "./constants.js";
import { useTestFramework } from "./TestFrameworkProvider.jsx";

export function TestFrameworksToggle(): ReactElement {
  const { value, setValue } = useTestFramework();
  return (
    <SegmentedButtons
      items={TEST_FRAMEWORKS}
      value={value}
      setValue={setValue}
      disableFullWidth
    />
  );
}
