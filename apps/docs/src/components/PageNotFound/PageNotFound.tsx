import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
import { type ReactElement, type ReactNode } from "react";

import NotFoundSVG from "./NotFoundSVG.jsx";

export interface PageNotFoundProps {
  children?: ReactNode;
}

export function PageNotFound({ children }: PageNotFoundProps): ReactElement {
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
      {children}
    </Box>
  );
}
