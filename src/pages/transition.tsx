import { Box, SkeletonPlaceholder } from "@react-md/core";
import type { ReactElement } from "react";

export default function TransitionPage(): ReactElement {
  return (
    <Box stacked align="start">
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
    </Box>
  );
}
