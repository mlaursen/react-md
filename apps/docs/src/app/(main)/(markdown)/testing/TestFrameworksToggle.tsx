"use client";

import { type ReactElement } from "react";

import { SegmentedButtons } from "@/components/SegmentedButtons.js";

import { useTestFramework } from "./TestFrameworkProvider.js";
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
