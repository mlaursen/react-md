"use client";

import { type ReactElement } from "react";

import { SegmentedButtons } from "@/components/SegmentedButtons.jsx";

import { useTestFramework } from "./TestFrameworkProvider.jsx";
import { TEST_FRAMEWORKS } from "./constants.js";

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
