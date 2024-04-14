"use client";
import { Box } from "@react-md/core/box/Box";
import { SkeletonPlaceholder } from "@react-md/core/transition/SkeletonPlaceholder";
import { type ReactElement } from "react";

export default function StaticWidthExample(): ReactElement {
  return (
    <Box align="start" stacked fullWidth>
      <SkeletonPlaceholder width="40%" />
    </Box>
  );
}
