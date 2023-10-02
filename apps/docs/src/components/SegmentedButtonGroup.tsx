import { Box, Typography } from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";
import {
  SegmentedButtons,
  type SegmentedButtonsProps,
} from "./SegmentedButtons.jsx";

export interface SegmentedButtonGroupProps<V extends string>
  extends SegmentedButtonsProps<V> {
  label: ReactNode;
}

export function SegmentedButtonGroup<V extends string>(
  props: SegmentedButtonGroupProps<V>
): ReactElement {
  const { label, ...passThroughProps } = props;

  return (
    <Box stacked fullWidth disablePadding align="stretch">
      <Typography margin="none">{label}</Typography>
      <SegmentedButtons {...passThroughProps} />
    </Box>
  );
}
