import { Box, SkeletonPlaceholder } from "@react-md/core";
import type { ReactElement } from "react";

export default function TransitionPage(): ReactElement {
  return (
    <Box flexDirection="column" alignItems="start">
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
