import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
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
