"use client";
import { Box, SkeletonPlaceholder } from "@react-md/core";
import { type ReactElement } from "react";

export default function StaticWidthExample(): ReactElement {
  return (
    <Box align="start" stacked fullWidth>
      <SkeletonPlaceholder width="40%" />
    </Box>
  );
}
