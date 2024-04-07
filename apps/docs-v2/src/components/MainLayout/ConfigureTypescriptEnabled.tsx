"use client";
import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import {
  SegmentedButtons,
  type SegmentedButtonsProps,
} from "@/components/SegmentedButtons.jsx";
import { useTypescriptEnabledContext } from "@react-md/code/TypescriptEnabledProvider";
import { type ReactElement } from "react";

export type CodeLanguage = "js" | "ts";

const ITEMS = ["ts", "js"] as const;

export interface ConfigureTypescriptEnabledProps {
  disableLabel?: boolean;
}

export function ConfigureTypescriptEnabled(
  props: ConfigureTypescriptEnabledProps
): ReactElement {
  const { disableLabel } = props;
  const { isTypescriptEnabled, setTypescriptEnabled } =
    useTypescriptEnabledContext();

  const sharedProps: SegmentedButtonsProps<CodeLanguage> = {
    items: ITEMS,
    value: isTypescriptEnabled ? "ts" : "js",
    setValue: (nextValue) => setTypescriptEnabled(nextValue === "ts"),
  };
  if (disableLabel) {
    return <SegmentedButtons {...sharedProps} disableFullWidth />;
  }

  return <SegmentedButtonGroup label="Code Language" {...sharedProps} />;
}
