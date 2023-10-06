import { Box, Typography, typography } from "@react-md/core";
import { type ReactElement } from "react";
import NotFoundSVG from "./NotFoundSVG.jsx";

export default function NotFound(): ReactElement {
  return (
    <Box
      stacked
      align="center"
      justify="center"
      fullWidth
      style={{ gridColumnEnd: "span 2" }}
      className={typography({ type: "headline-1" })}
    >
      <NotFoundSVG />
      <Typography type="headline-1" margin="none">
        Not Found
      </Typography>
    </Box>
  );
}
