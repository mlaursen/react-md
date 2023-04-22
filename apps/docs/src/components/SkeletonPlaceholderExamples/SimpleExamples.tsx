import { Box, SkeletonPlaceholder } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleExamples(): ReactElement {
  return (
    <Box stacked align="start" style={{ maxWidth: "40rem", width: "100%" }}>
      <SkeletonPlaceholder />
      <SkeletonPlaceholder height="3rem" />
      <SkeletonPlaceholder height="1.5rem" />
      <SkeletonPlaceholder width="1.5rem" />
      <SkeletonPlaceholder height="3rem" width="3rem" />
    </Box>
  );
}
