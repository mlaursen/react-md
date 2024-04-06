import { Box, randomSkeletonPlaceholder, skeletonPlaceholder } from "react-md";
import { type ReactElement } from "react";
import "server-only";

export default function SsrOnlyExample(): ReactElement {
  return (
    <Box grid>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          style={randomSkeletonPlaceholder()}
          className={skeletonPlaceholder()}
        />
      ))}
    </Box>
  );
}
